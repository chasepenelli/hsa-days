import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { verifyGateAccess } from "@/lib/auth/gate";

const BUCKET = "project-attachments";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string; attachmentId: string }> }
) {
  if (!(await verifyGateAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: taskId, attachmentId } = await params;
  const supabase = createAdminClient();

  // Look up the attachment
  const { data: attachment, error: lookupError } = await supabase
    .from("task_attachments")
    .select("id, file_path")
    .eq("id", attachmentId)
    .eq("task_id", taskId)
    .single();

  if (lookupError || !attachment) {
    return NextResponse.json({ error: "Attachment not found" }, { status: 404 });
  }

  // Delete from storage
  await supabase.storage.from(BUCKET).remove([attachment.file_path]);

  // Delete metadata
  const { error: deleteError } = await supabase
    .from("task_attachments")
    .delete()
    .eq("id", attachmentId);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
