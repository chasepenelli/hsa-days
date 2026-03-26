"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionDivider from "./SectionDivider";

// ── Type definitions ────────────────────────────────────────────────────────

interface TumorLocation {
  id: string;
  name: string;
  percentage: string;
  description: string;
  symptoms: string[];
  prognosis: string;
  accentColor: string;
}

interface StagingInfo {
  stage: string;
  title: string;
  description: string;
  medianSurvival: string;
}

interface DiagnosticTest {
  name: string;
  whatItIs: string;
  whyItsUsed: string;
  whatToExpect: string;
}

interface TreatmentPath {
  id: string;
  name: string;
  description: string;
  medianSurvival: string;
  costRange: string;
  details: string[];
  considerations: string;
}

interface BreedRisk {
  breed: string;
  riskLevel: "high" | "moderate" | "some-evidence";
  notes: string;
}

interface ClinicalTrial {
  name: string;
  institution: string;
  description: string;
  status: "enrolling" | "active" | "completed" | "planned";
  type: string;
}

interface ResearchBreakthrough {
  institution: string;
  title: string;
  finding: string;
  significance: string;
  year: number;
}

interface EpisodicWeaknessWarning {
  title: string;
  description: string;
  signs: string[];
  whatToDo: string;
}

interface KeyFact {
  fact: string;
  context: string;
}

// ── Slug metadata ────────────────────────────────────────────────────────────

const SLUG_META: Record<
  string,
  { eyebrow: string; color: string; illustration: string }
> = {
  "the-disease": {
    eyebrow: "Learn",
    color: "var(--terracotta)",
    illustration: "/illustrations/resources/hsa-hub-the-disease.png",
  },
  diagnosis: {
    eyebrow: "Understand",
    color: "var(--gold)",
    illustration: "/illustrations/resources/hsa-hub-diagnosis.png",
  },
  treatment: {
    eyebrow: "Decide",
    color: "var(--sage)",
    illustration: "/illustrations/resources/hsa-hub-treatment.png",
  },
  "breed-risks": {
    eyebrow: "Know",
    color: "var(--sage)",
    illustration: "/illustrations/resources/hsa-hub-breed-risks.png",
  },
  research: {
    eyebrow: "Discover",
    color: "var(--gold)",
    illustration: "/illustrations/resources/hsa-hub-research.png",
  },
  "vet-questions": {
    eyebrow: "Prepare",
    color: "var(--terracotta)",
    illustration: "/illustrations/resources/hsa-hub-vet-questions.png",
  },
};

// Suggested related topics per slug (2-3 others to show at the bottom)
const RELATED: Record<string, { slug: string; title: string }[]> = {
  "the-disease": [
    { slug: "diagnosis", title: "Diagnosis & Staging" },
    { slug: "treatment", title: "Treatment Options" },
    { slug: "vet-questions", title: "Questions for Your Vet" },
  ],
  diagnosis: [
    { slug: "the-disease", title: "The Disease" },
    { slug: "treatment", title: "Treatment Options" },
    { slug: "vet-questions", title: "Questions for Your Vet" },
  ],
  treatment: [
    { slug: "diagnosis", title: "Diagnosis & Staging" },
    { slug: "research", title: "Research & Hope" },
    { slug: "vet-questions", title: "Questions for Your Vet" },
  ],
  "breed-risks": [
    { slug: "the-disease", title: "The Disease" },
    { slug: "research", title: "Research & Hope" },
    { slug: "vet-questions", title: "Questions for Your Vet" },
  ],
  research: [
    { slug: "treatment", title: "Treatment Options" },
    { slug: "breed-risks", title: "Breed Risks" },
    { slug: "vet-questions", title: "Questions for Your Vet" },
  ],
  "vet-questions": [
    { slug: "the-disease", title: "The Disease" },
    { slug: "diagnosis", title: "Diagnosis & Staging" },
    { slug: "treatment", title: "Treatment Options" },
  ],
};

// ── Helper style functions ────────────────────────────────────────────────────

function riskBadgeStyle(riskLevel: BreedRisk["riskLevel"]) {
  if (riskLevel === "high") {
    return {
      background: "rgba(212,133,106,0.15)",
      color: "var(--terracotta)",
      label: "High Risk",
    };
  }
  if (riskLevel === "moderate") {
    return {
      background: "rgba(196,162,101,0.15)",
      color: "var(--gold)",
      label: "Moderate Risk",
    };
  }
  return {
    background: "rgba(91,123,94,0.12)",
    color: "var(--sage)",
    label: "Some Evidence",
  };
}

