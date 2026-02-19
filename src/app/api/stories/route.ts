import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { dog_name, dog_breed, story_text } = await request.json();

  if (!dog_name || !story_text) {
    return NextResponse.json(
      { error: "Dog name and story are required" },
      { status: 400 }
    );
  }

  const { data, error } = await supabase
    .from("community_stories")
    .insert({
      subscriber_id: user.id,
      dog_name,
      dog_breed,
      story_text,
      is_approved: false,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ story: data });
}
