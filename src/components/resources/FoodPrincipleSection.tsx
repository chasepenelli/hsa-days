"use client";

import Image from "next/image";
import type { DietPrinciple, ClinicalReference } from "@/lib/resources/types";

interface FoodPrincipleSectionProps {
  principle: DietPrinciple;
  index: number;
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
        className="font-serif text-[0.85rem] font-medium leading-snug mb-1"
        style={{ color: "var(--text)" }}
      >
        {reference.title}
      </p>
      <p className="text-[0.75rem] mb-2" style={{ color: "var(--text-muted)" }}>
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
      <p className="text-[0.8rem] leading-relaxed" style={{ color: "var(--text)" }}>
        {reference.summary}
      </p>
    </div>
  );
}

export default function FoodPrincipleSection({
  principle,
  index,
}: FoodPrincipleSectionProps) {
  const num = String(index + 1).padStart(2, "0");

  return (
    <div>
      {/* Header */}
      <div className="flex items-start gap-5 mb-5">
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
                className="font-serif text-[1.15rem] sm:text-[1.25rem] font-semibold mb-1.5"
                style={{ color: "var(--text)" }}
              >
                {principle.title}
              </h3>
              <p
                className="text-[0.9rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {principle.description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Deep dive paragraphs */}
      <div className="space-y-4 mb-5">
        {principle.deepDive.map((paragraph, i) => (
          <p
            key={i}
            className="text-[0.88rem] leading-[1.75]"
            style={{ color: "var(--text)" }}
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
          className="text-[0.78rem] font-semibold uppercase tracking-[0.08em] mb-3"
          style={{ color: "var(--sage)" }}
        >
          Quick Reference
        </p>
        <ul className="space-y-2">
          {principle.details.map((detail, j) => (
            <li
              key={j}
              className="text-[0.85rem] flex items-start gap-2"
              style={{ color: "var(--text)" }}
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
              className="text-[0.78rem] font-semibold uppercase tracking-[0.08em]"
              style={{ color: "var(--text-muted)" }}
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
  );
}
