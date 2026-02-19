import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/days";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Ensure subscriber record exists with auth user's ID
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: existing } = await supabase
          .from("subscribers")
          .select("id, onboarding_completed")
          .eq("id", user.id)
          .single();

        if (!existing) {
          // Create subscriber record matching the auth user ID
          const { error: upsertError } = await supabase
            .from("subscribers")
            .upsert(
              {
                id: user.id,
                email: user.email!,
                signup_source: "magic_link",
                has_digital_access: true,
              },
              { onConflict: "id" }
            );

          if (upsertError) {
            console.error(
              "Failed to create subscriber record:",
              upsertError.message
            );
          }

          // New user — send to onboarding
          return NextResponse.redirect(`${origin}/welcome`);
        }

        // Existing user — check onboarding status
        if (!existing.onboarding_completed) {
          return NextResponse.redirect(`${origin}/welcome`);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
