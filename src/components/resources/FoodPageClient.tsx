"use client";

import { useCallback, useRef } from "react";
import Link from "next/link";
import type { DogProfile, FoodItem, DietPrinciple } from "@/lib/resources/types";
import { getBreedNote } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PersonalizedBanner from "./PersonalizedBanner";
import VetCallout from "./VetCallout";
import CategoryNav from "./CategoryNav";
import FoodPrincipleSection from "./FoodPrincipleSection";
import FoodFlipCard from "./FoodFlipCard";
import FoodTipCard from "./FoodTipCard";
import SectionDivider from "./SectionDivider";

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

  const recommendedItems = foodItems.filter((f) => f.category === "recommended");
  const avoidItems = foodItems.filter((f) => f.category === "avoid");
  const appetiteItems = foodItems.filter((f) => f.category === "appetite");

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Hero Section ═══ */}
      <div
        className="pt-20 pb-14 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(91,123,94,0.08) 0%, rgba(196,162,101,0.04) 40%, rgba(245,240,234,0.5) 70%, var(--warm-white) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(91,123,94,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[800px] mx-auto reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Link
              href="/resources"
              className="font-semibold uppercase tracking-[0.14em] no-underline hover:opacity-70 transition-opacity"
              style={{ color: "var(--sage)", fontSize: "var(--text-label)" }}
            >
              Resources
            </Link>
            <span
              className="w-px h-3"
              style={{ background: "var(--border-strong)" }}
            />
            <span
              className="font-semibold uppercase tracking-[0.14em]"
              style={{ color: "var(--text-muted)", fontSize: "var(--text-label)" }}
            >
              Food &amp; Nutrition
            </span>
          </div>

          <h1
            className="font-serif font-semibold mb-3"
            style={{
              fontSize: "var(--text-title)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            What to Feed Your Dog
          </h1>
          <p
            className="leading-relaxed max-w-[560px]"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
            }}
          >
            Evidence-based guidance on what to feed, what to avoid, and how to
            keep their appetite up through treatment.
          </p>
        </div>
      </div>

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

          {/* Category nav */}
          <CategoryNav
            categories={allNavItems}
            activeCategory=""
            onCategoryClick={scrollToCategory}
          />

          {/* ═══ Diet Principles — Full Sections ═══ */}
          <section
            ref={(el) => {
              categoryRefs.current["principles"] = el;
            }}
            className="mb-8"
          >
            <div className="reveal mb-6">
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: "var(--sage)" }}
                />
                <h2
                  className="font-serif font-semibold"
                  style={{ color: "var(--text)", fontSize: "var(--text-h2)" }}
                >
                  Diet Principles
                </h2>
              </div>
              <p
                className="ml-[18px]"
                style={{ color: "var(--text-muted)", fontSize: "var(--text-body-sm)" }}
              >
                Evidence-based nutritional guidance for dogs with cancer
              </p>
            </div>

            <div className="space-y-10">
              {dietPrinciples.map((principle, i) => (
                <div key={i} className="reveal">
                  <FoodPrincipleSection principle={principle} index={i} />
                  {i < dietPrinciples.length - 1 && (
                    <div
                      className="mt-10 h-px"
                      style={{
                        background:
                          "linear-gradient(to right, transparent, var(--border-strong) 30%, var(--border-strong) 70%, transparent)",
                      }}
                    />
                  )}
                </div>
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Recommended Foods — Visual Grid with Flip ═══ */}
          <section
            ref={(el) => {
              categoryRefs.current["recommended"] = el;
            }}
            className="mb-8"
          >
            <div className="reveal mb-5">
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "var(--sage)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2 5.5l2 2 4-4"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h2
                  className="font-serif font-semibold"
                  style={{ color: "var(--text)", fontSize: "var(--text-h2)" }}
                >
                  Recommended Foods
                </h2>
              </div>
              <p
                className="ml-[30px]"
                style={{ color: "var(--text-muted)", fontSize: "var(--text-body-sm)" }}
              >
                Tap any card to learn more
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 reveal-stagger">
              {recommendedItems.map((item, i) => {
                const breedNote = getBreedNote(
                  item.breedNotes,
                  profile?.breed ?? null,
                );
                return (
                  <FoodFlipCard
                    key={i}
                    item={item}
                    variant="recommended"
                    breedNote={breedNote}
                  />
                );
              })}
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Foods to Avoid — Grid with Flip (Terracotta) ═══ */}
          <section
            ref={(el) => {
              categoryRefs.current["avoid"] = el;
            }}
            className="mb-8"
          >
            <div
              className="rounded-2xl px-4 sm:px-5 py-6"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,133,106,0.05) 0%, rgba(212,133,106,0.02) 100%)",
                border: "1px solid rgba(212,133,106,0.15)",
              }}
            >
              <div className="reveal mb-5">
                <div className="flex items-center gap-2.5 mb-1">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center"
                    style={{ background: "var(--terracotta)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path
                        d="M2.5 2.5l5 5M7.5 2.5l-5 5"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h2
                    className="font-serif font-semibold"
                    style={{ color: "var(--text)", fontSize: "var(--text-h2)" }}
                  >
                    Foods to Avoid
                  </h2>
                </div>
                <p
                  className="ml-[30px]"
                  style={{ color: "var(--text-muted)", fontSize: "var(--text-body-sm)" }}
                >
                  These can interfere with treatment or feed cancer cells
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 reveal-stagger">
                {avoidItems.map((item, i) => (
                  <FoodFlipCard
                    key={i}
                    item={item}
                    variant="avoid"
                    breedNote={null}
                  />
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Appetite Boosters — Tip Cards ═══ */}
          <section
            ref={(el) => {
              categoryRefs.current["appetite"] = el;
            }}
            className="mb-12"
          >
            <div className="reveal mb-5">
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(196,162,101,0.15)" }}
                >
                  <svg
                    width="11"
                    height="11"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M10 2a1 1 0 011 1v1.5a1 1 0 01-2 0V3a1 1 0 011-1zM10 7.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm-6.7 1a1 1 0 011.37-.36l1.3.75a1 1 0 01-1 1.73l-1.3-.75A1 1 0 013.3 8.5zm13.4 0a1 1 0 00-1.37-.36l-1.3.75a1 1 0 001 1.73l1.3-.75a1 1 0 00.37-1.37zM10 14.5a1 1 0 011 1V17a1 1 0 01-2 0v-1.5a1 1 0 011-1z"
                      fill="var(--gold)"
                    />
                  </svg>
                </div>
                <h2
                  className="font-serif font-semibold"
                  style={{ color: "var(--text)", fontSize: "var(--text-h2)" }}
                >
                  Appetite Boosters
                </h2>
              </div>
              <p
                className="ml-[30px]"
                style={{ color: "var(--text-muted)", fontSize: "var(--text-body-sm)" }}
              >
                When they won&apos;t eat, try these strategies
              </p>
            </div>

            <div className="space-y-4 reveal-stagger">
              {appetiteItems.map((item, i) => (
                <FoodTipCard key={i} item={item} index={i} />
              ))}
            </div>
          </section>

          {/* Cross-link to diet science */}
          <div className="reveal mt-10">
            <a
              href="/resources/diet"
              className="block rounded-xl px-5 py-4 no-underline transition-colors duration-200"
              style={{
                background: "var(--cream)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--sage-light)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
              }}
            >
              <div
                className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] mb-1"
                style={{ color: "var(--sage)" }}
              >
                Go deeper
              </div>
              <div
                className="font-serif text-[1rem] font-semibold mb-1"
                style={{ color: "var(--text)" }}
              >
                The Science Behind the Cancer Diet
              </div>
              <div
                className="text-[0.85rem]"
                style={{ color: "var(--text-muted)" }}
              >
                Warburg Effect, anti-cancer protocols, meal plan builder, and
                what veterinary oncologists actually recommend.
              </div>
            </a>
          </div>

          {/* Print / save hint */}
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
