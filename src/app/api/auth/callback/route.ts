import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/resources";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: existing } = await supabase
          .from("subscribers")
          .select("id, onboarding_completed")
          .eq("id", user.id)
          .single();

        // Detect signup source from provider
        const provider =
          user.app_metadata?.provider ?? "magic_link";
        const signupSource =
          provider === "google"
            ? "google"
            : provider === "facebook"
              ? "facebook"
              : provider === "apple"
                ? "apple"
                : "magic_link";

        // Extract name from OAuth metadata
        const fullName =
          user.user_metadata?.full_name ??
          user.user_metadata?.name ??
          null;

        if (!existing) {
          const { error: upsertError } = await supabase
            .from("subscribers")
            .upsert(
              {
                id: user.id,
                email: user.email!,
                name: fullName,
                signup_source: signupSource,
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

          return NextResponse.redirect(`${origin}/welcome`);
        }

        // Existing user — update name if we got one from OAuth and they don't have one
        if (fullName && !existing.onboarding_completed) {
          await supabase
            .from("subscribers")
            .update({ name: fullName })
            .eq("id", user.id);
        }

        if (!existing.onboarding_completed) {
          return NextResponse.redirect(`${origin}/welcome`);
        }
      }

      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=auth`);
}
