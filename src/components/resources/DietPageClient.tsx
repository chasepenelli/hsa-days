"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type {
  DogProfile,
  FoodItem,
  MealPlanMap,
  MealFormOption,
  DietCaution,
  DietStyle,
  WeightBracket,
  DietSource,
} from "@/lib/resources/types";
import {
  DIET_SUPPLEMENTS,
  PROTOCOL_GAP,
  GLYCINE_SECTION,
  ONCOLOGIST_CONSENSUS,
  ACTIVE_RESEARCH,
  DIET_SOURCES,
  MONITORING_CALLOUT,
} from "@/lib/resources/diet";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import PersonalizedBanner from "./PersonalizedBanner";
import VetCallout from "./VetCallout";
import DietOvalNav from "./DietOvalNav";
import DietHeroPanel from "./DietHeroPanel";
import FoodFlipCard from "./FoodFlipCard";
import SectionDivider from "./SectionDivider";
import WarburgIllustration from "./WarburgIllustration";
import DietHeroAccent from "./DietHeroAccent";
import DietSupplementCard from "./DietSupplementCard";

interface DietPageClientProps {
  profile: DogProfile | null;
  foodItems: FoodItem[];
  mealPlanMap: MealPlanMap;
  mealFormGuide: MealFormOption[];
  cautions: DietCaution[];
}

const NAV_ITEMS = [
  { key: "science",     label: "The Science",    accentColor: "var(--sage)",       icon: "broccoli.png"     },
  { key: "best-foods",  label: "Best Foods",      accentColor: "var(--sage)",       icon: "fish.png"         },
  { key: "avoid",       label: "Foods to Avoid",  accentColor: "var(--terracotta)", icon: "grains.png"       },
  { key: "supplements", label: "Supplements",     accentColor: "var(--sage)",       icon: "healthy-fats.png" },
  { key: "the-debate",  label: "The Debate",      accentColor: "var(--gold)",       icon: "bone-broth.png"   },
  { key: "meal-form",   label: "Meal Form",       accentColor: "var(--gold)",       icon: "warm-bowl.png"    },
  { key: "meal-plan",   label: "Build a Plan",    accentColor: "var(--gold)",       icon: "whole-foods.png"  },
  { key: "vets",        label: "What Vets Say",   accentColor: "var(--sage)",       icon: "egg.png"          },
  { key: "research",    label: "Research",        accentColor: "var(--sage)",       icon: "protein.png"      },
  { key: "cautions",    label: "Cautions",        accentColor: "var(--terracotta)", icon: "raw-meat.png"     },
];

const WEIGHT_BRACKETS: { key: WeightBracket; label: string }[] = [
  { key: "under25", label: "Under 25 lbs" },
  { key: "25to50", label: "25–50 lbs" },
  { key: "50to75", label: "50–75 lbs" },
  { key: "over75", label: "75+ lbs" },
];

const DIET_STYLES: { key: DietStyle; label: string; description: string }[] = [
  {
    key: "low-carb",
    label: "Low-Carb",
    description: "High protein, minimal carbs, moderate fat",
  },
  {
    key: "keto",
    label: "Ketogenic",
    description: "Very high fat, very low carb — work with a DACVN",
  },
  {
    key: "balanced-fresh",
    label: "Balanced Fresh",
    description: "Whole-food variety, under 15% carbs",
  },
];

const VERDICT_CONFIG = {
  recommended: { color: "var(--sage)", rgb: "91,123,94", dot: "bg-sage" },
  good: { color: "var(--gold)", rgb: "196,162,101", dot: "bg-gold" },
  avoid: { color: "var(--terracotta)", rgb: "212,133,106", dot: "bg-terracotta" },
};

const SOURCE_TYPE_CONFIG: Record<
  DietSource["type"],
  { label: string; bg: string; color: string; border: string }
> = {
  clinical: {
    label: "Clinical",
    bg: "rgba(91,123,94,0.08)",
    color: "var(--sage)",
    border: "rgba(91,123,94,0.2)",
  },
  review: {
    label: "Review",
    bg: "rgba(196,162,101,0.08)",
    color: "var(--gold)",
    border: "rgba(196,162,101,0.2)",
  },
  organization: {
    label: "Organization",
    bg: "rgba(245,240,234,0.9)",
    color: "var(--text-muted)",
    border: "rgba(0,0,0,0.1)",
  },
  integrative: {
    label: "Integrative",
    bg: "rgba(212,133,106,0.08)",
    color: "var(--terracotta)",
    border: "rgba(212,133,106,0.2)",
  },
};

function MacroBar({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[0.78rem] font-medium w-14 flex-shrink-0"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <div
        className="flex-1 rounded-full overflow-hidden"
        style={{ height: 8, background: "var(--border)" }}
      >
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{ width: `${value}%`, background: color }}
        />
      </div>
      <span
        className="text-[0.78rem] font-semibold w-8 text-right flex-shrink-0"
        style={{ color: "var(--text)" }}
      >
        {value}%
      </span>
    </div>
  );
}

