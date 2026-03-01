"use client";

import { useEffect, useState } from "react";
import type { DietSupplement, EvidenceTier, WeightBracket } from "@/lib/resources/types";

interface DietSupplementCardProps {
  supplement: DietSupplement;
  /** Pass the dog's weight in lbs to highlight the matching dosing row. */
  profileWeightLbs?: number | null;
  /** When true, collapse any open dosing panel. Driven by parent "collapse all". */
  collapseAll?: boolean;
}

/** Map a numeric lbs value to the nearest WeightBracket key. */
function weightToBracket(lbs: number): WeightBracket {
  if (lbs < 25) return "under25";
  if (lbs < 50) return "25to50";
  if (lbs < 75) return "50to75";
  return "over75";
}

const TIER_CONFIG: Record<
  EvidenceTier,
  {
    label: string;
    bg: string;
    color: string;
    border: string;
    borderTop: string;
    icon: React.ReactNode;
  }
> = {
  strong: {
    label: "Strong Evidence",
    bg: "rgba(91,123,94,0.12)",
    color: "var(--sage)",
    border: "rgba(91,123,94,0.3)",
    borderTop: "var(--sage)",
    icon: (
      // Checkmark — confident certification
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <circle cx="5.5" cy="5.5" r="5" fill="rgba(91,123,94,0.18)" />
        <path
          d="M3 5.5l1.8 1.8 3.2-3.2"
          stroke="var(--sage)"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  moderate: {
    label: "Moderate Evidence",
    bg: "rgba(196,162,101,0.12)",
    color: "var(--gold)",
    border: "rgba(196,162,101,0.3)",
    borderTop: "var(--gold)",
    icon: (
      // Bar chart — building evidence
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <rect x="1.5" y="6" width="2" height="3.5" rx="0.5" fill="var(--gold)" opacity="0.55" />
        <rect x="4.5" y="3.5" width="2" height="6" rx="0.5" fill="var(--gold)" opacity="0.75" />
        <rect x="7.5" y="5" width="2" height="4.5" rx="0.5" fill="var(--gold)" />
      </svg>
    ),
  },
  emerging: {
    label: "Emerging Evidence",
    bg: "rgba(196,162,101,0.06)",
    color: "var(--text-muted)",
    border: "rgba(0,0,0,0.12)",
    borderTop: "var(--border-strong)",
    icon: (
      // Flask / spark — early signal
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <path
          d="M3.5 1.5h4M5.5 1.5v3L2.5 9.5h6L5.5 4.5"
          stroke="var(--text-muted)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="5" cy="7" r="0.6" fill="var(--text-muted)" />
        <circle cx="6.5" cy="8.2" r="0.45" fill="var(--text-muted)" opacity="0.6" />
      </svg>
    ),
  },
};

const WEIGHT_ROWS: { key: WeightBracket; label: string }[] = [
  { key: "under25", label: "Under 25 lbs" },
  { key: "25to50", label: "25–50 lbs" },
  { key: "50to75", label: "50–75 lbs" },
  { key: "over75", label: "75+ lbs" },
];

export default function DietSupplementCard({
  supplement,
  profileWeightLbs,
  collapseAll,
}: DietSupplementCardProps) {
  const [dosingOpen, setDosingOpen] = useState(false);
  const tier = TIER_CONFIG[supplement.evidenceTier];

  const highlightBracket: WeightBracket | null =
    profileWeightLbs != null ? weightToBracket(profileWeightLbs) : null;

  // Collapse dosing when parent triggers collapse-all
  useEffect(() => {
    if (collapseAll) setDosingOpen(false);
  }, [collapseAll]);

  const isFirstPriority = supplement.priority === "first";

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200 flex flex-col"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderTop: `3px solid ${tier.borderTop}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 6px 24px rgba(0,0,0,0.08)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 4px rgba(0,0,0,0.04)";
        (e.currentTarget as HTMLDivElement).style.transform = "";
      }}
    >
      {/* ── Header strip: tier badge + priority badge + name ── */}
      <div
        className="px-4 pt-4 pb-3"
        style={{ borderBottom: `1px solid ${tier.border}`, background: tier.bg }}
      >
        {/* Badge row: evidence tier (left) + priority badge (right, if applicable) */}
        <div className="flex items-center justify-between gap-2 mb-2.5 flex-wrap">
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-bold uppercase tracking-[0.08em]"
            style={{
              background: "white",
              color: tier.color,
              border: `1.5px solid ${tier.border}`,
              boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
            }}
          >
            {tier.icon}
            {tier.label}
          </span>

          {/* Priority badge — only for first and second */}
          {isFirstPriority && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.67rem] font-bold uppercase tracking-[0.08em]"
              style={{
                background: "white",
                color: "var(--sage)",
                border: "1.5px solid rgba(91,123,94,0.35)",
                boxShadow: "0 1px 4px rgba(91,123,94,0.12)",
              }}
            >
              {/* Star */}
              <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
                <path d="M5 1l1.1 2.5L9 3.8 6.9 5.8l.6 3L5 7.5l-2.5 1.3.6-3L1 3.8l2.9-.3z" />
              </svg>
              Start Here
            </span>
          )}
          {supplement.priority === "second" && (
            <span
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[0.67rem] font-bold uppercase tracking-[0.08em]"
              style={{
                background: "white",
                color: "var(--gold)",
                border: "1.5px solid rgba(196,162,101,0.3)",
              }}
            >
              Add Next
            </span>
          )}
        </div>

        {/* Name */}
        <h3
          className="font-serif font-semibold leading-snug"
          style={{ fontSize: "1.05rem", color: "var(--text)" }}
        >
          {supplement.name}
        </h3>
        <p
          className="text-[0.77rem] italic mt-0.5 leading-snug"
          style={{ color: "var(--text-muted)" }}
        >
          {supplement.tagline}
        </p>
      </div>

      {/* ── Card body ── */}
      <div className="px-4 pt-3.5 pb-4 flex flex-col flex-1">
        {/* Evidence note — colored, positioned right below the header for scanability */}
        <p
          className="text-[0.76rem] leading-relaxed mb-3"
          style={{ color: tier.color }}
        >
          {supplement.evidenceNote}
        </p>

        {/* What it does */}
        <div className="mb-3.5">
          <p
            className="text-[0.65rem] font-bold uppercase tracking-[0.1em] mb-1"
            style={{ color: "var(--text-muted)" }}
          >
            What it does
          </p>
          <p
            className="text-[0.84rem] leading-relaxed"
            style={{ color: "var(--text)" }}
          >
            {supplement.whatItDoes}
          </p>
        </div>

        {/* Why HSA — sage insight box, distinct from the rest */}
        <div
          className="rounded-xl px-3.5 py-3 mb-3.5"
          style={{
            background: "rgba(91,123,94,0.06)",
            borderLeft: "3px solid var(--sage)",
          }}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            {/* Small "HSA" label pill */}
            <span
              className="inline-flex items-center px-1.5 py-0.5 rounded text-[0.6rem] font-black uppercase tracking-[0.1em]"
              style={{
                background: "var(--sage)",
                color: "white",
                letterSpacing: "0.12em",
              }}
            >
              HSA
            </span>
            <p
              className="text-[0.65rem] font-bold uppercase tracking-[0.1em]"
              style={{ color: "var(--sage)" }}
            >
              Why it matters
            </p>
          </div>
          <p
            className="text-[0.83rem] leading-relaxed"
            style={{ color: "var(--text)" }}
          >
            {supplement.whyHSA}
          </p>
        </div>

        {/* Dosing table — collapsible with prominent toggle */}
        <div className="mb-3.5">
          <button
            type="button"
            onClick={() => setDosingOpen(!dosingOpen)}
            className="w-full flex items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl text-[0.78rem] font-semibold cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sage"
            style={{
              background: dosingOpen ? "rgba(91,123,94,0.08)" : "rgba(91,123,94,0.05)",
              border: `1px solid ${dosingOpen ? "rgba(91,123,94,0.2)" : "rgba(91,123,94,0.12)"}`,
              color: "var(--sage)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "rgba(91,123,94,0.1)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(91,123,94,0.25)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = dosingOpen
                ? "rgba(91,123,94,0.08)"
                : "rgba(91,123,94,0.05)";
              (e.currentTarget as HTMLButtonElement).style.borderColor = dosingOpen
                ? "rgba(91,123,94,0.2)"
                : "rgba(91,123,94,0.12)";
            }}
          >
            <span className="flex items-center gap-2">
              {/* Pill/scale icon */}
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <rect x="1.5" y="5.5" width="10" height="4" rx="2" stroke="currentColor" strokeWidth="1.2"/>
                <path d="M6.5 5.5V3M4.5 3h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              {dosingOpen ? "Hide dosing by weight" : "Show dosing by weight"}
            </span>
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              style={{
                transition: "transform 0.25s ease",
                transform: dosingOpen ? "rotate(180deg)" : "rotate(0deg)",
                flexShrink: 0,
              }}
            >
              <path
                d="M3 5l3.5 3.5L10 5"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Collapsible dosing table with CSS transition trick */}
          <div
            style={{
              display: "grid",
              gridTemplateRows: dosingOpen ? "1fr" : "0fr",
              transition: "grid-template-rows 0.28s ease",
            }}
          >
            <div style={{ overflow: "hidden" }}>
              <div
                className="mt-2 rounded-xl overflow-hidden"
                style={{ border: "1px solid var(--border)" }}
              >
                <table className="w-full text-[0.78rem]">
                  <thead>
                    <tr
                      style={{
                        background: "rgba(91,123,94,0.05)",
                        borderBottom: "1px solid var(--border)",
                      }}
                    >
                      <th
                        className="text-left px-3.5 py-2 font-semibold text-[0.68rem] uppercase tracking-[0.08em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Dog Weight
                      </th>
                      <th
                        className="text-left px-3.5 py-2 font-semibold text-[0.68rem] uppercase tracking-[0.08em]"
                        style={{ color: "var(--text-muted)" }}
                      >
                        Daily Dose
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {WEIGHT_ROWS.map((row, i) => {
                      const isHighlighted = highlightBracket === row.key;
                      return (
                        <tr
                          key={row.key}
                          style={{
                            borderTop: "1px solid var(--border)",
                            background: isHighlighted
                              ? "rgba(91,123,94,0.1)"
                              : i % 2 === 0
                              ? "white"
                              : "rgba(91,123,94,0.02)",
                          }}
                        >
                          <td
                            className="px-3.5 py-2.5 whitespace-nowrap text-[0.78rem]"
                            style={{
                              color: isHighlighted ? "var(--sage)" : "var(--sage)",
                              fontWeight: isHighlighted ? 700 : 600,
                              verticalAlign: "top",
                            }}
                          >
                            <span className="flex items-center gap-1.5">
                              {isHighlighted && (
                                <span
                                  className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                  style={{ background: "var(--sage)" }}
                                  aria-hidden="true"
                                />
                              )}
                              {row.label}
                              {isHighlighted && (
                                <span
                                  className="text-[0.62rem] font-bold uppercase tracking-[0.07em]"
                                  style={{ color: "var(--sage)", opacity: 0.75 }}
                                >
                                  your dog
                                </span>
                              )}
                            </span>
                          </td>
                          <td
                            className="px-3.5 py-2.5 leading-relaxed text-[0.78rem]"
                            style={{
                              color: "var(--text)",
                              fontWeight: isHighlighted ? 500 : undefined,
                              verticalAlign: "top",
                            }}
                          >
                            {supplement.dosing[row.key]}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {highlightBracket && (
                <p
                  className="text-[0.71rem] px-3.5 py-1.5"
                  style={{
                    color: "var(--sage)",
                    background: "rgba(91,123,94,0.04)",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  Highlighted row matches your dog&apos;s weight.
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Separator */}
        <div
          className="mb-3"
          style={{ height: 1, background: "var(--border)" }}
        />

        {/* Key study — footnote style */}
        <div className="mb-3">
          <p
            className="text-[0.65rem] font-bold uppercase tracking-[0.1em] mb-1"
            style={{ color: "var(--text-muted)" }}
          >
            Key Study
          </p>
          <p
            className="text-[0.75rem] italic leading-relaxed"
            style={{ color: "var(--text-muted)", fontStyle: "italic" }}
          >
            <span
              className="not-italic mr-1"
              style={{ color: "var(--border-strong)", fontSize: "0.8rem" }}
              aria-hidden="true"
            >
              ¹
            </span>
            {supplement.keyStudy}
          </p>
        </div>

        {/* Sourcing note */}
        <div className="mb-3">
          <p
            className="text-[0.65rem] font-bold uppercase tracking-[0.1em] mb-1"
            style={{ color: "var(--text-muted)" }}
          >
            What to Buy
          </p>
          <p
            className="text-[0.82rem] leading-relaxed"
            style={{ color: "var(--text)" }}
          >
            {supplement.sourcingNote}
          </p>
        </div>

        {/* Caution — optional terracotta left-border box */}
        {supplement.cautions && (
          <div
            className="rounded-xl px-3.5 py-3 mt-auto"
            style={{
              background: "rgba(212,133,106,0.06)",
              borderLeft: "3px solid var(--terracotta)",
            }}
          >
            <div className="flex items-center gap-1.5 mb-1">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                <path
                  d="M5 1.5L1 8.5h8L5 1.5z"
                  stroke="var(--terracotta)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path d="M5 4.5v2" stroke="var(--terracotta)" strokeWidth="1.2" strokeLinecap="round" />
                <circle cx="5" cy="7.2" r="0.4" fill="var(--terracotta)" />
              </svg>
              <p
                className="text-[0.65rem] font-bold uppercase tracking-[0.1em]"
                style={{ color: "var(--terracotta)" }}
              >
                Caution
              </p>
            </div>
            <p
              className="text-[0.82rem] leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              {supplement.cautions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
