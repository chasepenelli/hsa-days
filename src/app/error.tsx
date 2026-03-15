"use client";

import { useIsStandalone } from "@/hooks/useIsStandalone";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const isStandalone = useIsStandalone();

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="text-center max-w-[440px]">
        <div
          className="w-12 h-12 rounded-full mx-auto mb-5 flex items-center justify-center"
          style={{ background: "rgba(212,133,106,0.08)" }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="var(--terracotta)" strokeWidth="1.5" />
            <path
              d="M12 8v5"
              stroke="var(--terracotta)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <circle cx="12" cy="16" r="0.5" fill="var(--terracotta)" stroke="var(--terracotta)" strokeWidth="1" />
          </svg>
        </div>

        <h1
          className="font-serif text-[1.6rem] font-semibold mb-2"
          style={{ color: "var(--text)" }}
        >
          Something went wrong
        </h1>
        <p
          className="text-[0.95rem] leading-relaxed mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          We hit an unexpected error. This is on our end, not yours.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[0.9rem] font-semibold cursor-pointer border-none transition-opacity hover:opacity-90"
            style={{ background: "var(--sage)", color: "white" }}
          >
            Try again
          </button>
          <a
            href={isStandalone ? "/days" : "/"}
            className="inline-flex items-center justify-center px-6 py-3 rounded-xl text-[0.9rem] font-semibold no-underline transition-opacity hover:opacity-90"
            style={{
              background: "var(--cream)",
              color: "var(--text)",
              border: "1px solid var(--border)",
            }}
          >
            {isStandalone ? "Back to Journal" : "Go home"}
          </a>
        </div>
      </div>
    </div>
  );
}
