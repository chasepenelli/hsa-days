"use client";

import { useCallback, useRef, useState } from "react";
import type { Supplement, SupplementCategory, DogProfile, WeightBracket } from "@/lib/resources/types";
import { getWeightBracket, getDosageForWeight } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PersonalizedBanner from "./PersonalizedBanner";
import VetCallout from "./VetCallout";
import CategoryNav from "./CategoryNav";
import SupplementCard from "./SupplementCard";
import SectionDivider from "./SectionDivider";

/* ── Category illustration paths ── */
const categoryIllustrations: Record<string, string> = {
  blood_support: "/illustrations/supplements/blood-support.png",
  anti_cancer: "/illustrations/supplements/anti-cancer.png",
  immune_support: "/illustrations/supplements/immune-support.png",
  liver_organ: "/illustrations/supplements/liver-organ.png",
  quality_of_life: "/illustrations/supplements/quality-of-life.png",
};

/* ── Category SVG icons ── */
const categoryIcons: Record<string, React.ReactNode> = {
  blood_support: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  anti_cancer: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22c4.97 0 9-4.03 9-9s-4.03-9-9-9-9 4.03-9 9 4.03 9 9 9z" />
      <path d="M12 8v8M8 12h8" />
    </svg>
  ),
  immune_support: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L9 7H3l5 4-2 7 6-4 6 4-2-7 5-4h-6z" />
    </svg>
  ),
  liver_organ: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17.5c0-3 2-5.5 5-5.5s5 2.5 5 5.5" />
      <path d="M12 12V3M9 6l3-3 3 3" />
      <circle cx="12" cy="17.5" r="3.5" />
    </svg>
  ),
  quality_of_life: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  ),
};

interface SupplementsPageClientProps {
  profile: DogProfile | null;
  supplements: Supplement[];
  categories: SupplementCategory[];
  usageCounts: Record<string, number>;
  userActiveSlugs: string[];
  isAuthenticated: boolean;
}

