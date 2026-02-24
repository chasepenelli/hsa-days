import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyGateAccess } from "@/lib/auth/gate";

const BUCKET = "project-attachments";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyGateAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: taskId } = await params;
  const supabase = createAdminClient();

  // Find the readme attachment
  const { data: readme } = await supabase
    .from("task_attachments")
    .select("file_path, file_name")
    .eq("task_id", taskId)
    .eq("kind", "readme")
    .single();

  if (!readme) {
    return NextResponse.json({ content: null });
  }

  // Download file content
  const { data: blob, error } = await supabase.storage
    .from(BUCKET)
    .download(readme.file_path);

  if (error || !blob) {
    return NextResponse.json({ content: null });
  }

  const content = await blob.text();
  return NextResponse.json({ content, file_name: readme.file_name });
}
