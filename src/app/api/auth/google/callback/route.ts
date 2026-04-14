import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");
  const origin = new URL(request.url).origin;

  if (error || !code) {
    return NextResponse.redirect(`${origin}/login?error=google`);
  }

  const redirectUri = `${process.env.NEXT_PUBLIC_SITE_URL || origin}/api/auth/google/callback`;

  try {
    // Exchange the authorization code for tokens
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenRes.ok) {
      console.error("Google token exchange failed:", await tokenRes.text());
      return NextResponse.redirect(`${origin}/login?error=google`);
    }

    const tokens = await tokenRes.json();
    const idToken = tokens.id_token;

    if (!idToken) {
      console.error("No id_token in Google response");
      return NextResponse.redirect(`${origin}/login?error=google`);
    }

    // Sign in to Supabase using the Google ID token
    const supabase = await createClient();
    const { data: authData, error: signInError } =
      await supabase.auth.signInWithIdToken({
        provider: "google",
        token: idToken,
        access_token: tokens.access_token,
      });

    if (signInError || !authData.user) {
      console.error("Supabase signInWithIdToken failed:", signInError?.message);
      return NextResponse.redirect(`${origin}/login?error=auth`);
    }

    const user = authData.user;

    // Check if subscriber exists
    const { data: existing } = await supabase
      .from("subscribers")
      .select("id, onboarding_completed")
      .eq("id", user.id)
      .single();

    // Extract name from Google profile
    const fullName =
      user.user_metadata?.full_name ??
      user.user_metadata?.name ??
      null;

    if (!existing) {
      // New user — create subscriber record
      const { error: upsertError } = await supabase
        .from("subscribers")
        .upsert(
          {
            id: user.id,
            email: user.email!,
            name: fullName,
            signup_source: "google",
            has_digital_access: true,
          },
          { onConflict: "id" }
        );

      if (upsertError) {
        console.error("Failed to create subscriber:", upsertError.message);
      }

      return NextResponse.redirect(`${origin}/welcome`);
    }

    // Existing user — update name if missing
    if (fullName && !existing.onboarding_completed) {
      await supabase
        .from("subscribers")
        .update({ name: fullName })
        .eq("id", user.id);
    }

    if (!existing.onboarding_completed) {
      return NextResponse.redirect(`${origin}/welcome`);
    }

    return NextResponse.redirect(`${origin}/resources`);
  } catch (err) {
    console.error("Google OAuth error:", err);
    return NextResponse.redirect(`${origin}/login?error=google`);
  }
}
