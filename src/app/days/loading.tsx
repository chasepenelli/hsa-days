"use client";

import { useIsStandalone } from "@/hooks/useIsStandalone";

export default function DaysLoading() {
  const isStandalone = useIsStandalone();

  return (
    <div
      className="min-h-screen px-6"
      style={{
        background: "var(--warm-white)",
        paddingTop: isStandalone
          ? "calc(env(safe-area-inset-top) + 16px)"
          : "96px",
        paddingBottom: isStandalone
          ? "calc(52px + env(safe-area-inset-bottom) + 16px)"
          : "64px",
      }}
    >
      <div className="max-w-[800px] mx-auto">
        {/* Avatar + greeting skeleton */}
        <div className="flex items-center gap-4 mb-8">
          <div
            className="w-14 h-14 rounded-full animate-pulse"
            style={{ background: "var(--cream-deep)" }}
          />
          <div className="space-y-2">
            <div
              className="h-5 w-48 rounded-lg animate-pulse"
              style={{ background: "var(--cream-deep)" }}
            />
            <div
              className="h-4 w-32 rounded-lg animate-pulse"
              style={{ background: "var(--cream)" }}
            />
          </div>
        </div>

        {/* Current day card skeleton */}
        <div
          className="rounded-2xl p-6 mb-8 animate-pulse"
          style={{ background: "var(--cream)", height: 120 }}
        />

        {/* Progress dots skeleton */}
        <div className="flex gap-2 justify-center mb-8">
          {Array.from({ length: 15 }).map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 rounded-full animate-pulse"
              style={{
                background: "var(--cream-deep)",
                animationDelay: `${i * 50}ms`,
              }}
            />
          ))}
        </div>

        {/* Timeline skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl animate-pulse"
              style={{
                background: "var(--cream)",
                height: 72,
                animationDelay: `${i * 80}ms`,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
