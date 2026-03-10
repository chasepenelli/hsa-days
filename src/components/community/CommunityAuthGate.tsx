"use client";

import Link from "next/link";

export function CommunityAuthGate() {
  return (
    <div
      className="rounded-2xl p-6 text-center"
      style={{
        background: "rgba(245, 240, 234, 0.6)",
        border: "1px solid var(--border)",
      }}
    >
      {/* Paw print icon (inline SVG) */}
      <div className="flex justify-center mb-3">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          style={{ color: "var(--sage)", opacity: 0.6 }}
        >
          <path
            d="M12 18.5c-2.5 0-5-1.5-5-4 0-1.5 1.2-3 2.5-4.2C10.8 9.1 11.5 8 12 7c.5 1 1.2 2.1 2.5 3.3C15.8 11.5 17 13 17 14.5c0 2.5-2.5 4-5 4z"
            fill="currentColor"
          />
          <ellipse cx="7.5" cy="8.5" rx="2" ry="2.5" fill="currentColor" />
          <ellipse cx="16.5" cy="8.5" rx="2" ry="2.5" fill="currentColor" />
          <ellipse cx="5" cy="12.5" rx="1.5" ry="2" fill="currentColor" />
          <ellipse cx="19" cy="12.5" rx="1.5" ry="2" fill="currentColor" />
        </svg>
      </div>

      <p
        className="font-serif text-[1rem] mb-1"
        style={{ color: "var(--text)" }}
      >
        Sign in to join this space
      </p>
      <p
        className="text-[0.82rem] leading-relaxed mb-4"
        style={{ color: "var(--text-muted)" }}
      >
        We keep it gentle and safe here. A quick sign-in lets you be part of the
        conversation.
      </p>

      <Link
        href="/login"
        className="inline-block px-6 py-2.5 rounded-xl text-sm font-semibold text-white no-underline transition-all duration-200 hover:opacity-90 active:scale-95"
        style={{ background: "var(--sage)" }}
      >
        Sign In
      </Link>
    </div>
  );
}
