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
}

export default function SupplementCard({
  supplement,
  userBracket,
  userDose,
  breed,
  accentColor,
}: SupplementCardProps) {
  const [expanded, setExpanded] = useState(false);
  const breedNote = getBreedNote(supplement.breedNotes, breed);

  return (
    <div
      className="bg-white rounded-2xl transition-all duration-200 hover:shadow-[0_4px_20px_rgba(0,0,0,0.05)]"
      style={{ border: "1px solid var(--border)" }}
    >
      {/* Collapsed header — always visible */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left px-6 py-5 flex items-start justify-between gap-4 cursor-pointer"
        style={{ background: "none", border: "none" }}
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <div
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ background: accentColor }}
            />
            <h3
              className="font-serif text-[1.05rem] font-semibold truncate"
              style={{ color: "var(--text)" }}
            >
              {supplement.name}
            </h3>
          </div>
          <p
            className="text-[0.85rem] leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {supplement.tagline}
          </p>
          {userDose && (
            <p
              className="text-[0.82rem] font-medium mt-1.5"
              style={{ color: "var(--sage)" }}
            >
              Your dose: {userDose}
            </p>
          )}
        </div>
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          className="flex-shrink-0 mt-1 transition-transform duration-200"
          style={{
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

      {/* Expanded details */}
      {expanded && (
        <div
          className="px-6 pb-6 animate-fade-in"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="text-[0.88rem] leading-relaxed mt-4 mb-4"
            style={{ color: "var(--text)" }}
          >
            {supplement.description}
          </p>

          {/* Dosage table */}
          <div className="mb-4">
            <p
              className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] mb-2"
              style={{ color: "var(--text-muted)" }}
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
              <p className="text-[0.82rem] font-medium" style={{ color: "var(--gold)" }}>
                Breed note
              </p>
              <p
                className="text-[0.85rem] mt-1"
                style={{ color: "var(--text)" }}
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
                className="text-[0.82rem] font-medium mb-1"
                style={{ color: "var(--terracotta)" }}
              >
                Important
              </p>
              <ul className="space-y-1">
                {supplement.warnings.map((w, i) => (
                  <li
                    key={i}
                    className="text-[0.85rem]"
                    style={{ color: "var(--text)" }}
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Vet discussion points */}
          <div className="mb-3">
            <p
              className="text-[0.8rem] font-semibold uppercase tracking-[0.08em] mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              Discuss with your vet
            </p>
            <ul className="space-y-1.5">
              {supplement.vetDiscussionPoints.map((point, i) => (
                <li
                  key={i}
                  className="text-[0.85rem] flex items-start gap-2"
                  style={{ color: "var(--text)" }}
                >
                  <span
                    className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--sage)" }}
                  />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* Sources */}
          {supplement.sources && supplement.sources.length > 0 && (
            <div className="mt-4 pt-3" style={{ borderTop: "1px solid var(--border)" }}>
              <p
                className="text-[0.75rem] font-semibold uppercase tracking-[0.08em] mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                Sources
              </p>
              {supplement.sources.map((source, i) => (
                <p
                  key={i}
                  className="text-[0.78rem] italic"
                  style={{ color: "var(--text-muted)" }}
                >
                  {source}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
