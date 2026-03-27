"use client";

import { useState } from "react";

interface HeartReactionProps {
  count: number;
  isActive: boolean;
  onToggle: () => void;
}

export function HeartReaction({ count, isActive, onToggle }: HeartReactionProps) {
  const [bouncing, setBouncing] = useState(false);

  const handleClick = () => {
    setBouncing(true);
    onToggle();
    setTimeout(() => setBouncing(false), 300);
  };

  return (
    <button
      onClick={handleClick}
      className="inline-flex items-center justify-center gap-1 px-1.5 py-0.5 rounded-full transition-all duration-150 cursor-pointer hover:bg-black/[0.03] active:scale-95 min-h-[44px] min-w-[44px]"
      style={{
        background: "transparent",
        border: "none",
        transform: bouncing ? "scale(1.25)" : "scale(1)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}
      aria-label={isActive ? "Remove heart" : "Add heart"}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill={isActive ? "var(--sage)" : "none"}
        stroke={isActive ? "var(--sage)" : "var(--text-muted)"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ opacity: isActive ? 1 : 0.55 }}
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      {count > 0 && (
        <span
          className="text-xs font-medium"
          style={{
            color: isActive ? "var(--sage)" : "var(--text-muted)",
            opacity: isActive ? 1 : 0.6,
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}
