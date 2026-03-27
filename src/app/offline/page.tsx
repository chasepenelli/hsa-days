"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function OfflinePage() {
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // Auto-navigate back after brief delay so user sees the status change
      setTimeout(() => {
        window.location.href = "/days";
      }, 800);
    };

    window.addEventListener("online", handleOnline);
    // Check immediately in case we're already back online
    if (navigator.onLine) handleOnline();

    return () => window.removeEventListener("online", handleOnline);
  }, []);

  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        {/* Cloud icon */}
        <div
          className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "var(--cream)" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 22a5 5 0 01-.5-9.97A8 8 0 0123.4 14.1 4.5 4.5 0 0124 23H8z"
              stroke={isOnline ? "var(--sage)" : "var(--text-muted)"}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            {isOnline ? (
              <path
                d="M12 19l3 3 5-5"
                stroke="var(--sage)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ) : (
              <line
                x1="12"
                y1="27"
                x2="20"
                y2="27"
                stroke="var(--border-strong)"
                strokeWidth="2"
                strokeLinecap="round"
              />
            )}
          </svg>
        </div>

        <h1 className="font-serif text-[1.6rem] font-semibold text-text mb-3">
          {isOnline ? "You\u2019re back online" : "You\u2019re offline right now"}
        </h1>

        {isOnline ? (
          <p className="text-[0.95rem] text-text-muted leading-relaxed mb-6">
            Reconnected. Taking you back to your journal...
          </p>
        ) : (
          <>
            <p className="text-[0.95rem] text-text-muted leading-relaxed mb-6">
              No worries — your journal entries are saved on this device and will
              sync automatically when you reconnect.
            </p>

            <div
              className="rounded-xl p-5 text-left mb-8"
              style={{
                background: "var(--cream)",
                border: "1px solid var(--border)",
              }}
            >
              <p className="text-[0.85rem] font-semibold text-text mb-2">
                While you wait, you can:
              </p>
              <ul className="text-[0.85rem] text-text-muted leading-relaxed list-none p-0 m-0 flex flex-col gap-2">
                <li className="flex items-start gap-2">
                  <span style={{ color: "var(--sage)" }}>&#10003;</span>
                  Continue writing in your journal
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "var(--sage)" }}>&#10003;</span>
                  Review days you&apos;ve already loaded
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "var(--sage)" }}>&#10003;</span>
                  Check back in a moment
                </li>
              </ul>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[0.9rem] font-semibold cursor-pointer border-none transition-opacity hover:opacity-90"
                style={{ background: "var(--sage)", color: "white" }}
              >
                Try again
              </button>
              <Link
                href="/days"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[0.9rem] font-semibold no-underline transition-opacity hover:opacity-90"
                style={{
                  background: "var(--cream)",
                  color: "var(--text)",
                  border: "1px solid var(--border)",
                }}
              >
                Back to Journal
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
