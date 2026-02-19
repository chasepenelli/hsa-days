import type { Metadata } from "next";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[1100px] mx-auto">
        <div className="flex justify-between items-start flex-wrap gap-4 mb-10">
          <div>
            <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
              Community
            </div>
            <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
              Stories from the HSA family.
            </h1>
            <p className="text-[1.05rem] text-text-muted max-w-[600px] leading-relaxed">
              Every dog is different. Every journey is different. But the love
              &mdash; that&apos;s the same.
            </p>
          </div>
          <Link
            href="/community/share"
            className="px-6 py-3 bg-sage text-white rounded-xl font-semibold text-sm no-underline hover:bg-sage-dark transition-colors"
          >
            Share Your Story
          </Link>
        </div>

        {stories && stories.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stories.map((story) => (
              <div
                key={story.id}
                className="bg-white rounded-2xl p-8 border border-border"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sage-light to-gold-light mb-4 flex items-center justify-center text-[1.3rem]">
                  {"\uD83D\uDC3E"}
                </div>
                <blockquote className="text-[0.95rem] text-text-muted leading-relaxed italic mb-4">
                  &ldquo;{story.story_text}&rdquo;
                </blockquote>
                <div className="font-semibold text-[0.9rem] text-text">
                  {story.dog_name}
                </div>
                {story.dog_breed && (
                  <div className="text-[0.8rem] text-text-muted">
                    {story.dog_breed}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-cream rounded-2xl p-12 text-center">
            <div className="text-4xl mb-4">{"\uD83D\uDC3E"}</div>
            <h2 className="font-serif text-xl font-semibold mb-2">
              Be the first to share
            </h2>
            <p className="text-text-muted mb-6">
              Your story could help another family going through this right now.
            </p>
            <Link
              href="/community/share"
              className="inline-block px-6 py-3 bg-sage text-white rounded-xl font-semibold text-sm no-underline hover:bg-sage-dark transition-colors"
            >
              Share Your Story
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
