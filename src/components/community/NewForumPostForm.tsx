"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useUser } from "@/hooks/useUser";
import { createClient } from "@/lib/supabase/client";
import type { ForumPost } from "./ForumPostCard";

type Category = ForumPost["category"];

const CATEGORIES: { key: Category; label: string }[] = [
  { key: "general", label: "General" },
  { key: "newly-diagnosed", label: "Newly Diagnosed" },
  { key: "treatment", label: "Treatment" },
  { key: "nutrition", label: "Nutrition" },
  { key: "emotional", label: "Emotional" },
  { key: "rainbow-bridge", label: "Rainbow Bridge" },
];

const CATEGORY_COLORS: Record<Category, string> = {
  general: "var(--sage)",
  "newly-diagnosed": "var(--terracotta)",
  treatment: "var(--gold)",
  nutrition: "var(--sage)",
  emotional: "var(--terracotta)",
  "rainbow-bridge": "var(--sage)",
};

export function NewForumPostForm() {
  const router = useRouter();
  const { isAuthenticated, subscriber, isLoading } = useUser();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<Category>("general");
  const [body, setBody] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !body.trim() || !subscriber) return;

    setSubmitting(true);
    setError(null);

    try {
      const supabase = createClient();
      const { data, error: insertError } = await supabase
        .from("forum_posts")
        .insert({
          subscriber_id: subscriber.id,
          title: title.trim(),
          body: body.trim(),
          category,
        })
        .select("id")
        .single();

      if (insertError) throw insertError;

      if (data) {
        router.push(`/community/forum/${data.id}`);
      }
    } catch (err) {
      console.error("Failed to create post:", err);
      setError("Something went wrong. Please try again.");
      setSubmitting(false);
    }
  }

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-sm" style={{ color: "var(--text-muted)" }}>
          Loading...
        </p>
      </div>
    );
  }

  if (!isAuthenticated || !subscriber) {
    return (
      <div
        className="rounded-xl p-10 text-center"
        style={{
          background: "white",
          border: "1px solid var(--border)",
        }}
      >
        <h2
          className="font-serif text-xl font-semibold mb-3"
          style={{ color: "var(--text)" }}
        >
          Sign in to start a thread
        </h2>
        <p
          className="text-[0.95rem] mb-5"
          style={{ color: "var(--text-muted)" }}
        >
          Join the community to share questions, advice, and support.
        </p>
        <Link
          href="/login"
          className="inline-block px-6 py-3 rounded-lg text-sm font-semibold text-white no-underline transition-opacity hover:opacity-90"
          style={{ background: "var(--sage)" }}
        >
          Sign In
        </Link>
      </div>
    );
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

      <div
        className="rounded-xl p-6 sm:p-8"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        }}
      >
        <h1
          className="font-serif text-2xl font-semibold mb-6"
          style={{ color: "var(--text)" }}
        >
          Start a Thread
        </h1>

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-5">
            <label
              htmlFor="post-title"
              className="block text-sm font-semibold mb-2"
              style={{ color: "var(--text)" }}
            >
              Title
            </label>
            <input
              id="post-title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="What would you like to discuss?"
              maxLength={200}
              className="w-full rounded-lg px-4 py-3 text-[0.95rem] transition-colors"
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
              disabled={submitting}
            />
          </div>

          {/* Category pills */}
          <div className="mb-5">
            <label
              className="block text-sm font-semibold mb-2"
              style={{ color: "var(--text)" }}
            >
              Category
            </label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const isActive = category === c.key;
                return (
                  <button
                    key={c.key}
                    type="button"
                    onClick={() => setCategory(c.key)}
                    className="px-3.5 py-2.5 rounded-full text-sm font-medium transition-colors duration-150 cursor-pointer"
                    style={{
                      background: isActive ? CATEGORY_COLORS[c.key] : "transparent",
                      color: isActive ? "white" : "var(--text-muted)",
                      border: isActive
                        ? `1px solid ${CATEGORY_COLORS[c.key]}`
                        : "1px solid var(--border)",
                    }}
                    disabled={submitting}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Body */}
          <div className="mb-5">
            <label
              htmlFor="post-body"
              className="block text-sm font-semibold mb-2"
              style={{ color: "var(--text)" }}
            >
              Your message
            </label>
            <textarea
              id="post-body"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Share your thoughts, questions, or experiences..."
              rows={8}
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
              disabled={submitting}
            />
          </div>

          {error && (
            <p className="text-sm mb-4" style={{ color: "var(--terracotta)" }}>
              {error}
            </p>
          )}

          <div className="flex items-center justify-end gap-3">
            <Link
              href="/community"
              className="px-5 py-3 rounded-lg text-sm font-medium no-underline transition-opacity hover:opacity-80"
              style={{ color: "var(--text-muted)" }}
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={!title.trim() || !body.trim() || submitting}
              className="px-6 py-3 rounded-lg text-sm font-semibold text-white transition-opacity disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
              style={{ background: "var(--sage)" }}
            >
              {submitting ? "Posting..." : "Post Thread"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
