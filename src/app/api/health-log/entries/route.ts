import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = parseInt(
    request.nextUrl.searchParams.get("limit") || "50",
    10
  );
  const offset = parseInt(
    request.nextUrl.searchParams.get("offset") || "0",
    10
  );

  const { data, error } = await supabase
    .from("health_log_entries")
    .select("*")
    .eq("subscriber_id", user.id)
    .order("logged_at", { ascending: false })
    .range(offset, offset + limit - 1);

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

  const { entry_type, title, notes, metadata, logged_at } =
    await request.json();

  if (!entry_type || !title) {
    return NextResponse.json(
      { error: "entry_type and title are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("health_log_entries")
    .insert({
      subscriber_id: user.id,
      entry_type,
      title,
      notes: notes || null,
      metadata: metadata || {},
      logged_at: logged_at || new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ entry: data });
}

export async function DELETE(request: NextRequest) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const { error } = await supabase
    .from("health_log_entries")
    .delete()
    .eq("id", id)
    .eq("subscriber_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
