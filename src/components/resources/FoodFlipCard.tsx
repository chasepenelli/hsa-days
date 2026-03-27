"use client";

import { useState } from "react";
import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

const VARIANT_CONFIG = {
  recommended: {
    accent: "var(--sage)",
    rgb: "91,123,94",
  },
  avoid: {
    accent: "var(--terracotta)",
    rgb: "212,133,106",
  },
} as const;

interface FoodFlipCardProps {
  item: FoodItem;
  variant: "recommended" | "avoid";
  breedNote: string | null;
}

export default function FoodFlipCard({
  item,
  variant,
  breedNote,
}: FoodFlipCardProps) {
  const [flipped, setFlipped] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [hasFlipped, setHasFlipped] = useState(false);
  const cfg = VARIANT_CONFIG[variant];

  const isLifted = hovered && !flipped;

  return (
    <button
      type="button"
      onClick={() => { setFlipped((prev) => !prev); setHasFlipped(true); }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-expanded={flipped}
      className="food-card-interactive w-full text-left cursor-pointer"
      style={{
        perspective: "1000px",
        background: "transparent",
        border: "none",
        padding: 0,
      }}
    >
      <div
        className="relative w-full rounded-2xl"
        style={{
          transformStyle: "preserve-3d",
          transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        {/* ── Front Face ── */}
        <div
          className="w-full rounded-2xl"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            background: "white",
            border: isLifted
              ? `1px solid rgba(${cfg.rgb},0.3)`
              : "1px solid var(--border)",
            boxShadow: isLifted
              ? `0 5px 18px rgba(${cfg.rgb},0.09)`
              : "0 1px 4px rgba(0,0,0,0.03)",
            transform: isLifted ? "translateY(-3px)" : "translateY(0)",
            transition:
              "border 0.22s ease, box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          {/* Image area */}
          <div
            className="relative w-full aspect-square rounded-t-2xl overflow-hidden"
            style={{
              background: isLifted
                ? `rgba(${cfg.rgb},0.07)`
                : `rgba(${cfg.rgb},0.04)`,
              transition: "background 0.22s ease",
            }}
          >
            <Image
              src={`/illustrations/food/${item.icon}`}
              alt={item.name}
              fill
              className="object-cover p-4"
              style={{
                transform: isLifted ? "scale(1.06)" : "scale(1)",
                transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
              }}
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {/* Badge */}
            <div
              className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
              style={{
                background: cfg.accent,
                boxShadow: `0 2px 6px rgba(${cfg.rgb},0.3)`,
                transform: isLifted ? "scale(1.1)" : "scale(1)",
                transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              {variant === "recommended" ? (
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M2.5 6l2.5 2.5 4.5-5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                  <path
                    d="M2.5 2.5l5 5M7.5 2.5l-5 5"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </div>

            {/* Hint overlay */}
            <div
              className="absolute inset-0 flex items-end justify-center pb-2"
              style={{
                opacity: !flipped && (!hasFlipped || hovered) ? 1 : 0,
                transition: "opacity 0.2s ease",
              }}
            >
              <span
                className="font-medium px-2 py-0.5 rounded-full"
                style={{
                  background: "rgba(0,0,0,0.45)",
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "var(--text-fine)",
                }}
              >
                Tap for details
              </span>
            </div>
          </div>

          {/* Name + tip */}
          <div className="px-4 py-4">
            <h3
              className="font-serif font-semibold"
              style={{ color: "var(--text)", fontSize: "var(--text-h3)" }}
            >
              {item.name}
            </h3>
            {item.tip && (
              <p
                className="mt-1 leading-snug"
                style={{ color: cfg.accent, fontSize: "var(--text-body-sm)" }}
              >
                {item.tip}
              </p>
            )}
          </div>
        </div>

        {/* ── Back Face ── */}
        <div
          className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "white",
            border: `1px solid rgba(${cfg.rgb},0.25)`,
            boxShadow: `0 8px 24px rgba(${cfg.rgb},0.12)`,
          }}
        >
          <div
            className="h-full flex flex-col px-4 py-4 overflow-y-auto"
            style={{ maxHeight: "100%" }}
          >
            {/* Back header */}
            <div className="flex items-center gap-2 mb-2">
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: cfg.accent }}
              >
                {variant === "recommended" ? (
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5.5l2 2 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : (
                  <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2.5 2.5l5 5M7.5 2.5l-5 5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </div>
              <h3
                className="font-serif font-semibold"
                style={{ color: "var(--text)", fontSize: "var(--text-h3)" }}
              >
                {item.name}
              </h3>
            </div>

            {/* Description */}
            <p
              className="leading-relaxed flex-1"
              style={{ color: "var(--text-muted)", fontSize: "var(--text-body)" }}
            >
              {item.description}
            </p>

            {/* Tip callout */}
            {item.tip && (
              <div
                className="flex items-start gap-2 mt-2.5 px-3 py-2 rounded-xl"
                style={{ background: `rgba(${cfg.rgb},0.06)` }}
              >
                <span
                  className="font-semibold mt-0.5"
                  style={{ color: cfg.accent, fontSize: "var(--text-label)" }}
                >
                  Tip:
                </span>
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--text)", fontSize: "var(--text-body-sm)" }}
                >
                  {item.tip}
                </p>
              </div>
            )}

            {/* Breed note */}
            {breedNote && (
              <div
                className="rounded-xl px-3 py-2 mt-2.5"
                style={{
                  background: "rgba(196,162,101,0.07)",
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <p
                  className="leading-relaxed"
                  style={{ color: "var(--text)", fontSize: "var(--text-body-sm)" }}
                >
                  {breedNote}
                </p>
              </div>
            )}

            {/* Stage emphasis badge */}
            {item.stageEmphasis === "advanced" && (
              <span
                className="inline-block mt-2 font-medium px-2 py-0.5 rounded-full self-start"
                style={{
                  background: "rgba(212,133,106,0.12)",
                  color: "var(--terracotta)",
                  fontSize: "var(--text-fine)",
                }}
              >
                Especially during chemo
              </span>
            )}

            {/* Flip back hint */}
            <div
              className="flex items-center justify-center gap-1 mt-3 pt-2"
              style={{
                borderTop: "1px solid var(--border)",
                color: "var(--text-muted)",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path
                  d="M7.5 3L4.5 6l3 3"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span style={{ fontSize: "var(--text-fine)" }}>Tap to flip back</span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
