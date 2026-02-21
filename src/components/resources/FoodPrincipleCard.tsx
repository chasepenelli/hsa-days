"use client";

import { useState } from "react";
import Image from "next/image";
import type { DietPrinciple } from "@/lib/resources/types";

interface FoodPrincipleCardProps {
  principle: DietPrinciple;
  index: number;
}

export default function FoodPrincipleCard({
  principle,
  index,
}: FoodPrincipleCardProps) {
  const [expanded, setExpanded] = useState(false);
  const [hovered, setHovered] = useState(false);
  const num = String(index + 1).padStart(2, "0");

  const isLifted = hovered || expanded;

  return (
    <button
      type="button"
      onClick={() => setExpanded((prev) => !prev)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="food-card-interactive w-full text-left rounded-2xl px-6 py-5 cursor-pointer"
      style={{
        background: expanded
          ? "linear-gradient(135deg, rgba(91,123,94,0.07) 0%, rgba(245,240,234,0.8) 100%)"
          : "linear-gradient(135deg, rgba(91,123,94,0.04) 0%, rgba(245,240,234,0.6) 100%)",
        border: isLifted
          ? "1px solid rgba(91,123,94,0.28)"
          : "1px solid var(--border)",
        boxShadow: expanded
          ? "0 6px 28px rgba(91,123,94,0.12)"
          : isLifted
          ? "0 4px 16px rgba(91,123,94,0.08)"
          : "0 1px 4px rgba(0,0,0,0.03)",
        transform: isLifted && !expanded ? "translateY(-2px)" : "translateY(0)",
        transition:
          "border 0.25s ease, box-shadow 0.25s ease, transform 0.25s ease, background 0.25s ease",
      }}
    >
      <div className="flex items-start gap-5">
        {/* Illustration */}
        <div
          className="flex-shrink-0 w-16 h-16 relative rounded-xl overflow-hidden"
          style={{
            background: "rgba(91,123,94,0.06)",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
            transform: isLifted ? "scale(1.04)" : "scale(1)",
          }}
        >
          <Image
            src={`/illustrations/food/${principle.icon}`}
            alt=""
            fill
            className="object-cover"
            sizes="64px"
          />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-3">
            {/* Ghost number */}
            <span
              className="font-serif text-[2rem] font-bold leading-none select-none flex-shrink-0"
              style={{
                color: "var(--sage)",
                opacity: expanded ? 0.22 : 0.13,
                transition: "opacity 0.25s ease",
              }}
            >
              {num}
            </span>
            <div className="flex-1 pt-1">
              <h3
                className="font-serif text-[1.05rem] font-semibold mb-1"
                style={{ color: "var(--text)" }}
              >
                {principle.title}
              </h3>
              <p
                className="text-[0.88rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {principle.description}
              </p>
            </div>
          </div>

          {/* Expandable details */}
          <div
            style={{
              maxHeight: expanded ? "400px" : "0",
              opacity: expanded ? 1 : 0,
              overflow: "hidden",
              transition: expanded
                ? "max-height 0.45s cubic-bezier(0.22,1,0.36,1), opacity 0.35s ease 0.06s"
                : "max-height 0.35s cubic-bezier(0.4,0,0.6,1), opacity 0.2s ease",
            }}
          >
            <ul className="mt-4 ml-12 space-y-2">
              {principle.details.map((detail, j) => (
                <li
                  key={j}
                  className="text-[0.85rem] flex items-start gap-2"
                  style={{
                    color: "var(--text)",
                    opacity: expanded ? 1 : 0,
                    transform: expanded ? "translateY(0)" : "translateY(6px)",
                    transition: `opacity 0.3s ease ${j * 55}ms, transform 0.3s cubic-bezier(0.22,1,0.36,1) ${j * 55}ms`,
                  }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--sage)" }}
                  />
                  {detail}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Expand chevron */}
        <div
          className="flex-shrink-0 mt-2"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1)",
            color: isLifted ? "var(--sage)" : "var(--text-muted)",
          }}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M4 6l4 4 4-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </button>
  );
}
