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

  const { data: channels } = await supabase
    .from("community_channels")
    .select("id, slug, name, description, icon_path, sort_order, color")
    .order("sort_order", { ascending: true });

  const { data: stories } = await supabase
    .from("community_stories")
    .select("*")
    .eq("is_approved", true)
    .order("created_at", { ascending: false });

  return <CommunityHub stories={stories ?? []} channels={channels ?? []} />;
}
