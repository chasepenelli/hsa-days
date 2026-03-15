"use client";

import type { DosageByWeight, WeightBracket } from "@/lib/resources/types";
import { ALL_WEIGHT_BRACKETS } from "@/lib/resources/personalize";

interface DosageTableProps {
  dosage: DosageByWeight;
  frequency: string;
  userBracket: WeightBracket | null;
}

export default function DosageTable({
  dosage,
  frequency,
  userBracket,
}: DosageTableProps) {
  return (
    <div className="mt-4">
      <table className="w-full border-collapse" style={{ fontSize: "var(--text-body-sm)" }}>
        <thead>
          <tr>
            <th
              className="text-left py-2 px-3 font-semibold"
              style={{ fontSize: "var(--text-label)", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
            >
              Weight
            </th>
            <th
              className="text-left py-2 px-3 font-semibold"
              style={{ fontSize: "var(--text-label)", color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}
            >
              Dosage
            </th>
          </tr>
        </thead>
        <tbody>
          {ALL_WEIGHT_BRACKETS.map((bracket) => {
            const isHighlighted = bracket.key === userBracket;
            return (
              <tr key={bracket.key}>
                <td
                  className="py-2.5 px-3 rounded-l-lg font-medium"
                  style={{
                    background: isHighlighted
                      ? "rgba(91,123,94,0.1)"
                      : "transparent",
                    color: isHighlighted ? "var(--sage)" : "var(--text)",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {bracket.label}
                  {isHighlighted && (
                    <span className="ml-2 font-semibold" style={{ fontSize: "var(--text-fine)" }}>
                      (your dog)
                    </span>
                  )}
                </td>
                <td
                  className="py-2.5 px-3 rounded-r-lg"
                  style={{
                    background: isHighlighted
                      ? "rgba(91,123,94,0.1)"
                      : "transparent",
                    color: isHighlighted ? "var(--sage)" : "var(--text)",
                    fontWeight: isHighlighted ? 600 : 400,
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  {dosage[bracket.key]}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p
        className="mt-3 italic"
        style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
      >
        {frequency}
      </p>
    </div>
  );
}
