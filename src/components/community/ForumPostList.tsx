"use client";

import { useState } from "react";
import { ForumPostCard, type ForumPost } from "./ForumPostCard";

interface ForumPostListProps {
  posts: ForumPost[];
}

type CategoryFilter = "all" | ForumPost["category"];

const FILTERS: { key: CategoryFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "general", label: "General" },
  { key: "newly-diagnosed", label: "Newly Diagnosed" },
  { key: "treatment", label: "Treatment" },
  { key: "nutrition", label: "Nutrition" },
  { key: "emotional", label: "Emotional" },
  { key: "rainbow-bridge", label: "Rainbow Bridge" },
];

export function ForumPostList({ posts }: ForumPostListProps) {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filtered = posts.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  // Pinned posts always first, then sort by last_reply_at DESC
  const sorted = [...filtered].sort((a, b) => {
    if (a.is_pinned && !b.is_pinned) return -1;
    if (!a.is_pinned && b.is_pinned) return 1;
    const aTime = new Date(a.last_reply_at || a.created_at).getTime();
    const bTime = new Date(b.last_reply_at || b.created_at).getTime();
    return bTime - aTime;
  });

  return (
    <div>
      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {FILTERS.map((f) => {
          const isActive = filter === f.key;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className="px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer"
              style={{
                background: isActive ? "var(--sage)" : "transparent",
                color: isActive ? "white" : "var(--text-muted)",
                border: isActive ? "1px solid var(--sage)" : "1px solid var(--border)",
              }}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Post list */}
      {sorted.length === 0 ? (
        <div
          className="rounded-xl p-10 text-center"
          style={{
            background: "white",
            border: "1px solid var(--border)",
          }}
        >
          <p
            className="text-[0.95rem] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            No posts yet in this category. Be the first to start a conversation.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {sorted.map((post) => (
            <ForumPostCard
              key={post.id}
              id={post.id}
              title={post.title}
              body={post.body}
              category={post.category}
              dogName={post.subscribers.dog_name}
              avatarColor={post.subscribers.avatar_color}
              replyCount={post.reply_count}
              lastReplyAt={post.last_reply_at}
              createdAt={post.created_at}
              isPinned={post.is_pinned}
            />
          ))}
        </div>
      )}
    </div>
  );
}
