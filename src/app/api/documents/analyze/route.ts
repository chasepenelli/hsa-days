import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("document_analyses")
    .select("id, file_name, input_type, analysis_json, created_at")
    .eq("subscriber_id", user.id)
    .order("created_at", { ascending: false })
    .limit(10);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ analyses: data });
}

export async function POST(request: Request) {
  if (!OPENROUTER_API_KEY) {
    return NextResponse.json(
      { error: "AI analysis not configured" },
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

  // Fetch dog profile for context
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("dog_name, breed, weight_lbs, cancer_stage")
    .eq("id", user.id)
    .single();

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const pastedText = formData.get("text") as string | null;

  let inputType: "image" | "pdf" | "text";
  let rawText: string | null = null;
  let filePath: string | null = null;
  let fileName: string | null = null;
  let claudeContent: Array<{ type: string; [key: string]: unknown }>;

  if (pastedText && pastedText.trim().length > 0) {
    // ── Text path ──
    inputType = "text";
    rawText = pastedText.trim();
    claudeContent = [{ type: "text", text: rawText }];
  } else if (file && file.size > 0) {
    // File size check (10MB max)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File too large. Maximum 10MB." },
        { status: 413 }
      );
    }

    fileName = file.name;
    const ext = file.name.split(".").pop()?.toLowerCase();
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload to storage
    filePath = `${user.id}/vet-docs/${Date.now()}-${fileName}`;
    await supabase.storage.from("pet-photos").upload(filePath, buffer, {
      upsert: true,
      contentType: file.type,
    });

    if (ext === "pdf") {
      // ── PDF path ──
      inputType = "pdf";
      try {
        const { PDFParse } = await import("pdf-parse");
        const parser = new PDFParse({ data: buffer });
        const textResult = await parser.getText();
        rawText = textResult.text;
      } catch {
        rawText = null;
      }

      if (rawText && rawText.trim().length > 50) {
        claudeContent = [{ type: "text", text: rawText }];
      } else {
        // Scanned PDF — send as base64
        const base64 = buffer.toString("base64");
        claudeContent = [
          {
            type: "image_url",
            image_url: { url: `data:application/pdf;base64,${base64}` },
          },
        ];
      }
    } else {
      // ── Image path ──
      inputType = "image";
      const base64 = buffer.toString("base64");
      claudeContent = [
        {
          type: "image_url",
          image_url: { url: `data:${file.type};base64,${base64}` },
        },
      ];
    }
  } else {
    return NextResponse.json(
      { error: "No file or text provided" },
      { status: 400 }
    );
  }

  // Build Claude prompt with dog profile context
  const dogContext = subscriber
    ? `Dog profile: ${subscriber.dog_name ?? "the dog"}, ${subscriber.breed ?? "breed unknown"}, ${subscriber.weight_lbs ? subscriber.weight_lbs + " lbs" : "weight unknown"}, cancer stage: ${subscriber.cancer_stage ?? "unknown"}.`
    : "";

  const systemPrompt = `You are a compassionate veterinary document interpreter for dog owners navigating a hemangiosarcoma (HSA) diagnosis. ${dogContext}

Analyze the provided veterinary document, lab values, or bloodwork and return a JSON object with this exact structure:
{
  "summary": "2-3 sentence plain-English summary of what this document shows",
  "key_findings": ["finding 1", "finding 2", ...],
  "flagged_concerns": ["concern 1", ...],
  "suggested_questions": ["Question to ask your vet: ...", ...],
  "disclaimer": "These observations are not a substitute for veterinary advice. Always discuss findings with your veterinarian before making any care decisions."
}

Be warm, clear, and avoid jargon. If values are within normal range, say so reassuringly. Flag anything that warrants veterinary attention, especially values relevant to HSA (PCV/HCT, platelet count, liver enzymes, splenic measurements). Return ONLY the JSON object, no other text.`;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://hsadays.com",
          "X-Title": "HSA Days Vet Doc Analysis",
        },
        body: JSON.stringify({
          model: "anthropic/claude-sonnet-4",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: claudeContent },
          ],
          max_tokens: 1500,
        }),
      }
    );

    if (!response.ok) {
      const errBody = await response.text();
      console.error("OpenRouter analysis failed:", errBody);

      // Still save the record even if analysis fails
      await supabase.from("document_analyses").insert({
        subscriber_id: user.id,
        file_name: fileName,
        file_path: filePath,
        input_type: inputType,
        raw_text: rawText,
        analysis_json: null,
      });

      return NextResponse.json(
        { analysis: null, error: "Analysis failed — please try again" },
        { status: 200 }
      );
    }

    const aiData = await response.json();
    const rawResponse = aiData.choices?.[0]?.message?.content ?? "";

    let analysisJson: unknown = null;
    try {
      analysisJson = JSON.parse(rawResponse);
    } catch {
      // Claude sometimes wraps JSON in markdown code fences
      const match = rawResponse.match(/```(?:json)?\s*([\s\S]*?)```/);
      if (match) {
        try {
          analysisJson = JSON.parse(match[1]);
        } catch {
          /* leave null */
        }
      }
    }

    // Save to DB
    const { data: record } = await supabase
      .from("document_analyses")
      .insert({
        subscriber_id: user.id,
        file_name: fileName,
        file_path: filePath,
        input_type: inputType,
        raw_text: rawText,
        analysis_json: analysisJson,
      })
      .select("id")
      .single();

    return NextResponse.json({ analysis: analysisJson, id: record?.id });
  } catch (err) {
    console.error("Document analysis error:", err);

    // Save record with null analysis
    await supabase.from("document_analyses").insert({
      subscriber_id: user.id,
      file_name: fileName,
      file_path: filePath,
      input_type: inputType,
      raw_text: rawText,
      analysis_json: null,
    });

    return NextResponse.json(
      { analysis: null, error: "Analysis failed — please try again" },
      { status: 200 }
    );
  }
}
