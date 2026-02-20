import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { CommunityPageClient } from "@/components/community/CommunityPageClient";

export const metadata: Metadata = {
  title: "Community Stories",
  description:
    "Stories from the HSA family. Every dog is different, but the love is the same.",
};

export default async function CommunityPage() {
  const supabase = await createClient();

  const { data: stories } = await supabase
    .from("community_stories")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return <CommunityPageClient stories={stories ?? []} />;
}
