"use client";

import { useCallback, useRef } from "react";
import type { Supplement, SupplementCategory, DogProfile, WeightBracket } from "@/lib/resources/types";
import { getWeightBracket, getDosageForWeight } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PersonalizedBanner from "./PersonalizedBanner";
import VetCallout from "./VetCallout";
import CategoryNav from "./CategoryNav";
import SupplementCard from "./SupplementCard";

interface SupplementsPageClientProps {
  profile: DogProfile | null;
  supplements: Supplement[];
  categories: SupplementCategory[];
}

export default function SupplementsPageClient({
  profile,
  supplements,
  categories,
}: SupplementsPageClientProps) {
  const sectionRef = useScrollReveal();
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const userBracket: WeightBracket | null =
    profile?.weightLbs ? getWeightBracket(profile.weightLbs) : null;

  const scrollToCategory = useCallback((key: string) => {
    const el = categoryRefs.current[key];
    if (el) {
      const offset = 140; // account for sticky nav
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pt-24 pb-16 px-6"
    >
      <div className="max-w-[800px] mx-auto">
        {/* Header */}
        <div className="mb-8 reveal">
          <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
            Resources
          </div>
          <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
            Supplement Guide
          </h1>
          <p className="text-[1.05rem] text-text-muted leading-relaxed">
            Research-backed supplements organized by category, with dosages
            personalized to your dog&apos;s weight.
          </p>
        </div>

        {/* Personalized banner */}
        {profile && (
          <div className="reveal">
            <PersonalizedBanner profile={profile} />
          </div>
        )}

        {/* Vet callout */}
        <div className="reveal">
          <VetCallout dogName={profile?.dogName} />
        </div>

        {/* Weight prompt if no weight */}
        {profile && !profile.weightLbs && (
          <div
            className="rounded-xl px-5 py-4 mb-8 reveal"
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

        {/* Supplement sections by category */}
        {categories.map((cat) => {
          const catSupplements = supplements.filter(
            (s) => s.category === cat.key
          );
          if (catSupplements.length === 0) return null;

          return (
            <section
              key={cat.key}
              ref={(el) => { categoryRefs.current[cat.key] = el; }}
              className="mb-12 reveal"
            >
              <div className="mb-4">
                <h2
                  className="font-serif text-[1.35rem] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {cat.label}
                </h2>
                <p
                  className="text-[0.88rem] mt-1 leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {cat.description}
                </p>
              </div>

              <div className="space-y-3">
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
                    />
                  );
                })}
              </div>
            </section>
          );
        })}

        {/* Print hint */}
        <div className="text-center mt-12 pt-8 reveal" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
            Tip: Use your browser&apos;s print function to save this page as a
            PDF to share with your vet.
          </p>
        </div>
      </div>
    </div>
  );
}
