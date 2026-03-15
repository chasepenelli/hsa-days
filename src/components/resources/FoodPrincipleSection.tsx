"use client";

import { useState } from "react";
import Image from "next/image";
import type { DietPrinciple, ClinicalReference } from "@/lib/resources/types";

interface FoodPrincipleSectionProps {
  principle: DietPrinciple;
  index: number;
  defaultExpanded?: boolean;
}

function ReferenceCard({ reference }: { reference: ClinicalReference }) {
  const pubmedUrl = reference.pmid
    ? `https://pubmed.ncbi.nlm.nih.gov/${reference.pmid}/`
    : null;

  return (
    <div
      className="rounded-xl px-4 py-3"
      style={{
        background: "rgba(91,123,94,0.03)",
        border: "1px solid var(--border)",
      }}
    >
      <p
        className="font-serif font-medium leading-snug mb-1"
        style={{ color: "var(--text)", fontSize: "var(--text-body-sm)" }}
      >
        {reference.title}
      </p>
      <p className="mb-2" style={{ color: "var(--text-muted)", fontSize: "var(--text-fine)" }}>
        {reference.authors} &middot; <em>{reference.journal}</em>,{" "}
        {reference.year}
        {pubmedUrl && (
          <>
            {" "}
            &middot;{" "}
            <a
              href={pubmedUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
              style={{ color: "var(--sage)" }}
              onClick={(e) => e.stopPropagation()}
            >
              PubMed
            </a>
          </>
        )}
      </p>
      <p className="leading-relaxed" style={{ color: "var(--text)", fontSize: "var(--text-body-sm)" }}>
        {reference.summary}
      </p>
    </div>
  );
}

export default function FoodPrincipleSection({
  principle,
  index,
  defaultExpanded = false,
}: FoodPrincipleSectionProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);
  const num = String(index + 1).padStart(2, "0");

  return (
    <div>
      {/* Header — always visible */}
      <div className="flex items-start gap-5">
        {/* Illustration */}
        <div
          className="flex-shrink-0 w-[100px] h-[100px] sm:w-[120px] sm:h-[120px] relative rounded-2xl overflow-hidden"
          style={{
            background:
              "linear-gradient(135deg, rgba(91,123,94,0.06) 0%, rgba(245,240,234,0.5) 100%)",
            border: "1px solid var(--border)",
          }}
        >
          <Image
            src={`/illustrations/food/${principle.icon}`}
            alt=""
            fill
            className="object-cover p-2"
            sizes="120px"
          />
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <div className="flex items-start gap-3">
            {/* Ghost number */}
            <span
              className="font-serif text-[2.5rem] sm:text-[3rem] font-bold leading-none select-none flex-shrink-0"
              style={{ color: "var(--sage)", opacity: 0.12 }}
            >
              {num}
            </span>
            <div className="flex-1">
              <h3
                className="font-serif font-semibold mb-1.5"
                style={{ color: "var(--text)", fontSize: "var(--text-h3)" }}
              >
                {principle.title}
              </h3>
              <p
                className="leading-relaxed"
                style={{ color: "var(--text-muted)", fontSize: "var(--text-body-sm)" }}
              >
                {principle.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setExpanded((o) => !o)}
        className="flex items-center gap-1.5 mt-4 transition-opacity hover:opacity-70"
        style={{
          color: "var(--sage)",
          fontSize: "var(--text-body-sm)",
          background: "none",
          border: "none",
          padding: 0,
          cursor: "pointer",
        }}
      >
        <span className="font-semibold">
          {expanded ? "Hide the science" : "Read the science"}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 16 16"
          fill="none"
          className="transition-transform duration-300"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Collapsible deep dive + references */}
      <div
        style={{
          display: "grid",
          gridTemplateRows: expanded ? "1fr" : "0fr",
          transition: "grid-template-rows 300ms ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          {/* Deep dive paragraphs */}
          <div className="space-y-4 mt-5 mb-5">
            {principle.deepDive.map((paragraph, i) => (
              <p
                key={i}
                className="leading-[1.75]"
                style={{ color: "var(--text)", fontSize: "var(--text-body)" }}
              >
                {paragraph}
              </p>
            ))}
          </div>

          {/* Detail bullets */}
          <div
            className="rounded-xl px-5 py-4 mb-5"
            style={{
              background:
                "linear-gradient(135deg, rgba(91,123,94,0.04) 0%, rgba(245,240,234,0.4) 100%)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="font-semibold uppercase tracking-[0.08em] mb-3"
              style={{ color: "var(--sage)", fontSize: "var(--text-label)" }}
            >
              Quick Reference
            </p>
            <ul className="space-y-2">
              {principle.details.map((detail, j) => (
                <li
                  key={j}
                  className="flex items-start gap-2"
                  style={{ color: "var(--text)", fontSize: "var(--text-body)" }}
                >
                  <span
                    className="mt-2 w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{ background: "var(--sage)" }}
                  />
                  {detail}
                </li>
              ))}
            </ul>
          </div>

          {/* References */}
          {principle.references.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  style={{ color: "var(--text-muted)", flexShrink: 0 }}
                >
                  <path
                    d="M2 3h5l1 1h6v9H2V3z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M5 7h6M5 9.5h4"
                    stroke="currentColor"
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                </svg>
                <p
                  className="font-semibold uppercase tracking-[0.08em]"
                  style={{ color: "var(--text-muted)", fontSize: "var(--text-label)" }}
                >
                  Research &amp; References
                </p>
              </div>
              <div className="space-y-2">
                {principle.references.map((reference, k) => (
                  <ReferenceCard key={k} reference={reference} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
