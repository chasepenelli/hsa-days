"use client";

import { useState } from "react";
import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

interface FoodTipCardProps {
  item: FoodItem;
  index: number;
}

export default function FoodTipCard({ item, index }: FoodTipCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-start gap-4 rounded-2xl"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(196,162,101,0.04)" : "white",
        borderTop: hovered
          ? "1px solid rgba(196,162,101,0.3)"
          : "1px solid var(--border)",
        borderRight: hovered
          ? "1px solid rgba(196,162,101,0.3)"
          : "1px solid var(--border)",
        borderBottom: hovered
          ? "1px solid rgba(196,162,101,0.3)"
          : "1px solid var(--border)",
        borderLeft: "3px solid var(--gold)",
        borderRadius: "16px",
        padding: "16px 20px",
        boxShadow: hovered
          ? "0 5px 18px rgba(196,162,101,0.12)"
          : "0 1px 4px rgba(0,0,0,0.02)",
        transform: hovered ? "translateY(-2px)" : "translateY(0)",
        transition:
          "background 0.22s ease, border-color 0.22s ease, box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Illustration */}
      <div
        className="flex-shrink-0 w-14 h-14 relative rounded-xl overflow-hidden"
        style={{
          background: hovered
            ? "rgba(196,162,101,0.1)"
            : "rgba(196,162,101,0.06)",
          transition: "background 0.22s ease, transform 0.3s cubic-bezier(0.22,1,0.36,1)",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}
      >
        <Image
          src={`/illustrations/food/${item.icon}`}
          alt=""
          fill
          className="object-cover p-1.5"
          sizes="56px"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          {/* Tip number badge */}
          <span
            className="text-[0.68rem] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full"
            style={{
              background: hovered
                ? "rgba(196,162,101,0.16)"
                : "rgba(196,162,101,0.1)",
              color: "var(--gold-text)",
              transition: "background 0.22s ease",
            }}
          >
            Tip {index + 1}
          </span>
        </div>
        <h3
          className="font-serif text-[0.95rem] font-semibold mb-1"
          style={{ color: "var(--text)" }}
        >
          {item.name}
        </h3>
        <p
          className="text-[0.85rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
