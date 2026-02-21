import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, name, dog_name, pin } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    if (!pin || !/^\d{4}$/.test(pin)) {
      return NextResponse.json(
        { error: "A 4-digit PIN is required" },
        { status: 400 }
      );
    }

    const password = "hsadays" + pin;

    // Use service role client for admin operations
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Create auth user (or update existing)
    let authUserId: string;

    const { data: newUser, error: createError } =
      await supabase.auth.admin.createUser({
        email,
        email_confirm: true,
        password,
      });

    if (createError) {
      if (createError.message.includes("already been registered")) {
        // User exists — look up their ID and update their PIN
        const { data: existingUsers } =
          await supabase.auth.admin.listUsers();
        const existing = existingUsers?.users?.find(
          (u) => u.email === email
        );
        if (!existing) {
          throw new Error("Could not find existing user");
        }
        authUserId = existing.id;

        // Update their password to the new PIN
        const { error: updateError } =
          await supabase.auth.admin.updateUserById(authUserId, { password });
        if (updateError) throw updateError;
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

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Subscribe error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