export default function DietPageClient({
  profile,
  foodItems,
  mealPlanMap,
  mealFormGuide,
  cautions,
}: DietPageClientProps) {
  // New v2 data — imported directly from the data layer
  const supplements = DIET_SUPPLEMENTS;
  const protocolGap = PROTOCOL_GAP;
  const glycineSection = GLYCINE_SECTION;
  const oncologistConsensus = ONCOLOGIST_CONSENSUS;
  const activeResearch = ACTIVE_RESEARCH;
  const dietSources = DIET_SOURCES;
  const monitoringCallout = MONITORING_CALLOUT;
  const sectionRef = useScrollReveal();
  const categoryRefs = useRef<Record<string, HTMLElement | null>>({});

  const [selectedWeight, setSelectedWeight] = useState<WeightBracket | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<DietStyle | null>(null);
  const [generatedPlan, setGeneratedPlan] = useState<import("@/lib/resources/types").MealPlanTemplate | null>(null);
  const [planVisible, setPlanVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>("");
  const planResultRef = useRef<HTMLDivElement | null>(null);

  // Collapse-all signal for supplement dosing tables
  const [collapseAllSignal, setCollapseAllSignal] = useState(false);
  const handleCollapseAll = () => {
    setCollapseAllSignal(true);
    requestAnimationFrame(() => setCollapseAllSignal(false));
  };

  const recommendedItems = foodItems.filter((f) => f.category === "recommended");
  const avoidItems = foodItems.filter((f) => f.category === "avoid");

  // ── IntersectionObserver: highlight active nav pill as user scrolls ──
  useEffect(() => {
    const sectionKeys = NAV_ITEMS.map((n) => n.key);
    const observers: IntersectionObserver[] = [];

    const visibleSections = new Set<string>();

    const pickActive = () => {
      for (const key of sectionKeys) {
        if (visibleSections.has(key)) {
          setActiveCategory(key);
          return;
        }
      }
    };

    sectionKeys.forEach((key) => {
      const el = categoryRefs.current[key];
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            visibleSections.add(key);
          } else {
            visibleSections.delete(key);
          }
          pickActive();
        },
        {
          rootMargin: "-20% 0px -55% 0px",
          threshold: 0,
        }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollToSection = useCallback((key: string) => {
    const el = categoryRefs.current[key];
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const handleGeneratePlan = () => {
    if (!selectedWeight || !selectedStyle) return;
    const plan = mealPlanMap[selectedStyle][selectedWeight];
    setPlanVisible(false);
    setGeneratedPlan(plan);
    requestAnimationFrame(() => {
      setTimeout(() => {
        setPlanVisible(true);
        planResultRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Hero ═══ */}
      <div
        className="pt-20 pb-8 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(91,123,94,0.09) 0%, rgba(196,162,101,0.05) 40%, rgba(245,240,234,0.6) 70%, var(--warm-white) 100%)",
        }}
      >
        {/* Ambient radial glows */}
        <div
          className="absolute top-0 right-0 w-80 h-80 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 20%, rgba(91,123,94,0.09) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-48 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 20% 80%, rgba(196,162,101,0.07) 0%, transparent 65%)",
          }}
        />

        {/* Decorative petri-dish accent */}
        <DietHeroAccent />

        {/* Two-column editorial grid */}
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-[380px_1fr] gap-8 md:gap-12 items-center">

            {/* LEFT — botanical illustration panel */}
            <DietHeroPanel />

            {/* RIGHT — editorial text */}
            <div className="flex flex-col order-first md:order-last reveal">
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
                  Diet &amp; Nutrition
                </span>
              </div>

              {/* Eyebrow */}
              <p
                className="mb-2"
                style={{
                  fontSize: "0.68rem",
                  fontWeight: 600,
                  letterSpacing: "0.14em",
                  color: "var(--sage)",
                  textTransform: "uppercase",
                }}
              >
                Nutrition &amp; Diet
              </p>

              <h1
                className="font-serif font-semibold mb-3"
                style={{
                  fontSize: "clamp(2rem, 4vw, 2.8rem)",
                  color: "var(--text)",
                  lineHeight: 1.12,
                  letterSpacing: "-0.01em",
                }}
              >
                Feeding Against the Tumor
              </h1>

              {/* Accent rule */}
              <div
                className="mb-4"
                style={{
                  width: 48,
                  height: 2.5,
                  borderRadius: 2,
                  background: "linear-gradient(to right, var(--sage), var(--gold))",
                }}
              />

              <p
                className="leading-relaxed italic"
                style={{
                  fontSize: "clamp(0.95rem, 2vw, 1.05rem)",
                  color: "var(--text-muted)",
                  maxWidth: 460,
                }}
              >
                No diet cures hemangiosarcoma. But what your dog eats every day
                shapes the metabolic environment that tumor lives in — and there is
                real science behind changing it. This guide gives you the honest
                evidence, without oversimplifying it, so you can make decisions you
                feel confident about.
              </p>
            </div>

          </div>
        </div>

      </div>

      {/* Oval nav band — full-bleed, sticky */}
      <DietOvalNav
        categories={NAV_ITEMS}
        activeCategory={activeCategory}
        onCategoryClick={scrollToSection}
      />

      <div className="px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Personalized Banner */}
          {profile && (
            <div className="reveal mt-6">
              <PersonalizedBanner profile={profile} />
            </div>
          )}

          {/* Vet Callout */}
          <div className={profile ? "reveal" : "reveal mt-6"}>
            <VetCallout dogName={profile?.dogName} />
          </div>

          {/* ═══ Section 1: The Science — Warburg Effect ═══ */}
          <section
            id="science"
            ref={(el) => { categoryRefs.current["science"] = el; }}
            className="mb-6 reveal"
          >
            {/* Section label */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "var(--sage)" }}
              >
                The Science
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            {/* Responsive: stacks vertically on mobile, side-by-side on sm+ */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-4 sm:gap-5 mb-5">
              <div className="flex-shrink-0">
                <WarburgIllustration />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-1.5"
                  style={{ color: "var(--sage)" }}
                >
                  The Warburg Effect
                </p>
                <h2
                  className="font-serif font-semibold leading-snug"
                  style={{
                    fontSize: "clamp(1.2rem, 3vw, 1.45rem)",
                    color: "var(--text)",
                  }}
                >
                  Cancer Cells Are Hungry — For Glucose
                </h2>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <p
                className="leading-relaxed"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
              >
                The <strong style={{ color: "var(--text)" }}>Warburg Effect</strong> — described
                in the 1920s and present in over 80% of cancer types — is the observation that
                cancer cells preferentially consume glucose at abnormally high rates and convert
                it to lactate even in the presence of oxygen. This is metabolically inefficient,
                but it gives rapidly dividing cells the building blocks they need to grow:
                nucleotides, lipids, and amino acids.
              </p>
              <p
                className="leading-relaxed"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
              >
                The practical implications are significant: elevated blood glucose and insulin
                activate IGF-1, a growth signaling protein that accelerates tumor proliferation.
                The lactate that tumor cells produce acidifies the local environment, helping cancer
                evade the immune system. HSA, originating from vascular endothelial cells, is
                inherently angiogenic — it builds its own blood supply. Anything that reduces
                glucose availability or impairs new vessel formation is mechanistically relevant
                to this tumor type.
              </p>
            </div>

            {/* Editorial pull-quote */}
            <div
              className="relative rounded-2xl px-6 py-5 mb-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(196,162,101,0.08) 0%, rgba(245,240,234,0.95) 100%)",
                border: "1px solid rgba(196,162,101,0.2)",
              }}
            >
              {/* Oversized decorative opening quote — gold, low opacity */}
              <span
                className="absolute font-serif select-none pointer-events-none"
                style={{
                  top: -8,
                  left: 18,
                  fontSize: "5rem",
                  lineHeight: 1,
                  color: "var(--gold)",
                  opacity: 0.22,
                  fontStyle: "italic",
                }}
              >
                &ldquo;
              </span>
              {/* Top-center gold accent bar */}
              <div
                className="mx-auto mb-3"
                style={{
                  width: 32,
                  height: 2,
                  borderRadius: 2,
                  background: "var(--gold)",
                  opacity: 0.7,
                }}
              />
              <p
                className="font-serif text-center leading-relaxed italic"
                style={{
                  fontSize: "clamp(0.98rem, 2.2vw, 1.08rem)",
                  color: "var(--text)",
                }}
              >
                A low-carbohydrate diet limits tumor fuel while nourishing your
                dog&apos;s healthy cells — starving the disease without starving the dog.
              </p>
            </div>

            {/* ── Macronutrient Framework ── */}
            <div>
              <h3
                className="font-serif font-semibold mb-4"
                style={{ fontSize: "1.1rem", color: "var(--text)" }}
              >
                The Macronutrient Framework
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Protein */}
                <MacroCard
                  label="Protein"
                  range="60–70%"
                  color="var(--sage)"
                  rgb="91,123,94"
                  icon="/illustrations/food/protein.png"
                  iconAlt="Lean meat representing dietary protein"
                  note="Lean meats, fish, eggs, organ meats"
                />

                {/* Fat */}
                <MacroCard
                  label="Healthy Fat"
                  range="20–30%"
                  color="var(--gold)"
                  rgb="196,162,101"
                  icon="/illustrations/food/healthy-fats.png"
                  iconAlt="Fish oil and omega-3 rich foods representing healthy dietary fat"
                  note="Wild fish, fish oil, coconut oil"
                />

                {/* Carbs */}
                <MacroCard
                  label="Carbs"
                  range="< 15%"
                  color="var(--terracotta)"
                  rgb="212,133,106"
                  icon="/illustrations/food/corn.png"
                  iconAlt="Starchy grain representing carbohydrates to limit"
                  note="Non-starchy vegetables only"
                  iconFilter="hue-rotate(30deg) saturate(0.6)"
                />
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 2: Best Foods ═══ */}
          <section
            id="best-foods"
            ref={(el) => { categoryRefs.current["best-foods"] = el; }}
            className="mb-6"
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
                  className="font-serif text-[1.3rem] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Best Foods
                </h2>
              </div>
              <p className="text-[0.85rem] ml-[30px]" style={{ color: "var(--text-muted)" }}>
                Anti-angiogenic, anti-tumor whole foods supported by research — tap any card to learn more
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 reveal-stagger">
              {recommendedItems.map((item, i) => (
                <FoodFlipCard
                  key={i}
                  item={item}
                  variant="recommended"
                  breedNote={null}
                />
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 3: Foods to Avoid ═══ */}
          <section
            id="avoid"
            ref={(el) => { categoryRefs.current["avoid"] = el; }}
            className="mb-6"
          >
            <div
              className="rounded-2xl px-4 sm:px-5 py-6 reveal"
              style={{
                background:
                  "linear-gradient(135deg, rgba(212,133,106,0.05) 0%, rgba(212,133,106,0.02) 100%)",
                border: "1px solid rgba(212,133,106,0.15)",
              }}
            >
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
                  className="font-serif text-[1.3rem] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Foods to Avoid
                </h2>
              </div>
              <p className="text-[0.85rem] ml-[30px] mb-5" style={{ color: "var(--text-muted)" }}>
                These foods fuel cancer metabolism, cause inflammation, or carry safety risks
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 reveal-stagger">
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

          {/* ═══ Section 4: Supplements ═══ */}
          <section
            id="supplements"
            ref={(el) => { categoryRefs.current["supplements"] = el; }}
            className="mb-6"
          >
            <div className="reveal mb-2">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--sage)" }}
                >
                  Supplements
                </span>
                <span
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] px-2 py-0.5 rounded-full"
                  style={{
                    color: "var(--text-muted)",
                    background: "var(--border)",
                  }}
                >
                  Evidence-Graded
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <h2
                    className="font-serif font-semibold mb-1"
                    style={{ fontSize: "clamp(1.2rem, 3vw, 1.45rem)", color: "var(--text)" }}
                  >
                    What to Take, and Why
                  </h2>
                  <p
                    className="text-[0.92rem] leading-relaxed mb-0 max-w-[560px]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    What to take, what the evidence actually says, and what most protocols are missing.
                  </p>
                </div>
                {/* Collapse-all button — useful once users have opened multiple dosing tables */}
                <button
                  type="button"
                  onClick={handleCollapseAll}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-[0.76rem] font-medium cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sage"
                  style={{
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    marginTop: "0.2rem",
                  }}
                  aria-label="Collapse all dosing tables"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Collapse all
                </button>
              </div>
            </div>

            {/* Supplement cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 reveal-stagger mb-8 mt-6">
              {supplements.map((supp) => (
                <DietSupplementCard
                  key={supp.slug}
                  supplement={supp}
                  profileWeightLbs={profile?.weightLbs}
                  collapseAll={collapseAllSignal}
                />
              ))}
            </div>

            {/* Protocol Gap callout — insider tip box, slightly darker treatment */}
            <div
              className="rounded-2xl overflow-hidden reveal"
              style={{
                border: "1.5px solid rgba(91,123,94,0.28)",
                background: "var(--cream-deep)",
              }}
            >
              {/* Header bar — more distinct than surrounding content */}
              <div
                className="px-5 py-4"
                style={{
                  background: "linear-gradient(135deg, rgba(91,123,94,0.12) 0%, rgba(91,123,94,0.06) 100%)",
                  borderBottom: "1px solid rgba(91,123,94,0.15)",
                }}
              >
                <div className="flex items-start gap-3">
                  {/* Alert icon in tinted circle */}
                  <div
                    className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                    style={{
                      background: "var(--sage)",
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 2.5L2 11.5h10L7 2.5z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M7 6v3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                      <circle cx="7" cy="10" r="0.5" fill="white"/>
                    </svg>
                  </div>
                  <div>
                    <p
                      className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-0.5"
                      style={{ color: "var(--sage)" }}
                    >
                      Protocol Gap
                    </p>
                    <h3
                      className="font-serif font-semibold"
                      style={{ fontSize: "1.08rem", color: "var(--text)", lineHeight: 1.3 }}
                    >
                      {protocolGap.headline}
                    </h3>
                  </div>
                </div>
                <p
                  className="text-[0.85rem] leading-relaxed mt-2.5 ml-11"
                  style={{ color: "var(--text-muted)" }}
                >
                  {protocolGap.subhead}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4">
                {protocolGap.items.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl px-4 py-4 flex flex-col"
                    style={{
                      background: "white",
                      border: "1px solid var(--border)",
                    }}
                  >
                    <div className="flex items-center gap-2.5 mb-2.5">
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden"
                        style={{
                          background: "rgba(91,123,94,0.08)",
                          border: "1.5px solid rgba(91,123,94,0.15)",
                        }}
                      >
                        <Image
                          src={`/illustrations/food/${item.icon}`}
                          alt={item.name}
                          width={22}
                          height={22}
                          className="object-contain"
                          style={{ padding: 3 }}
                        />
                      </div>
                      <h4
                        className="font-serif font-semibold text-[0.95rem]"
                        style={{ color: "var(--text)" }}
                      >
                        {item.name}
                      </h4>
                    </div>
                    <p
                      className="text-[0.82rem] leading-relaxed mb-3 flex-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.why}
                    </p>
                    {/* Action callout — visually distinct, "what you do" */}
                    <div
                      className="rounded-lg px-3 py-2.5 text-[0.8rem] leading-relaxed"
                      style={{
                        background: "rgba(91,123,94,0.07)",
                        borderLeft: "2.5px solid var(--sage)",
                        borderTop: "1px solid rgba(91,123,94,0.12)",
                        borderRight: "1px solid rgba(91,123,94,0.08)",
                        borderBottom: "1px solid rgba(91,123,94,0.08)",
                      }}
                    >
                      <span
                        className="block text-[0.62rem] font-black uppercase tracking-[0.12em] mb-0.5"
                        style={{ color: "var(--sage)", opacity: 0.7 }}
                      >
                        Action
                      </span>
                      <span className="flex items-start gap-1.5" style={{ color: "var(--sage)", fontWeight: 500 }}>
                        {/* Arrow prefix — visually anchors the action */}
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 12 12"
                          fill="none"
                          aria-hidden="true"
                          style={{ flexShrink: 0, marginTop: "0.15rem" }}
                        >
                          <path
                            d="M2 6h8M7 3l3 3-3 3"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {item.action}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 5: The Debate — Glycine/Collagen ═══ */}
          <section
            id="the-debate"
            ref={(el) => { categoryRefs.current["the-debate"] = el; }}
            className="mb-6"
          >
            <div className="reveal">
              {/* Section label row with "The Debate" expert-content signal */}
              <div className="flex items-center gap-2.5 mb-4">
                {/* Nuanced content badge — distinct from regular section labels */}
                <span
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-[0.1em] flex-shrink-0"
                  style={{
                    background: "rgba(196,162,101,0.1)",
                    color: "var(--gold)",
                    border: "1.5px solid rgba(196,162,101,0.25)",
                  }}
                >
                  {/* Balance scale icon */}
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                    <path d="M5 1.5v7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M2 8.5h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M5 2.5L2 4.5M5 2.5L8 4.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                    <path d="M1 4.5c0 1 1 1.5 1 1.5s1-.5 1-1.5H1z" fill="currentColor" opacity="0.5"/>
                    <path d="M7 4.5c0 1 1 1.5 1 1.5s1-.5 1-1.5H7z" fill="currentColor" opacity="0.5"/>
                  </svg>
                  The Debate
                </span>
                <span
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--gold)" }}
                >
                  The Bone Broth Question
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              <h2
                className="font-serif font-semibold mb-1"
                style={{ fontSize: "clamp(1.2rem, 3vw, 1.4rem)", color: "var(--text)" }}
              >
                {glycineSection.headline}
              </h2>
              <p
                className="text-[0.88rem] italic mb-5"
                style={{ color: "var(--text-muted)" }}
              >
                {glycineSection.subhead}
              </p>

              {/* One-sentence orientation before the two-column debate layout */}
              <p
                className="text-[0.88rem] leading-relaxed mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                Some protocols flag glycine and collagen (bone broth) as potentially tumor-feeding. The argument is less settled for HSA than it first appears — here is the concern and the HSA-specific counterargument side by side.
              </p>

              {/* Two-column concern/counterargument — more visual structure */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-5">
                {/* Concern — terracotta tinted */}
                <div
                  className="rounded-2xl px-4 py-4"
                  style={{
                    background: "linear-gradient(160deg, rgba(212,133,106,0.08) 0%, rgba(212,133,106,0.03) 100%)",
                    border: "1px solid rgba(212,133,106,0.22)",
                  }}
                >
                  {/* Header row with icon */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(212,133,106,0.15)", border: "1.5px solid rgba(212,133,106,0.3)" }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                        <path d="M4.5 1.5v3.5M4.5 7v.5" stroke="var(--terracotta)" strokeWidth="1.4" strokeLinecap="round"/>
                      </svg>
                    </div>
                    <p
                      className="text-[0.68rem] font-bold uppercase tracking-[0.1em]"
                      style={{ color: "var(--terracotta)" }}
                    >
                      {glycineSection.concern.label}
                    </p>
                  </div>
                  <p
                    className="text-[0.85rem] leading-relaxed"
                    style={{ color: "var(--text)" }}
                  >
                    {glycineSection.concern.text}
                  </p>
                </div>

                {/* Counterargument — sage tinted */}
                <div
                  className="rounded-2xl px-4 py-4"
                  style={{
                    background: "linear-gradient(160deg, rgba(91,123,94,0.08) 0%, rgba(91,123,94,0.03) 100%)",
                    border: "1px solid rgba(91,123,94,0.2)",
                  }}
                >
                  {/* Header row with icon */}
                  <div className="flex items-center gap-2 mb-2.5">
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(91,123,94,0.15)", border: "1.5px solid rgba(91,123,94,0.3)" }}
                    >
                      <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                        <path d="M2 4.5l1.8 1.8 3.2-3.2" stroke="var(--sage)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <p
                      className="text-[0.68rem] font-bold uppercase tracking-[0.1em]"
                      style={{ color: "var(--sage)" }}
                    >
                      {glycineSection.counterargument.label}
                    </p>
                  </div>
                  <p
                    className="text-[0.85rem] leading-relaxed"
                    style={{ color: "var(--text)" }}
                  >
                    {glycineSection.counterargument.text}
                  </p>
                </div>
              </div>

              {/* Added complexity paragraph */}
              <p
                className="text-[0.87rem] leading-relaxed mb-5 italic"
                style={{ color: "var(--text-muted)" }}
              >
                {glycineSection.addedComplexity}
              </p>

              {/* Verdict — expert final word, gold-accented, more authoritative */}
              <div
                className="relative rounded-2xl px-5 py-5"
                style={{
                  background: "linear-gradient(135deg, rgba(196,162,101,0.1) 0%, rgba(196,162,101,0.05) 100%)",
                  border: "1.5px solid rgba(196,162,101,0.3)",
                }}
              >
                {/* Top gold accent rule — centered, signals "here's the answer" */}
                <div className="flex items-center justify-center gap-2.5 mb-4">
                  <div className="h-px flex-1" style={{ background: "rgba(196,162,101,0.3)", maxWidth: 40 }} />
                  <span
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-black uppercase tracking-[0.12em] flex-shrink-0"
                    style={{
                      background: "var(--gold)",
                      color: "white",
                    }}
                  >
                    {/* Gavel-style checkmark */}
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                      <path d="M1.5 4.5l2 2 4-4" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {glycineSection.verdict.label}
                  </span>
                  <div className="h-px flex-1" style={{ background: "rgba(196,162,101,0.3)", maxWidth: 40 }} />
                </div>
                <p
                  className="font-serif italic text-center leading-relaxed max-w-[560px] mx-auto"
                  style={{
                    fontSize: "clamp(0.9rem, 2vw, 1rem)",
                    color: "var(--text)",
                    lineHeight: 1.75,
                  }}
                >
                  <strong
                    className="not-italic"
                    style={{ color: "var(--gold)", fontWeight: 700 }}
                  >
                    Bottom line:{" "}
                  </strong>
                  {glycineSection.verdict.text}
                </p>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 6: Meal Form Guide ═══ */}
          <section
            id="meal-form"
            ref={(el) => { categoryRefs.current["meal-form"] = el; }}
            className="mb-6"
          >
            <div className="reveal mb-5">
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    background: "rgba(196,162,101,0.15)",
                    border: "1.5px solid rgba(196,162,101,0.3)",
                  }}
                >
                  <div className="w-2 h-2 rounded-full" style={{ background: "var(--gold)" }} />
                </div>
                <h2
                  className="font-serif text-[1.3rem] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Meal Form Guide
                </h2>
              </div>
              <p className="text-[0.85rem] ml-[30px]" style={{ color: "var(--text-muted)" }}>
                Not all food is equal — the form matters as much as the ingredients
              </p>
            </div>

            <div className="space-y-3 reveal-stagger">
              {mealFormGuide.map((option, i) => (
                <MealFormCard key={i} option={option} />
              ))}
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 7: Meal Plan Generator ═══ */}
          <section
            id="meal-plan"
            ref={(el) => { categoryRefs.current["meal-plan"] = el; }}
            className="mb-6"
          >
            <div
              className="rounded-2xl px-5 sm:px-7 py-8 reveal"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,123,94,0.06) 0%, rgba(196,162,101,0.05) 100%)",
                border: "1px solid rgba(91,123,94,0.12)",
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <div
                  className="text-[0.7rem] font-semibold uppercase tracking-[0.14em] mb-1"
                  style={{ color: "var(--sage)" }}
                >
                  Interactive Tool
                </div>
                <h2
                  className="font-serif text-[1.35rem] font-semibold mb-1.5"
                  style={{ color: "var(--text)" }}
                >
                  Build a Meal Plan
                </h2>
                <p
                  className="text-[0.9rem] leading-relaxed max-w-[480px]"
                  style={{ color: "var(--text-muted)" }}
                >
                  Answer two questions and get a weekly feeding framework
                  tailored to your dog&apos;s weight.
                </p>
                {/* Warmth bridge */}
                <p
                  className="font-serif italic text-[0.9rem] leading-relaxed mt-3 max-w-[440px]"
                  style={{ color: "var(--text-muted)", opacity: 0.85 }}
                >
                  Every bowl you prepare is an act of care. This plan gives
                  you a starting framework — adjust it with your vet as you
                  learn what your dog loves.
                </p>
              </div>

              {/* Step 1: Weight */}
              <div className="mb-6">
                <p
                  className="text-[0.82rem] font-semibold mb-3 flex items-center gap-2"
                  style={{ color: "var(--text)" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[0.65rem] font-bold flex-shrink-0"
                    style={{ background: "var(--sage)", color: "white" }}
                  >
                    1
                  </span>
                  How much does your dog weigh?
                </p>
                <div className="flex flex-wrap gap-2">
                  {WEIGHT_BRACKETS.map((wb) => (
                    <button
                      key={wb.key}
                      type="button"
                      onClick={() => setSelectedWeight(wb.key)}
                      aria-pressed={selectedWeight === wb.key}
                      className="min-h-[40px] rounded-full text-[0.83rem] font-medium transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
                      style={{
                        padding: "8px 18px",
                        background: selectedWeight === wb.key ? "var(--sage)" : "white",
                        color: selectedWeight === wb.key ? "white" : "var(--text-muted)",
                        border: selectedWeight === wb.key
                          ? "1.5px solid var(--sage)"
                          : "1.5px solid var(--border)",
                        boxShadow: selectedWeight === wb.key
                          ? "0 3px 10px rgba(91,123,94,0.22)"
                          : "0 1px 3px rgba(0,0,0,0.04)",
                        transform: selectedWeight === wb.key ? "scale(1.02)" : "scale(1)",
                        fontWeight: selectedWeight === wb.key ? 600 : 500,
                      }}
                      onMouseEnter={(e) => {
                        if (selectedWeight !== wb.key) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--sage-light)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--sage)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedWeight !== wb.key) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                        }
                      }}
                    >
                      {wb.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Step 2: Diet Style */}
              <div className="mb-7">
                <p
                  className="text-[0.82rem] font-semibold mb-3 flex items-center gap-2"
                  style={{ color: "var(--text)" }}
                >
                  <span
                    className="inline-flex items-center justify-center w-5 h-5 rounded-full text-[0.65rem] font-bold flex-shrink-0"
                    style={{ background: "var(--gold)", color: "white" }}
                  >
                    2
                  </span>
                  Which diet style fits your situation?
                </p>
                <div className="flex flex-col sm:flex-row flex-wrap gap-2">
                  {DIET_STYLES.map((ds) => (
                    <button
                      key={ds.key}
                      type="button"
                      onClick={() => setSelectedStyle(ds.key)}
                      aria-pressed={selectedStyle === ds.key}
                      className="text-left transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-gold"
                      style={{
                        padding: "10px 16px",
                        borderRadius: 14,
                        minWidth: 140,
                        background: selectedStyle === ds.key ? "var(--gold)" : "white",
                        color: selectedStyle === ds.key ? "white" : "var(--text-muted)",
                        border: selectedStyle === ds.key
                          ? "1.5px solid var(--gold)"
                          : "1.5px solid var(--border)",
                        boxShadow: selectedStyle === ds.key
                          ? "0 3px 12px rgba(196,162,101,0.25)"
                          : "0 1px 3px rgba(0,0,0,0.04)",
                        transform: selectedStyle === ds.key ? "scale(1.01)" : "scale(1)",
                      }}
                      onMouseEnter={(e) => {
                        if (selectedStyle !== ds.key) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--gold)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedStyle !== ds.key) {
                          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                          (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                        }
                      }}
                    >
                      <span className="text-[0.84rem] font-semibold block leading-snug"
                        style={{ color: selectedStyle === ds.key ? "white" : "var(--text)" }}>
                        {ds.label}
                      </span>
                      <span
                        className="text-[0.72rem] block leading-snug mt-0.5"
                        style={{
                          color: selectedStyle === ds.key
                            ? "rgba(255,255,255,0.78)"
                            : "var(--text-muted)",
                        }}
                      >
                        {ds.description}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generate button */}
              <button
                type="button"
                onClick={handleGeneratePlan}
                disabled={!selectedWeight || !selectedStyle}
                title={
                  !selectedWeight && !selectedStyle
                    ? "Select weight and diet style above"
                    : !selectedWeight
                    ? "Select your dog's weight above"
                    : !selectedStyle
                    ? "Select a diet style above"
                    : undefined
                }
                className="inline-flex items-center gap-2.5 font-semibold transition-all duration-150 cursor-pointer disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
                style={{
                  padding: "12px 28px",
                  borderRadius: 999,
                  fontSize: "0.92rem",
                  background: selectedWeight && selectedStyle ? "var(--sage)" : "var(--border)",
                  color: selectedWeight && selectedStyle ? "white" : "var(--text-muted)",
                  boxShadow: selectedWeight && selectedStyle
                    ? "0 4px 18px rgba(91,123,94,0.28)"
                    : "none",
                }}
                onMouseEnter={(e) => {
                  if (selectedWeight && selectedStyle) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px) scale(1.01)";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 6px 22px rgba(91,123,94,0.32)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedWeight && selectedStyle) {
                    (e.currentTarget as HTMLButtonElement).style.transform = "";
                    (e.currentTarget as HTMLButtonElement).style.boxShadow = "0 4px 18px rgba(91,123,94,0.28)";
                  }
                }}
              >
                Build My Plan
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>

            {/* ── Result Card ── */}
            {generatedPlan && (
              <div
                ref={planResultRef}
                className="mt-5 rounded-2xl overflow-hidden print:block transition-all duration-500"
                style={{
                  border: "1px solid rgba(91,123,94,0.18)",
                  boxShadow: "0 8px 40px rgba(91,123,94,0.1)",
                  opacity: planVisible ? 1 : 0,
                  transform: planVisible ? "translateY(0)" : "translateY(12px)",
                }}
              >
                {/* Result header */}
                <div
                  className="px-5 sm:px-7 py-5"
                  style={{
                    background:
                      "linear-gradient(135deg, var(--sage-dark) 0%, var(--sage) 60%, var(--sage-light) 100%)",
                  }}
                >
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div>
                      <div
                        className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-1"
                        style={{ color: "rgba(255,255,255,0.65)" }}
                      >
                        Your Personalised Plan
                      </div>
                      <h3
                        className="font-serif font-semibold leading-snug"
                        style={{ fontSize: "1.15rem", color: "white" }}
                      >
                        {generatedPlan.title}
                      </h3>
                    </div>
                    <button
                      type="button"
                      onClick={handlePrint}
                      aria-label="Print this meal plan"
                      className="flex items-center gap-1.5 px-3 py-1.5 min-h-[36px] rounded-full text-[0.78rem] font-medium cursor-pointer transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-sage"
                      style={{
                        background: "rgba(255,255,255,0.15)",
                        border: "1px solid rgba(255,255,255,0.25)",
                        color: "rgba(255,255,255,0.9)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.22)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)";
                      }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        style={{ flexShrink: 0 }}
                      >
                        <path
                          d="M3 4h10v7H3V4zM1 7h2M13 7h2M5 2h6M5 14h6"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                        />
                      </svg>
                      Print
                    </button>
                  </div>
                </div>

                {/* Result body */}
                <div className="bg-white">
                  {/* Daily portions */}
                  <div
                    className="px-5 sm:px-7 py-5"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <h4
                      className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Daily Portions
                    </h4>
                    <div className="space-y-2">
                      {[
                        { label: "Protein", value: generatedPlan.dailyProtein, color: "var(--sage)" },
                        { label: "Vegetables", value: generatedPlan.dailyVeg, color: "var(--sage-light)" },
                        { label: "Fat", value: generatedPlan.dailyFat, color: "var(--gold)" },
                      ].map((row) => (
                        <div key={row.label} className="flex items-start gap-3">
                          <span
                            className="w-2 h-2 rounded-full flex-shrink-0 mt-[6px]"
                            style={{ background: row.color }}
                          />
                          <div>
                            <span
                              className="text-[0.82rem] font-semibold"
                              style={{ color: "var(--text)" }}
                            >
                              {row.label}:{" "}
                            </span>
                            <span
                              className="text-[0.83rem]"
                              style={{ color: "var(--text-muted)" }}
                            >
                              {row.value}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Week at a Glance */}
                  <div
                    className="px-5 sm:px-7 py-5"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <h4
                      className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Week at a Glance
                    </h4>
                    <div className="space-y-0.5">
                      {generatedPlan.weeklyRotation.map((day, i) => (
                        <div
                          key={i}
                          className="flex items-baseline gap-0 text-[0.83rem] py-2 px-3 rounded-xl"
                          style={{
                            background: i % 2 === 0 ? "rgba(91,123,94,0.04)" : "transparent",
                          }}
                        >
                          <span
                            className="font-semibold flex-shrink-0 text-[0.72rem] uppercase tracking-[0.09em]"
                            style={{ color: "var(--sage)", minWidth: "3rem" }}
                          >
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                          </span>
                          <span
                            className="flex-shrink-0 self-center mr-3"
                            style={{
                              display: "inline-block",
                              width: 1,
                              height: "0.75em",
                              background: "var(--border-strong)",
                            }}
                            aria-hidden="true"
                          />
                          <span style={{ color: "var(--text-muted)", lineHeight: 1.4 }}>
                            {day.replace(/^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday)\s*[—–\-]\s*/, "")}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Macros */}
                  <div
                    className="px-5 sm:px-7 py-5"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <h4
                      className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Estimated Macros
                    </h4>
                    <div className="space-y-2.5">
                      <MacroBar label="Protein" value={generatedPlan.macros.protein} color="var(--sage)" />
                      <MacroBar label="Fat" value={generatedPlan.macros.fat} color="var(--gold)" />
                      <MacroBar label="Carbs" value={generatedPlan.macros.carbs} color="var(--terracotta)" />
                    </div>
                  </div>

                  {/* Calorie note */}
                  <div
                    className="px-5 sm:px-7 py-5"
                    style={{ borderBottom: "1px solid var(--border)" }}
                  >
                    <div
                      className="rounded-xl px-4 py-3 text-[0.82rem] leading-relaxed"
                      style={{
                        background: "rgba(196,162,101,0.07)",
                        border: "1px solid rgba(196,162,101,0.15)",
                        color: "var(--text-muted)",
                      }}
                    >
                      <span className="font-semibold" style={{ color: "var(--gold)" }}>
                        Calorie note:{" "}
                      </span>
                      {generatedPlan.calorieNote}
                    </div>
                  </div>

                  {/* Supplement pairings */}
                  <div className="px-5 sm:px-7 py-5">
                    <h4
                      className="text-[0.72rem] font-semibold uppercase tracking-[0.12em] mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      Pair With These Supplements
                    </h4>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {generatedPlan.supplementPairings.map((supp, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full text-[0.78rem] font-medium"
                          style={{
                            background: "rgba(91,123,94,0.08)",
                            color: "var(--sage)",
                            border: "1px solid rgba(91,123,94,0.15)",
                          }}
                        >
                          {supp}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => scrollToSection("supplements")}
                      className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium no-underline transition-opacity hover:opacity-70 cursor-pointer"
                      style={{ color: "var(--sage)", background: "none", border: "none", padding: 0 }}
                    >
                      See supplement guide above
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M5 8L5 2M2.5 4.5L5 2l2.5 2.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </section>

          <SectionDivider />

          {/* ═══ Section 8: What Veterinary Oncologists Say ═══ */}
          <section
            id="vets"
            ref={(el) => { categoryRefs.current["vets"] = el; }}
            className="mb-6"
          >
            <div className="reveal">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--sage)" }}
                >
                  What Vets Say
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              <h2
                className="font-serif font-semibold mb-1"
                style={{ fontSize: "clamp(1.2rem, 3vw, 1.4rem)", color: "var(--text)" }}
              >
                {oncologistConsensus.headline}
              </h2>
              <p
                className="text-[0.88rem] italic mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {oncologistConsensus.subhead}
              </p>

              <p
                className="text-[0.9rem] leading-relaxed mb-6"
                style={{ color: "var(--text-muted)" }}
              >
                {oncologistConsensus.intro}
              </p>

              {/* Two-column agreements / skepticisms */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {/* Agreements — sage dots */}
                <div
                  className="rounded-2xl px-4 py-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(91,123,94,0.06) 0%, rgba(91,123,94,0.02) 100%)",
                    border: "1px solid rgba(91,123,94,0.18)",
                  }}
                >
                  <p
                    className="text-[0.68rem] font-bold uppercase tracking-[0.1em] mb-3"
                    style={{ color: "var(--sage)" }}
                  >
                    Areas of Agreement
                  </p>
                  <ul className="space-y-2.5">
                    {oncologistConsensus.agreements.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[6px]"
                          style={{ background: "var(--sage)" }}
                        />
                        <span
                          className="text-[0.84rem] leading-relaxed"
                          style={{ color: "var(--text)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skepticisms — terracotta dots */}
                <div
                  className="rounded-2xl px-4 py-4"
                  style={{
                    background: "linear-gradient(135deg, rgba(212,133,106,0.06) 0%, rgba(212,133,106,0.02) 100%)",
                    border: "1px solid rgba(212,133,106,0.18)",
                  }}
                >
                  <p
                    className="text-[0.68rem] font-bold uppercase tracking-[0.1em] mb-3"
                    style={{ color: "var(--terracotta)" }}
                  >
                    Areas of Skepticism
                  </p>
                  <ul className="space-y-2.5">
                    {oncologistConsensus.skepticisms.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-[6px]"
                          style={{ background: "var(--terracotta)" }}
                        />
                        <span
                          className="text-[0.84rem] leading-relaxed"
                          style={{ color: "var(--text)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CSU Quote — editorial pull-quote (same treatment as Warburg quote) */}
              <div
                className="relative rounded-2xl px-6 py-5 mb-5"
                style={{
                  background: "linear-gradient(135deg, rgba(196,162,101,0.08) 0%, rgba(245,240,234,0.95) 100%)",
                  border: "1px solid rgba(196,162,101,0.2)",
                }}
              >
                {/* Oversized decorative opening quote — gold, low opacity */}
                <span
                  className="absolute font-serif select-none pointer-events-none"
                  style={{
                    top: -8,
                    left: 18,
                    fontSize: "5rem",
                    lineHeight: 1,
                    color: "var(--gold)",
                    opacity: 0.2,
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;
                </span>
                {/* Top-center gold accent bar */}
                <div
                  className="mx-auto mb-3"
                  style={{
                    width: 32,
                    height: 2,
                    borderRadius: 2,
                    background: "var(--gold)",
                    opacity: 0.65,
                  }}
                />
                <p
                  className="font-serif text-center leading-relaxed italic"
                  style={{
                    fontSize: "clamp(0.92rem, 2vw, 1.02rem)",
                    color: "var(--text)",
                    lineHeight: 1.75,
                  }}
                >
                  {oncologistConsensus.csuQuote}
                </p>
              </div>

              {/* Closing thought — warm and human, lightly tinted */}
              <div
                className="rounded-xl px-4 py-3.5"
                style={{
                  background: "rgba(91,123,94,0.04)",
                  border: "1px solid rgba(91,123,94,0.1)",
                }}
              >
                <p
                  className="font-serif italic text-[0.9rem] leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {oncologistConsensus.closingThought}
                </p>
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 9: Active Research ═══ */}
          <section
            id="research"
            ref={(el) => { categoryRefs.current["research"] = el; }}
            className="mb-6"
          >
            <div className="reveal mb-5">
              <div className="flex items-center gap-2 mb-4">
                <span
                  className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                  style={{ color: "var(--sage)" }}
                >
                  Research
                </span>
                <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              </div>

              <h2
                className="font-serif font-semibold mb-1"
                style={{ fontSize: "clamp(1.2rem, 3vw, 1.4rem)", color: "var(--text)" }}
              >
                Active Research
              </h2>
              <p
                className="text-[0.88rem] leading-relaxed mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                This field is moving faster than most people realize. Multiple major institutions have active trials and funded initiatives underway right now — and the results will directly reshape dietary guidance for HSA dogs.
              </p>
              <p
                className="text-[0.85rem] leading-relaxed mb-5 italic"
                style={{ color: "var(--text-muted)", opacity: 0.8 }}
              >
                The studies below were active or recently published as of early 2026.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal-stagger">
                {activeResearch.map((study, i) => (
                  <div
                    key={i}
                    className="rounded-2xl px-4 py-4 transition-all duration-200 cursor-default"
                    style={{
                      background: "white",
                      border: "1px solid var(--border)",
                      borderTop: "3px solid var(--sage)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 8px 24px rgba(91,123,94,0.1)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.transform = "";
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "";
                    }}
                  >
                    {/* Institution — small caps, visually separated from title */}
                    <p
                      className="text-[0.62rem] font-black uppercase tracking-[0.14em] mb-1.5"
                      style={{ color: "var(--sage)", letterSpacing: "0.12em" }}
                    >
                      {study.institution}
                    </p>
                    {/* Thin separator rule between institution and title */}
                    <div
                      className="mb-2"
                      style={{ height: 1, background: "var(--border)" }}
                    />

                    <h3
                      className="font-serif font-semibold mb-2 leading-snug"
                      style={{ fontSize: "0.95rem", color: "var(--text)" }}
                    >
                      {study.title}
                    </h3>

                    <p
                      className="text-[0.82rem] leading-relaxed mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {study.summary}
                    </p>

                    {/* Relevance — italic with microscope icon prefix */}
                    <div
                      className="rounded-lg px-3 py-2.5 mb-3 text-[0.78rem] leading-relaxed"
                      style={{
                        background: "rgba(91,123,94,0.06)",
                        borderLeft: "2px solid var(--sage)",
                      }}
                    >
                      <div className="flex items-start gap-1.5">
                        {/* Microscope / diet relevance icon */}
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true" style={{ flexShrink: 0, marginTop: 1, color: "var(--sage)", opacity: 0.7 }}>
                          <path d="M4 2h4M4 2v2M8 2v2M4 4h4M6 4v4M3 10h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span className="italic" style={{ color: "var(--text)" }}>
                          {study.relevance}
                        </span>
                      </div>
                    </div>

                    {/* Status badge — pulsing dot for active, gold for completed */}
                    {(() => {
                      const isActive = study.status.toLowerCase().includes("active");
                      return (
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.68rem] font-semibold"
                          style={{
                            background: isActive ? "rgba(91,123,94,0.08)" : "rgba(196,162,101,0.1)",
                            color: isActive ? "var(--sage)" : "var(--gold)",
                            border: `1px solid ${isActive ? "rgba(91,123,94,0.2)" : "rgba(196,162,101,0.25)"}`,
                          }}
                        >
                          {isActive ? (
                            /* Pulsing live indicator for active research */
                            <span
                              className="relative flex-shrink-0 inline-flex"
                              style={{ width: 8, height: 8 }}
                              aria-hidden="true"
                            >
                              <span
                                className="animate-ping absolute inline-flex w-full h-full rounded-full opacity-40"
                                style={{ background: "var(--sage)" }}
                              />
                              <span
                                className="relative inline-flex rounded-full"
                                style={{ width: 8, height: 8, background: "var(--sage)" }}
                              />
                            </span>
                          ) : (
                            <span
                              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "var(--gold)" }}
                            />
                          )}
                          {study.status}
                        </span>
                      );
                    })()}
                  </div>
                ))}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 10: Critical Cautions ═══ */}
          <section
            id="cautions"
            ref={(el) => { categoryRefs.current["cautions"] = el; }}
            className="mb-12"
          >
            <div className="reveal mb-5">
              <div className="flex items-center gap-2.5 mb-1">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center"
                  style={{ background: "var(--terracotta)" }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path
                      d="M5 2v4M5 7.5v.5"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <h2
                  className="font-serif text-[1.3rem] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  Critical Cautions
                </h2>
              </div>
              <p className="text-[0.85rem] ml-[30px]" style={{ color: "var(--text-muted)" }}>
                Things that could cause serious harm — please read these carefully
              </p>
            </div>

            {/* Never Give */}
            <div className="mb-4 reveal">
              <p
                className="text-[0.85rem] leading-relaxed mb-4 italic"
                style={{ color: "var(--text-muted)" }}
              >
                You are almost certainly not doing any of these — most are
                obvious dangers. We include them here because a well-meaning
                friend or family member may not know.
              </p>

              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(212,133,106,0.25)" }}
              >
                {/* Danger header bar */}
                <div
                  className="flex items-center gap-2.5 px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(212,133,106,0.12) 0%, rgba(212,133,106,0.06) 100%)",
                    borderBottom: "1px solid rgba(212,133,106,0.2)",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{ background: "var(--terracotta)" }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5h6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span
                    className="text-[0.78rem] font-bold uppercase tracking-[0.14em]"
                    style={{ color: "var(--terracotta)" }}
                  >
                    Never Give
                  </span>
                </div>

                <div
                  className="divide-y"
                  style={{ background: "rgba(212,133,106,0.02)", borderColor: "rgba(212,133,106,0.12)" }}
                >
                  {cautions
                    .filter((c) => c.severity === "never")
                    .map((caution, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 px-4 py-3.5"
                        style={{ borderColor: "rgba(212,133,106,0.12)" }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-[6px]"
                          style={{ background: "#e05c3a" }}
                        />
                        <div>
                          <span
                            className="font-semibold text-[0.88rem]"
                            style={{ color: "var(--text)" }}
                          >
                            {caution.title}
                          </span>
                          <p
                            className="text-[0.82rem] leading-relaxed mt-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {caution.note}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Use with Care */}
            <div className="reveal">
              <div
                className="rounded-2xl overflow-hidden"
                style={{ border: "1px solid rgba(196,162,101,0.25)" }}
              >
                <div
                  className="flex items-center gap-2.5 px-4 py-3"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(196,162,101,0.1) 0%, rgba(196,162,101,0.05) 100%)",
                    borderBottom: "1px solid rgba(196,162,101,0.18)",
                  }}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(196,162,101,0.18)",
                      border: "1.5px solid var(--gold)",
                    }}
                  >
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M5 2.5v3M5 7v.5" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <span
                    className="text-[0.78rem] font-bold uppercase tracking-[0.14em]"
                    style={{ color: "var(--gold)" }}
                  >
                    Use with Care
                  </span>
                </div>

                <div
                  className="divide-y"
                  style={{ background: "rgba(196,162,101,0.02)", borderColor: "rgba(196,162,101,0.12)" }}
                >
                  {cautions
                    .filter((c) => c.severity === "care")
                    .map((caution, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 px-4 py-3.5"
                        style={{ borderColor: "rgba(196,162,101,0.12)" }}
                      >
                        <div
                          className="w-2 h-2 rounded-full flex-shrink-0 mt-[6px]"
                          style={{ background: "var(--gold)" }}
                        />
                        <div>
                          <span
                            className="font-semibold text-[0.88rem]"
                            style={{ color: "var(--text)" }}
                          >
                            {caution.title}
                          </span>
                          <p
                            className="text-[0.82rem] leading-relaxed mt-0.5"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {caution.note}
                          </p>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Monitoring callout */}
            <div
              className="mt-4 rounded-2xl px-5 py-4 reveal"
              style={{
                background: "rgba(91,123,94,0.05)",
                border: "1px solid rgba(91,123,94,0.18)",
              }}
            >
              <div className="flex items-center gap-2 mb-2">
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "rgba(91,123,94,0.15)", border: "1.5px solid var(--sage)" }}
                >
                  <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                    <circle cx="5" cy="5" r="3.5" stroke="var(--sage)" strokeWidth="1.4" />
                    <path d="M5 3.5v2.5" stroke="var(--sage)" strokeWidth="1.4" strokeLinecap="round" />
                  </svg>
                </div>
                <span
                  className="text-[0.8rem] font-semibold"
                  style={{ color: "var(--sage)" }}
                >
                  {monitoringCallout.headline}
                </span>
              </div>
              <p
                className="text-[0.82rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {monitoringCallout.body}
              </p>
            </div>
          </section>

          {/* ═══ Key Sources strip — grouped by type ═══ */}
          <section className="mb-8 reveal">
            <div className="flex items-center gap-2 mb-3">
              <span
                className="text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                Key Sources
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>
            <p
              className="text-[0.82rem] mb-4 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Everything on this page is grounded in peer-reviewed research and guidance from board-certified veterinary oncologists.
            </p>

            {/* Grouped by type — clinical, review, organization */}
            {(["clinical", "review", "organization", "integrative"] as const).map((type) => {
              const sourcesOfType = dietSources.filter((s) => s.type === type);
              if (sourcesOfType.length === 0) return null;
              const cfg = SOURCE_TYPE_CONFIG[type];
              return (
                <div key={type} className="mb-3 last:mb-0">
                  {/* Type group label */}
                  <p
                    className="text-[0.62rem] font-bold uppercase tracking-[0.12em] mb-1.5 flex items-center gap-1.5"
                    style={{ color: cfg.color }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ background: cfg.color }}
                    />
                    {cfg.label}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sourcesOfType.map((source, i) => (
                      <a
                        key={i}
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[0.74rem] font-medium no-underline transition-all duration-150"
                        style={{
                          background: cfg.bg,
                          color: cfg.color,
                          border: `1px solid ${cfg.border}`,
                        }}
                        aria-label={`${source.title} (opens in new tab)`}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.opacity = "0.75";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLAnchorElement).style.opacity = "";
                        }}
                      >
                        {/* Year badge */}
                        <span
                          className="text-[0.62rem] font-black rounded px-1 py-px"
                          style={{
                            background: cfg.border,
                            color: cfg.color,
                            lineHeight: 1.3,
                          }}
                        >
                          {source.year}
                        </span>
                        {source.title}
                        <svg
                          width="8"
                          height="8"
                          viewBox="0 0 9 9"
                          fill="none"
                          className="flex-shrink-0"
                          style={{ opacity: 0.5 }}
                          aria-hidden="true"
                        >
                          <path
                            d="M1.5 7.5L7.5 1.5M7.5 1.5H4M7.5 1.5V5"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeLinecap="round"
                          />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              );
            })}
          </section>

          {/* Print hint */}
          <div
            className="text-center mb-12 reveal"
            style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}
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
              <p className="text-[0.82rem]" style={{ color: "var(--text-muted)" }}>
                Use your browser&apos;s print function to save this page as a PDF to share with your vet.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ═══ Bottom CTA ═══ */}
      <div
        className="relative overflow-hidden"
        style={{
          background:
            "linear-gradient(155deg, var(--sage-dark) 0%, var(--sage) 60%, var(--sage-light) 100%)",
        }}
      >
        {/* Ambient glow orb */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-30%",
            right: "-10%",
            width: 400,
            height: 400,
            background: "radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)",
          }}
        />
        {/* Bottom-left warm accent */}
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "-20%",
            left: "-5%",
            width: 300,
            height: 300,
            background: "radial-gradient(circle, rgba(196,162,101,0.12) 0%, transparent 65%)",
          }}
        />

        <div className="max-w-[800px] mx-auto px-6 py-16 text-center relative z-10">
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.25)" }} />
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: "rgba(255,255,255,0.45)" }} />
            <div className="h-px w-10" style={{ background: "rgba(255,255,255,0.25)" }} />
          </div>

          <p
            className="font-serif italic mb-3"
            style={{
              fontSize: "clamp(0.88rem, 2vw, 0.95rem)",
              color: "rgba(255,255,255,0.65)",
              letterSpacing: "0.01em",
            }}
          >
            You&apos;re doing everything you can
          </p>
          <h2
            className="font-serif font-semibold mb-3"
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.1rem)",
              color: "white",
              lineHeight: 1.2,
              letterSpacing: "-0.01em",
            }}
          >
            Each meal is an act of love.
          </h2>
          <p
            className="mb-8 max-w-[380px] mx-auto leading-relaxed"
            style={{
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              color: "rgba(255,255,255,0.72)",
            }}
          >
            Your daily journal is here whenever you need it — one day at a time.
          </p>
          <Link
            href="/days/today"
            className="inline-flex items-center gap-2 no-underline font-semibold transition-all duration-200"
            style={{
              padding: "14px 32px",
              borderRadius: 999,
              fontSize: "clamp(0.9rem, 2vw, 1rem)",
              background: "white",
              color: "var(--sage)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 8px 32px rgba(0,0,0,0.2)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.transform = "";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = "0 4px 24px rgba(0,0,0,0.15)";
            }}
          >
            Continue Your Journey
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   Sub-components
────────────────────────────────────────────── */

