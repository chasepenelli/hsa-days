"use client";

import { useState } from "react";
import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

interface FoodAvoidCardProps {
  item: FoodItem;
}

export default function FoodAvoidCard({ item }: FoodAvoidCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="flex items-start gap-4 rounded-2xl px-5 py-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(212,133,106,0.04)" : "white",
        borderTop: hovered
          ? "1px solid rgba(212,133,106,0.35)"
          : "1px solid rgba(212,133,106,0.18)",
        borderRight: hovered
          ? "1px solid rgba(212,133,106,0.35)"
          : "1px solid rgba(212,133,106,0.18)",
        borderBottom: hovered
          ? "1px solid rgba(212,133,106,0.35)"
          : "1px solid rgba(212,133,106,0.18)",
        borderLeft: hovered
          ? "3px solid var(--terracotta)"
          : "3px solid rgba(212,133,106,0.4)",
        boxShadow: hovered
          ? "0 4px 16px rgba(212,133,106,0.1)"
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
            ? "rgba(212,133,106,0.1)"
            : "rgba(212,133,106,0.06)",
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
          {/* X icon */}
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
            style={{
              background: "var(--terracotta)",
              boxShadow: hovered ? "0 2px 6px rgba(212,133,106,0.3)" : "none",
              transform: hovered ? "scale(1.08)" : "scale(1)",
              transition: "box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M2.5 2.5l5 5M7.5 2.5l-5 5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <h3
            className="font-serif text-[0.95rem] font-semibold"
            style={{ color: "var(--text)" }}
          >
            {item.name}
          </h3>
        </div>
        <p
          className="text-[0.85rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {item.description}
        </p>
        {item.stageEmphasis === "advanced" && (
          <span
            className="inline-block mt-2 text-[0.72rem] font-medium px-2 py-0.5 rounded-full"
            style={{
              background: "rgba(212,133,106,0.12)",
              color: "var(--terracotta)",
            }}
          >
            Especially during chemo
          </span>
        )}
      </div>
    </div>
  );
}
