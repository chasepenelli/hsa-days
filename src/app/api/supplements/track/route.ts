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
    .from("subscriber_supplements")
    .select("supplement_slug, started_at")
    .eq("subscriber_id", user.id)
    .is("stopped_at", null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ supplements: data });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { supplement_slug, action } = await request.json();

  if (!supplement_slug || !["start", "stop"].includes(action)) {
    return NextResponse.json(
      { error: "Invalid request. Requires supplement_slug and action (start|stop)." },
      { status: 400 }
    );
  }

  let record;
  let error;

  if (action === "start") {
    const result = await supabase
      .from("subscriber_supplements")
      .upsert(
        {
          subscriber_id: user.id,
          supplement_slug,
          started_at: new Date().toISOString(),
          stopped_at: null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "subscriber_id,supplement_slug" }
      )
      .select()
      .single();
    record = result.data;
    error = result.error;
  } else {
    const result = await supabase
      .from("subscriber_supplements")
      .update({
        stopped_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("subscriber_id", user.id)
      .eq("supplement_slug", supplement_slug)
      .is("stopped_at", null)
      .select()
      .single();
    record = result.data;
    error = result.error;
  }

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Fetch updated aggregate count for this slug
  const { data: counts } = await supabase.rpc("get_supplement_usage_counts");
  const slugCount =
    counts?.find((c: { supplement_slug: string }) => c.supplement_slug === supplement_slug)
      ?.active_count ?? 0;

  return NextResponse.json({ record, count: slugCount });
}
