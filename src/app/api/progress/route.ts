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
    .from("user_day_progress")
    .select("*")
    .eq("subscriber_id", user.id)
    .order("day_number", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ progress: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { day_number, completed } = await request.json();

  if (completed) {
    const { data, error } = await supabase
      .from("user_day_progress")
      .upsert(
        {
          subscriber_id: user.id,
          day_number,
          completed_at: new Date().toISOString(),
        },
        { onConflict: "subscriber_id,day_number" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // Update current_day on subscriber
    await supabase
      .from("subscribers")
      .update({ current_day: day_number, updated_at: new Date().toISOString() })
      .eq("id", user.id);

    return NextResponse.json({ progress: data });
  } else {
    // Mark day as started (but not completed)
    const { data, error } = await supabase
      .from("user_day_progress")
      .upsert(
        {
          subscriber_id: user.id,
          day_number,
        },
        { onConflict: "subscriber_id,day_number" }
      )
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ progress: data });
  }
}
