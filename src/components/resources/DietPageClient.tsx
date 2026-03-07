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
            <div className="reveal mt-8">
              <PersonalizedBanner profile={profile} />
            </div>
          )}

          {/* Vet Callout */}
          <div className={profile ? "reveal mt-4" : "reveal mt-8"}>
            <VetCallout dogName={profile?.dogName} />
          </div>

          {/* ═══ Section 1: The Science — Warburg Effect ═══ */}
          <section
            id="science"
            ref={(el) => { categoryRefs.current["science"] = el; }}
            className="mb-24 mt-16 reveal"
          >
            {/* Editorial section break */}
            <EditorialSectionBreak
              eyebrow="The Science"
              color="var(--sage)"
            />

            {/* Illustration + heading side-by-side */}
            <div className="flex flex-col sm:flex-row sm:items-start gap-6 sm:gap-8 mb-8">
              <div className="flex-shrink-0">
                <WarburgIllustration />
              </div>
              <div className="flex-1 min-w-0 pt-1">
                <h2
                  className="font-serif font-semibold leading-snug mb-4"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                    color: "var(--text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Cancer Cells Are Hungry — For Glucose
                </h2>
                <p
                  className="leading-[1.8]"
                  style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
                >
                  The <strong style={{ color: "var(--text)", fontWeight: 600 }}>Warburg Effect</strong> — described
                  in the 1920s and present in over 80% of cancer types — is the observation that
                  cancer cells preferentially consume glucose at abnormally high rates and convert
                  it to lactate even in the presence of oxygen.
                </p>
              </div>
            </div>

            <p
              className="leading-[1.8] mb-10"
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

            {/* Full-bleed pull-quote — no card wrapper, just generous left border and serif text */}
            <blockquote
              className="my-10"
              style={{
                borderLeft: "3px solid var(--gold)",
                paddingLeft: "1.75rem",
                marginLeft: 0,
                marginRight: 0,
              }}
            >
              <p
                className="font-serif italic leading-[1.8]"
                style={{
                  fontSize: "clamp(1.05rem, 2.5vw, 1.2rem)",
                  color: "var(--text)",
                }}
              >
                A low-carbohydrate diet limits tumor fuel while nourishing your
                dog&apos;s healthy cells — starving the disease without starving the dog.
              </p>
            </blockquote>

            {/* Macronutrient Framework */}
            <h3
              className="font-serif font-semibold mb-6 mt-10"
              style={{
                fontSize: "clamp(1.1rem, 2.5vw, 1.25rem)",
                color: "var(--text)",
                letterSpacing: "-0.005em",
              }}
            >
              The Macronutrient Framework
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <MacroCard
                label="Protein"
                range="60–70%"
                color="var(--sage)"
                rgb="91,123,94"
                icon="/illustrations/food/protein.webp"
                iconAlt="Lean meat representing dietary protein"
                note="Lean meats, fish, eggs, organ meats"
              />
              <MacroCard
                label="Healthy Fat"
                range="20–30%"
                color="var(--gold)"
                rgb="196,162,101"
                icon="/illustrations/food/healthy-fats.webp"
                iconAlt="Fish oil and omega-3 rich foods representing healthy dietary fat"
                note="Wild fish, fish oil, coconut oil"
              />
              <MacroCard
                label="Carbs"
                range="< 15%"
                color="var(--terracotta)"
                rgb="212,133,106"
                icon="/illustrations/food/corn.webp"
                iconAlt="Starchy grain representing carbohydrates to limit"
                note="Non-starchy vegetables only"
                iconFilter="hue-rotate(30deg) saturate(0.6)"
              />
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 2: Best Foods ═══ */}
          <section
            id="best-foods"
            ref={(el) => { categoryRefs.current["best-foods"] = el; }}
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="Best Foods"
                color="var(--sage)"
              />
              <h2
                className="font-serif font-semibold mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                Anti-Tumor Foods to Prioritize
              </h2>
              <p
                className="mb-8 leading-[1.75]"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 560 }}
              >
                Anti-angiogenic, anti-tumor whole foods supported by research. Tap any card to see preparation notes and why it matters.
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
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="Foods to Avoid"
                color="var(--terracotta)"
              />
              <h2
                className="font-serif font-semibold mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                What Fuels the Tumor
              </h2>
              <p
                className="mb-8 leading-[1.75]"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 560 }}
              >
                These foods fuel cancer metabolism, promote inflammation, or carry safety risks for dogs on an oncology protocol.
              </p>
            </div>

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
          </section>

          <SectionDivider />

          {/* ═══ Section 4: Supplements ═══ */}
          <section
            id="supplements"
            ref={(el) => { categoryRefs.current["supplements"] = el; }}
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="Supplements"
                eyebrowSuffix="Evidence-Graded"
                color="var(--sage)"
              />
              <div className="flex items-start justify-between gap-4 flex-wrap mb-3">
                <h2
                  className="font-serif font-semibold"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                    color: "var(--text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  What to Take, and Why
                </h2>
                {/* Collapse-all button */}
                <button
                  type="button"
                  onClick={handleCollapseAll}
                  className="flex-shrink-0 inline-flex items-center gap-1.5 text-[0.76rem] font-medium cursor-pointer transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1 focus-visible:ring-sage"
                  style={{
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                    padding: 0,
                    marginTop: "0.5rem",
                  }}
                  aria-label="Collapse all dosing tables"
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2 8l4-4 4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Collapse all
                </button>
              </div>
              <p
                className="mb-10 leading-[1.75]"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 560 }}
              >
                What to take, what the evidence actually says, and what most protocols are missing.
              </p>
            </div>

            {/* Supplement cards — vertical editorial stack */}
            <div className="space-y-0 mb-12">
              {supplements.map((supp, i) => (
                <DietSupplementCard
                  key={supp.slug}
                  supplement={supp}
                  profileWeightLbs={profile?.weightLbs}
                  collapseAll={collapseAllSignal}
                  isLast={i === supplements.length - 1}
                />
              ))}
            </div>

            {/* Protocol Gap — flattened callout, no nested card grid */}
            <div
              className="reveal"
              style={{
                borderTop: "2px solid var(--sage)",
                paddingTop: "2rem",
              }}
            >
              <div className="flex items-start gap-3 mb-5">
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "var(--sage)" }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M7 2.5L2 11.5h10L7 2.5z" stroke="white" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M7 6v3" stroke="white" strokeWidth="1.3" strokeLinecap="round"/>
                    <circle cx="7" cy="10" r="0.5" fill="white"/>
                  </svg>
                </div>
                <div>
                  <p
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-1"
                    style={{ color: "var(--sage)" }}
                  >
                    Protocol Gap
                  </p>
                  <h3
                    className="font-serif font-semibold leading-snug"
                    style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.3rem)", color: "var(--text)" }}
                  >
                    {protocolGap.headline}
                  </h3>
                  <p
                    className="text-[0.88rem] leading-relaxed mt-1.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {protocolGap.subhead}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {protocolGap.items.map((item, i) => (
                  <div key={i} className="flex flex-col">
                    <div className="flex items-center gap-3 mb-2">
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
                        className="font-serif font-semibold"
                        style={{ fontSize: "0.98rem", color: "var(--text)" }}
                      >
                        {item.name}
                      </h4>
                    </div>
                    <p
                      className="text-[0.85rem] leading-[1.7] mb-3"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {item.why}
                    </p>
                    {/* Action — left border treatment, no extra box */}
                    <div
                      className="text-[0.83rem] leading-relaxed"
                      style={{
                        borderLeft: "2.5px solid var(--sage)",
                        paddingLeft: "0.875rem",
                        color: "var(--sage)",
                        fontWeight: 500,
                      }}
                    >
                      <span
                        className="block text-[0.6rem] font-black uppercase tracking-[0.12em] mb-0.5 opacity-70"
                        style={{ color: "var(--sage)" }}
                      >
                        Action
                      </span>
                      {item.action}
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
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="The Debate"
                color="var(--gold)"
              />

              <h2
                className="font-serif font-semibold mb-2"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {glycineSection.headline}
              </h2>
              <p
                className="font-serif italic mb-6 leading-relaxed"
                style={{ fontSize: "1rem", color: "var(--text-muted)" }}
              >
                {glycineSection.subhead}
              </p>

              <p
                className="leading-[1.8] mb-10"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
              >
                Some protocols flag glycine and collagen (bone broth) as potentially tumor-feeding. The argument is less settled for HSA than it first appears — here is the concern and the HSA-specific counterargument side by side.
              </p>

              {/* Two-column concern/counterargument — open layout, no double-card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {/* Concern */}
                <div
                  style={{
                    borderTop: "2px solid var(--terracotta)",
                    paddingTop: "1.25rem",
                  }}
                >
                  <p
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-3"
                    style={{ color: "var(--terracotta)" }}
                  >
                    {glycineSection.concern.label}
                  </p>
                  <p
                    className="text-[0.93rem] leading-[1.8]"
                    style={{ color: "var(--text)" }}
                  >
                    {glycineSection.concern.text}
                  </p>
                </div>

                {/* Counterargument */}
                <div
                  style={{
                    borderTop: "2px solid var(--sage)",
                    paddingTop: "1.25rem",
                  }}
                >
                  <p
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-3"
                    style={{ color: "var(--sage)" }}
                  >
                    {glycineSection.counterargument.label}
                  </p>
                  <p
                    className="text-[0.93rem] leading-[1.8]"
                    style={{ color: "var(--text)" }}
                  >
                    {glycineSection.counterargument.text}
                  </p>
                </div>
              </div>

              {/* Added complexity */}
              <p
                className="font-serif italic leading-[1.8] mb-8"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
              >
                {glycineSection.addedComplexity}
              </p>

              {/* Verdict — pull-quote style, left gold border */}
              <blockquote
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: "1.75rem",
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <p
                  className="text-[0.6rem] font-black uppercase tracking-[0.14em] mb-2"
                  style={{ color: "var(--gold)" }}
                >
                  {glycineSection.verdict.label}
                </p>
                <p
                  className="font-serif italic leading-[1.8]"
                  style={{
                    fontSize: "clamp(1rem, 2.3vw, 1.12rem)",
                    color: "var(--text)",
                  }}
                >
                  <strong className="not-italic" style={{ color: "var(--gold)", fontWeight: 700 }}>
                    Bottom line:{" "}
                  </strong>
                  {glycineSection.verdict.text}
                </p>
              </blockquote>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 6: Meal Form Guide ═══ */}
          <section
            id="meal-form"
            ref={(el) => { categoryRefs.current["meal-form"] = el; }}
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="Meal Form"
                color="var(--gold)"
              />
              <h2
                className="font-serif font-semibold mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                Form Matters as Much as Ingredients
              </h2>
              <p
                className="mb-10 leading-[1.75]"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 520 }}
              >
                The same ingredients prepared differently can have very different glycemic and nutritional profiles. Here&apos;s how to evaluate what you&apos;re feeding.
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
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="Interactive Tool"
                color="var(--sage)"
              />
              {/* Header — open, on the page surface */}
              <div className="mb-10">
                <h2
                  className="font-serif font-semibold mb-3"
                  style={{
                    fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                    color: "var(--text)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Build a Meal Plan
                </h2>
                <p
                  className="leading-[1.75] mb-3"
                  style={{ fontSize: "0.95rem", color: "var(--text-muted)", maxWidth: 480 }}
                >
                  Answer two questions and get a weekly feeding framework
                  tailored to your dog&apos;s weight.
                </p>
                <p
                  className="font-serif italic leading-relaxed"
                  style={{ fontSize: "0.92rem", color: "var(--text-muted)", opacity: 0.85 }}
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
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="What Vets Say"
                color="var(--sage)"
              />

              <h2
                className="font-serif font-semibold mb-2"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                {oncologistConsensus.headline}
              </h2>
              <p
                className="font-serif italic mb-6 leading-relaxed"
                style={{ fontSize: "1rem", color: "var(--text-muted)" }}
              >
                {oncologistConsensus.subhead}
              </p>

              <p
                className="leading-[1.8] mb-10"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
              >
                {oncologistConsensus.intro}
              </p>

              {/* Two-column agreements / skepticisms — open columns, no card borders */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-10">
                {/* Agreements */}
                <div>
                  <p
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-4"
                    style={{ color: "var(--sage)", borderBottom: "1px solid rgba(91,123,94,0.2)", paddingBottom: "0.6rem" }}
                  >
                    Areas of Agreement
                  </p>
                  <ul className="space-y-3">
                    {oncologistConsensus.agreements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--sage)", marginTop: "0.55rem" }}
                        />
                        <span
                          className="text-[0.9rem] leading-[1.7]"
                          style={{ color: "var(--text)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Skepticisms */}
                <div>
                  <p
                    className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-4"
                    style={{ color: "var(--terracotta)", borderBottom: "1px solid rgba(212,133,106,0.2)", paddingBottom: "0.6rem" }}
                  >
                    Areas of Skepticism
                  </p>
                  <ul className="space-y-3">
                    {oncologistConsensus.skepticisms.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span
                          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ background: "var(--terracotta)", marginTop: "0.55rem" }}
                        />
                        <span
                          className="text-[0.9rem] leading-[1.7]"
                          style={{ color: "var(--text)" }}
                        >
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* CSU Quote — left-border pull quote */}
              <blockquote
                className="my-10"
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: "1.75rem",
                  marginLeft: 0,
                  marginRight: 0,
                }}
              >
                <p
                  className="font-serif italic leading-[1.8]"
                  style={{
                    fontSize: "clamp(1rem, 2.3vw, 1.1rem)",
                    color: "var(--text)",
                  }}
                >
                  {oncologistConsensus.csuQuote}
                </p>
              </blockquote>

              {/* Closing thought — plain italic, no box */}
              <p
                className="font-serif italic leading-[1.8]"
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                }}
              >
                {oncologistConsensus.closingThought}
              </p>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 9: Active Research ═══ */}
          <section
            id="research"
            ref={(el) => { categoryRefs.current["research"] = el; }}
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="Research"
                color="var(--sage)"
              />

              <h2
                className="font-serif font-semibold mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                Active Research
              </h2>
              <p
                className="leading-[1.8] mb-2"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
              >
                This field is moving faster than most people realize. Multiple major institutions have active trials and funded initiatives underway right now — and the results will directly reshape dietary guidance for HSA dogs.
              </p>
              <p
                className="font-serif italic mb-10"
                style={{ fontSize: "0.88rem", color: "var(--text-muted)", opacity: 0.8 }}
              >
                The studies below were active or recently published as of early 2026.
              </p>

              {/* Research entries — editorial list format, no card grid */}
              <div className="space-y-0 reveal-stagger">
                {activeResearch.map((study, i) => {
                  const isActive = study.status.toLowerCase().includes("active");
                  return (
                    <div
                      key={i}
                      className="py-7 transition-all duration-200"
                      style={{
                        borderTop: i === 0 ? "1px solid var(--border)" : "1px solid var(--border)",
                        borderBottom: i === activeResearch.length - 1 ? "1px solid var(--border)" : "none",
                      }}
                    >
                      {/* Institution + status row */}
                      <div className="flex items-center justify-between gap-3 mb-2 flex-wrap">
                        <p
                          className="text-[0.62rem] font-black uppercase tracking-[0.14em]"
                          style={{ color: "var(--sage)" }}
                        >
                          {study.institution}
                        </p>
                        <span
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[0.65rem] font-semibold flex-shrink-0"
                          style={{
                            background: isActive ? "rgba(91,123,94,0.08)" : "rgba(196,162,101,0.1)",
                            color: isActive ? "var(--sage)" : "var(--gold)",
                            border: `1px solid ${isActive ? "rgba(91,123,94,0.2)" : "rgba(196,162,101,0.25)"}`,
                          }}
                        >
                          {isActive ? (
                            <span
                              className="relative flex-shrink-0 inline-flex"
                              style={{ width: 7, height: 7 }}
                              aria-hidden="true"
                            >
                              <span
                                className="animate-ping absolute inline-flex w-full h-full rounded-full opacity-40"
                                style={{ background: "var(--sage)" }}
                              />
                              <span
                                className="relative inline-flex rounded-full"
                                style={{ width: 7, height: 7, background: "var(--sage)" }}
                              />
                            </span>
                          ) : (
                            <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--gold)" }} />
                          )}
                          {study.status}
                        </span>
                      </div>

                      <h3
                        className="font-serif font-semibold mb-2 leading-snug"
                        style={{ fontSize: "clamp(1rem, 2.3vw, 1.12rem)", color: "var(--text)" }}
                      >
                        {study.title}
                      </h3>

                      <p
                        className="text-[0.88rem] leading-[1.7] mb-3"
                        style={{ color: "var(--text-muted)" }}
                      >
                        {study.summary}
                      </p>

                      {/* Relevance — left-border inline note */}
                      <p
                        className="text-[0.82rem] italic leading-relaxed"
                        style={{
                          color: "var(--sage)",
                          borderLeft: "2px solid rgba(91,123,94,0.3)",
                          paddingLeft: "0.75rem",
                        }}
                      >
                        {study.relevance}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          <SectionDivider />

          {/* ═══ Section 10: Critical Cautions ═══ */}
          <section
            id="cautions"
            ref={(el) => { categoryRefs.current["cautions"] = el; }}
            className="mb-24"
          >
            <div className="reveal">
              <EditorialSectionBreak
                eyebrow="Cautions"
                color="var(--terracotta)"
              />

              <h2
                className="font-serif font-semibold mb-3"
                style={{
                  fontSize: "clamp(1.5rem, 3.5vw, 1.9rem)",
                  color: "var(--text)",
                  letterSpacing: "-0.01em",
                }}
              >
                Critical Cautions
              </h2>
              <p
                className="font-serif italic mb-4 leading-relaxed"
                style={{ fontSize: "0.95rem", color: "var(--text-muted)" }}
              >
                You are almost certainly not doing any of these — most are
                obvious dangers. We include them here because a well-meaning
                friend or family member may not know.
              </p>
            </div>

            {/* Never Give — open list with terracotta top border, no box */}
            <div
              className="mb-8 reveal"
              style={{
                borderTop: "2px solid var(--terracotta)",
                paddingTop: "1.5rem",
              }}
            >
              <p
                className="text-[0.65rem] font-black uppercase tracking-[0.14em] mb-5"
                style={{ color: "var(--terracotta)" }}
              >
                Never Give
              </p>
              <div className="space-y-4">
                {cautions
                  .filter((c) => c.severity === "never")
                  .map((caution, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--terracotta)", marginTop: "0.55rem" }}
                      />
                      <div>
                        <span
                          className="font-semibold text-[0.92rem]"
                          style={{ color: "var(--text)" }}
                        >
                          {caution.title}
                        </span>
                        <p
                          className="text-[0.85rem] leading-[1.7] mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {caution.note}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Use with Care — open list with gold top border */}
            <div
              className="mb-8 reveal"
              style={{
                borderTop: "2px solid var(--gold)",
                paddingTop: "1.5rem",
              }}
            >
              <p
                className="text-[0.65rem] font-black uppercase tracking-[0.14em] mb-5"
                style={{ color: "var(--gold)" }}
              >
                Use with Care
              </p>
              <div className="space-y-4">
                {cautions
                  .filter((c) => c.severity === "care")
                  .map((caution, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--gold)", marginTop: "0.55rem" }}
                      />
                      <div>
                        <span
                          className="font-semibold text-[0.92rem]"
                          style={{ color: "var(--text)" }}
                        >
                          {caution.title}
                        </span>
                        <p
                          className="text-[0.85rem] leading-[1.7] mt-0.5"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {caution.note}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </div>

            {/* Monitoring callout — inline, no extra card */}
            <div
              className="reveal"
              style={{
                borderLeft: "3px solid var(--sage)",
                paddingLeft: "1.25rem",
              }}
            >
              <p
                className="text-[0.65rem] font-bold uppercase tracking-[0.14em] mb-1.5"
                style={{ color: "var(--sage)" }}
              >
                {monitoringCallout.headline}
              </p>
              <p
                className="text-[0.88rem] leading-[1.75]"
                style={{ color: "var(--text-muted)" }}
              >
                {monitoringCallout.body}
              </p>
            </div>
          </section>

          {/* ═══ Key Sources strip — grouped by type ═══ */}
          <section className="mb-10 reveal">
            <div
              className="flex items-center gap-3 mb-5"
              style={{ borderTop: "1px solid var(--border)", paddingTop: "2rem" }}
            >
              <span
                className="text-[0.65rem] font-bold uppercase tracking-[0.14em]"
                style={{ color: "var(--text-muted)" }}
              >
                Key Sources
              </span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>
            <p
              className="text-[0.85rem] mb-6 leading-relaxed"
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
          <div className="text-center mb-12 reveal">
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

/**
 * EditorialSectionBreak — magazine-quality section header treatment.
 * Renders: flanking rules + eyebrow label (+ optional suffix pill) centered between them.
 * Used at the top of every major content section.
 */
function EditorialSectionBreak({
  eyebrow,
  eyebrowSuffix,
  color,
}: {
  eyebrow: string;
  eyebrowSuffix?: string;
  color: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(to right, transparent, ${color === "var(--terracotta)" ? "rgba(212,133,106,0.25)" : color === "var(--gold)" ? "rgba(196,162,101,0.25)" : "rgba(91,123,94,0.22)"})`,
        }}
      />
      <div className="flex items-center gap-2 flex-shrink-0">
        <span
          className="text-[0.62rem] font-black uppercase tracking-[0.16em]"
          style={{ color }}
        >
          {eyebrow}
        </span>
        {eyebrowSuffix && (
          <span
            className="text-[0.58rem] font-semibold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded-full"
            style={{
              color: "var(--text-muted)",
              background: "var(--border)",
            }}
          >
            {eyebrowSuffix}
          </span>
        )}
      </div>
      <div
        className="flex-1 h-px"
        style={{
          background: `linear-gradient(to left, transparent, ${color === "var(--terracotta)" ? "rgba(212,133,106,0.25)" : color === "var(--gold)" ? "rgba(196,162,101,0.25)" : "rgba(91,123,94,0.22)"})`,
        }}
      />
    </div>
  );
}
