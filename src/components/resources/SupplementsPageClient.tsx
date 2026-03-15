"use client";

import { useCallback, useRef, useState } from "react";
import Link from "next/link";
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
import SectionDivider from "./SectionDivider";

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

  const userBracket: WeightBracket | null = profile?.weightLbs
    ? getWeightBracket(profile.weightLbs)
    : null;

  const dogName = profile?.dogName ?? null;

  // Build a lookup from category key -> category object
  const categoryMap = new Map(supplementCategories.map((c) => [c.key, c]));

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

  // Group supplements by category for the full library
  const supplementsByCategory = supplementCategories
    .map((cat) => ({
      category: cat,
      items: supplements.filter((s) => s.category === cat.key),
    }))
    .filter((group) => group.items.length > 0);

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Section 1: Hero ═══ */}
      <div
        className="pt-24 pb-14 px-6 relative overflow-hidden reveal"
        style={{
          background:
            "linear-gradient(160deg, rgba(91,123,94,0.08) 0%, rgba(196,162,101,0.04) 40%, rgba(245,240,234,0.5) 70%, var(--warm-white) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(91,123,94,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[800px] mx-auto">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 mb-4">
            <Link
              href="/resources"
              className="font-semibold uppercase tracking-[0.14em] no-underline hover:opacity-70 transition-opacity"
              style={{ fontSize: "var(--text-label)", color: "var(--sage)" }}
            >
              Resources
            </Link>
            <span
              className="w-px h-3"
              style={{ background: "var(--border-strong)" }}
            />
            <span
              className="font-semibold uppercase tracking-[0.14em]"
              style={{
                fontSize: "var(--text-label)",
                color: "var(--text-muted)",
              }}
            >
              Supplements
            </span>
          </div>

          {/* Title */}
          <h1
            className="font-serif font-semibold mb-3"
            style={{
              fontSize: "var(--text-title)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {dogName ? `${dogName}\u2019s Supplement Plan` : "Your Supplement Plan"}
          </h1>

          {/* Subtitle */}
          <p
            className="leading-relaxed max-w-[560px] mb-3"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
            }}
          >
            The supplements that HSA families and integrative vets reach for most
            often.
          </p>

          {/* Inline vet note */}
          <p
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--terracotta)",
            }}
          >
            Always discuss new supplements with your vet.
          </p>
        </div>
      </div>

      {/* ═══ Page body ═══ */}
      <div className="px-6">
        <div className="max-w-[800px] mx-auto">

          {/* ═══ Section 2: Start Here ═══ */}
          <section className="mt-10 mb-12 reveal">
            <p
              className="font-semibold uppercase tracking-[0.14em] mb-1"
              style={{ fontSize: "var(--text-label)", color: "var(--sage)" }}
            >
              Start Here
            </p>
            <h2
              className="font-serif font-semibold mb-6"
              style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
            >
              The essentials most families begin with
            </h2>

            <div className="space-y-4">
              {starterSupplements.map((supp) => {
                const cat = categoryMap.get(supp.category);
                const doseInfo = getDosageForWeight(
                  supp.dosage,
                  profile?.weightLbs ?? null
                );

                return (
                  <SupplementStarterCard
                    key={supp.slug}
                    supplement={supp}
                    categoryLabel={cat?.label ?? supp.category}
                    categoryColor={cat?.accentColor ?? "var(--sage)"}
                    personalDose={doseInfo?.dose ?? null}
                  />
                );
              })}
            </div>

            <p
              className="mt-5 leading-relaxed"
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--text-muted)",
              }}
            >
              These are the most commonly used and most studied.{" "}
              {dogName
                ? `Your vet may recommend others based on ${dogName}\u2019s specific situation.`
                : "Your vet may recommend others based on your dog\u2019s specific situation."}
            </p>
          </section>

          {/* ═══ Section 3: Full Library ═══ */}
          <SectionDivider />

          <section className="reveal">
            <p
              className="font-semibold uppercase tracking-[0.14em] mb-1"
              style={{
                fontSize: "var(--text-label)",
                color: "var(--text-muted)",
              }}
            >
              All Supplements
            </p>
            <h2
              className="font-serif font-semibold mb-8"
              style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
            >
              Full supplement library
            </h2>

            {supplementsByCategory.map((group) => (
              <div key={group.category.key} className="mb-12 reveal">
                {/* Category header */}
                <div className="mb-4">
                  <span
                    className="font-serif font-semibold"
                    style={{
                      fontSize: "var(--text-h3)",
                      color: "var(--text)",
                    }}
                  >
                    {group.category.label}
                  </span>
                  <span
                    className="ml-2"
                    style={{
                      fontSize: "var(--text-body-sm)",
                      color: "var(--text-muted)",
                    }}
                  >
                    &middot; {group.items.length}{" "}
                    {group.items.length === 1 ? "supplement" : "supplements"}
                  </span>
                </div>

                {/* Cards */}
                <div className="space-y-4">
                  {group.items.map((supplement) => {
                    const doseInfo = getDosageForWeight(
                      supplement.dosage,
                      profile?.weightLbs ?? null
                    );

                    return (
                      <SupplementCard
                        key={supplement.slug}
                        supplement={supplement}
                        userBracket={userBracket}
                        userDose={doseInfo?.dose ?? null}
                        breed={profile?.breed ?? null}
                        accentColor={group.category.accentColor}
                        isTracked={activeSlugs.has(supplement.slug)}
                        usageCount={usageCounts[supplement.slug] ?? 0}
                        isAuthenticated={isAuthenticated}
                        dogName={dogName}
                        onToggleTrack={handleToggle}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </section>

          {/* ═══ Section 4: Print / Share ═══ */}
          <div className="text-center mt-10 pt-8 reveal">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl font-medium cursor-pointer"
              style={{
                fontSize: "var(--text-body)",
                background: "var(--sage)",
                color: "#fff",
                border: "none",
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
              Bring this list to your vet
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
