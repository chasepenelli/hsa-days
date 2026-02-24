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

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: attachments, error } = await supabase
    .from("task_attachments")
    .select("*")
    .eq("task_id", id)
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Generate signed URLs for each attachment
  const withUrls = await Promise.all(
    (attachments || []).map(async (att) => {
      const { data: signed } = await supabase.storage
        .from(BUCKET)
        .createSignedUrl(att.file_path, 3600);
      return { ...att, url: signed?.signedUrl || null };
    })
  );

  return NextResponse.json(withUrls);
}

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyGateAccess())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: taskId } = await params;
  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const kind = (formData.get("kind") as string) || "attachment";

  if (!file) {
    return NextResponse.json({ error: "File is required" }, { status: 400 });
  }

  if (!["attachment", "readme"].includes(kind)) {
    return NextResponse.json({ error: "Invalid kind" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // If uploading a readme, delete any existing one first
  if (kind === "readme") {
    const { data: existing } = await supabase
      .from("task_attachments")
      .select("id, file_path")
      .eq("task_id", taskId)
      .eq("kind", "readme")
      .single();

    if (existing) {
      await supabase.storage.from(BUCKET).remove([existing.file_path]);
      await supabase.from("task_attachments").delete().eq("id", existing.id);
    }
  }

  // Upload file to storage
  const ext = file.name.split(".").pop() || "bin";
  const timestamp = Date.now();
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
  const filePath = `${taskId}/${timestamp}-${safeName}`;

  const arrayBuffer = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, arrayBuffer, {
      contentType: file.type,
      upsert: false,
    });

  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }

  // Save metadata
  const { data: record, error: insertError } = await supabase
    .from("task_attachments")
    .insert({
      task_id: taskId,
      kind,
      file_path: filePath,
      file_name: file.name,
      file_type: file.type,
      file_size: file.size,
    })
    .select()
    .single();

  if (insertError) {
    // Clean up uploaded file on metadata failure
    await supabase.storage.from(BUCKET).remove([filePath]);
    return NextResponse.json({ error: insertError.message }, { status: 500 });
  }

  // Return with signed URL
  const { data: signed } = await supabase.storage
    .from(BUCKET)
    .createSignedUrl(filePath, 3600);

  return NextResponse.json(
    { ...record, url: signed?.signedUrl || null },
    { status: 201 }
  );
}
