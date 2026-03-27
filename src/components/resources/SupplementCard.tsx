"use client";
import { useState } from "react";
import type { Supplement, WeightBracket } from "@/lib/resources/types";
import { getBreedNote } from "@/lib/resources/personalize";
import DosageTable from "./DosageTable";

interface SupplementCardProps {
  supplement: Supplement;
  userBracket: WeightBracket | null;
  userDose: string | null;
  breed: string | null;
  accentColor: string;
  isTracked: boolean;
  usageCount: number;
  isAuthenticated: boolean;
  dogName: string | null;
  onToggleTrack: (slug: string) => void;
}

export default function SupplementCard({
  supplement,
  userBracket,
  userDose,
  breed,
  accentColor,
  isTracked,
  usageCount,
  isAuthenticated,
  dogName,
  onToggleTrack,
}: SupplementCardProps) {
  const [expanded, setExpanded] = useState(false);
  const breedNote = getBreedNote(supplement.breedNotes, breed);

  return (
    <div
      className="supplement-card"
      style={{
        borderLeft: `3px solid ${expanded ? accentColor : "transparent"}`,
        borderColor: expanded ? `${accentColor}30` : undefined,
        boxShadow: expanded
          ? `0 4px 20px ${accentColor}14`
          : "0 1px 3px rgba(0,0,0,0.03)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = `0 5px 20px ${accentColor}18`;
        if (!expanded) {
          el.style.borderColor = `${accentColor}28`;
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.boxShadow = expanded
          ? `0 4px 20px ${accentColor}14`
          : "0 1px 3px rgba(0,0,0,0.03)";
        if (!expanded) {
          el.style.borderColor = "";
        }
      }}
    >
      {/* Collapsed header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-5 py-5 sm:px-6 sm:py-6 flex items-start justify-between gap-4"
        style={{ background: "none", border: "none", cursor: "pointer" }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: accentColor }}
            />
            <h3
              className="font-serif font-semibold"
              style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
            >
              {supplement.name}
            </h3>
            {/* Usage badge — shown in collapsed view */}
            {usageCount > 0 && (
              <span
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-medium flex-shrink-0"
              style={{
                fontSize: "var(--text-fine)",
                background: "rgba(91,123,94,0.08)",
                color: "var(--sage)",
              }}
              >
                <svg
                  width="11"
                  height="11"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                </svg>
                {usageCount}
              </span>
            )}
          </div>
          <p
            className="leading-relaxed"
            style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
          >
            {supplement.tagline}
          </p>
          {userDose && (
            <p
              className="font-medium mt-1.5"
              style={{ fontSize: "var(--text-body)", color: "var(--sage)" }}
            >
              Your dose: {userDose}
            </p>
          )}
        </div>
        {/* Chevron */}
        <svg
          width="18"
          height="18"
          viewBox="0 0 20 20"
          fill="none"
          className="flex-shrink-0 mt-1"
          style={{
            transition: "transform 0.28s cubic-bezier(0.22, 1, 0.36, 1)",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            color: "var(--text-muted)",
          }}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Expanded details — animated via CSS grid rows */}
      <div className={`supplement-expand ${expanded ? "is-open" : ""}`}>
        {/* This inner div must be the direct child that gets overflow:hidden */}
        <div>
          <div
            className="px-5 pb-5 sm:px-6 sm:pb-6"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            {/* Tracking toggle + usage count */}
            <div className="mt-4 mb-5 flex flex-wrap items-center gap-3">
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleTrack(supplement.slug);
                  }}
                  className={`supplement-track-btn inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium cursor-pointer ${isTracked ? "is-tracked" : ""}`}
                  style={
                    isTracked
                      ? {
                          fontSize: "var(--text-body-sm)",
                          background: "var(--sage)",
                          color: "white",
                          border: "1px solid var(--sage)",
                        }
                      : {
                          fontSize: "var(--text-body-sm)",
                          background: "transparent",
                          color: "var(--sage)",
                          border: "1px solid rgba(91,123,94,0.3)",
                        }
                  }
                >
                  {isTracked ? (
                    <>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                      Tracking this
                    </>
                  ) : (
                    <>
                      <svg
                        width="14"
                        height="14"
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
                      We&apos;re giving this to {dogName || "our dog"}
                    </>
                  )}
                </button>
              )}
              {usageCount > 0 && (
                <span
                  className="inline-flex items-center gap-1.5"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
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
                  {usageCount}{" "}
                  {usageCount === 1 ? "family" : "families"} using this
                </span>
              )}
            </div>

            {/* Description */}
            <p
              className="leading-relaxed mb-4"
              style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
            >
              {supplement.description}
            </p>

            {/* Dosage table */}
            <div className="mb-5">
              <p
                className="font-semibold uppercase tracking-[0.10em] mb-2"
                style={{ fontSize: "var(--text-label)", color: "var(--text-muted)" }}
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
                  style={{ fontSize: "var(--text-label)", color: "var(--gold-text)" }}
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
                  style={{ fontSize: "var(--text-label)", color: "var(--terracotta)" }}
                >
                  Important
                </p>
                <ul className="space-y-1.5">
                  {supplement.warnings.map((w, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2"
                      style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
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
                style={{ fontSize: "var(--text-label)", color: "var(--text-muted)" }}
              >
                Discuss with your vet
              </p>
              <ul className="space-y-1.5">
                {supplement.vetDiscussionPoints.map((point, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                    style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
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

            {/* Sources */}
            {supplement.sources && supplement.sources.length > 0 && (
              <div
                className="mt-4 pt-3"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p
                  className="font-semibold uppercase tracking-[0.10em] mb-1.5"
                  style={{ fontSize: "var(--text-label)", color: "var(--text-muted)" }}
                >
                  Sources
                </p>
                {supplement.sources.map((source, i) => (
                  <p
                    key={i}
                    className="italic leading-relaxed"
                    style={{ fontSize: "var(--text-fine)", color: "var(--text-muted)" }}
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
