"use client";

import { useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

interface FoodDetailSheetProps {
  item: FoodItem | null;
  breedNote: string | null;
  onClose: () => void;
}

export default function FoodDetailSheet({
  item,
  breedNote,
  onClose,
}: FoodDetailSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (!item) return;

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    // Focus the close button when sheet opens
    requestAnimationFrame(() => {
      closeRef.current?.focus();
    });

    // Make background content inert
    const main = document.getElementById("main-content");
    if (main) main.setAttribute("inert", "");

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
      if (main) main.removeAttribute("inert");
    };
  }, [item, handleKeyDown]);

  if (!item) return null;

  const stageLabel =
    item.stageEmphasis === "early"
      ? "Early stage"
      : item.stageEmphasis === "advanced"
        ? "During treatment"
        : item.stageEmphasis === "palliative"
          ? "Palliative"
          : null;

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0"
        style={{
          zIndex: 50,
          background: "rgba(0,0,0,0.3)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
          animation: prefersReducedMotion
            ? "none"
            : "backdropFadeIn 0.2s ease-out",
        }}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-label={`${item.name} details`}
        className="fixed left-0 right-0 bottom-0"
        style={{
          zIndex: 51,
          borderRadius: "24px 24px 0 0",
          background: "white",
          maxHeight: "70vh",
          overflowY: "auto",
          paddingBottom: "calc(24px + env(safe-area-inset-bottom))",
          animation: prefersReducedMotion
            ? "none"
            : "sheetSlideUp 0.3s var(--ease-out-expo)",
        }}
      >
        {/* Drag handle (decorative) */}
        <div className="flex justify-center">
          <div
            className="rounded-full my-3"
            style={{
              width: 40,
              height: 4,
              background: "var(--border-strong)",
            }}
          />
        </div>

        {/* Close button */}
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          className="absolute flex items-center justify-center"
          style={{
            top: 12,
            right: 12,
            width: 44,
            height: 44,
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "var(--text-muted)",
          }}
          aria-label="Close"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M5 5L15 15M15 5L5 15"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="px-6 pb-6">
          {/* Illustration — rounded square, not circle */}
          <div className="flex justify-center mt-2 mb-4">
            <div
              className="relative overflow-hidden"
              style={{
                width: 160,
                height: 160,
                borderRadius: 20,
                background:
                  "linear-gradient(135deg, rgba(91,123,94,0.04) 0%, rgba(245,240,234,0.4) 100%)",
              }}
            >
              <Image
                src={`/illustrations/food/${item.icon}`}
                alt={item.name}
                fill
                className="object-contain p-3"
                sizes="160px"
              />
            </div>
          </div>

          {/* Name */}
          <h2
            className="font-serif font-semibold text-center"
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--text)",
            }}
          >
            {item.name}
          </h2>

          {/* Stage badge */}
          {stageLabel && (
            <div className="flex justify-center mt-2">
              <span
                className="inline-block px-3 py-0.5 rounded-full font-semibold uppercase tracking-wide"
                style={{
                  fontSize: "var(--text-fine)",
                  background:
                    item.stageEmphasis === "advanced"
                      ? "rgba(212,133,106,0.12)"
                      : "rgba(91,123,94,0.1)",
                  color:
                    item.stageEmphasis === "advanced"
                      ? "var(--terracotta)"
                      : "var(--sage)",
                }}
              >
                {stageLabel}
              </span>
            </div>
          )}

          {/* Description */}
          <p
            className="leading-relaxed mt-4"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text)",
            }}
          >
            {item.description}
          </p>

          {/* Tip callout */}
          {item.tip && (
            <div
              className="rounded-xl px-4 py-3 mt-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,123,94,0.06) 0%, rgba(91,123,94,0.02) 100%)",
                border: "1px solid rgba(91,123,94,0.15)",
              }}
            >
              <div
                className="font-semibold uppercase tracking-[0.08em] mb-1"
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--sage)",
                }}
              >
                Tip
              </div>
              <div
                className="leading-relaxed"
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--text)",
                }}
              >
                {item.tip}
              </div>
            </div>
          )}

          {/* Breed note */}
          {breedNote && (
            <div
              className="rounded-xl px-4 py-3 mt-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(196,162,101,0.08) 0%, rgba(196,162,101,0.02) 100%)",
                border: "1px solid rgba(196,162,101,0.2)",
              }}
            >
              <div
                className="font-semibold uppercase tracking-[0.08em] mb-1"
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--gold-text)",
                }}
              >
                Breed Note
              </div>
              <div
                className="leading-relaxed"
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--text)",
                }}
              >
                {breedNote}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