export default function SupplementsPageClient({
  profile,
  supplements,
  categories,
  usageCounts: initialUsageCounts,
  userActiveSlugs: initialActiveSlugs,
  isAuthenticated,
}: SupplementsPageClientProps) {
  const sectionRef = useScrollReveal();
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  // Tracking state
  const [activeSlugs, setActiveSlugs] = useState<Set<string>>(
    () => new Set(initialActiveSlugs)
  );
  const [usageCounts, setUsageCounts] = useState<Record<string, number>>(
    initialUsageCounts
  );

  const userBracket: WeightBracket | null =
    profile?.weightLbs ? getWeightBracket(profile.weightLbs) : null;

  const scrollToCategory = useCallback((key: string) => {
    const el = categoryRefs.current[key];
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

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
        // Reconcile with server count
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

  // Compute category usage totals
  const getCategoryUsageTotal = (catKey: string) => {
    const catSupps = supplements.filter((s) => s.category === catKey);
    return catSupps.reduce((sum, s) => sum + (usageCounts[s.slug] ?? 0), 0);
  };

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Hero Section ═══ */}
      <div
        className="pt-20 pb-10 px-4 sm:px-6 relative overflow-hidden"
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

        <div className="max-w-[800px] mx-auto reveal">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 mb-4">
            <span
              className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--sage)" }}
            >
              Resources
            </span>
            <span
              className="w-px h-3"
              style={{ background: "var(--border-strong)" }}
            />
            <span
              className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)" }}
            >
              Supplements
            </span>
          </div>

          <h1
            className="font-serif font-semibold mb-3"
            style={{
              fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            Supplement Guide
          </h1>
          <p
            className="leading-relaxed max-w-[560px]"
            style={{
              fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
              color: "var(--text-muted)",
            }}
          >
            Research-backed supplements organized by category, with dosages
            personalized to your dog&apos;s weight.
          </p>
        </div>
      </div>

      {/* ═══ Page content ═══ */}
      <div className="px-4 sm:px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Personalized banner */}
          {profile && (
            <div className="reveal mt-6">
              <PersonalizedBanner profile={profile} />
            </div>
          )}

          {/* Vet callout */}
          <div className={profile ? "reveal" : "reveal mt-6"}>
            <VetCallout dogName={profile?.dogName} />
          </div>

          {/* Weight prompt if no weight on file */}
          {profile && !profile.weightLbs && (
            <div
              className="rounded-xl px-5 py-4 mb-6 reveal"
              style={{
                background: "rgba(91,123,94,0.05)",
                border: "1px solid rgba(91,123,94,0.15)",
              }}
            >
              <p className="text-[0.88rem]" style={{ color: "var(--sage)" }}>
                Add {profile.dogName}&apos;s weight in your profile settings for
                personalized dosage highlighting.
              </p>
            </div>
          )}

          {/* Category nav */}
          <CategoryNav
            categories={categories}
            activeCategory=""
            onCategoryClick={scrollToCategory}
          />

          {/* ═══ Supplement sections by category ═══ */}
          {categories.map((cat, catIndex) => {
            const catSupplements = supplements.filter(
              (s) => s.category === cat.key
            );
            if (catSupplements.length === 0) return null;

            const categoryTotal = getCategoryUsageTotal(cat.key);
            const icon = categoryIcons[cat.key];
            const illustration = categoryIllustrations[cat.key];

            return (
              <div key={cat.key}>
                {/* Ornamental divider between categories */}
                {catIndex > 0 && <SectionDivider />}

                <section
                  ref={(el) => { categoryRefs.current[cat.key] = el; }}
                  className="mb-10 reveal"
                >
                  {/* Category scene illustration — frameless, fades into page */}
                  {illustration && (
                    <div className="relative mb-4 -mx-1 sm:mx-0">
                      <img
                        src={illustration}
                        alt=""
                        loading="lazy"
                        className="w-full h-[120px] sm:h-[160px] md:h-[180px] object-cover object-center"
                        style={{ opacity: 0.55 }}
                      />
                      {/* Bottom fade into page background */}
                      <div
                        className="absolute bottom-0 left-0 right-0 h-12"
                        style={{
                          background: "linear-gradient(to top, var(--warm-white), transparent)",
                        }}
                      />
                    </div>
                  )}

                  {/* Category header */}
                  <div className="mb-5">
                    <div className="flex items-center gap-2.5 mb-1.5">
                      {/* Icon pill — matches food page pattern */}
                      {icon && (
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                          style={{ background: `${cat.accentColor}18` }}
                        >
                          <span style={{ color: cat.accentColor }}>
                            {icon}
                          </span>
                        </div>
                      )}
                      <h2
                        className="font-serif text-[1.3rem] font-semibold"
                        style={{ color: "var(--text)" }}
                      >
                        {cat.label}
                      </h2>
                    </div>
                    <p
                      className="text-[0.85rem] leading-relaxed"
                      style={{
                        color: "var(--text-muted)",
                        marginLeft: icon ? "44px" : undefined,
                      }}
                    >
                      {cat.description}
                    </p>
                    {categoryTotal > 0 && (
                      <p
                        className="text-[0.78rem] mt-1.5 flex items-center gap-1.5"
                        style={{
                          color: "var(--sage)",
                          marginLeft: icon ? "44px" : undefined,
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
                        {categoryTotal}{" "}
                        {categoryTotal === 1 ? "family" : "families"} using
                        supplements in this category
                      </p>
                    )}
                  </div>

                  {/* Cards list */}
                  <div className="space-y-3 reveal-stagger">
                    {catSupplements.map((supplement) => {
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
                          accentColor={cat.accentColor}
                          isTracked={activeSlugs.has(supplement.slug)}
                          usageCount={usageCounts[supplement.slug] ?? 0}
                          isAuthenticated={isAuthenticated}
                          dogName={profile?.dogName ?? null}
                          onToggleTrack={handleToggle}
                        />
                      );
                    })}
                  </div>
                </section>
              </div>
            );
          })}

          {/* Print / save hint — matches food page style */}
          <div
            className="text-center mt-10 pt-8 reveal"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(91,123,94,0.05)",
                border: "1px solid var(--border)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                style={{ color: "var(--text-muted)", flexShrink: 0 }}
              >
                <path
                  d="M3 4h10v7H3V4zM1 7h2M13 7h2M5 2h6M5 14h6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <p
                className="text-[0.82rem]"
                style={{ color: "var(--text-muted)" }}
              >
                Use your browser&apos;s print function to save this page as a
                PDF to share with your vet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
