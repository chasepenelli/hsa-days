"use client";

import { useState } from "react";
import type { Supplement, WeightBracket, EvidenceLevel } from "@/lib/resources/types";
import { getBreedNote } from "@/lib/resources/personalize";
import DosageTable from "./DosageTable";

interface SupplementStarterCardProps {
  supplement: Supplement;
  categoryLabel: string;
  categoryColor: string;
  personalDose: string | null;
  dogName: string | null;
  userBracket: WeightBracket | null;
  breed: string | null;
  isTracked: boolean;
  usageCount: number;
  isAuthenticated: boolean;
  onToggleTrack: (slug: string) => void;
}

function EvidenceBadge({ level }: { level: EvidenceLevel }) {
  if (level === "studied-in-hsa") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
        style={{
          fontSize: "var(--text-fine)",
          background: "var(--sage)",
          color: "white",
        }}
      >
        <svg
          width="11"
          height="11"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
        Studied in HSA
      </span>
    );
  }

  if (level === "veterinary-use") {
    return (
      <span
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
        style={{
          fontSize: "var(--text-fine)",
          background: "transparent",
          color: "var(--gold-text)",
          border: "1.5px solid var(--gold)",
        }}
      >
        Veterinary use
      </span>
    );
  }

  return (
    <span
      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-medium"
      style={{
        fontSize: "var(--text-fine)",
        background: "transparent",
        color: "var(--text-muted)",
        border: "1.5px solid var(--border)",
      }}
    >
      Emerging
    </span>
  );
}

