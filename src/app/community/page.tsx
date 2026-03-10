import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CommunityHub } from "@/components/community/CommunityHub";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Talk, share, and lean on families who understand. The HSA Days community.",
};

export default async function CommunityPage() {
  const supabase = await createClient();

  const { data: stories } = await supabase
    .from("community_stories")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  const { data: forumPosts } = await supabase
    .from("forum_posts")
    .select("*, subscribers:subscriber_id(dog_name, avatar_color)")
    .order("is_pinned", { ascending: false })
    .order("last_reply_at", { ascending: false, nullsFirst: false });

  return <CommunityHub stories={stories ?? []} forumPosts={forumPosts ?? []} />;
}
