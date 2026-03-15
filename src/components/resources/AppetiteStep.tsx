"use client";

import type { FoodItem } from "@/lib/resources/types";

interface AppetiteStepProps {
  item: FoodItem;
  stepNumber: number;
}

export default function AppetiteStep({ item, stepNumber }: AppetiteStepProps) {
  return (
    <div
      className="flex items-start gap-4 rounded-xl px-5 py-4"
      style={{
        background: "white",
        border: "1px solid var(--border)",
      }}
    >
      {/* Step number circle */}
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-full font-semibold"
        style={{
          width: 28,
          height: 28,
          background: "var(--sage)",
          color: "white",
          fontSize: "var(--text-label)",
        }}
      >
        {stepNumber}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <h3
          className="font-serif font-semibold"
          style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
        >
          {item.name}
        </h3>
        <p
          className="mt-1 leading-relaxed"
          style={{
            fontSize: "var(--text-body)",
            color: "var(--text-muted)",
          }}
        >
          {item.description}
        </p>
      </div>
    </div>
  );
}
