"use client";

import { useIsStandalone } from "@/hooks/useIsStandalone";

export default function DayLoading() {
  const isStandalone = useIsStandalone();

  return (
    <div
      className="min-h-[100dvh] px-6"
      style={{
        background: "var(--warm-white)",
        paddingTop: isStandalone
          ? "calc(env(safe-area-inset-top) + 16px)"
          : "80px",
        paddingBottom: isStandalone
          ? "calc(52px + env(safe-area-inset-bottom) + 16px)"
          : "64px",
      }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Nav skeleton */}
        <div className="flex justify-between items-center mb-8">
          <div
            className="h-4 w-20 rounded-lg animate-pulse"
            style={{ background: "var(--cream-deep)" }}
          />
          <div
            className="h-4 w-16 rounded-lg animate-pulse"
            style={{ background: "var(--cream-deep)" }}
          />
        </div>

        {/* Day header skeleton */}
        <div className="mb-8">
          <div
            className="h-3 w-24 rounded-lg animate-pulse mb-3"
            style={{ background: "var(--cream-deep)" }}
          />
          <div
            className="h-8 w-72 rounded-lg animate-pulse mb-2"
            style={{ background: "var(--cream-deep)" }}
          />
          <div
            className="h-5 w-56 rounded-lg animate-pulse"
            style={{ background: "var(--cream)" }}
          />
        </div>

        {/* Illustration skeleton */}
        <div
          className="rounded-2xl mb-8 animate-pulse"
          style={{ background: "var(--cream)", height: 200 }}
        />

        {/* Content lines skeleton */}
        <div className="space-y-3 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-4 rounded-lg animate-pulse"
              style={{
                background: "var(--cream)",
                width: `${85 - i * 8}%`,
                animationDelay: `${i * 60}ms`,
              }}
            />
          ))}
        </div>

        {/* Journal editor skeleton */}
        <div
          className="rounded-2xl animate-pulse"
          style={{
            background: "var(--cream)",
            height: 200,
            border: "1px solid var(--border)",
          }}
        />
      </div>
    </div>
  );
}
