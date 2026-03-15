"use client";

import { useState } from "react";
import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

interface FoodListItemProps {
  item: FoodItem;
  variant: "recommended" | "avoid";
  breedNote: string | null;
}

export default function FoodListItem({
  item,
  variant,
  breedNote,
}: FoodListItemProps) {
  const [open, setOpen] = useState(false);

  const borderColor =
    variant === "recommended" ? "var(--sage)" : "var(--terracotta)";

  return (
    <button
      type="button"
      onClick={() => setOpen((o) => !o)}
      className="w-full text-left rounded-xl px-4 py-4 transition-colors duration-150"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderLeftWidth: 2,
        borderLeftColor: borderColor,
      }}
    >
      {/* ── Collapsed row ── */}
      <div className="flex items-center gap-3">
        {/* Food illustration */}
        <div
          className="w-10 h-10 relative rounded-lg overflow-hidden flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(91,123,94,0.05) 0%, rgba(245,240,234,0.4) 100%)",
          }}
        >
          <Image
            src={`/illustrations/food/${item.icon}`}
            alt=""
            fill
            className="object-cover p-0.5"
            sizes="40px"
          />
        </div>

        {/* Name + tip */}
        <div className="flex-1 min-w-0">
          <span
            className="font-serif font-semibold block"
            style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
          >
            {item.name}
          </span>
          {item.tip && (
            <span
              className="block mt-0.5 leading-snug"
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--text-muted)",
              }}
            >
              {item.tip}
            </span>
          )}
        </div>

        {/* Chevron */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          className="flex-shrink-0 transition-transform duration-300"
          style={{
            color: "var(--text-muted)",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* ── Expanded content ── */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 300ms ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="pt-3">
            <p
              className="leading-relaxed"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--text)",
              }}
            >
              {item.description}
            </p>

            {breedNote && (
              <p
                className="mt-2 leading-snug"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--gold)",
                }}
              >
                {breedNote}
              </p>
            )}

            {item.stageEmphasis && item.stageEmphasis !== "all" && (
              <span
                className="inline-block mt-2 px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide"
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
                {item.stageEmphasis === "early"
                  ? "Early stage"
                  : item.stageEmphasis === "advanced"
                    ? "During treatment"
                    : "Palliative"}
              </span>
            )}
          </div>
        </div>
      </div>
    </button>
  );
}
