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

  const { data, error } = await supabase
    .from("weight_logs")
    .select("*")
    .eq("subscriber_id", user.id)
    .order("logged_at", { ascending: false })
    .limit(30);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ weights: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { weight_lbs, notes } = await request.json();

  if (!weight_lbs || weight_lbs <= 0) {
    return NextResponse.json(
      { error: "Valid weight_lbs is required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("weight_logs")
    .insert({
      subscriber_id: user.id,
      weight_lbs,
      notes: notes || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Also update the subscriber's weight for personalization
  await supabase
    .from("subscribers")
    .update({ weight_lbs })
    .eq("id", user.id);

  // Create a timeline entry
  await supabase.from("health_log_entries").insert({
    subscriber_id: user.id,
    entry_type: "weight",
    title: `Weight: ${weight_lbs} lbs`,
    metadata: { weight_lbs },
  });

  return NextResponse.json({ weight: data });
}
