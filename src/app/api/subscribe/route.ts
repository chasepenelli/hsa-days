import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, dog_name } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    // Use service role client for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Create auth user (or get existing)
    let authUserId: string;

    const { data: newUser, error: createError } =
      await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
      });

    if (createError) {
      if (createError.message.includes("already been registered")) {
        // User exists — look up their ID
        const { data: existingUsers } =
          await supabase.auth.admin.listUsers();
        const existing = existingUsers?.users?.find(
          (u) => u.email === email
        );
        if (!existing) {
          throw new Error("Could not find existing user");
        }
        authUserId = existing.id;
      } else {
        throw createError;
      }
    } else {
      authUserId = newUser.user.id;
    }

    // Create subscriber record with the AUTH user's ID
    await supabase.from("subscribers").upsert(
      {
        id: authUserId,
        email,
        name: name || null,
        dog_name: dog_name || null,
        signup_source: "website",
        has_digital_access: true,
      },
      { onConflict: "id" }
    );

    // Generate a magic link token server-side (no email sent)
    // so the client can auto-authenticate immediately
    const { data: linkData, error: linkError } =
      await supabase.auth.admin.generateLink({
        type: "magiclink",
        email,
      });

    if (linkError) throw linkError;

    // Add to Kit (ConvertKit) if configured
    if (process.env.KIT_API_KEY && process.env.KIT_API_KEY !== "placeholder") {
      try {
        await fetch(
          `https://api.convertkit.com/v3/forms/${process.env.KIT_FORM_ID}/subscribe`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              api_key: process.env.KIT_API_KEY,
              email,
            }),
          }
        );
      } catch {
        // Kit subscription failure shouldn't block signup
      }
    }

    return NextResponse.json({
      token_hash: linkData.properties.hashed_token,
    });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
