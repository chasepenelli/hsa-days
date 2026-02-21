"use client";

import { useState } from "react";
import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

interface FoodGridCardProps {
  item: FoodItem;
  breedNote: string | null;
}

export default function FoodGridCard({ item, breedNote }: FoodGridCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);

  const isLifted = hovered || expanded;

  return (
    <button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="food-card-interactive w-full text-left rounded-2xl cursor-pointer"
      style={{
        background: "white",
        border: isLifted
          ? "1px solid rgba(91,123,94,0.3)"
          : "1px solid var(--border)",
        boxShadow: expanded
          ? "0 10px 32px rgba(91,123,94,0.13)"
          : isLifted
          ? "0 5px 18px rgba(91,123,94,0.09)"
          : "0 1px 4px rgba(0,0,0,0.03)",
        transform: isLifted && !expanded ? "translateY(-3px)" : "translateY(0)",
        transition:
          "border 0.22s ease, box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Image area */}
      <div
        className="relative w-full aspect-square rounded-t-2xl overflow-hidden"
        style={{
          background: isLifted
            ? "rgba(91,123,94,0.07)"
            : "rgba(91,123,94,0.04)",
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
        {/* Checkmark badge */}
        <div
          className="absolute top-3 right-3 w-6 h-6 rounded-full flex items-center justify-center"
          style={{
            background: "var(--sage)",
            boxShadow: "0 2px 6px rgba(91,123,94,0.3)",
            transform: isLifted ? "scale(1.1)" : "scale(1)",
            transition: "transform 0.25s cubic-bezier(0.22,1,0.36,1)",
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M2.5 6l2.5 2.5 4.5-5"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {/* Expand hint overlay — visible on hover */}
        <div
          className="absolute inset-0 flex items-end justify-center pb-2"
          style={{
            opacity: hovered && !expanded ? 1 : 0,
            transition: "opacity 0.2s ease",
          }}
        >
          <span
            className="text-[0.65rem] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(0,0,0,0.45)",
              color: "rgba(255,255,255,0.9)",
            }}
          >
            Tap for details
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="px-4 py-3">
        <h3
          className="font-serif text-[0.95rem] font-semibold"
          style={{ color: "var(--text)" }}
        >
          {item.name}
        </h3>

        {/* Short tip — shown when collapsed */}
        {item.tip && !expanded && (
          <p
            className="text-[0.78rem] mt-1 leading-snug"
            style={{ color: "var(--sage)" }}
          >
            {item.tip}
          </p>
        )}

        {/* Expandable section */}
        <div
          style={{
            maxHeight: expanded ? "500px" : "0",
            opacity: expanded ? 1 : 0,
            overflow: "hidden",
            transition: expanded
              ? "max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.3s ease 0.05s"
              : "max-height 0.3s cubic-bezier(0.4,0,0.6,1), opacity 0.18s ease",
          }}
        >
          <p
            className="text-[0.85rem] leading-relaxed mt-2"
            style={{ color: "var(--text-muted)" }}
          >
            {item.description}
          </p>

          {item.tip && (
            <div
              className="flex items-start gap-2 mt-3 px-3 py-2 rounded-xl"
              style={{ background: "rgba(91,123,94,0.06)" }}
            >
              <span
                className="text-[0.75rem] font-semibold mt-0.5"
                style={{ color: "var(--sage)" }}
              >
                Tip:
              </span>
              <p
                className="text-[0.8rem] leading-relaxed"
                style={{ color: "var(--sage-dark)" }}
              >
                {item.tip}
              </p>
            </div>
          )}

          {breedNote && (
            <div
              className="rounded-xl px-3 py-2 mt-3"
              style={{
                background: "rgba(196,162,101,0.07)",
                borderLeft: "3px solid var(--gold)",
              }}
            >
              <p
                className="text-[0.8rem] leading-relaxed"
                style={{ color: "var(--text)" }}
              >
                {breedNote}
              </p>
            </div>
          )}

          {/* Collapse hint */}
          <div
            className="flex items-center justify-center gap-1 mt-3 pb-1"
            style={{ color: "var(--text-muted)" }}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M9 7.5L6 4.5 3 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-[0.72rem]">Tap to collapse</span>
          </div>
        </div>
      </div>
    </button>
  );
}
