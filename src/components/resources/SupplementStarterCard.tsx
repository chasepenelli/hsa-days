"use client";

import type { Supplement } from "@/lib/resources/types";

interface SupplementStarterCardProps {
  supplement: Supplement;
  categoryLabel: string;
  categoryColor: string;
  personalDose: string | null;
}

export default function SupplementStarterCard({
  supplement,
  categoryLabel,
  categoryColor,
  personalDose,
}: SupplementStarterCardProps) {
  return (
    <div
      className="rounded-2xl px-5 py-5"
      style={{
        background: "#fff",
        borderLeft: `3px solid ${categoryColor}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Name */}
      <h3
        className="font-serif font-semibold mb-1"
        style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
      >
        {supplement.name}
      </h3>

      {/* Tagline */}
      <p
        className="leading-relaxed mb-3"
        style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
      >
        {supplement.tagline}
      </p>

      {/* Category pill */}
      <span
        className="inline-block rounded-full px-2.5 py-0.5 font-medium mb-3"
        style={{
          fontSize: "var(--text-fine)",
          background: `${categoryColor}14`,
          color: categoryColor,
        }}
      >
        {categoryLabel}
      </span>

      {/* Personalized dose */}
      {personalDose && (
        <p
          className="font-medium"
          style={{ fontSize: "var(--text-body)", color: "var(--sage)" }}
        >
          {personalDose}
        </p>
      )}

      {/* Frequency */}
      <p
        className="mt-1 leading-relaxed"
        style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
      >
        {supplement.frequency}
      </p>
    </div>
  );
}
