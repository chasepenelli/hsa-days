import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ChatRoom } from "@/components/community/ChatRoom";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: channel } = await supabase
    .from("community_channels")
    .select("name")
    .eq("slug", slug)
    .single();

  return {
    title: channel ? `${channel.name} — Community` : "Chat — Community",
  };
}

export default async function ChatRoomPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: channel, error } = await supabase
    .from("community_channels")
    .select("id, slug, name, description, color")
    .eq("slug", slug)
    .single();

  if (error || !channel) {
    notFound();
  }

  return <ChatRoom channel={channel} />;
}
