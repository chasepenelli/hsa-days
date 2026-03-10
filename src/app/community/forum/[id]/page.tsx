import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ForumThread } from "@/components/community/ForumThread";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post } = await supabase
    .from("forum_posts")
    .select("title")
    .eq("id", id)
    .single();

  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: `Community forum discussion: ${post.title}`,
  };
}

export default async function ForumThreadPage({ params }: PageProps) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: post, error: postError } = await supabase
    .from("forum_posts")
    .select("*, subscribers:subscriber_id(dog_name, avatar_color)")
    .eq("id", id)
    .single();

  if (postError || !post) {
    notFound();
  }

  const { data: replies } = await supabase
    .from("forum_replies")
    .select("id, body, created_at, subscribers:subscriber_id(dog_name, avatar_color)")
    .eq("post_id", id)
    .eq("is_deleted", false)
    .order("created_at", { ascending: true });

  const postWithReplies = {
    ...post,
    replies: replies ?? [],
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--cream)" }}
    >
      <div
        className="max-w-[800px] mx-auto px-6"
        style={{
          paddingTop: "clamp(96px, 12vw, 140px)",
          paddingBottom: "clamp(48px, 6vw, 80px)",
        }}
      >
        {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
        <ForumThread post={postWithReplies as any} />
      </div>
    </div>
  );
}
