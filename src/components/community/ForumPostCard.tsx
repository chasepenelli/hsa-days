"use client";

import Link from "next/link";

export interface ForumPost {
  id: string;
  title: string;
  body: string;
  category:
    | "general"
    | "newly-diagnosed"
    | "treatment"
    | "nutrition"
    | "emotional"
    | "rainbow-bridge";
  is_pinned: boolean;
  is_locked: boolean;
  reply_count: number;
  last_reply_at: string | null;
  created_at: string;
  subscribers: {
    dog_name: string;
    avatar_color: "sage" | "gold" | "terracotta";
  };
}

interface ForumPostCardProps {
  id: string;
  title: string;
  body: string;
  category: ForumPost["category"];
  dogName: string;
  avatarColor: "sage" | "gold" | "terracotta";
  replyCount: number;
  lastReplyAt: string | null;
  createdAt: string;
  isPinned: boolean;
}

const CATEGORY_COLORS: Record<ForumPost["category"], string> = {
  general: "var(--sage)",
  "newly-diagnosed": "var(--terracotta)",
  treatment: "var(--gold)",
  nutrition: "var(--sage)",
  emotional: "var(--terracotta)",
  "rainbow-bridge": "var(--sage)",
};

const CATEGORY_LABELS: Record<ForumPost["category"], string> = {
  general: "General",
  "newly-diagnosed": "Newly Diagnosed",
  treatment: "Treatment",
  nutrition: "Nutrition",
  emotional: "Emotional",
  "rainbow-bridge": "Rainbow Bridge",
};

const AVATAR_COLORS: Record<string, string> = {
  sage: "var(--sage)",
  gold: "var(--gold)",
  terracotta: "var(--terracotta)",
};

export function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = now - then;

  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;

  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

export function ForumPostCard({
  id,
  title,
  body,
  category,
  dogName,
  avatarColor,
  replyCount,
  lastReplyAt,
  createdAt,
  isPinned,
}: ForumPostCardProps) {
  const preview =
    body.length > 120 ? body.slice(0, 120).trimEnd() + "\u2026" : body;
  const timeAgo = relativeTime(lastReplyAt || createdAt);
  const initial = dogName.charAt(0).toUpperCase();

  return (
    <Link
      href={`/community/forum/${id}`}
      className="block rounded-xl transition-all duration-200 hover:-translate-y-0.5 no-underline"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.03)";
      }}
    >
      <div className="p-5">
        {/* Pinned indicator */}
        {isPinned && (
          <div
            className="flex items-center gap-1.5 mb-2 text-xs font-semibold"
            style={{ color: "var(--gold)" }}
          >
            <svg
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="shrink-0"
            >
              <path d="M16 12V4h1V2H7v2h1v8l-2 2v2h5.2v6h1.6v-6H18v-2l-2-2z" />
            </svg>
            Pinned
          </div>
        )}

        {/* Category pill */}
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-2.5"
          style={{
            background: CATEGORY_COLORS[category],
            color: "white",
            opacity: 0.9,
          }}
        >
          {CATEGORY_LABELS[category]}
        </span>

        {/* Title */}
        <h3
          className="font-serif font-semibold text-lg mb-1.5 leading-snug"
          style={{ color: "var(--text)" }}
        >
          {title}
        </h3>

        {/* Body preview */}
        <p
          className="text-sm leading-relaxed mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {preview}
        </p>

        {/* Bottom row */}
        <div className="flex items-center gap-2.5 text-xs" style={{ color: "var(--text-muted)" }}>
          {/* Avatar circle */}
          <div
            className="flex items-center justify-center rounded-full text-white font-semibold shrink-0"
            style={{
              width: 32,
              height: 32,
              background: AVATAR_COLORS[avatarColor] || "var(--sage)",
              fontSize: "0.8rem",
            }}
          >
            {initial}
          </div>
          <span className="font-medium" style={{ color: "var(--text)" }}>
            {dogName}&apos;s family
          </span>
          <span style={{ opacity: 0.5 }}>&middot;</span>
          <span>
            {replyCount} {replyCount === 1 ? "reply" : "replies"}
          </span>
          <span style={{ opacity: 0.5 }}>&middot;</span>
          <span>{timeAgo}</span>
        </div>
      </div>
    </Link>
  );
}
