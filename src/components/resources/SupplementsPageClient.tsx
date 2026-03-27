"use client";
import { useCallback, useState } from "react";
import Link from "next/link";
import { AmbientOrb } from "./AmbientOrb";
import type {
  Supplement,
  SupplementCategory,
  DogProfile,
  WeightBracket,
} from "@/lib/resources/types";
import { getWeightBracket, getDosageForWeight } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";

interface SupplementsPageClientProps {
  profile: DogProfile | null;
  supplements: Supplement[];
  starterSupplements: Supplement[];
  supplementCategories: SupplementCategory[];
  usageCounts: Record<string, number>;
  userActiveSlugs: string[];
  isAuthenticated: boolean;
}

export default function SupplementsPageClient({
  profile,
  supplements,
  starterSupplements,
  supplementCategories,
  usageCounts: initialUsageCounts,
  userActiveSlugs: initialActiveSlugs,
  isAuthenticated,
}: SupplementsPageClientProps) {
  const sectionRef = useScrollReveal();

  // Tracking state
  const [activeSlugs, setActiveSlugs] = useState<Set<string>>(
    () => new Set(initialActiveSlugs)
  );
  const [usageCounts, setUsageCounts] =
    useState<Record<string, number>>(initialUsageCounts);

  // Client-side weight calculator for non-authenticated users
  const [localWeight, setLocalWeight] = useState<number | null>(null);

  // Use profile weight if available, otherwise fall back to local calculator
  const effectiveWeight = profile?.weightLbs ?? localWeight;

  const userBracket: WeightBracket | null = effectiveWeight
    ? getWeightBracket(effectiveWeight)
    : null;

  const dogName = profile?.dogName ?? null;

  // ---------- Tracking logic ----------
  const handleToggle = useCallback(
    async (slug: string) => {
      if (!isAuthenticated) return;

      const isActive = activeSlugs.has(slug);
      const action = isActive ? "stop" : "start";

      // Optimistic update
      setActiveSlugs((prev) => {
        const next = new Set(prev);
        if (isActive) {
          next.delete(slug);
        } else {
          next.add(slug);
        }
        return next;
      });
      setUsageCounts((prev) => ({
        ...prev,
        [slug]: Math.max(0, (prev[slug] ?? 0) + (isActive ? -1 : 1)),
      }));

      try {
        const res = await fetch("/api/supplements/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ supplement_slug: slug, action }),
        });

        if (!res.ok) {
          throw new Error("Failed to update");
        }

        const data = await res.json();
        setUsageCounts((prev) => ({
          ...prev,
          [slug]: Number(data.count),
        }));
      } catch {
        // Rollback on error
        setActiveSlugs((prev) => {
          const next = new Set(prev);
          if (isActive) {
            next.add(slug);
          } else {
            next.delete(slug);
          }
          return next;
        });
        setUsageCounts((prev) => ({
          ...prev,
          [slug]: Math.max(0, (prev[slug] ?? 0) + (isActive ? 1 : -1)),
        }));
      }
    },
    [isAuthenticated, activeSlugs]
  );

  // ---------- Derived data ----------
  const trackedCount = activeSlugs.size;
  const totalSupplements = supplements.length;
  const categoryCount = supplementCategories.length;

  // Profile pills
  const profilePills: { label: string; color: string }[] = [];
  if (profile?.weightLbs) {
    profilePills.push({
      label: `${profile.weightLbs} lbs`,
      color: "var(--sage)",
    });
  }
  if (profile?.breed) {
    profilePills.push({ label: profile.breed, color: "var(--gold)" });
  }
  if (profile?.cancerStage) {
    profilePills.push({
      label: `Stage ${profile.cancerStage}`,
      color: "var(--terracotta)",
    });
  }

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-[100dvh] pb-24"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Compact Header (~130px) ═══ */}
      <div
        className="pt-24 pb-8 px-6"
        style={{
          background: "var(--warm-white)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AmbientOrb top="10%" right="5%" size={200} color="rgba(196,162,101,0.12)" duration={12} />
        <AmbientOrb top="20%" left="0%" size={160} color="rgba(91,123,94,0.08)" duration={16} delay={4} />
        <div className="max-w-[800px] mx-auto">
          {/* Top row: back arrow + title */}
          <div className="flex items-center gap-3 mb-1">
            <Link
              href="/resources"
              className="flex items-center justify-center flex-shrink-0 no-underline"
              style={{ width: 44, height: 44 }}
              aria-label="Back to Resources"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--sage)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </Link>
            <h1
              className="font-serif font-semibold"
              style={{
                fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                color: "var(--text)",
                lineHeight: 1.2,
              }}
            >
              {dogName ? `${dogName}\u2019s Supplements` : "Supplement Guide"}
            </h1>
          </div>

          {/* Subtitle */}
          <p
            className="ml-[56px] leading-relaxed"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
            }}
          >
            Research-backed information on {totalSupplements} supplements commonly used
            for dogs with hemangiosarcoma, organized by category.
          </p>

          {/* Profile pills OR weight calculator */}
          {profilePills.length > 0 ? (
            <div className="flex flex-wrap gap-2 mt-2.5 ml-[56px]">
              {profilePills.map((pill) => (
                <span
                  key={pill.label}
                  className="inline-flex items-center rounded-full px-2.5 py-0.5 font-medium"
                  style={{
                    fontSize: "var(--text-fine)",
                    background: `color-mix(in srgb, ${pill.color} 12%, transparent)`,
                    color: pill.color,
                  }}
                >
                  {pill.label}
                </span>
              ))}
            </div>
          ) : (
            <div
              className="mt-3 ml-[56px] rounded-xl px-4 py-3.5"
              style={{
                background: "color-mix(in srgb, var(--sage) 5%, white)",
                border: "1px solid color-mix(in srgb, var(--sage) 12%, transparent)",
              }}
            >
              <div className="flex items-center gap-3">
                {/* Dog on scale icon */}
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 40 40"
                  fill="none"
                  className="flex-shrink-0"
                  style={{ opacity: 0.7 }}
                >
                  {/* Scale base */}
                  <rect x="4" y="30" width="32" height="3" rx="1.5" fill="var(--sage)" opacity="0.3" />
                  <rect x="8" y="27" width="24" height="4" rx="2" fill="var(--sage)" opacity="0.2" />
                  {/* Dog body */}
                  <ellipse cx="20" cy="22" rx="8" ry="5" fill="var(--gold)" opacity="0.5" />
                  {/* Dog head */}
                  <circle cx="27" cy="17" r="4" fill="var(--gold)" opacity="0.5" />
                  {/* Ear */}
                  <ellipse cx="29.5" cy="14.5" rx="2" ry="2.5" fill="var(--gold)" opacity="0.4" />
                  {/* Tail */}
                  <path d="M12 20 Q8 14 10 10" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
                  {/* Eye */}
                  <circle cx="28.5" cy="16.5" r="1" fill="var(--text)" opacity="0.5" />
                  {/* Legs */}
                  <line x1="15" y1="26" x2="15" y2="28" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                  <line x1="25" y1="26" x2="25" y2="28" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" opacity="0.4" />
                </svg>
                <div className="flex-1">
                  <p
                    className="font-medium mb-1.5"
                    style={{
                      fontSize: "var(--text-body-sm)",
                      color: "var(--text)",
                    }}
                  >
                    Personalize dosing for your pup
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      id="weight-calc"
                      type="number"
                      inputMode="numeric"
                      min={1}
                      max={300}
                      placeholder="Weight"
                      value={localWeight ?? ""}
                      onChange={(e) => {
                        const val = e.target.value;
                        setLocalWeight(val ? Math.max(1, Math.min(300, Number(val))) : null);
                      }}
                      className="rounded-lg"
                      style={{
                        width: 80,
                        padding: "8px 12px",
                        fontSize: "var(--text-body)",
                        fontWeight: 500,
                        color: "var(--text)",
                        background: "white",
                        border: "1.5px solid var(--border)",
                        outline: "none",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "var(--sage)";
                        e.currentTarget.style.boxShadow = "0 0 0 3px color-mix(in srgb, var(--sage) 10%, transparent)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.borderColor = "var(--border)";
                        e.currentTarget.style.boxShadow = "none";
                      }}
                    />
                    <span
                      style={{
                        fontSize: "var(--text-body-sm)",
                        color: "var(--text-muted)",
                      }}
                    >
                      lbs
                    </span>
                    {localWeight && (
                      <span
                        className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-medium"
                        style={{
                          fontSize: "var(--text-fine)",
                          background: "color-mix(in srgb, var(--sage) 12%, transparent)",
                          color: "var(--sage)",
                        }}
                      >
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        Dosing updated
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vet note */}
          <p
            className="mt-2 ml-[56px]"
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--terracotta)",
            }}
          >
            Always discuss with your vet.
          </p>
        </div>
      </div>

      {/* ═══ Quick-jump category nav ═══ */}
      <nav
        className="sticky z-20"
        style={{
          top: 56,
          background: "rgba(250,248,245,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="segment-scroll px-4 py-3 flex gap-2"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {supplementCategories.map((cat) => (
            <a
              key={cat.key}
              href={`#${cat.key}`}
              className="flex-shrink-0 no-underline"
              style={{
                minHeight: 44,
                padding: "8px 16px",
                borderRadius: 9999,
                fontSize: "var(--text-body-sm)",
                fontWeight: 400,
                background: "white",
                color: "var(--text-muted)",
                border: "1.5px solid var(--border)",
                transition: "all 200ms ease",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ background: cat.accentColor }}
              />
              {cat.label}
            </a>
          ))}
        </div>
      </nav>

      {/* ═══ All Categories as Editorial Sections ═══ */}
      {supplementCategories.map((cat, catIdx) => {
        const catSupplements = supplements.filter(
          (s) => s.category === cat.key
        );
        const isEven = catIdx % 2 === 0;

        return (
          <section
            key={cat.key}
            id={cat.key}
            style={{
              scrollMarginTop: 120,
              background: isEven
                ? `color-mix(in srgb, ${cat.accentColor} 4%, var(--warm-white))`
                : "var(--warm-white)",
            }}
          >
            <div className="px-6">
              <div className="max-w-[900px] mx-auto" style={{ paddingTop: 56, paddingBottom: 56 }}>
                {/* ── Category header ── */}
                <div className="mb-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div
                      style={{
                        width: 32,
                        height: 3,
                        borderRadius: 2,
                        background: cat.accentColor,
                      }}
                    />
                    <span
                      className="inline-flex items-center rounded-full px-3 py-1 font-semibold uppercase tracking-widest"
                      style={{
                        fontSize: "var(--text-fine)",
                        background: `color-mix(in srgb, ${cat.accentColor} 10%, transparent)`,
                        color: cat.accentColor,
                        letterSpacing: "0.12em",
                      }}
                    >
                      {catSupplements.length} supplement{catSupplements.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <h2
                    className="font-serif font-semibold mb-3"
                    style={{
                      fontSize: "clamp(1.625rem, 3.5vw, 2.25rem)",
                      color: "var(--text)",
                      lineHeight: 1.2,
                    }}
                  >
                    {cat.label}
                  </h2>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: "clamp(1rem, 2vw, 1.125rem)",
                      color: "var(--text-muted)",
                      maxWidth: 640,
                      lineHeight: 1.7,
                    }}
                  >
                    {cat.description}
                  </p>
                </div>

                {/* ── Supplement cards ── */}
                <div className="space-y-8">
                  {catSupplements.map((supplement) => {
                    const doseInfo = getDosageForWeight(
                      supplement.dosage,
                      effectiveWeight ?? null
                    );

                    const evidenceLabel =
                      supplement.evidenceLevel === "studied-in-hsa"
                        ? "Studied in HSA"
                        : supplement.evidenceLevel === "veterinary-use"
                          ? "Veterinary use"
                          : "Emerging research";

                    const evidenceStyle =
                      supplement.evidenceLevel === "studied-in-hsa"
                        ? { bg: "var(--sage)", color: "white", border: "none" }
                        : supplement.evidenceLevel === "veterinary-use"
                          ? { bg: "transparent", color: "var(--gold-text)", border: "1.5px solid var(--gold)" }
                          : { bg: "transparent", color: "var(--text-muted)", border: "1.5px solid var(--border)" };

                    return (
                      <div
                        key={supplement.slug}
                        className="rounded-2xl"
                        style={{
                          background: "white",
                          border: "1.5px solid var(--border)",
                          overflow: "hidden",
                          transition: "box-shadow 0.3s ease",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.boxShadow = `0 8px 32px ${cat.accentColor}12, 0 2px 8px rgba(0,0,0,0.06)`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.03)";
                        }}
                      >
                        {/* ─ Card header zone ─ */}
                        <div
                          className="px-6 pt-7 pb-5 sm:px-8"
                          style={{ borderBottom: "1px solid var(--border)" }}
                        >
                          {/* Evidence badge */}
                          <div className="mb-3">
                            <span
                              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-medium"
                              style={{
                                fontSize: "var(--text-fine)",
                                background: evidenceStyle.bg,
                                color: evidenceStyle.color,
                                border: evidenceStyle.border,
                              }}
                            >
                              {supplement.evidenceLevel === "studied-in-hsa" && (
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="20 6 9 17 4 12" />
                                </svg>
                              )}
                              {supplement.evidenceLevel === "veterinary-use" && (
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                                </svg>
                              )}
                              {evidenceLabel}
                            </span>
                          </div>

                          {/* Supplement name */}
                          <h3
                            className="font-serif font-semibold mb-2"
                            style={{
                              fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                              color: "var(--text)",
                              lineHeight: 1.25,
                            }}
                          >
                            {supplement.name}
                          </h3>

                          {/* Tagline — accent colored */}
                          <p
                            className="leading-relaxed"
                            style={{
                              fontSize: "clamp(0.95rem, 2vw, 1.0625rem)",
                              color: cat.accentColor,
                              fontWeight: 500,
                            }}
                          >
                            {supplement.tagline}
                          </p>
                        </div>

                        {/* ─ Card body ─ */}
                        <div className="px-6 py-6 sm:px-8 sm:py-7">
                          {/* Description */}
                          <p
                            className="leading-relaxed mb-6"
                            style={{
                              fontSize: "var(--text-body)",
                              color: "var(--text)",
                              lineHeight: 1.75,
                            }}
                          >
                            {supplement.description}
                          </p>

                          {/* ─ Info grid: Dosage + Frequency ─ */}
                          <div className="grid gap-4 sm:grid-cols-2 mb-6">
                            {/* Dosage block */}
                            <div
                              className="rounded-xl p-5"
                              style={{
                                background: `color-mix(in srgb, ${cat.accentColor} 5%, var(--cream))`,
                              }}
                            >
                              <div className="flex items-center gap-2 mb-2.5">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke={cat.accentColor} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                                  <path d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-6 18.75h9" />
                                </svg>
                                <p
                                  className="font-semibold uppercase tracking-widest"
                                  style={{
                                    fontSize: "var(--text-fine)",
                                    color: "var(--text-muted)",
                                    letterSpacing: "0.1em",
                                  }}
                                >
                                  Dosage
                                </p>
                              </div>
                              {doseInfo ? (
                                <p
                                  className="font-semibold"
                                  style={{
                                    fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
                                    color: "var(--text)",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  {doseInfo.dose}
                                </p>
                              ) : (
                                <p
                                  style={{
                                    fontSize: "var(--text-body-sm)",
                                    color: "var(--text-muted)",
                                    lineHeight: 1.5,
                                  }}
                                >
                                  Enter weight above for personalized dosing
                                </p>
                              )}
                            </div>

                            {/* Frequency block */}
                            <div
                              className="rounded-xl p-5"
                              style={{ background: "rgba(245,240,234,0.6)" }}
                            >
                              <div className="flex items-center gap-2 mb-2.5">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.7 }}>
                                  <circle cx="12" cy="12" r="10" />
                                  <polyline points="12 6 12 12 16 14" />
                                </svg>
                                <p
                                  className="font-semibold uppercase tracking-widest"
                                  style={{
                                    fontSize: "var(--text-fine)",
                                    color: "var(--text-muted)",
                                    letterSpacing: "0.1em",
                                  }}
                                >
                                  How often
                                </p>
                              </div>
                              <p
                                className="font-medium"
                                style={{
                                  fontSize: "var(--text-body)",
                                  color: "var(--text)",
                                  lineHeight: 1.4,
                                }}
                              >
                                {supplement.frequency}
                              </p>
                            </div>
                          </div>

                          {/* Warnings */}
                          {supplement.warnings && supplement.warnings.length > 0 && (
                            <div
                              className="rounded-xl px-5 py-4 mb-6"
                              style={{
                                background: "rgba(212,133,106,0.05)",
                                borderLeft: "3px solid var(--terracotta)",
                              }}
                            >
                              <div className="flex items-center gap-2 mb-2.5">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--terracotta)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                                  <line x1="12" y1="9" x2="12" y2="13" />
                                  <line x1="12" y1="17" x2="12.01" y2="17" />
                                </svg>
                                <p
                                  className="font-semibold uppercase tracking-widest"
                                  style={{
                                    fontSize: "var(--text-fine)",
                                    color: "var(--terracotta)",
                                    letterSpacing: "0.1em",
                                  }}
                                >
                                  Important
                                </p>
                              </div>
                              <ul className="space-y-2">
                                {supplement.warnings.map((w, i) => (
                                  <li
                                    key={i}
                                    className="flex items-start gap-2.5"
                                    style={{
                                      fontSize: "var(--text-body)",
                                      color: "var(--text)",
                                      lineHeight: 1.6,
                                    }}
                                  >
                                    <span
                                      className="mt-[8px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                                      style={{ background: "var(--terracotta)" }}
                                    />
                                    {w}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )}

                          {/* Vet discussion points */}
                          <div
                            className="rounded-xl px-5 py-4 mb-5"
                            style={{
                              background: `color-mix(in srgb, var(--sage) 4%, white)`,
                            }}
                          >
                            <div className="flex items-center gap-2 mb-2.5">
                              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.8 }}>
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                              </svg>
                              <p
                                className="font-semibold uppercase tracking-widest"
                                style={{
                                  fontSize: "var(--text-fine)",
                                  color: "var(--sage)",
                                  letterSpacing: "0.1em",
                                }}
                              >
                                Discuss with your vet
                              </p>
                            </div>
                            <ul className="space-y-2">
                              {supplement.vetDiscussionPoints.map((point, i) => (
                                <li
                                  key={i}
                                  className="flex items-start gap-2.5"
                                  style={{
                                    fontSize: "var(--text-body)",
                                    color: "var(--text)",
                                    lineHeight: 1.6,
                                  }}
                                >
                                  <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="var(--sage)"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="flex-shrink-0 mt-[5px]"
                                    style={{ opacity: 0.6 }}
                                  >
                                    <polyline points="9 18 15 12 9 6" />
                                  </svg>
                                  {point}
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Card footer: sources + tracking */}
                          <div
                            className="pt-5 mt-5 flex flex-wrap items-start justify-between gap-4"
                            style={{ borderTop: "1px solid var(--border)" }}
                          >
                            {/* Sources */}
                            {supplement.sources && supplement.sources.length > 0 && (
                              <div className="flex-1 min-w-0">
                                <p
                                  className="font-semibold uppercase tracking-widest mb-1.5"
                                  style={{
                                    fontSize: "var(--text-fine)",
                                    color: "var(--text-muted)",
                                    letterSpacing: "0.1em",
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

                            {/* Tracking button */}
                            {isAuthenticated && (
                              <button
                                type="button"
                                onClick={() => handleToggle(supplement.slug)}
                                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-medium cursor-pointer flex-shrink-0"
                                style={
                                  activeSlugs.has(supplement.slug)
                                    ? {
                                        fontSize: "var(--text-body-sm)",
                                        background: "var(--sage)",
                                        color: "white",
                                        border: "1.5px solid var(--sage)",
                                      }
                                    : {
                                        fontSize: "var(--text-body-sm)",
                                        background: "transparent",
                                        color: "var(--sage)",
                                        border: "1.5px solid rgba(91,123,94,0.3)",
                                      }
                                }
                              >
                                {activeSlugs.has(supplement.slug) ? (
                                  <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                      <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Tracking this
                                  </>
                                ) : (
                                  <>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <line x1="12" y1="5" x2="12" y2="19" />
                                      <line x1="5" y1="12" x2="19" y2="12" />
                                    </svg>
                                    We&apos;re giving this to {dogName || "our dog"}
                                  </>
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ═══ Floating "Vet List" Button ═══ */}
      <button
        type="button"
        onClick={() => window.print()}
        className="fixed z-30 rounded-full flex items-center gap-2 cursor-pointer"
        style={{
          bottom: "calc(24px + env(safe-area-inset-bottom))",
          right: 24,
          padding: "14px 20px",
          background: "var(--sage)",
          color: "#fff",
          border: "none",
          boxShadow: "0 4px 16px rgba(91,123,94,0.35)",
          fontSize: "var(--text-body-sm)",
          fontWeight: 600,
        }}
      >
        <svg
          width="16"
          height="16"
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
        Print for Vet
        {/* Tracked count badge */}
        {trackedCount > 0 && (
          <span
            className="absolute flex items-center justify-center rounded-full font-semibold"
            style={{
              top: -6,
              right: -6,
              width: 22,
              height: 22,
              fontSize: 11,
              background: "var(--terracotta)",
              color: "white",
            }}
          >
            {trackedCount}
          </span>
        )}
      </button>
    </div>
  );
}
