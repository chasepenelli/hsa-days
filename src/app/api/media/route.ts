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

  if (!dayNumber) {
    return NextResponse.json(
      { error: "day parameter required" },
      { status: 400 }
    );
  }

  const { data: media, error } = await supabase
    .from("day_media")
    .select("*")
    .eq("subscriber_id", user.id)
    .eq("day_number", parseInt(dayNumber))
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Generate signed URLs for each media item
  const mediaWithUrls = await Promise.all(
    (media || []).map(async (item) => {
      const { data } = await supabase.storage
        .from("day-memories")
        .createSignedUrl(item.file_path, 3600); // 1 hour

      return {
        ...item,
        url: data?.signedUrl || null,
      };
    })
  );

  return NextResponse.json({ media: mediaWithUrls });
}

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { day_number, file_path, file_type, file_name, file_size } =
    await request.json();

  if (!day_number || !file_path || !file_type || !file_name) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("day_media")
    .insert({
      subscriber_id: user.id,
      day_number,
      file_path,
      file_type,
      file_name,
      file_size,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Return the record with a signed URL
  const { data: urlData } = await supabase.storage
    .from("day-memories")
    .createSignedUrl(file_path, 3600);

  return NextResponse.json({
    media: { ...data, url: urlData?.signedUrl || null },
  });
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const mediaId = searchParams.get("id");

  if (!mediaId) {
    return NextResponse.json(
      { error: "id parameter required" },
      { status: 400 }
    );
  }

  // Fetch the record first to get the file path
  const { data: record, error: fetchError } = await supabase
    .from("day_media")
    .select("file_path")
    .eq("id", mediaId)
    .eq("subscriber_id", user.id)
    .single();

  if (fetchError || !record) {
    return NextResponse.json({ error: "Media not found" }, { status: 404 });
  }

  // Delete from storage
  await supabase.storage.from("day-memories").remove([record.file_path]);

  // Delete the record
  const { error: deleteError } = await supabase
    .from("day_media")
    .delete()
    .eq("id", mediaId)
    .eq("subscriber_id", user.id);

  if (deleteError) {
    return NextResponse.json({ error: deleteError.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
