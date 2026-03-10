"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import { relativeTime, type ForumPost } from "./ForumPostCard";

interface Reply {
  id: string;
  body: string;
  created_at: string;
  subscribers: {
    dog_name: string;
    avatar_color: "sage" | "gold" | "terracotta";
  };
}

export interface ForumPostWithReplies extends ForumPost {
  replies: Reply[];
}

interface ForumThreadProps {
  post: ForumPostWithReplies;
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

function AvatarCircle({
  dogName,
  avatarColor,
  size = 36,
}: {
  dogName: string;
  avatarColor: string;
  size?: number;
}) {
  return (
    <div
      className="flex items-center justify-center rounded-full text-white font-semibold shrink-0"
      style={{
        width: size,
        height: size,
        background: AVATAR_COLORS[avatarColor] || "var(--sage)",
        fontSize: size < 36 ? "0.75rem" : "0.85rem",
      }}
    >
      {dogName.charAt(0).toUpperCase()}
    </div>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

export function ForumThread({ post }: ForumThreadProps) {
  const { isAuthenticated, subscriber, isLoading } = useUser();
  const [replies, setReplies] = useState<Reply[]>(post.replies);
  const [replyBody, setReplyBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  async function handleSubmitReply(e: React.FormEvent) {
    e.preventDefault();
    if (!replyBody.trim() || !subscriber) return;

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from("forum_replies")
        .insert({
          post_id: post.id,
          subscriber_id: subscriber.id,
          body: replyBody.trim(),
        })
        .select("id, body, created_at, subscribers:subscriber_id(dog_name, avatar_color)")
        .single();

      if (insertError) throw insertError;

      // Also update reply_count and last_reply_at on the post
      await supabase
        .from("forum_posts")
        .update({
          reply_count: replies.length + 1,
          last_reply_at: new Date().toISOString(),
        })
        .eq("id", post.id);

      if (data) {
        // Normalize the joined subscriber data
        const newReply: Reply = {
          id: data.id,
          body: data.body,
          created_at: data.created_at,
          subscribers: data.subscribers as unknown as Reply["subscribers"],
        };
        setReplies((prev) => [...prev, newReply]);
      }

      setReplyBody("");
    } catch (err) {
      console.error("Failed to submit reply:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div>
      {/* Back link */}
      <Link
        href="/community"
        className="inline-flex items-center gap-1.5 text-sm font-medium mb-6 no-underline transition-colors hover:opacity-80"
        style={{ color: "var(--sage)" }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Forum
      </Link>

      {/* Post card */}
      <div
        className="rounded-xl p-6 sm:p-8 mb-8"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        }}
      >
        {/* Category pill */}
        <span
          className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-4"
          style={{
            background: CATEGORY_COLORS[post.category],
            color: "white",
            opacity: 0.9,
          }}
        >
          {CATEGORY_LABELS[post.category]}
        </span>

        {/* Title */}
        <h1
          className="font-serif text-2xl font-semibold mb-4 leading-snug"
          style={{ color: "var(--text)" }}
        >
          {post.title}
        </h1>

        {/* Author info */}
        <div className="flex items-center gap-3 mb-6">
          <AvatarCircle
            dogName={post.subscribers.dog_name}
            avatarColor={post.subscribers.avatar_color}
          />
          <div className="text-sm" style={{ color: "var(--text-muted)" }}>
            <span className="font-medium" style={{ color: "var(--text)" }}>
              {post.subscribers.dog_name}&apos;s family
            </span>
            <span className="mx-1.5" style={{ opacity: 0.4 }}>&middot;</span>
            <span>{formatDate(post.created_at)}</span>
          </div>
        </div>

        {/* Post body */}
        <div
          className="text-[1rem] leading-relaxed whitespace-pre-wrap"
          style={{ color: "var(--text)" }}
        >
          {post.body}
        </div>
      </div>

      {/* Gold ornamental divider */}
      <div className="flex items-center justify-center gap-3 mb-8">
        <div
          className="h-px flex-1 max-w-[80px]"
          style={{
            background: "linear-gradient(to right, transparent, var(--gold))",
            opacity: 0.5,
          }}
        />
        <Image
          src="/illustrations/icons/icon-flower-ornament.png"
          alt=""
          width={14}
          height={14}
          style={{ objectFit: "contain", opacity: 0.55 }}
        />
        <div
          className="h-px flex-1 max-w-[80px]"
          style={{
            background: "linear-gradient(to left, transparent, var(--gold))",
            opacity: 0.5,
          }}
        />
      </div>

      {/* Replies heading */}
      <h2
        className="font-serif text-lg font-semibold mb-5"
        style={{ color: "var(--text)" }}
      >
        {replies.length} {replies.length === 1 ? "reply" : "replies"}
      </h2>

      {/* Replies list */}
      {replies.length > 0 && (
        <div
          className="rounded-xl overflow-hidden mb-8"
          style={{
            background: "white",
            border: "1px solid var(--border)",
          }}
        >
          {replies.map((reply, i) => (
            <div
              key={reply.id}
              className="p-5 sm:p-6"
              style={{
                borderTop: i > 0 ? "1px solid var(--border)" : undefined,
              }}
            >
              <div className="flex items-center gap-2.5 mb-3">
                <AvatarCircle
                  dogName={reply.subscribers.dog_name}
                  avatarColor={reply.subscribers.avatar_color}
                  size={30}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text)" }}
                >
                  {reply.subscribers.dog_name}&apos;s family
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--text-muted)", opacity: 0.7 }}
                >
                  {relativeTime(reply.created_at)}
                </span>
              </div>
              <div
                className="text-[0.95rem] leading-relaxed whitespace-pre-wrap pl-[42px]"
                style={{ color: "var(--text)" }}
              >
                {reply.body}
              </div>
            </div>
          ))}
        </div>
      )}

      {replies.length === 0 && (
        <div
          className="rounded-xl p-8 text-center mb-8"
          style={{
            background: "white",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-sm" style={{ color: "var(--text-muted)" }}>
            No replies yet. Be the first to respond.
          </p>
        </div>
      )}

      {/* Reply form or auth gate */}
      {!isLoading && (
        <>
          {isAuthenticated && subscriber ? (
            <div
              className="rounded-xl p-5 sm:p-6"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="font-serif text-base font-semibold mb-3"
                style={{ color: "var(--text)" }}
              >
                Reply as {subscriber.dog_name}&apos;s family
              </h3>
              <form onSubmit={handleSubmitReply}>
                <textarea
                  ref={textareaRef}
                  value={replyBody}
                  onChange={(e) => setReplyBody(e.target.value)}
                  placeholder="Share your thoughts, advice, or support..."
                  rows={4}
                  className="w-full rounded-lg px-4 py-3 text-[0.95rem] leading-relaxed resize-y transition-colors"
                  style={{
                    border: "1px solid var(--border)",
                    background: "var(--warm-white)",
                    color: "var(--text)",
                    outline: "none",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "var(--sage)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                  }}
                  disabled={submitting || post.is_locked}
                />
                {post.is_locked && (
                  <p className="text-sm mt-2" style={{ color: "var(--text-muted)" }}>
                    This thread has been locked.
                  </p>
                )}
                {error && (
                  <p className="text-sm mt-2" style={{ color: "var(--terracotta)" }}>
                    {error}
                  </p>
                )}
                <div className="flex justify-end mt-3">
                  <button
                    type="submit"
                    disabled={!replyBody.trim() || submitting || post.is_locked}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
                    style={{ background: "var(--sage)" }}
                  >
                    {submitting ? "Posting..." : "Post Reply"}
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              className="rounded-xl p-6 text-center"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <p
                className="text-[0.95rem] mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                Sign in to join the conversation.
              </p>
              <Link
                href="/login"
                className="inline-block px-5 py-2.5 rounded-lg text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
                style={{ background: "var(--sage)" }}
              >
                Sign In
              </Link>
            </div>
          )}
        </>
      )}
    </div>
  );
}