/**
 * MacroCard — one of three macronutrient cards in the framework grid.
 */
function MacroCard({
  label,
  range,
  color,
  rgb,
  icon,
  iconAlt,
  note,
  iconFilter,
}: {
  label: string;
  range: string;
  color: string;
  rgb: string;
  icon: string;
  iconAlt: string;
  note: string;
  iconFilter?: string;
}) {
  return (
    <div
      className="rounded-2xl p-4 cursor-default transition-all duration-200"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderTop: `3px solid ${color}`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = `0 8px 24px rgba(${rgb},0.13)`;
        el.style.borderColor = color;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
        el.style.boxShadow = "";
        el.style.borderColor = "";
      }}
    >
      {/* Large display percentage */}
      <div
        className="font-serif font-semibold mb-2.5 leading-none"
        style={{
          fontSize: "clamp(1.9rem, 4vw, 2.3rem)",
          color,
          letterSpacing: "-0.02em",
        }}
      >
        {range}
      </div>

      {/* Label + icon row */}
      <div className="flex items-center gap-2 mb-2.5">
        <div
          className="rounded-lg overflow-hidden flex-shrink-0"
          style={{
            width: 24,
            height: 24,
            background: `rgba(${rgb},0.1)`,
            filter: iconFilter ?? "none",
          }}
        >
          <Image
            src={icon}
            alt={iconAlt}
            width={24}
            height={24}
            className="object-cover w-full h-full"
          />
        </div>
        <span
          className="text-[0.72rem] font-bold uppercase tracking-[0.1em]"
          style={{ color }}
        >
          {label}
        </span>
      </div>

      <p className="text-[0.8rem] leading-snug" style={{ color: "var(--text-muted)" }}>
        {note}
      </p>
    </div>
  );
}

