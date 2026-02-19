import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const dayNumber = searchParams.get("day");

  let query = supabase
    .from("journal_entries")
    .select("*")
    .eq("subscriber_id", user.id)
    .order("created_at", { ascending: false });

  if (dayNumber) {
    query = query.eq("day_number", parseInt(dayNumber));
  }

  const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entries: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { day_number, prompt_type, entry_text } = await request.json();

  const { data, error } = await supabase
    .from("journal_entries")
    .upsert(
      {
        subscriber_id: user.id,
        day_number,
        prompt_type: prompt_type || "reflection",
        entry_text,
      },
      { onConflict: "subscriber_id,day_number,prompt_type" }
    )
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data });
}
