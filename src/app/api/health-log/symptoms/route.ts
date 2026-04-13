import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const thirtyDaysAgo = new Date(
    Date.now() - 30 * 24 * 60 * 60 * 1000
  ).toISOString();

  const { data, error } = await supabase
    .from("symptom_logs")
    .select("*")
    .eq("subscriber_id", user.id)
    .gte("logged_at", thirtyDaysAgo)
    .order("logged_at", { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ logs: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { energy, appetite, gum_color, mobility, comfort, notes } =
    await request.json();

  const { data: log, error } = await supabase
    .from("symptom_logs")
    .insert({
      subscriber_id: user.id,
      energy: energy ?? null,
      appetite: appetite ?? null,
      gum_color: gum_color ?? null,
      mobility: mobility ?? null,
      comfort: comfort ?? null,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also create a timeline entry for the check-in
  await supabase.from("health_log_entries").insert({
    subscriber_id: user.id,
    entry_type: "symptom_checkin",
    title: "Daily check-in",
    metadata: { symptom_log_id: log.id },
  });

  // Return the last 7 logs for sparkline rendering
  const { data: recent } = await supabase
    .from("symptom_logs")
    .select("*")
    .eq("subscriber_id", user.id)
    .order("logged_at", { ascending: false })
    .limit(7);

  return NextResponse.json({ log, recent: recent ?? [] });
}
