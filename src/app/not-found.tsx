"use client";

import Link from "next/link";
import { useIsStandalone } from "@/hooks/useIsStandalone";

export default function NotFound() {
  const isStandalone = useIsStandalone();

  return (
    <div
      className="min-h-[100dvh] flex items-center justify-center px-6"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="text-center max-w-[440px]">
        <div
          className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: "rgba(91,123,94,0.08)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9.5 8.5C9.5 8.5 10.5 7.5 12 7.5C13.5 7.5 14.5 8.5 14.5 8.5"
              stroke="var(--sage)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="12" r="10" stroke="var(--sage)" strokeWidth="1.5" />
            <path
              d="M8 15C8 15 9.5 13 12 13C14.5 13 16 15 16 15"
              stroke="var(--sage)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1
          className="font-serif text-[1.6rem] font-semibold mb-2"
          style={{ color: "var(--text)" }}
        >
          This page doesn&apos;t exist
        </h1>
        <p
          className="text-[0.95rem] leading-relaxed mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          The page you&apos;re looking for may have moved or no longer exists.
          Let&apos;s get you back on track.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {isStandalone ? (
            <Link
              href="/days"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[0.9rem] font-semibold no-underline transition-opacity hover:opacity-90"
              style={{ background: "var(--sage)", color: "white" }}
            >
              Back to Journal
            </Link>
          ) : (
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[0.9rem] font-semibold no-underline transition-opacity hover:opacity-90"
              style={{ background: "var(--sage)", color: "white" }}
            >
              Go home
            </Link>
          )}
          <Link
            href="/resources"
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[0.9rem] font-semibold no-underline transition-opacity hover:opacity-90"
            style={{
              background: "var(--cream)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            Browse resources
          </Link>
        </div>
      </div>
    </div>
  );
}
