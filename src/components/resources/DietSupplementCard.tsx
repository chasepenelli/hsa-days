"use client";

import { useEffect, useState } from "react";
import type { DietSupplement, EvidenceTier, WeightBracket } from "@/lib/resources/types";

interface DietSupplementCardProps {
  supplement: DietSupplement;
  /** Pass the dog's weight in lbs to highlight the matching dosing row. */
  profileWeightLbs?: number | null;
  /** When true, collapse any open dosing panel. Driven by parent "collapse all". */
  collapseAll?: boolean;
  /** When true, omit the trailing divider (last item in the list). */
  isLast?: boolean;
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
    color: string;
    border: string;
    ruleColor: string;
    icon: React.ReactNode;
  }
> = {
  strong: {
    label: "Strong Evidence",
    color: "var(--sage)",
    border: "rgba(91,123,94,0.3)",
    ruleColor: "var(--sage)",
    icon: (
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
    color: "var(--gold-text)",
    border: "rgba(196,162,101,0.3)",
    ruleColor: "var(--gold)",
    icon: (
      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
        <rect x="1.5" y="6" width="2" height="3.5" rx="0.5" fill="var(--gold)" opacity="0.55" />
        <rect x="4.5" y="3.5" width="2" height="6" rx="0.5" fill="var(--gold)" opacity="0.75" />
        <rect x="7.5" y="5" width="2" height="4.5" rx="0.5" fill="var(--gold)" />
      </svg>
    ),
  },
  emerging: {
    label: "Emerging Evidence",
    color: "var(--text-muted)",
    border: "rgba(0,0,0,0.12)",
    ruleColor: "var(--border-strong)",
    icon: (
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
  isLast = false,
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
    <div>
      {/* ── Badge row ── */}
      <div className="flex items-center gap-2 flex-wrap mb-3">
        <span
          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full font-bold uppercase"
          style={{
            fontSize: "0.68rem",
            letterSpacing: "0.08em",
            background: "white",
            color: tier.color,
            border: `1.5px solid ${tier.border}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
          }}
        >
          {tier.icon}
          {tier.label}
        </span>

        {isFirstPriority && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold uppercase"
            style={{
              fontSize: "0.67rem",
              letterSpacing: "0.08em",
              background: "white",
              color: "var(--sage)",
              border: "1.5px solid rgba(91,123,94,0.35)",
              boxShadow: "0 1px 4px rgba(91,123,94,0.12)",
            }}
          >
            <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true">
              <path d="M5 1l1.1 2.5L9 3.8 6.9 5.8l.6 3L5 7.5l-2.5 1.3.6-3L1 3.8l2.9-.3z" />
            </svg>
            Start Here
          </span>
        )}
        {supplement.priority === "second" && (
          <span
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold uppercase"
            style={{
              fontSize: "0.67rem",
              letterSpacing: "0.08em",
              background: "white",
              color: "var(--gold-text)",
              border: "1.5px solid rgba(196,162,101,0.3)",
            }}
          >
            Add Next
          </span>
        )}
      </div>

      {/* ── Name + tagline ── */}
      <h3
        className="font-serif font-semibold leading-snug mb-1"
        style={{
          fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)",
          color: "var(--text)",
        }}
      >
        {supplement.name}
      </h3>
      <p
        className="italic leading-snug mb-5"
        style={{ fontSize: "0.88rem", color: "var(--text-muted)" }}
      >
        {supplement.tagline}
      </p>

      {/* ── Thin accent rule ── */}
      <div
        className="mb-5"
        style={{
          width: 48,
          height: 2,
          background: tier.ruleColor,
          borderRadius: 1,
        }}
      />

      {/* ── What it does ── */}
      <div className="mb-6">
        <p
          className="font-bold uppercase mb-1.5"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: "var(--text-muted)",
          }}
        >
          What it does
        </p>
        <p
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.75,
            color: "var(--text)",
          }}
        >
          {supplement.whatItDoes}
        </p>
      </div>

      {/* ── Why it matters for HSA — left-border pull-quote ── */}
      <div
        className="mb-6"
        style={{
          borderLeft: "3px solid var(--sage)",
          paddingLeft: "1rem",
        }}
      >
        <p
          className="font-bold uppercase mb-1.5"
          style={{
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: "var(--sage)",
          }}
        >
          Why it matters for HSA
        </p>
        <p
          style={{
            fontSize: "0.92rem",
            lineHeight: 1.75,
            color: "var(--text)",
          }}
        >
          {supplement.whyHSA}
        </p>
      </div>

      {/* ── Dosing toggle ── */}
      <div className="mb-6">
        <button
          type="button"
          onClick={() => setDosingOpen(!dosingOpen)}
          className="inline-flex items-center gap-2 cursor-pointer transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sage"
          style={{
            fontSize: "0.82rem",
            fontWeight: 600,
            color: "var(--sage)",
            background: "none",
            border: "none",
            padding: 0,
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 12 12"
            fill="none"
            style={{
              transition: "transform 0.25s ease",
              transform: dosingOpen ? "rotate(90deg)" : "rotate(0deg)",
              flexShrink: 0,
            }}
          >
            <path
              d="M4 2l4.5 4-4.5 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {dosingOpen ? "Hide dosing by weight" : "Show dosing by weight"}
        </button>

        {/* Collapsible dosing table */}
        <div
          style={{
            display: "grid",
            gridTemplateRows: dosingOpen ? "1fr" : "0fr",
            transition: "grid-template-rows 0.28s ease",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div
              className="mt-3 rounded-lg overflow-hidden"
              style={{ border: "1px solid var(--border)" }}
            >
              <table className="w-full" style={{ fontSize: "0.78rem" }}>
                <thead>
                  <tr
                    style={{
                      background: "rgba(91,123,94,0.05)",
                      borderBottom: "1px solid var(--border)",
                    }}
                  >
                    <th
                      className="text-left px-3.5 py-2 font-semibold uppercase"
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                      }}
                    >
                      Dog Weight
                    </th>
                    <th
                      className="text-left px-3.5 py-2 font-semibold uppercase"
                      style={{
                        fontSize: "0.68rem",
                        letterSpacing: "0.08em",
                        color: "var(--text-muted)",
                      }}
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
                          className="px-3.5 py-2.5 whitespace-nowrap"
                          style={{
                            fontSize: "0.78rem",
                            color: "var(--sage)",
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
                                className="font-bold uppercase"
                                style={{
                                  fontSize: "0.62rem",
                                  letterSpacing: "0.07em",
                                  color: "var(--sage)",
                                  opacity: 0.75,
                                }}
                              >
                                your dog
                              </span>
                            )}
                          </span>
                        </td>
                        <td
                          className="px-3.5 py-2.5 leading-relaxed"
                          style={{
                            fontSize: "0.78rem",
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
                className="px-3.5 py-1.5"
                style={{
                  fontSize: "0.71rem",
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

      {/* ── Key Study — footnote ── */}
      <p
        className="italic mb-2"
        style={{ fontSize: "0.78rem", color: "var(--text-muted)" }}
      >
        <span
          className="not-italic mr-1"
          style={{ color: "var(--border-strong)", fontSize: "0.85rem" }}
          aria-hidden="true"
        >
          &#185;
        </span>
        Key Study &mdash; {supplement.keyStudy}
      </p>

      {/* ── What to Buy ── */}
      <p className="mb-4" style={{ fontSize: "0.85rem", color: "var(--text)" }}>
        <span style={{ fontWeight: 600 }}>What to Buy</span> &mdash;{" "}
        {supplement.sourcingNote}
      </p>

      {/* ── Caution — terracotta left border ── */}
      {supplement.cautions && (
        <div
          style={{
            borderLeft: "3px solid var(--terracotta)",
            paddingLeft: "1rem",
          }}
        >
          <p
            className="flex items-center gap-1.5 font-bold uppercase mb-1"
            style={{
              fontSize: "0.65rem",
              letterSpacing: "0.1em",
              color: "var(--terracotta)",
            }}
          >
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
            Caution
          </p>
          <p
            className="leading-relaxed"
            style={{ fontSize: "0.85rem", color: "var(--text)" }}
          >
            {supplement.cautions}
          </p>
        </div>
      )}

      {/* ── Divider between supplements ── */}
      {!isLast && (
        <div
          className="my-14"
          style={{ height: 1, background: "var(--border)" }}
        />
      )}
    </div>
  );
}
