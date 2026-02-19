import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Check admin status
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("is_admin")
    .eq("id", user.id)
    .single();

  if (!subscriber?.is_admin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { story_id, action } = await request.json();

  if (!story_id || !["approve", "reject"].includes(action)) {
    return NextResponse.json(
      { error: "story_id and action ('approve' or 'reject') are required" },
      { status: 400 }
    );
  }

  if (action === "approve") {
    // Approve the story
    const { error } = await supabase
      .from("community_stories")
      .update({ is_approved: true })
      .eq("id", story_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  } else {
    // Reject = delete the story
    const { error } = await supabase
      .from("community_stories")
      .delete()
      .eq("id", story_id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }

  return NextResponse.json({ success: true });
}