export default function SupplementStarterCard({
  supplement,
  categoryLabel,
  categoryColor,
  personalDose,
  dogName,
  userBracket,
  breed,
  isTracked,
  usageCount,
  isAuthenticated,
  onToggleTrack,
}: SupplementStarterCardProps) {
  const [expanded, setExpanded] = useState(false);
  const breedNote = getBreedNote(supplement.breedNotes, breed);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={expanded}
      className="rounded-2xl cursor-pointer"
      style={{
        background: "#fff",
        borderLeft: `4px solid ${categoryColor}`,
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
      onClick={() => setExpanded(!expanded)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded(!expanded);
        }
      }}
    >
      <div className="px-5 py-5">
        {/* Top row: category pill + evidence badge */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span
            className="inline-block rounded-full px-2.5 py-0.5 font-medium"
            style={{
              fontSize: "var(--text-fine)",
              background: `${categoryColor}1a`,
              color: categoryColor,
            }}
          >
            {categoryLabel}
          </span>
          <EvidenceBadge level={supplement.evidenceLevel} />
        </div>

        {/* Name */}
        <h3
          className="font-serif font-semibold mb-1"
          style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
        >
          {supplement.name}
        </h3>

        {/* Tagline */}
        <p
          className="leading-relaxed"
          style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
        >
          {supplement.tagline}
        </p>

        {/* Dose callout */}
        <div
          className="rounded-xl px-4 py-3 mt-3"
          style={{ background: "rgba(91,123,94,0.06)" }}
        >
          {personalDose ? (
            <>
              <p
                className="font-medium"
                style={{ fontSize: "var(--text-body)", color: "var(--sage)" }}
              >
                {dogName ? `${dogName}\u2019s dose` : "Your dose"}: {personalDose}
              </p>
              <p
                className="mt-0.5"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                {supplement.frequency}
              </p>
            </>
          ) : (
            <p
              className="font-medium"
              style={{ fontSize: "var(--text-body)", color: "var(--gold-text)" }}
            >
              Add {dogName ? `${dogName}\u2019s` : "your dog\u2019s"} weight for personalized dosing
            </p>
          )}
        </div>

        {/* Tracking toggle */}
        {isAuthenticated ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleTrack(supplement.slug);
            }}
            className="supplement-track-btn w-full flex items-center justify-center gap-2 rounded-xl mt-3 cursor-pointer"
            style={{
              minHeight: 48,
              padding: "12px 20px",
              fontSize: "var(--text-body)",
              fontWeight: 500,
              border: "none",
              ...(isTracked
                ? {
                    background: "var(--sage)",
                    color: "white",
                  }
                : {
                    background: "transparent",
                    color: "var(--sage)",
                    border: "1.5px dashed rgba(91,123,94,0.3)",
                  }),
            }}
          >
            {isTracked ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Tracking this supplement
              </>
            ) : (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                I&apos;m giving this
              </>
            )}
          </button>
        ) : (
          <a
            href="/login"
            onClick={(e) => e.stopPropagation()}
            className="w-full flex items-center justify-center gap-2 rounded-xl mt-3 no-underline transition-colors hover:border-sage-light"
            style={{
              minHeight: 48,
              padding: "12px 20px",
              fontSize: "var(--text-body-sm)",
              color: "var(--text-muted)",
              background: "rgba(0,0,0,0.02)",
              border: "1px solid var(--border)",
            }}
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            Sign in to track
          </a>
        )}
      </div>

      {/* Expandable detail section — grid-template-rows animation */}
      <div className={`supplement-expand ${expanded ? "is-open" : ""}`}>
        <div>
          <div
            className="px-5 pb-5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {/* Description */}
            <p
              className="leading-relaxed mt-4 mb-4"
              style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
            >
              {supplement.description}
            </p>

            {/* Dosage table */}
            <div className="mb-5">
              <p
                className="font-semibold uppercase tracking-[0.10em] mb-2"
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--text-muted)",
                }}
              >
                Dosage by weight
              </p>
              <DosageTable
                dosage={supplement.dosage}
                frequency={supplement.frequency}
                userBracket={userBracket}
              />
            </div>

            {/* Breed note */}
            {breedNote && (
              <div
                className="rounded-xl px-4 py-3 mb-4"
                style={{
                  background: "rgba(196,162,101,0.06)",
                  borderLeft: "3px solid var(--gold)",
                }}
              >
                <p
                  className="font-semibold uppercase tracking-[0.08em]"
                  style={{
                    fontSize: "var(--text-label)",
                    color: "var(--gold-text)",
                  }}
                >
                  Breed note
                </p>
                <p
                  className="mt-1 leading-relaxed"
                  style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
                >
                  {breedNote}
                </p>
              </div>
            )}

            {/* Warnings */}
            {supplement.warnings && supplement.warnings.length > 0 && (
              <div
                className="rounded-xl px-4 py-3 mb-4"
                style={{
                  background: "rgba(212,133,106,0.06)",
                  borderLeft: "3px solid var(--terracotta)",
                }}
              >
                <p
                  className="font-semibold uppercase tracking-[0.08em] mb-2"
                  style={{
                    fontSize: "var(--text-label)",
                    color: "var(--terracotta)",
                  }}
                >
                  Important
                </p>
                <ul className="space-y-1.5">
                  {supplement.warnings.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                      style={{
                        fontSize: "var(--text-body)",
                        color: "var(--text)",
                      }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--terracotta)" }}
                      />
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Vet discussion points */}
            <div className="mb-3">
              <p
                className="font-semibold uppercase tracking-[0.10em] mb-2"
                style={{
                  fontSize: "var(--text-label)",
                  color: "var(--text-muted)",
                }}
              >
                Discuss with your vet
              </p>
              <ul className="space-y-1.5">
                {supplement.vetDiscussionPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                    style={{
                      fontSize: "var(--text-body)",
                      color: "var(--text)",
                    }}
                  >
                    <span
                      className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: "var(--sage)" }}
                    />
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Usage count */}
            {usageCount > 0 && (
              <p
                className="mt-3 flex items-center gap-1.5"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                {usageCount} {usageCount === 1 ? "family" : "families"} using
                this
              </p>
            )}

            {/* Sources */}
            {supplement.sources && supplement.sources.length > 0 && (
              <div
                className="mt-4 pt-3"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p
                  className="font-semibold uppercase tracking-[0.10em] mb-1.5"
                  style={{
                    fontSize: "var(--text-label)",
                    color: "var(--text-muted)",
                  }}
                >
                  Sources
                </p>
                {supplement.sources.map((source, i) => (
                  <p
                    key={i}
                    className="italic leading-relaxed"
                    style={{
                      fontSize: "var(--text-fine)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {source}
                  </p>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