/**
 * MealFormCard — a single row in the meal form guide.
 */
function MealFormCard({ option }: { option: MealFormOption }) {
  const cfg = VERDICT_CONFIG[option.verdict];

  return (
    <div
      className="flex items-start gap-4 rounded-2xl px-5 py-4 transition-all duration-200 cursor-default"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        borderLeft: `3px solid ${cfg.color}`,
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "translateY(-1px)";
        el.style.boxShadow = `0 6px 20px rgba(${cfg.rgb},0.1)`;
        el.style.borderColor = cfg.color;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLDivElement;
        el.style.transform = "";
        el.style.boxShadow = "";
        el.style.borderColor = "";
      }}
    >
      {/* Icon area */}
      <div
        className="flex items-center justify-center rounded-2xl flex-shrink-0 mt-0.5"
        style={{
          width: 48,
          height: 48,
          background: `rgba(${cfg.rgb},0.08)`,
          border: `1.5px solid rgba(${cfg.rgb},0.15)`,
        }}
      >
        <Image
          src={`/illustrations/food/${option.icon}`}
          alt={option.label}
          width={32}
          height={32}
          className="object-contain"
          style={{ padding: 4 }}
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
          <h3
            className="font-serif text-[0.98rem] font-semibold"
            style={{ color: "var(--text)" }}
          >
            {option.label}
          </h3>
          <span
            className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.72rem] font-bold"
            style={{
              background: `rgba(${cfg.rgb},0.08)`,
              color: cfg.color,
              border: `1.5px solid rgba(${cfg.rgb},0.2)`,
              letterSpacing: "0.02em",
            }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full flex-shrink-0"
              style={{ background: cfg.color }}
            />
            {option.verdictLabel}
          </span>
        </div>
        <p
          className="text-[0.83rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {option.note}
        </p>
      </div>
    </div>
  );
}
