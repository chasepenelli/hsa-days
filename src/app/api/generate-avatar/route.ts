import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

const COLOR_STYLES: Record<string, string> = {
  sage: "muted sage green (#5B7B5E) ink wash accents",
  gold: "warm golden (#C4A265) ink wash accents",
  terracotta: "soft terracotta (#D4856A) ink wash accents",
};

const STYLE_PREFIX =
  "Simple hand-drawn ink sketch illustration, cute and warm, minimal line art style, editorial book illustration, soft and intimate, no text, no watermarks, centered subject, simple composition, white background —";

export async function POST() {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "Image generation not configured" },
      { status: 503 }
    );
  }

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Fetch subscriber to get photo path and color preference
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("pet_photo_path, avatar_color, dog_name")
    .eq("id", user.id)
    .single();

  if (!subscriber?.pet_photo_path) {
    return NextResponse.json(
      { error: "No photo uploaded" },
      { status: 400 }
    );
  }

  const color = subscriber.avatar_color || "sage";
  const colorStyle = COLOR_STYLES[color] || COLOR_STYLES.sage;
  const dogName = subscriber.dog_name || "the dog";

  try {
    // 1. Download the photo from Supabase storage
    const { data: photoData, error: downloadError } = await supabase.storage
      .from("pet-photos")
      .download(subscriber.pet_photo_path);

    if (downloadError || !photoData) {
      console.error("Failed to download photo:", downloadError?.message);
      return NextResponse.json(
        { error: "Failed to read photo" },
        { status: 500 }
      );
    }

    const photoBuffer = await photoData.arrayBuffer();
    const base64Photo = Buffer.from(photoBuffer).toString("base64");
    const mimeType = subscriber.pet_photo_path.endsWith(".png")
      ? "image/png"
      : subscriber.pet_photo_path.endsWith(".png")
        ? "image/webp"
        : "image/jpeg";

    // 2. Use Claude vision to describe the dog
    const descriptionResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://hsadays.com",
          "X-Title": "HSA Days Avatar",
        },
        body: JSON.stringify({
          model: "anthropic/claude-sonnet-4",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "image_url",
                  image_url: {
                    url: `data:${mimeType};base64,${base64Photo}`,
                  },
                },
                {
                  type: "text",
                  text: `Describe this dog in a single concise sentence for an illustrator. Include the breed (or mix), coat color/pattern, size, and any distinctive features (floppy ears, curly tail, etc). Be specific about colors and markings. Just the description, nothing else.`,
                },
              ],
            },
          ],
          max_tokens: 150,
        }),
      }
    );

    if (!descriptionResponse.ok) {
      const errBody = await descriptionResponse.text();
      console.error("Claude vision failed:", errBody);
      return NextResponse.json(
        { error: "Failed to analyze photo" },
        { status: 500 }
      );
    }

    const descData = await descriptionResponse.json();
    const dogDescription =
      descData.choices?.[0]?.message?.content?.trim() || "";

    if (!dogDescription) {
      console.error("Empty description from Claude");
      return NextResponse.json(
        { error: "Failed to analyze photo" },
        { status: 500 }
      );
    }

    console.log(
      `Avatar generation for ${dogName}: "${dogDescription}" (color: ${color})`
    );

    // 3. Generate illustration via FLUX Pro
    const illustrationPrompt = `${STYLE_PREFIX} ${colorStyle} — a portrait of ${dogDescription}, looking warm and lovable, gentle expression, cozy and intimate feeling`;

    const fluxResponse = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://hsadays.com",
          "X-Title": "HSA Days Avatar",
        },
        body: JSON.stringify({
          model: "black-forest-labs/flux.2-pro",
          modalities: ["image"],
          messages: [{ role: "user", content: illustrationPrompt }],
          image_config: { aspect_ratio: "1:1" },
        }),
      }
    );

    if (!fluxResponse.ok) {
      const errBody = await fluxResponse.text();
      console.error("FLUX generation failed:", errBody);
      return NextResponse.json(
        { error: "Failed to generate illustration" },
        { status: 500 }
      );
    }

    const fluxData = await fluxResponse.json();

    // Extract base64 image from FLUX response
    let dataUrl =
      fluxData.choices?.[0]?.message?.content?.[0]?.image_url?.url ||
      fluxData.choices?.[0]?.message?.images?.[0]?.image_url?.url ||
      fluxData.choices?.[0]?.message?.content ||
      "";

    if (!dataUrl || typeof dataUrl !== "string") {
      console.error("No image in FLUX response");
      return NextResponse.json(
        { error: "Failed to generate illustration" },
        { status: 500 }
      );
    }

    // Strip data URL prefix to get raw base64
    const base64Image = dataUrl.replace(/^data:image\/[^;]*;base64,/, "");
    const imageBuffer = Buffer.from(base64Image, "base64");

    // 4. Upload the generated avatar to Supabase storage
    const avatarPath = `${user.id}/avatar.png`;

    const { error: uploadError } = await supabase.storage
      .from("pet-photos")
      .upload(avatarPath, imageBuffer, {
        upsert: true,
        contentType: "image/png",
      });

    if (uploadError) {
      console.error("Avatar upload failed:", uploadError.message);
      return NextResponse.json(
        { error: "Failed to save avatar" },
        { status: 500 }
      );
    }

    // 5. Update subscriber with avatar path
    await supabase
      .from("subscribers")
      .update({ avatar_illustration_path: avatarPath })
      .eq("id", user.id);

    return NextResponse.json({ ok: true, path: avatarPath });
  } catch (err) {
    console.error("Avatar generation error:", err);
    return NextResponse.json(
      { error: "Avatar generation failed" },
      { status: 500 }
    );
  }
}
