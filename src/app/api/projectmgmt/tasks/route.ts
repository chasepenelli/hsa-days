import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyGateAccess } from "@/lib/auth/gate";

export async function GET() {
  if (!(await verifyGateAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();

  // Fetch tasks with attachment counts via raw SQL to avoid N+1
  const { data, error } = await supabase.rpc("get_project_tasks_with_counts");

  if (error) {
    // Fallback to plain query if RPC doesn't exist yet
    const { data: fallback, error: fbErr } = await supabase
      .from("project_tasks")
      .select("*")
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (fbErr) {
      return NextResponse.json({ error: fbErr.message }, { status: 500 });
    }
    return NextResponse.json(
      (fallback || []).map((t: Record<string, unknown>) => ({
        ...t,
        attachment_count: 0,
        has_readme: false,
      }))
    );
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  if (!(await verifyGateAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const { title, description, status, category, priority } = body;

  if (!title) {
    return NextResponse.json({ error: "Title is required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const targetStatus = status || "backlog";

  // Get max sort_order for the target column
  const { data: maxRow } = await supabase
    .from("project_tasks")
    .select("sort_order")
    .eq("status", targetStatus)
    .order("sort_order", { ascending: false })
    .limit(1)
    .single();

  const nextOrder = (maxRow?.sort_order ?? -1) + 1;

  const { data, error } = await supabase
    .from("project_tasks")
    .insert({
      title,
      description: description || null,
      status: targetStatus,
      category: category || "website",
      priority: priority || "medium",
      sort_order: nextOrder,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}
