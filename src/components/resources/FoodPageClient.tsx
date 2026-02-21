"use client";

import { useCallback, useRef } from "react";
import type { DogProfile, FoodItem, DietPrinciple } from "@/lib/resources/types";
import { getBreedNote } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PersonalizedBanner from "./PersonalizedBanner";
import VetCallout from "./VetCallout";
import CategoryNav from "./CategoryNav";

interface FoodPageClientProps {
  profile: DogProfile | null;
  dietPrinciples: DietPrinciple[];
  foodItems: FoodItem[];
  foodCategories: { key: string; label: string; accentColor: string }[];
}

export default function FoodPageClient({
  profile,
  dietPrinciples,
  foodItems,
  foodCategories,
}: FoodPageClientProps) {
  const sectionRef = useScrollReveal();
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const allNavItems = [
    { key: "principles", label: "Diet Principles", accentColor: "var(--sage)" },
    ...foodCategories,
  ];

  const scrollToCategory = useCallback((key: string) => {
    const el = categoryRefs.current[key];
    if (el) {
      const offset = 140;
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
            Food &amp; Nutrition
          </h1>
          <p className="text-[1.05rem] text-text-muted leading-relaxed">
            What to feed, what to avoid, and how to keep their appetite up
            during treatment.
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

        {/* Category nav */}
        <CategoryNav
          categories={allNavItems}
          activeCategory=""
          onCategoryClick={scrollToCategory}
        />

        {/* Diet Principles */}
        <section
          ref={(el) => { categoryRefs.current["principles"] = el; }}
          className="mb-12 reveal"
        >
          <h2
            className="font-serif text-[1.35rem] font-semibold mb-4"
            style={{ color: "var(--text)" }}
          >
            Diet Principles
          </h2>
          <div className="space-y-4">
            {dietPrinciples.map((principle, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl px-6 py-5"
                style={{ border: "1px solid var(--border)" }}
              >
                <h3
                  className="font-serif text-[1.05rem] font-semibold mb-2"
                  style={{ color: "var(--text)" }}
                >
                  {principle.title}
                </h3>
                <p
                  className="text-[0.88rem] leading-relaxed mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  {principle.description}
                </p>
                <ul className="space-y-1.5">
                  {principle.details.map((detail, j) => (
                    <li
                      key={j}
                      className="text-[0.85rem] flex items-start gap-2"
                      style={{ color: "var(--text)" }}
                    >
                      <span
                        className="mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--sage)" }}
                      />
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Food sections */}
        {foodCategories.map((cat) => {
          const items = foodItems.filter((f) => f.category === cat.key);
          if (items.length === 0) return null;

          return (
            <section
              key={cat.key}
              ref={(el) => { categoryRefs.current[cat.key] = el; }}
              className="mb-12 reveal"
            >
              <h2
                className="font-serif text-[1.35rem] font-semibold mb-4"
                style={{ color: "var(--text)" }}
              >
                {cat.label}
              </h2>
              <div className="space-y-3">
                {items.map((item, i) => {
                  const breedNote = getBreedNote(
                    item.breedNotes,
                    profile?.breed ?? null
                  );

                  return (
                    <div
                      key={i}
                      className="bg-white rounded-2xl px-6 py-5"
                      style={{
                        border: "1px solid var(--border)",
                        borderLeft: `3px solid ${cat.accentColor}`,
                      }}
                    >
                      <h3
                        className="font-serif text-[1rem] font-semibold mb-1.5"
                        style={{ color: "var(--text)" }}
                      >
                        {item.name}
                      </h3>
                      <p
                        className="text-[0.88rem] leading-relaxed"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {item.description}
                      </p>

                      {breedNote && (
                        <div
                          className="rounded-lg px-4 py-2.5 mt-3"
                          style={{
                            background: "rgba(196,162,101,0.06)",
                            borderLeft: "3px solid var(--gold)",
                          }}
                        >
                          <p
                            className="text-[0.82rem]"
                            style={{ color: "var(--text)" }}
                          >
                            {breedNote}
                          </p>
                        </div>
                      )}
                    </div>
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
