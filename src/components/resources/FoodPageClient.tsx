"use client";

import Link from "next/link";
import type { DogProfile, FoodItem, DietPrinciple } from "@/lib/resources/types";
import { getBreedNote } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import FoodListItem from "./FoodListItem";
import AppetiteStep from "./AppetiteStep";
import FoodPrincipleSection from "./FoodPrincipleSection";
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
}: FoodPageClientProps) {
  const sectionRef = useScrollReveal();

  const recommendedItems = foodItems.filter((f) => f.category === "recommended");
  const avoidItems = foodItems.filter((f) => f.category === "avoid");
  const appetiteItems = foodItems.filter((f) => f.category === "appetite");

  const dogName = profile?.dogName ?? null;

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Section 1 — Hero ═══ */}
      <div
        className="pt-24 pb-14 px-6 relative overflow-hidden"
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
          {/* Breadcrumb */}
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
              What to Feed
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
            {dogName ? `What to Feed ${dogName}` : "What to Feed Your Dog"}
          </h1>

          <p
            className="leading-relaxed max-w-[560px] mb-4"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
            }}
          >
            Cancer cells feed on glucose. Less carbs, more protein. Here&apos;s
            what that looks like.
          </p>

          {/* Vet note */}
          <p
            className="leading-snug"
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--terracotta)",
            }}
          >
            Always discuss dietary changes with your vet.
          </p>
        </div>
      </div>

      {/* ═══ Main content ═══ */}
      <div className="px-6">
        <div className="max-w-[800px] mx-auto">

          {/* ═══ Section 2 — The Fridge List ═══ */}
          <section className="mt-10 reveal">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

              {/* Feed These */}
              <div>
                <span
                  className="font-semibold uppercase tracking-[0.12em] block mb-1"
                  style={{ fontSize: "var(--text-label)", color: "var(--sage)" }}
                >
                  Feed These
                </span>
                <h2
                  className="font-serif font-semibold mb-1"
                  style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
                >
                  Recommended Foods
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  {recommendedItems.length} foods
                </p>

                <div className="space-y-3">
                  {recommendedItems.map((item, i) => {
                    const breedNote = getBreedNote(
                      item.breedNotes,
                      profile?.breed ?? null,
                    );
                    return (
                      <FoodListItem
                        key={i}
                        item={item}
                        variant="recommended"
                        breedNote={breedNote}
                      />
                    );
                  })}
                </div>
              </div>

              {/* Not These */}
              <div>
                <span
                  className="font-semibold uppercase tracking-[0.12em] block mb-1"
                  style={{ fontSize: "var(--text-label)", color: "var(--terracotta)" }}
                >
                  Avoid These
                </span>
                <h2
                  className="font-serif font-semibold mb-1"
                  style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
                >
                  Foods to Avoid
                </h2>
                <p
                  className="mb-4"
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--text-muted)",
                  }}
                >
                  {avoidItems.length} foods
                </p>

                <div
                  className="rounded-2xl px-4 py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,133,106,0.05) 0%, rgba(212,133,106,0.02) 100%)",
                    border: "1px solid rgba(212,133,106,0.15)",
                  }}
                >
                  <div className="space-y-3">
                    {avoidItems.map((item, i) => (
                      <FoodListItem
                        key={i}
                        item={item}
                        variant="avoid"
                        breedNote={null}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* ═══ Section 3 — When They Won't Eat ═══ */}
          <SectionDivider />

          <section className="reveal">
            <span
              className="font-semibold uppercase tracking-[0.12em] block mb-1"
              style={{ fontSize: "var(--text-label)", color: "var(--gold)" }}
            >
              When They Won&apos;t Eat
            </span>
            <h2
              className="font-serif font-semibold mb-1"
              style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
            >
              Appetite Boosters
            </h2>
            <p
              className="mb-5"
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--text-muted)",
              }}
            >
              When appetite drops during treatment, try these strategies in order.
            </p>

            <div className="space-y-3">
              {appetiteItems.map((item, i) => (
                <AppetiteStep key={i} item={item} stepNumber={i + 1} />
              ))}
            </div>
          </section>

          {/* ═══ Section 4 — The Principles ═══ */}
          <SectionDivider />

          <section className="reveal">
            <span
              className="font-semibold uppercase tracking-[0.12em] block mb-1"
              style={{ fontSize: "var(--text-label)", color: "var(--text-muted)" }}
            >
              The Science
            </span>
            <h2
              className="font-serif font-semibold mb-1"
              style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
            >
              Diet Principles
            </h2>
            <p
              className="mb-6"
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--text-muted)",
              }}
            >
              The research behind why this diet works.
            </p>

            <div className="space-y-5">
              {dietPrinciples.map((principle, i) => (
                <div
                  key={i}
                  className="rounded-xl px-5 py-5"
                  style={{
                    background: "white",
                    border: "1px solid var(--border)",
                  }}
                >
                  <FoodPrincipleSection
                    principle={principle}
                    index={i}
                    defaultExpanded={false}
                  />
                </div>
              ))}
            </div>
          </section>

          {/* ═══ Section 5 — Cross-link + Print ═══ */}
          <SectionDivider />

          <div className="reveal">
            <Link
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
                className="font-semibold uppercase tracking-[0.1em] mb-1"
                style={{ color: "var(--sage)", fontSize: "var(--text-label)" }}
              >
                Want to go deeper?
              </div>
              <div
                className="font-serif font-semibold mb-1"
                style={{ color: "var(--text)", fontSize: "var(--text-h3)" }}
              >
                The Science Behind the Cancer Diet
              </div>
              <div
                style={{
                  color: "var(--text-muted)",
                  fontSize: "var(--text-body-sm)",
                }}
              >
                Warburg Effect, anti-cancer protocols, meal plan builder, and what
                veterinary oncologists actually recommend.
              </div>
            </Link>
          </div>

          {/* Print button */}
          <div className="text-center mt-8 reveal">
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold transition-opacity hover:opacity-90"
              style={{
                background: "var(--sage)",
                color: "white",
                fontSize: "var(--text-body-sm)",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 16 16"
                fill="none"
                style={{ flexShrink: 0 }}
              >
                <path
                  d="M4 2h8v3H4V2zM3 5h10v6H3V5zM5 11h6v3H5v-3z"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Print this page
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
