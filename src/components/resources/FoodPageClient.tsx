"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import type { DogProfile, FoodItem, DietPrinciple } from "@/lib/resources/types";
import { getBreedNote } from "@/lib/resources/personalize";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import FoodCard from "./FoodCard";
import FoodDetailSheet from "./FoodDetailSheet";
import AppetiteStep from "./AppetiteStep";

interface FoodPageClientProps {
  profile: DogProfile | null;
  dietPrinciples: DietPrinciple[];
  foodItems: FoodItem[];
  foodCategories: { key: string; label: string; accentColor: string }[];
}

type ActiveMode = "recommended" | "avoid" | "appetite";

export default function FoodPageClient({
  profile,
  dietPrinciples,
  foodItems,
}: FoodPageClientProps) {
  const sectionRef = useScrollReveal();
  const [activeMode, setActiveMode] = useState<ActiveMode>("recommended");
  const [selectedFood, setSelectedFood] = useState<FoodItem | null>(null);
  const [activePrincipleDot, setActivePrincipleDot] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  const recommendedItems = foodItems.filter((f) => f.category === "recommended");
  const avoidItems = foodItems.filter((f) => f.category === "avoid");
  const appetiteItems = foodItems.filter((f) => f.category === "appetite");

  const dogName = profile?.dogName ?? null;

  // Breed note for selected food
  const selectedBreedNote = selectedFood
    ? getBreedNote(selectedFood.breedNotes, profile?.breed ?? null)
    : null;

  // Scroll observer for carousel dots
  const handleCarouselScroll = useCallback(() => {
    const el = carouselRef.current;
    if (!el) return;
    const scrollLeft = el.scrollLeft;
    const cardWidth = 280 + 12; // card width + gap
    const index = Math.round(scrollLeft / cardWidth);
    setActivePrincipleDot(Math.min(index, dietPrinciples.length - 1));
  }, [dietPrinciples.length]);

  useEffect(() => {
    const el = carouselRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleCarouselScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleCarouselScroll);
  }, [handleCarouselScroll]);

  // Avoid item expand state
  const [expandedAvoid, setExpandedAvoid] = useState<number | null>(null);

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-[100dvh] pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Compact Header (~130px) ═══ */}
      <div
        className="pt-20 pb-4 px-6"
        style={{
          background: "var(--warm-white)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-[800px] mx-auto reveal">
          {/* Back arrow */}
          <Link
            href="/resources"
            className="inline-flex items-center justify-center no-underline mb-3"
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              color: "var(--text)",
              marginLeft: -8,
            }}
            aria-label="Back to Resources"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>

          <h1
            className="font-serif font-semibold"
            style={{
              fontSize: "var(--text-h2)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            {dogName ? `What to Feed ${dogName}` : "What to Feed"}
          </h1>

          <p
            className="mt-1"
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--text-muted)",
            }}
          >
            {foodItems.length} foods across {new Set(foodItems.map((f) => f.category)).size} categories
          </p>

          <p
            className="mt-1 leading-snug"
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--terracotta)",
            }}
          >
            Always discuss dietary changes with your vet.
          </p>
        </div>
      </div>

      {/* ═══ Three-Tile Mode Switcher ═══ */}
      <div
        className="sticky px-6 py-3"
        style={{
          top: 56,
          zIndex: 20,
          background: "rgba(250,248,245,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-[800px] mx-auto grid grid-cols-3 gap-2">
          {/* Feed tile */}
          <button
            type="button"
            onClick={() => setActiveMode("recommended")}
            className="flex flex-col items-center justify-center rounded-xl cursor-pointer"
            style={{
              minHeight: 56,
              background:
                activeMode === "recommended"
                  ? "rgba(91,123,94,0.08)"
                  : "white",
              border:
                activeMode === "recommended"
                  ? "1.5px solid rgba(91,123,94,0.3)"
                  : "1.5px solid var(--border)",
              color:
                activeMode === "recommended"
                  ? "var(--sage)"
                  : "var(--text-muted)",
              fontWeight: activeMode === "recommended" ? 600 : 400,
              transition: "all 200ms ease",
            }}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
            }}
            onPointerUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
            onPointerLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M6.5 10.5L9 13L14 7"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              className="mt-1"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Feed
            </span>
            <span style={{ fontSize: "var(--text-fine)" }}>
              {recommendedItems.length} foods
            </span>
          </button>

          {/* Avoid tile */}
          <button
            type="button"
            onClick={() => setActiveMode("avoid")}
            className="flex flex-col items-center justify-center rounded-xl cursor-pointer"
            style={{
              minHeight: 56,
              background:
                activeMode === "avoid"
                  ? "rgba(212,133,106,0.08)"
                  : "white",
              border:
                activeMode === "avoid"
                  ? "1.5px solid rgba(212,133,106,0.3)"
                  : "1.5px solid var(--border)",
              color:
                activeMode === "avoid"
                  ? "var(--terracotta)"
                  : "var(--text-muted)",
              fontWeight: activeMode === "avoid" ? 600 : 400,
              transition: "all 200ms ease",
            }}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
            }}
            onPointerUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
            onPointerLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <circle
                cx="10"
                cy="10"
                r="8"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M7 7L13 13M13 7L7 13"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
            <span
              className="mt-1"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Avoid
            </span>
            <span style={{ fontSize: "var(--text-fine)" }}>
              {avoidItems.length} foods
            </span>
          </button>

          {/* Won't Eat? tile */}
          <button
            type="button"
            onClick={() => setActiveMode("appetite")}
            className="flex flex-col items-center justify-center rounded-xl cursor-pointer"
            style={{
              minHeight: 56,
              background:
                activeMode === "appetite"
                  ? "rgba(196,162,101,0.08)"
                  : "white",
              border:
                activeMode === "appetite"
                  ? "1.5px solid rgba(196,162,101,0.3)"
                  : "1.5px solid var(--border)",
              color:
                activeMode === "appetite"
                  ? "var(--gold-text)"
                  : "var(--text-muted)",
              fontWeight: activeMode === "appetite" ? 600 : 400,
              transition: "all 200ms ease",
            }}
            onPointerDown={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
            }}
            onPointerUp={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
            onPointerLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "scale(1)";
            }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <path
                d="M10 6V10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
            </svg>
            <span
              className="mt-1"
              style={{ fontSize: "var(--text-body-sm)" }}
            >
              Won&apos;t Eat?
            </span>
            <span style={{ fontSize: "var(--text-fine)" }}>
              {appetiteItems.length} tips
            </span>
          </button>
        </div>
      </div>

      {/* ═══ Filtered Content Area ═══ */}
      <div
        key={activeMode}
        style={{ animation: "scaleIn 0.3s ease-out" }}
      >
        <div className="max-w-[800px] mx-auto">
          {/* ── Feed View ── */}
          {activeMode === "recommended" && (
            <div className="px-6 pt-6 reveal">
              <div className="grid grid-cols-2 gap-3">
                {recommendedItems.map((item, i) => (
                  <FoodCard
                    key={i}
                    item={item}
                    onTap={setSelectedFood}
                  />
                ))}
              </div>
            </div>
          )}

          {/* ── Avoid View ── */}
          {activeMode === "avoid" && (
            <div className="pt-6 px-6 reveal">
              <div
                className="rounded-2xl px-4 py-4"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,133,106,0.04) 0%, rgba(212,133,106,0.02) 100%)",
                  border: "1px solid rgba(212,133,106,0.15)",
                }}
              >
                {avoidItems.map((item, i) => (
                  <div key={i}>
                    <button
                      type="button"
                      onClick={() =>
                        setExpandedAvoid(expandedAvoid === i ? null : i)
                      }
                      className="w-full text-left flex items-center gap-3"
                      style={{
                        minHeight: 56,
                        padding: "12px 0",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                    >
                      {/* Food illustration */}
                      <div
                        className="flex-shrink-0 relative rounded-lg overflow-hidden"
                        style={{
                          width: 48,
                          height: 48,
                          background:
                            "linear-gradient(135deg, rgba(212,133,106,0.06) 0%, rgba(245,240,234,0.4) 100%)",
                        }}
                      >
                        <Image
                          src={`/illustrations/food/${item.icon}`}
                          alt=""
                          fill
                          className="object-cover p-0.5"
                          sizes="48px"
                        />
                        {/* Terracotta X badge */}
                        <div
                          className="absolute flex items-center justify-center"
                          style={{
                            bottom: -2,
                            right: -2,
                            width: 16,
                            height: 16,
                            borderRadius: "50%",
                            background: "var(--terracotta)",
                          }}
                        >
                          <svg
                            width="8"
                            height="8"
                            viewBox="0 0 8 8"
                            fill="none"
                          >
                            <path
                              d="M2 2L6 6M6 2L2 6"
                              stroke="white"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Text */}
                      <div className="flex-1 min-w-0">
                        <span
                          className="font-serif font-semibold block"
                          style={{
                            fontSize: "var(--text-h3)",
                            color: "var(--text)",
                          }}
                        >
                          {item.name}
                        </span>
                        <span
                          className="block mt-0.5 leading-snug"
                          style={{
                            fontSize: "var(--text-body-sm)",
                            color: "var(--text-muted)",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {item.description.slice(0, 80)}
                          {item.description.length > 80 ? "..." : ""}
                        </span>
                      </div>

                      {/* Chevron */}
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        className="flex-shrink-0"
                        style={{
                          color: "var(--text-muted)",
                          transition: "transform 300ms ease",
                          transform:
                            expandedAvoid === i
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                        }}
                      >
                        <path
                          d="M4 6l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    {/* Expanded description */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateRows:
                          expandedAvoid === i ? "1fr" : "0fr",
                        transition: "grid-template-rows 300ms ease",
                      }}
                    >
                      <div style={{ overflow: "hidden" }}>
                        <p
                          className="leading-relaxed pb-3 pl-[60px]"
                          style={{
                            fontSize: "var(--text-body)",
                            color: "var(--text)",
                          }}
                        >
                          {item.description}
                        </p>
                        {item.stageEmphasis &&
                          item.stageEmphasis !== "all" && (
                            <div className="pb-3 pl-[60px]">
                              <span
                                className="inline-block px-2.5 py-0.5 rounded-full font-semibold uppercase tracking-wide"
                                style={{
                                  fontSize: "var(--text-fine)",
                                  background: "rgba(212,133,106,0.12)",
                                  color: "var(--terracotta)",
                                }}
                              >
                                {item.stageEmphasis === "early"
                                  ? "Early stage"
                                  : item.stageEmphasis === "advanced"
                                    ? "During treatment"
                                    : "Palliative"}
                              </span>
                            </div>
                          )}
                      </div>
                    </div>

                    {/* Divider */}
                    {i < avoidItems.length - 1 && (
                      <div
                        style={{
                          height: 1,
                          background: "rgba(212,133,106,0.1)",
                        }}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── Won't Eat? View ── */}
          {activeMode === "appetite" && (
            <div className="pt-6 px-6 reveal">
              <p
                className="mb-5 leading-relaxed"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                When appetite drops during treatment, try these in order.
              </p>

              <div>
                {appetiteItems.map((item, i) => (
                  <AppetiteStep
                    key={i}
                    item={item}
                    stepNumber={i + 1}
                    isLast={i === appetiteItems.length - 1}
                  />
                ))}
              </div>

              {/* Bottom vet callout */}
              <div
                className="rounded-xl px-4 py-3 mt-6 flex items-start gap-3"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(212,133,106,0.06) 0%, rgba(212,133,106,0.02) 100%)",
                  border: "1px solid rgba(212,133,106,0.15)",
                }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  className="flex-shrink-0 mt-0.5"
                  style={{ color: "var(--terracotta)" }}
                >
                  <path
                    d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M10 6V10.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="10" cy="13.5" r="0.75" fill="currentColor" />
                </svg>
                <p
                  className="leading-snug"
                  style={{
                    fontSize: "var(--text-body-sm)",
                    color: "var(--terracotta)",
                  }}
                >
                  If appetite drops for more than 24-48 hours, contact your vet.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Diet Principles — Horizontal Scroll ═══ */}
      <div className="mt-10 reveal">
        <div className="max-w-[800px] mx-auto">
          <div className="px-6 mb-3">
            <span
              className="font-semibold uppercase tracking-[0.12em]"
              style={{
                fontSize: "var(--text-label)",
                color: "var(--gold-text)",
              }}
            >
              Diet Principles
            </span>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="flex gap-3 overflow-x-auto pb-4"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingLeft: "max(24px, calc((100vw - 800px) / 2 + 24px))",
            paddingRight: 24,
          }}
        >
          {dietPrinciples.map((principle, i) => (
            <div
              key={i}
              className="rounded-2xl flex-shrink-0"
              style={{
                width: 280,
                scrollSnapAlign: "start",
                background: "white",
                border: "1px solid var(--border)",
                padding: "20px",
              }}
            >
              {/* Principle illustration */}
              <div className="flex justify-center mb-3">
                <div
                  className="relative"
                  style={{ width: 80, height: 80 }}
                >
                  <Image
                    src={`/illustrations/food/${principle.icon}`}
                    alt=""
                    fill
                    className="object-contain"
                    sizes="80px"
                  />
                </div>
              </div>

              {/* Title */}
              <h3
                className="font-serif font-semibold mb-2"
                style={{
                  fontSize: "var(--text-h3)",
                  color: "var(--text)",
                }}
              >
                {principle.title}
              </h3>

              {/* Summary — first sentence */}
              <p
                className="leading-relaxed line-clamp-3 mb-3"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                {principle.description.split(". ")[0]}.
              </p>

              {/* Read more link */}
              <Link
                href="/resources/diet"
                className="inline-flex items-center gap-1 no-underline font-semibold"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--sage)",
                }}
              >
                Read more
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M6 4l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </div>
          ))}
        </div>

        {/* Carousel dots */}
        <div className="flex justify-center gap-1.5 mt-1 mb-2">
          {dietPrinciples.map((_, i) => (
            <div
              key={i}
              className="rounded-full"
              style={{
                width: 6,
                height: 6,
                background:
                  activePrincipleDot === i
                    ? "var(--sage)"
                    : "var(--border)",
                transition: "background 200ms ease",
              }}
            />
          ))}
        </div>
      </div>

      {/* ═══ Cross-link + Print ═══ */}
      <div className="px-6 mt-8 reveal">
        <div className="max-w-[800px] mx-auto">
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

      {/* ═══ Bottom Sheet ═══ */}
      <FoodDetailSheet
        item={selectedFood}
        breedNote={selectedBreedNote}
        onClose={() => setSelectedFood(null)}
      />
    </div>
  );
}
