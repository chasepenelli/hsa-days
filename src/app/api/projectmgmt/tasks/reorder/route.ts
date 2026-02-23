import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyGateAccess } from "@/lib/auth/gate";

export async function PATCH(request: Request) {
  if (!(await verifyGateAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { updates } = await request.json();

  if (!Array.isArray(updates) || updates.length === 0) {
    return NextResponse.json({ error: "Updates array required" }, { status: 400 });
  }

  const supabase = createAdminClient();
  const now = new Date().toISOString();

  const results = await Promise.all(
    updates.map((u: { id: string; status: string; sort_order: number }) =>
      supabase
        .from("project_tasks")
        .update({ status: u.status, sort_order: u.sort_order, updated_at: now })
        .eq("id", u.id)
    )
  );

  const errors = results.filter((r) => r.error);
  if (errors.length > 0) {
    return NextResponse.json(
      { error: errors.map((e) => e.error?.message).join("; ") },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
