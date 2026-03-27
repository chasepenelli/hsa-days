"use client";
import { useCallback, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AmbientOrb } from "./AmbientOrb";
import type {
  Supplement,
  SupplementCategory,
  DogProfile,
  WeightBracket,
} from "@/lib/resources/types";
import { getWeightBracket, getDosageForWeight } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SupplementStarterCard from "./SupplementStarterCard";
import SupplementCard from "./SupplementCard";

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

  // Active segment
  const [activeSegment, setActiveSegment] = useState<string>("start-here");
  const segmentScrollRef = useRef<HTMLDivElement>(null);

  // Client-side weight calculator for non-authenticated users
  const [localWeight, setLocalWeight] = useState<number | null>(null);

  // Use profile weight if available, otherwise fall back to local calculator
  const effectiveWeight = profile?.weightLbs ?? localWeight;

  const userBracket: WeightBracket | null = effectiveWeight
    ? getWeightBracket(effectiveWeight)
    : null;

  const dogName = profile?.dogName ?? null;

  // Build a lookup from category key -> category object
  const categoryMap = new Map(supplementCategories.map((c) => [c.key, c]));

  // ---------- Tracking logic (preserved exactly) ----------
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

  // Supplements filtered by active category
  const activeCategoryObj =
    activeSegment !== "start-here"
      ? categoryMap.get(activeSegment) ?? null
      : null;
  const filteredSupplements =
    activeSegment !== "start-here"
      ? supplements.filter((s) => s.category === activeSegment)
      : [];

  // Segments definition
  const segments: { key: string; label: string; color: string }[] = [
    { key: "start-here", label: "Start Here", color: "var(--sage)" },
    ...supplementCategories.map((cat) => ({
      key: cat.key,
      label: cat.label,
      color: cat.accentColor,
    })),
  ];

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
              {dogName ? `${dogName}\u2019s Supplements` : "Supplement Plan"}
            </h1>
            <div className="hidden sm:block flex-shrink-0 ml-4">
              <Image
                src="/illustrations/icons/icon-supplement.png"
                alt=""
                width={90}
                height={90}
                style={{ opacity: 0.85, mixBlendMode: "multiply" }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="ml-[56px]"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
            }}
          >
            {totalSupplements} supplements across {categoryCount} categories
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

      {/* ═══ Sticky Segmented Control ═══ */}
      <div
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
          ref={segmentScrollRef}
          className="segment-scroll px-4 py-3 flex gap-2"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {segments.map((seg) => {
            const isActive = activeSegment === seg.key;
            return (
              <button
                key={seg.key}
                type="button"
                onClick={() => setActiveSegment(seg.key)}
                className="flex-shrink-0 cursor-pointer"
                style={{
                  minHeight: 44,
                  padding: "8px 16px",
                  borderRadius: 9999,
                  fontSize: "var(--text-body-sm)",
                  fontWeight: isActive ? 600 : 400,
                  background: isActive ? seg.color : "white",
                  color: isActive ? "white" : "var(--text-muted)",
                  border: isActive ? "none" : "1.5px solid var(--border)",
                  boxShadow: isActive
                    ? "0 2px 8px rgba(0,0,0,0.08)"
                    : "none",
                  transition: "all 200ms ease",
                  whiteSpace: "nowrap",
                }}
                onMouseDown={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(0.95)";
                }}
                onMouseUp={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1)";
                }}
                onTouchStart={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(0.95)";
                }}
                onTouchEnd={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.transform =
                    "scale(1)";
                }}
              >
                {seg.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ═══ Content Area ═══ */}
      <div className="px-6">
        <div className="max-w-[800px] mx-auto">
          <div
            key={activeSegment}
            style={{ animation: "scaleIn 0.3s ease-out" }}
          >
            {/* ═══ "Start Here" View ═══ */}
            {activeSegment === "start-here" && (
              <section className="mt-6 reveal">
                <div className="space-y-4">
                  {starterSupplements.map((supp) => {
                    const cat = categoryMap.get(supp.category);
                    const doseInfo = getDosageForWeight(
                      supp.dosage,
                      effectiveWeight ?? null
                    );

                    return (
                      <SupplementStarterCard
                        key={supp.slug}
                        supplement={supp}
                        categoryLabel={cat?.label ?? supp.category}
                        categoryColor={cat?.accentColor ?? "var(--sage)"}
                        personalDose={doseInfo?.dose ?? null}
                        dogName={dogName}
                        userBracket={userBracket}
                        breed={profile?.breed ?? null}
                        isTracked={activeSlugs.has(supp.slug)}
                        usageCount={usageCounts[supp.slug] ?? 0}
                        isAuthenticated={isAuthenticated}
                        onToggleTrack={handleToggle}
                      />
                    );
                  })}
                </div>

                <p
                  className="mt-6 text-center leading-relaxed"
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  Tap a category above to explore all {totalSupplements}{" "}
                  supplements.
                </p>
              </section>
            )}

            {/* ═══ Category View ═══ */}
            {activeSegment !== "start-here" && activeCategoryObj && (
              <section className="mt-6 reveal">
                {/* Category banner card */}
                <div
                  className="rounded-2xl px-5 py-5 mb-6"
                  style={{
                    background: `color-mix(in srgb, ${activeCategoryObj.accentColor} 8%, white)`,
                    border: `1px solid color-mix(in srgb, ${activeCategoryObj.accentColor} 15%, transparent)`,
                  }}
                >
                  <div className="flex items-center gap-2 mb-1.5">
                    <div
                      className="w-2.5 h-2.5 rounded-full"
                      style={{
                        background: activeCategoryObj.accentColor,
                      }}
                    />
                    <h2
                      className="font-serif font-semibold"
                      style={{
                        fontSize: "clamp(1.25rem, 2.5vw, 1.5rem)",
                        color: "var(--text)",
                      }}
                    >
                      {activeCategoryObj.label}
                    </h2>
                    <span
                      style={{
                        fontSize: "var(--text-body-sm)",
                        color: "var(--text-muted)",
                      }}
                    >
                      &middot; {filteredSupplements.length}{" "}
                      {filteredSupplements.length === 1
                        ? "supplement"
                        : "supplements"}
                    </span>
                  </div>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: "var(--text-body)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {activeCategoryObj.description}
                  </p>
                </div>

                {/* Supplement cards */}
                <div className="space-y-4">
                  {filteredSupplements.map((supplement) => {
                    const doseInfo = getDosageForWeight(
                      supplement.dosage,
                      effectiveWeight ?? null
                    );

                    return (
                      <SupplementCard
                        key={supplement.slug}
                        supplement={supplement}
                        userBracket={userBracket}
                        userDose={doseInfo?.dose ?? null}
                        breed={profile?.breed ?? null}
                        accentColor={activeCategoryObj.accentColor}
                        isTracked={activeSlugs.has(supplement.slug)}
                        usageCount={usageCounts[supplement.slug] ?? 0}
                        isAuthenticated={isAuthenticated}
                        dogName={dogName}
                        onToggleTrack={handleToggle}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>

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