function trialStatusStyle(status: ClinicalTrial["status"]) {
  if (status === "enrolling") {
    return { background: "rgba(91,123,94,0.15)", color: "var(--sage)", label: "Enrolling" };
  }
  if (status === "active") {
    return { background: "rgba(196,162,101,0.15)", color: "var(--gold)", label: "Active" };
  }
  if (status === "completed") {
    return { background: "rgba(180,180,180,0.2)", color: "#777", label: "Completed" };
  }
  return { background: "rgba(196,162,101,0.12)", color: "var(--gold)", label: "Planned" };
}

// ── Section renderers ─────────────────────────────────────────────────────────

function TheDiseaseSection({
  data,
}: {
  data: {
    keyFacts: KeyFact[];
    tumorLocations: TumorLocation[];
    episodicWeaknessWarning: EpisodicWeaknessWarning;
  };
}) {
  const [openLocationSymptoms, setOpenLocationSymptoms] = useState<string | null>(null);

  return (
    <>
      {/* Key Facts */}
      <section className="mt-10">
        <h2
          className="font-serif font-semibold mb-6 reveal"
          style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
        >
          Key Facts
        </h2>
        <div className="space-y-4">
          {data.keyFacts.map((item, i) => (
            <div
              key={i}
              className="rounded-xl px-5 py-4 reveal"
              style={{
                background: "rgba(196,162,101,0.06)",
                border: "1px solid rgba(196,162,101,0.18)",
                borderLeft: "3px solid var(--gold)",
              }}
            >
              <div className="flex items-start gap-3">
                <span
                  className="flex-shrink-0 font-serif font-semibold"
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--gold)",
                    minWidth: 24,
                    marginTop: 2,
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <p
                    className="font-serif font-semibold mb-1"
                    style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
                  >
                    {item.fact}
                  </p>
                  <p
                    className="leading-relaxed"
                    style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                  >
                    {item.context}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Episodic Weakness Warning */}
      <section className="reveal">
        <div
          className="rounded-2xl px-6 py-6"
          style={{
            background: "rgba(212,133,106,0.1)",
            border: "1.5px solid rgba(212,133,106,0.35)",
          }}
        >
          <div className="flex items-start gap-3 mb-4">
            <div
              className="flex-shrink-0 flex items-center justify-center rounded-full"
              style={{
                width: 36,
                height: 36,
                background: "var(--terracotta)",
                marginTop: 1,
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div>
              <p
                className="font-medium uppercase tracking-widest mb-0.5"
                style={{ fontSize: "var(--text-fine)", color: "var(--terracotta)" }}
              >
                Safety Alert
              </p>
              <h2
                className="font-serif font-semibold"
                style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
              >
                {data.episodicWeaknessWarning.title}
              </h2>
            </div>
          </div>

          <p
            className="leading-relaxed mb-4"
            style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
          >
            {data.episodicWeaknessWarning.description}
          </p>

          <div className="mb-4">
            <p
              className="font-semibold mb-2"
              style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
            >
              Watch for these signs:
            </p>
            <ul className="space-y-1.5">
              {data.episodicWeaknessWarning.signs.map((sign, i) => (
                <li
                  key={i}
                  className="flex items-start gap-2"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                >
                  <span
                    className="flex-shrink-0 rounded-full mt-1.5"
                    style={{
                      width: 6,
                      height: 6,
                      background: "var(--terracotta)",
                      display: "inline-block",
                    }}
                  />
                  {sign}
                </li>
              ))}
            </ul>
          </div>

          <div
            className="rounded-xl px-4 py-3"
            style={{
              background: "rgba(212,133,106,0.12)",
              border: "1px solid rgba(212,133,106,0.25)",
            }}
          >
            <p
              className="font-semibold mb-1"
              style={{ fontSize: "var(--text-body-sm)", color: "var(--terracotta)" }}
            >
              What to do
            </p>
            <p
              className="leading-relaxed"
              style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
            >
              {data.episodicWeaknessWarning.whatToDo}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Tumor Locations */}
      <section>
        <h2
          className="font-serif font-semibold mb-2 reveal"
          style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
        >
          Where HSA Occurs
        </h2>
        <p
          className="mb-6 reveal"
          style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
        >
          Hemangiosarcoma most commonly forms in three primary locations, each with distinct
          presentation and outcomes.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {data.tumorLocations.map((loc) => {
            const isOpen = openLocationSymptoms === loc.id;
            return (
              <div
                key={loc.id}
                className="rounded-2xl px-5 py-5 reveal"
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderLeft: `3px solid ${loc.accentColor}`,
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3
                    className="font-serif font-semibold"
                    style={{ fontSize: "var(--text-h4)", color: "var(--text)" }}
                  >
                    {loc.name}
                  </h3>
                  <span
                    className="flex-shrink-0 rounded-full font-semibold px-2.5 py-0.5"
                    style={{
                      fontSize: "var(--text-fine)",
                      background: `color-mix(in srgb, ${loc.accentColor} 15%, transparent)`,
                      color: loc.accentColor,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {loc.percentage}
                  </span>
                </div>

                <p
                  className="leading-relaxed mb-3"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                >
                  {loc.description}
                </p>

                <p
                  className="mb-3"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                >
                  <span className="font-semibold">Prognosis:</span> {loc.prognosis}
                </p>

                <button
                  type="button"
                  onClick={() => setOpenLocationSymptoms(isOpen ? null : loc.id)}
                  className="flex items-center gap-1.5 cursor-pointer"
                  style={{
                    background: "none",
                    border: "none",
                    padding: 0,
                    fontSize: "var(--text-body-sm)",
                    color: loc.accentColor,
                    fontWeight: 500,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                  {isOpen ? "Hide" : "Show"} symptoms
                </button>

                {isOpen && (
                  <ul className="mt-3 space-y-1.5">
                    {loc.symptoms.map((s, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                      >
                        <span
                          className="flex-shrink-0 rounded-full mt-1.5"
                          style={{
                            width: 5,
                            height: 5,
                            background: loc.accentColor,
                            display: "inline-block",
                          }}
                        />
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function DiagnosisSection({
  data,
}: {
  data: { stagingInfo: StagingInfo[]; diagnosticTests: DiagnosticTest[] };
}) {
  const [openDiagnostic, setOpenDiagnostic] = useState<string | null>(null);

  return (
    <>
      {/* Staging */}
      <section className="mt-10">
        <h2
          className="font-serif font-semibold mb-2 reveal"
          style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
        >
          Staging
        </h2>
        <p
          className="mb-6 reveal"
          style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
        >
          HSA is staged at diagnosis to guide treatment decisions and establish a prognosis.
        </p>

        <div className="grid gap-4 sm:grid-cols-3">
          {data.stagingInfo.map((s, i) => {
            const stageColors = ["var(--sage)", "var(--gold)", "var(--terracotta)"];
            const color = stageColors[i] ?? "var(--sage)";
            return (
              <div
                key={s.stage}
                className="rounded-2xl px-5 py-5 reveal"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <div
                  className="flex items-center justify-center rounded-full font-serif font-bold mb-3"
                  style={{
                    width: 44,
                    height: 44,
                    background: `color-mix(in srgb, ${color} 15%, transparent)`,
                    color,
                    fontSize: "var(--text-h3)",
                  }}
                >
                  {s.stage}
                </div>

                <h3
                  className="font-serif font-semibold mb-2"
                  style={{ fontSize: "var(--text-h4)", color: "var(--text)" }}
                >
                  {s.title}
                </h3>

                <p
                  className="leading-relaxed mb-3"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                >
                  {s.description}
                </p>

                <span
                  className="inline-flex items-center rounded-full px-3 py-1 font-medium"
                  style={{
                    fontSize: "var(--text-fine)",
                    background: `color-mix(in srgb, ${color} 12%, transparent)`,
                    color,
                  }}
                >
                  {s.medianSurvival}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      <SectionDivider />

      {/* Diagnostic Tests */}
      <section>
        <h2
          className="font-serif font-semibold mb-2 reveal"
          style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
        >
          Diagnostic Tests
        </h2>
        <p
          className="mb-6 reveal"
          style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
        >
          Understanding what each test involves helps you prepare and ask the right questions.
        </p>

        <div className="space-y-3">
          {data.diagnosticTests.map((test) => {
            const isOpen = openDiagnostic === test.name;
            return (
              <div
                key={test.name}
                className="rounded-xl overflow-hidden reveal"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <button
                  type="button"
                  onClick={() => setOpenDiagnostic(isOpen ? null : test.name)}
                  className="w-full flex items-center justify-between px-5 py-4 cursor-pointer text-left"
                  style={{ background: "none", border: "none", gap: 12 }}
                >
                  <span
                    className="font-serif font-semibold"
                    style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
                  >
                    {test.name}
                  </span>
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--text-muted)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{
                      flexShrink: 0,
                      transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform 200ms ease",
                    }}
                  >
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </button>

                {isOpen && (
                  <div
                    className="px-5 pb-5 space-y-4"
                    style={{ borderTop: "1px solid var(--border)" }}
                  >
                    <div className="pt-4">
                      <p
                        className="font-semibold mb-1"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                      >
                        What it is
                      </p>
                      <p
                        className="leading-relaxed"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                      >
                        {test.whatItIs}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                      >
                        Why it&rsquo;s used
                      </p>
                      <p
                        className="leading-relaxed"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                      >
                        {test.whyItsUsed}
                      </p>
                    </div>
                    <div>
                      <p
                        className="font-semibold mb-1"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                      >
                        What to expect
                      </p>
                      <p
                        className="leading-relaxed"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                      >
                        {test.whatToExpect}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function TreatmentSection({ data }: { data: { treatmentPaths: TreatmentPath[] } }) {
  const [openTreatment, setOpenTreatment] = useState<string | null>(null);

  return (
    <section className="mt-10">
      <h2
        className="font-serif font-semibold mb-2 reveal"
        style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
      >
        Treatment Options
      </h2>
      <p
        className="mb-6 reveal"
        style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
      >
        Every family&rsquo;s situation is different. These paths reflect the current standard of care
        and emerging options. Discuss all choices thoroughly with a board-certified veterinary
        oncologist.
      </p>

      <div className="space-y-5">
        {data.treatmentPaths.map((path) => {
          const isOpen = openTreatment === path.id;
          return (
            <div
              key={path.id}
              className="rounded-2xl reveal"
              style={{ background: "white", border: "1px solid var(--border)", overflow: "hidden" }}
            >
              <div className="px-6 pt-5 pb-4">
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <h3
                    className="font-serif font-semibold"
                    style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
                  >
                    {path.name}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 font-medium"
                      style={{
                        fontSize: "var(--text-fine)",
                        background: "rgba(91,123,94,0.12)",
                        color: "var(--sage)",
                      }}
                    >
                      {path.medianSurvival}
                    </span>
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 font-medium"
                      style={{
                        fontSize: "var(--text-fine)",
                        background: "rgba(196,162,101,0.12)",
                        color: "var(--gold)",
                      }}
                    >
                      {path.costRange}
                    </span>
                  </div>
                </div>

                <p
                  className="leading-relaxed"
                  style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
                >
                  {path.description}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpenTreatment(isOpen ? null : path.id)}
                className="w-full flex items-center gap-2 px-6 py-3 cursor-pointer text-left"
                style={{
                  background: "none",
                  border: "none",
                  borderTop: "1px solid var(--border)",
                  fontSize: "var(--text-body-sm)",
                  color: "var(--sage)",
                  fontWeight: 500,
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 200ms ease",
                  }}
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
                {isOpen ? "Hide details" : "View details & considerations"}
              </button>

              {isOpen && (
                <div
                  className="px-6 pb-5"
                  style={{ borderTop: "1px solid var(--border)" }}
                >
                  {path.details.length > 0 && (
                    <div className="pt-4 mb-4">
                      <p
                        className="font-semibold mb-2"
                        style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                      >
                        What this involves
                      </p>
                      <ul className="space-y-2">
                        {path.details.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2.5"
                            style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                          >
                            <span
                              className="flex-shrink-0 rounded-full mt-1.5"
                              style={{
                                width: 5,
                                height: 5,
                                background: "var(--sage)",
                                display: "inline-block",
                              }}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div
                    className="rounded-xl px-4 py-3"
                    style={{
                      background: "rgba(91,123,94,0.06)",
                      border: "1px solid rgba(91,123,94,0.15)",
                    }}
                  >
                    <p
                      className="font-semibold mb-1"
                      style={{ fontSize: "var(--text-body-sm)", color: "var(--sage)" }}
                    >
                      Considerations
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                    >
                      {path.considerations}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function BreedRisksSection({ data }: { data: { breedRisks: BreedRisk[] } }) {
  const highRisk = data.breedRisks.filter((b) => b.riskLevel === "high");
  const moderateRisk = data.breedRisks.filter((b) => b.riskLevel === "moderate");
  const someEvidence = data.breedRisks.filter((b) => b.riskLevel === "some-evidence");

  const renderGroup = (
    breeds: BreedRisk[],
    label: string,
    labelBg: string,
    labelColor: string
  ) => {
    if (!breeds.length) return null;
    return (
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <span
            className="rounded-full px-3 py-0.5 font-semibold"
            style={{
              fontSize: "var(--text-fine)",
              background: labelBg,
              color: labelColor,
            }}
          >
            {label}
          </span>
        </div>
        <div className="space-y-2">
          {breeds.map((b) => {
            const style = riskBadgeStyle(b.riskLevel);
            return (
              <div
                key={b.breed}
                className="flex items-start gap-3 rounded-xl px-4 py-3 reveal"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <span
                  className="flex-shrink-0 rounded-full px-2.5 py-0.5 font-medium mt-0.5"
                  style={{
                    fontSize: "var(--text-fine)",
                    background: style.background,
                    color: style.color,
                    whiteSpace: "nowrap",
                  }}
                >
                  {b.breed}
                </span>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                >
                  {b.notes}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <section className="mt-10">
      <h2
        className="font-serif font-semibold mb-2 reveal"
        style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
      >
        Breed Risk Factors
      </h2>
      <p
        className="mb-6 reveal"
        style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
      >
        Certain breeds appear to have genetic predispositions. Risk does not mean certainty —
        most individual dogs of any breed will not develop HSA.
      </p>

      {renderGroup(highRisk, "High Risk", "rgba(212,133,106,0.15)", "var(--terracotta)")}
      {renderGroup(moderateRisk, "Moderate Risk", "rgba(196,162,101,0.15)", "var(--gold)")}
      {renderGroup(someEvidence, "Some Evidence", "rgba(91,123,94,0.12)", "var(--sage)")}
    </section>
  );
}

function ResearchSection({
  data,
}: {
  data: { researchBreakthroughs: ResearchBreakthrough[]; clinicalTrials: ClinicalTrial[] };
}) {
  return (
    <>
      {/* Research Breakthroughs */}
      <section className="mt-10">
        <h2
          className="font-serif font-semibold mb-2 reveal"
          style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
        >
          Research Breakthroughs
        </h2>
        <p
          className="mb-6 reveal"
          style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
        >
          Research is advancing rapidly. These breakthroughs represent the most promising recent
          findings.
        </p>

        <div className="space-y-4">
          {data.researchBreakthroughs.map((item, i) => (
            <div
              key={i}
              className="rounded-2xl px-6 py-5 reveal"
              style={{ background: "white", border: "1px solid var(--border)" }}
            >
              <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                <div>
                  <p
                    className="font-medium mb-0.5"
                    style={{ fontSize: "var(--text-fine)", color: "var(--text-muted)" }}
                  >
                    {item.institution}
                  </p>
                  <h3
                    className="font-serif font-semibold"
                    style={{ fontSize: "var(--text-h4)", color: "var(--text)" }}
                  >
                    {item.title}
                  </h3>
                </div>
                <span
                  className="flex-shrink-0 rounded-full px-3 py-0.5 font-semibold"
                  style={{
                    fontSize: "var(--text-fine)",
                    background: "rgba(91,123,94,0.10)",
                    color: "var(--sage)",
                  }}
                >
                  {item.year}
                </span>
              </div>

              <p
                className="leading-relaxed mb-3"
                style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
              >
                {item.finding}
              </p>

              <div
                className="rounded-lg px-3 py-2.5"
                style={{
                  background: "rgba(196,162,101,0.08)",
                  border: "1px solid rgba(196,162,101,0.18)",
                }}
              >
                <p
                  className="font-semibold mb-0.5"
                  style={{ fontSize: "var(--text-fine)", color: "var(--gold)" }}
                >
                  Why it matters
                </p>
                <p
                  className="leading-relaxed"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text)" }}
                >
                  {item.significance}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* Clinical Trials */}
      <section>
        <h2
          className="font-serif font-semibold mb-2 reveal"
          style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
        >
          Clinical Trials
        </h2>
        <p
          className="mb-6 reveal"
          style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
        >
          Clinical trials give dogs access to emerging therapies and contribute to research that
          helps future patients. Ask your oncologist if your dog may qualify.
        </p>

        <div className="space-y-4">
          {data.clinicalTrials.map((trial, i) => {
            const statusStyle = trialStatusStyle(trial.status);
            return (
              <div
                key={i}
                className="rounded-2xl px-6 py-5 reveal"
                style={{ background: "white", border: "1px solid var(--border)" }}
              >
                <div className="flex flex-wrap items-start justify-between gap-2 mb-2">
                  <div className="flex-1">
                    <p
                      className="font-medium mb-0.5"
                      style={{ fontSize: "var(--text-fine)", color: "var(--text-muted)" }}
                    >
                      {trial.institution}
                    </p>
                    <h3
                      className="font-serif font-semibold"
                      style={{ fontSize: "var(--text-h4)", color: "var(--text)" }}
                    >
                      {trial.name}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2 flex-shrink-0">
                    <span
                      className="rounded-full px-2.5 py-0.5 font-medium"
                      style={{
                        fontSize: "var(--text-fine)",
                        background: "rgba(196,162,101,0.12)",
                        color: "var(--gold)",
                      }}
                    >
                      {trial.type}
                    </span>
                    <span
                      className="rounded-full px-2.5 py-0.5 font-medium"
                      style={{
                        fontSize: "var(--text-fine)",
                        background: statusStyle.background,
                        color: statusStyle.color,
                      }}
                    >
                      {statusStyle.label}
                    </span>
                  </div>
                </div>

                <p
                  className="leading-relaxed"
                  style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                >
                  {trial.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}

function VetQuestionsSection({ data }: { data: { oncologistQuestions: string[] } }) {
  return (
    <section className="mt-10">
      <div className="flex flex-wrap items-start justify-between gap-3 mb-2">
        <h2
          className="font-serif font-semibold reveal"
          style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
        >
          Questions for Your Oncologist
        </h2>
        <button
          type="button"
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-full cursor-pointer reveal"
          style={{
            padding: "7px 14px",
            background: "none",
            border: "1.5px solid var(--border)",
            fontSize: "var(--text-body-sm)",
            color: "var(--text-muted)",
            fontWeight: 500,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="6 9 6 2 18 2 18 9" />
            <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
            <rect x="6" y="14" width="12" height="8" />
          </svg>
          Print this list
        </button>
      </div>

      <p
        className="mb-6 reveal"
        style={{ fontSize: "var(--text-body)", color: "var(--text-muted)" }}
      >
        Appointments move quickly. Having these written down ensures you leave with the information
        you need.
      </p>

      <div
        className="rounded-2xl px-6 py-6 reveal"
        style={{ background: "white", border: "1px solid var(--border)" }}
      >
        <ol className="space-y-4">
          {data.oncologistQuestions.map((q, i) => (
            <li key={i} className="flex items-start gap-4">
              <span
                className="flex-shrink-0 flex items-center justify-center rounded-full font-semibold font-serif"
                style={{
                  width: 28,
                  height: 28,
                  background: "rgba(196,162,101,0.12)",
                  color: "var(--gold)",
                  fontSize: "var(--text-body-sm)",
                  marginTop: 1,
                }}
              >
                {i + 1}
              </span>
              <p
                className="leading-relaxed"
                style={{ fontSize: "var(--text-body)", color: "var(--text)", paddingTop: 2 }}
              >
                {q}
              </p>
            </li>
          ))}
        </ol>
      </div>

      <p
        className="mt-4 text-center reveal"
        style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
      >
        Tip: Bring a notebook or record the appointment (with permission) so you can review answers
        later.
      </p>
    </section>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface Props {
  slug: string;
  title: string;
  data: Record<string, unknown>;
}

export default function UnderstandingHSASubPageClient({ slug, title, data }: Props) {
  const sectionRef = useScrollReveal();
  const meta = SLUG_META[slug] ?? SLUG_META["the-disease"];
  const related = RELATED[slug] ?? [];

  function renderContent() {
    switch (slug) {
      case "the-disease":
        return (
          <TheDiseaseSection
            data={
              data as {
                keyFacts: KeyFact[];
                tumorLocations: TumorLocation[];
                episodicWeaknessWarning: EpisodicWeaknessWarning;
              }
            }
          />
        );
      case "diagnosis":
        return (
          <DiagnosisSection
            data={
              data as {
                stagingInfo: StagingInfo[];
                diagnosticTests: DiagnosticTest[];
              }
            }
          />
        );
      case "treatment":
        return (
          <TreatmentSection data={data as { treatmentPaths: TreatmentPath[] }} />
        );
      case "breed-risks":
        return (
          <BreedRisksSection data={data as { breedRisks: BreedRisk[] }} />
        );
      case "research":
        return (
          <ResearchSection
            data={
              data as {
                researchBreakthroughs: ResearchBreakthrough[];
                clinicalTrials: ClinicalTrial[];
              }
            }
          />
        );
      case "vet-questions":
        return (
          <VetQuestionsSection data={data as { oncologistQuestions: string[] }} />
        );
      default:
        return null;
    }
  }

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-24"
      style={{ background: "var(--warm-white)" }}
    >
      {/* Header */}
      <section
        className="pt-24 pb-10 px-6"
        style={{ borderBottom: "1px solid var(--border)" }}
      >
        <div className="max-w-[800px] mx-auto">
          {/* Back link */}
          <Link
            href="/resources/understanding-hsa"
            className="inline-flex items-center gap-1.5 no-underline mb-6"
            style={{ fontSize: "0.875rem", color: "var(--text-muted)" }}
          >
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
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Understanding HSA
          </Link>

          {/* Illustration */}
          <div className="flex justify-center mb-6 reveal">
            <Image
              src={meta.illustration}
              alt=""
              width={120}
              height={120}
              style={{ objectFit: "contain", mixBlendMode: "multiply" }}
            />
          </div>

          {/* Colored eyebrow */}
          <p
            className="font-medium tracking-widest uppercase mb-3 reveal"
            style={{ fontSize: "0.68rem", color: meta.color }}
          >
            {meta.eyebrow}
          </p>

          {/* Title */}
          <h1
            className="font-serif font-semibold reveal"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {title}
          </h1>
        </div>
      </section>

      {/* Content */}
      <div className="px-6">
        <div className="max-w-[800px] mx-auto">
          {renderContent()}

          {/* Bottom: Explore all topics + related cards */}
          <div
            className="reveal mt-16 pt-10"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p
              className="font-medium uppercase tracking-widest mb-5"
              style={{ fontSize: "0.65rem", color: "var(--text-muted)" }}
            >
              Explore all topics
            </p>

            <div className="grid gap-3 sm:grid-cols-3 mb-8">
              {/* Back to hub card */}
              <Link
                href="/resources/understanding-hsa"
                className="block no-underline rounded-xl px-4 py-4"
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  transition: "box-shadow 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <p
                  className="font-semibold mb-1"
                  style={{ fontSize: "0.85rem", color: "var(--sage)" }}
                >
                  ← Hub overview
                </p>
                <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  All 6 topics at a glance
                </p>
              </Link>

              {/* Related topic cards */}
              {related.slice(0, 2).map((r) => {
                const rMeta = SLUG_META[r.slug];
                return (
                  <Link
                    key={r.slug}
                    href={`/resources/understanding-hsa/${r.slug}`}
                    className="block no-underline rounded-xl px-4 py-4"
                    style={{
                      background: "white",
                      border: "1px solid var(--border)",
                      transition: "box-shadow 200ms ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.07)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <p
                      className="font-semibold mb-1"
                      style={{ fontSize: "0.85rem", color: rMeta?.color ?? "var(--sage)" }}
                    >
                      {r.title} →
                    </p>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                      {rMeta?.eyebrow}
                    </p>
                  </Link>
                );
              })}
            </div>

            <div className="text-center">
              <Link
                href="/resources"
                className="inline-flex items-center gap-2 no-underline font-medium"
                style={{ fontSize: "1rem", color: "var(--sage)" }}
              >
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
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                Back to all resources
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
