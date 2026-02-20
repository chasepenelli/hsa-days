"use client";

import Image from "next/image";
import { useState, useEffect, useMemo } from "react";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { useStickyScroll } from "@/hooks/useStickyScroll";

/* ── Hardcoded Day 1 content (matches Supabase data) ─── */
const DAY1 = {
  title: "The Word",
  subtitle: "Giving yourself permission to feel",
  category: "Reflection",
  quote: "The wound is the place where the Light enters you.",
  quoteAuthor: "Rumi",
  reflectionIntro:
    "I keep staring at him sleeping on the couch like nothing happened. Like the vet didn\u2019t just say those words. Like everything isn\u2019t different now. But it is. And I don\u2019t know what to do with that yet.",
  activityTitle: "Tonight",
  activityDescription:
    "Put your phone in another room. Sit on the floor next to them. Don\u2019t try to be strong. Just be there.",
  journalPrompt:
    "What are you feeling right now? There are no wrong answers...",
  practicalTipTitle: "Start a Notes File",
  practicalTip:
    "Open a note on your phone. Write down your dog\u2019s diagnosis details, the vet\u2019s name, and any medications. You\u2019ll be glad you did.",
};

/* ── Feature card data ────────────────────────────────── */
const features = [
  {
    icon: "/illustrations/icons/icon-journal.png",
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.09)",
    borderColor: "rgba(91,123,94,0.20)",
    title: "30 Daily Reflections",
    description:
      "Honest, grounding writing that meets you where you are \u2014 not clinical, not cold, just real.",
    preview: "reflection" as const,
  },
  {
    icon: "/illustrations/icons/icon-pencil.png",
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.09)",
    borderColor: "rgba(196,162,101,0.22)",
    title: "Private Journaling",
    description:
      "A writing prompt each day with a journal built right into the page. Only you can see your entries.",
    preview: "journal" as const,
  },
  {
    icon: "/illustrations/icons/icon-dog-person.png",
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.09)",
    borderColor: "rgba(212,133,106,0.22)",
    title: "Activities With Your Dog",
    description:
      "Simple, meaningful things to do together. Not bucket-list pressure \u2014 just intentional moments.",
    preview: "activity" as const,
  },
  {
    icon: "/illustrations/icons/icon-lightbulb.png",
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.09)",
    borderColor: "rgba(91,123,94,0.20)",
    title: "Practical Guides",
    description:
      "Supplements, nutrition, house-proofing \u2014 the stuff you actually need but can\u2019t find in one place.",
    preview: "practical" as const,
  },
  {
    icon: "/illustrations/icons/icon-calendar.png",
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.09)",
    borderColor: "rgba(196,162,101,0.22)",
    title: "Morning Emails",
    description:
      "A gentle nudge each morning with the day\u2019s quote and a preview. One tap to open today\u2019s page.",
    preview: "email" as const,
  },
  {
    icon: "/illustrations/icons/icon-community.png",
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.09)",
    borderColor: "rgba(212,133,106,0.22)",
    title: "Community Stories",
    description:
      "You\u2019re not the first to walk this road. Read stories from other HSA families \u2014 and share yours when ready.",
    preview: "community" as const,
  },
];

/* ── Mini preview components ──────────────────────────── */

function ReflectionPreview() {
  return (
    <div
      className="relative overflow-hidden rounded-lg"
      style={{
        minHeight: "88px",
        padding: "14px 16px 28px",
        background: "var(--cream)",
        border: "1px solid var(--border)",
      }}
    >
      <p
        className="text-[0.82rem] leading-relaxed font-serif italic"
        style={{ color: "var(--text-muted)" }}
      >
        &ldquo;{DAY1.reflectionIntro}&rdquo;
      </p>
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background: "linear-gradient(transparent, var(--cream))",
        }}
      />
    </div>
  );
}

function JournalPreview() {
  return (
    <div>
      <div
        className="rounded-lg px-3.5 py-2.5 text-[0.78rem] font-serif italic"
        style={{
          border: "1.5px dashed rgba(196,162,101,0.45)",
          background: "rgba(196,162,101,0.05)",
          color: "var(--text-muted)",
          lineHeight: 1.5,
        }}
      >
        {DAY1.journalPrompt}
      </div>
      <div
        className="mt-2 rounded-lg journal-lined"
        style={{
          height: "100px",
          border: "1px solid var(--border)",
          background: "white",
        }}
      >
        <div
          className="mx-3.5 mt-[10px]"
          style={{
            width: "2px",
            height: "14px",
            background: "rgba(91,123,94,0.45)",
            borderRadius: "1px",
            animationName: "breathe",
            animationDuration: "1.1s",
            animationTimingFunction: "ease-in-out",
            animationIterationCount: "infinite",
          }}
        />
      </div>
    </div>
  );
}

function ActivityPreview() {
  return (
    <div
      className="rounded-lg overflow-hidden flex items-stretch gap-0"
      style={{
        border: "1px solid rgba(212,133,106,0.20)",
        background: "rgba(212,133,106,0.05)",
      }}
    >
      <div className="flex-1 min-w-0 px-3.5 py-3">
        <div
          className="text-[0.62rem] uppercase tracking-[0.12em] font-semibold mb-1.5"
          style={{ color: "var(--terracotta)" }}
        >
          {DAY1.activityTitle}
        </div>
        <p
          className="text-[0.78rem] leading-relaxed"
          style={{
            color: "var(--text-muted)",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {DAY1.activityDescription}
        </p>
      </div>
      <div className="flex-shrink-0 relative" style={{ width: "72px" }}>
        <Image
          src="/illustrations/days/day01-activity.png"
          alt=""
          width={72}
          height={88}
          className="w-full h-full object-cover"
          style={{ mixBlendMode: "multiply", opacity: 0.88 }}
        />
      </div>
    </div>
  );
}

function PracticalPreview() {
  return (
    <div
      className="rounded-lg px-3.5 py-3"
      style={{
        background: "rgba(196,162,101,0.07)",
        border: "1px solid rgba(196,162,101,0.22)",
      }}
    >
      <div className="flex items-start gap-2.5">
        <div
          className="flex-shrink-0"
          style={{
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            background: "var(--gold)",
            marginTop: "5px",
          }}
        />
        <div>
          <div
            className="text-[0.72rem] font-semibold mb-1"
            style={{ color: "var(--gold)", lineHeight: 1.3 }}
          >
            {DAY1.practicalTipTitle}
          </div>
          <p
            className="text-[0.78rem] leading-relaxed"
            style={{
              color: "var(--text-muted)",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
            }}
          >
            {DAY1.practicalTip}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmailPreviewCard() {
  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      <div
        className="px-3.5 py-2.5 flex items-center gap-2.5"
        style={{
          background: "var(--cream)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="flex-shrink-0 flex items-center justify-center text-white font-semibold"
          style={{
            width: "22px",
            height: "22px",
            borderRadius: "50%",
            background: "var(--sage)",
            fontSize: "0.6rem",
          }}
        >
          H
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="font-semibold truncate"
            style={{ fontSize: "0.68rem", color: "var(--text)" }}
          >
            HSA Days
          </div>
          <div
            className="truncate"
            style={{ fontSize: "0.6rem", color: "var(--text-muted)" }}
          >
            hello@hsadays.com
          </div>
        </div>
        <div
          className="flex-shrink-0"
          style={{ fontSize: "0.62rem", color: "var(--text-muted)" }}
        >
          7:00 AM
        </div>
      </div>
      <div className="px-3.5 py-3" style={{ background: "white" }}>
        <div
          className="font-semibold mb-1.5"
          style={{ fontSize: "0.76rem", color: "var(--text)" }}
        >
          Day 1: {DAY1.title}
        </div>
        <p
          className="font-serif italic leading-snug"
          style={{ fontSize: "0.74rem", color: "var(--text-muted)" }}
        >
          &ldquo;{DAY1.quote}&rdquo;
        </p>
        <div
          className="mt-1"
          style={{ fontSize: "0.68rem", color: "var(--text-muted)" }}
        >
          &mdash; {DAY1.quoteAuthor}
        </div>
      </div>
    </div>
  );
}

function CommunityPreview() {
  const stories = [
    {
      name: "Sarah & Bowie",
      text: "This gave us permission to just\u2026 be together.",
    },
    {
      name: "Mike & Luna",
      text: "I didn\u2019t know I needed this until I started reading.",
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {stories.map((story) => (
        <div
          key={story.name}
          className="rounded-xl px-3.5 py-3 flex flex-col justify-between gap-2"
          style={{
            background: "rgba(212,133,106,0.06)",
            border: "1px solid rgba(212,133,106,0.18)",
          }}
        >
          <div
            className="font-serif leading-none select-none"
            style={{
              fontSize: "1.4rem",
              color: "rgba(212,133,106,0.35)",
              lineHeight: 1,
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <p
            className="text-[0.75rem] italic leading-snug flex-1"
            style={{ color: "var(--text-muted)", marginTop: "-6px" }}
          >
            {story.text}
          </p>
          <div
            className="text-[0.65rem] font-semibold"
            style={{ color: "var(--terracotta)" }}
          >
            {story.name}
          </div>
        </div>
      ))}
    </div>
  );
}

const PREVIEW_MAP = {
  reflection: ReflectionPreview,
  journal: JournalPreview,
  activity: ActivityPreview,
  practical: PracticalPreview,
  email: EmailPreviewCard,
  community: CommunityPreview,
} as const;

/* ── Easing helpers (used by StickyScrollSection) ───── */

// Cubic ease-out: fast arrival, gentle settling.
// Applied to entering cards so they land softly rather than popping in.
function easeOutCubic(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return 1 - Math.pow(1 - c, 3);
}

// Cubic ease-in: hesitant start, confident departure.
// Applied to exiting cards so the first motion is barely perceptible,
// then the card accelerates away — mimicking a journal page being turned.
function easeInCubic(t: number): number {
  const c = Math.max(0, Math.min(1, t));
  return c * c * c;
}

/* ── Feature Slide (single card in sticky view) ──────── */

function FeatureSlide({
  feature,
  style,
}: {
  feature: (typeof features)[number];
  style?: React.CSSProperties;
}) {
  const Preview = PREVIEW_MAP[feature.preview];

  return (
    <div className="sticky-card flex items-center justify-center" style={style}>
      <div
        className="w-full rounded-2xl overflow-hidden relative"
        style={{
          maxWidth: "780px",
          background: "white",
          border: `1px solid ${feature.borderColor}`,
          boxShadow:
            "0 24px 72px rgba(0,0,0,0.10), 0 6px 20px rgba(0,0,0,0.04)",
        }}
      >
        {/* Background illustration fill */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <Image
            src={feature.icon}
            alt=""
            width={400}
            height={400}
            className="absolute"
            style={{
              right: "-40px",
              bottom: "-40px",
              width: "320px",
              height: "320px",
              objectFit: "contain",
              opacity: 0.06,
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Card content */}
        <div className="relative p-10 md:p-12">
          {/* Icon */}
          <div className="flex justify-center mb-6">
            <Image
              src={feature.icon}
              alt=""
              width={128}
              height={128}
              style={{ objectFit: "contain", mixBlendMode: "multiply" }}
            />
          </div>

          {/* Title */}
          <h3
            className="font-serif font-semibold text-center mb-3"
            style={{ fontSize: "1.3rem", color: "var(--text)", lineHeight: 1.3 }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            className="text-[0.92rem] leading-relaxed text-center mx-auto mb-6"
            style={{ color: "var(--text-muted)", maxWidth: "480px" }}
          >
            {feature.description}
          </p>

          {/* Gold gradient divider */}
          <div
            className="mx-auto mb-6"
            style={{
              width: "60px",
              height: "2px",
              borderRadius: "1px",
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />

          {/* Day 1 preview */}
          <div className="mx-auto" style={{ maxWidth: "520px" }}>
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Progress Indicator ──────────────────────────────── */

function ProgressIndicator({
  activeIndex,
  total,
}: {
  activeIndex: number;
  total: number;
}) {
  return (
    <div className="flex flex-col items-center gap-3 mt-6">
      {/* Dots — grow/shrink and recolor smoothly */}
      <div className="flex items-center gap-2" style={{ height: "10px" }}>
        {features.map((feature, i) => (
          <div
            key={i}
            style={{
              width: i === activeIndex ? "10px" : "6px",
              height: i === activeIndex ? "10px" : "6px",
              borderRadius: "50%",
              background:
                i === activeIndex ? feature.color : "var(--border-strong)",
              // Spring-style easing: overshoot then settle
              transition:
                "width 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), height 0.45s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.3s ease, opacity 0.3s ease",
              opacity: i === activeIndex ? 1 : 0.45,
              // Vertically center dots of varying sizes without layout shift
              alignSelf: "center",
            }}
          />
        ))}
      </div>

      {/* Label — uses a fixed-height container with absolutely positioned
          crossfading text so the surrounding layout never shifts */}
      <div
        style={{
          position: "relative",
          // Sized to fit the tallest label line (single-line at 0.75rem)
          height: "18px",
          // Wide enough for the longest title — prevents horizontal jumps
          width: "280px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {features.map((feature, i) => (
          <div
            key={i}
            className="text-[0.75rem] tracking-wide"
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-muted)",
              opacity: i === activeIndex ? 1 : 0,
              // Crossfade only — no scale/translate so the transition
              // is invisible to layout but clearly legible
              transition: "opacity 0.4s ease",
              whiteSpace: "nowrap",
              pointerEvents: i === activeIndex ? "auto" : "none",
            }}
          >
            <span className="font-semibold" style={{ color: feature.color }}>
              {i + 1}
            </span>
            &nbsp;of {total}
            <span style={{ margin: "0 6px", opacity: 0.4 }}>&middot;</span>
            {feature.title}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Sticky Scroll Section (Desktop) ─────────────────── */

function StickyScrollSection() {
  const { containerRef, activeIndex, cardProgress } = useStickyScroll(
    features.length
  );

  const cardStyles = useMemo(() => {
    return features.map((_, i) => {
      // ─── Defaults: unseen future cards sit below, ready to enter ───
      let opacity = 0;
      let translateY = 28;   // enters from a close, natural distance
      let scale = 0.97;      // barely smaller — not a hard pop

      if (i === activeIndex) {
        // ─── Active (current) card ─────────────────────────────────
        // Fully visible and settled for the first 55% of its segment.
        // Then gently lifts and fades during the final 45% — like a
        // journal page being turned: slow hesitant start, then away.
        if (cardProgress < 0.55) {
          opacity = 1;
          translateY = 0;
          scale = 1;
        } else {
          // Normalize 0.55→1.0 to 0→1, then ease-in so the motion
          // starts imperceptibly slow and accelerates into the exit.
          const rawExit = (cardProgress - 0.55) / 0.45;
          const exitP = easeInCubic(rawExit);
          opacity = 1 - exitP;
          translateY = -18 * exitP;   // lifts only ~18px — subtle, not dramatic
          scale = 1 - 0.025 * exitP;  // barely perceptible scale reduction
        }
      } else if (i === activeIndex + 1) {
        // ─── Incoming (next) card ──────────────────────────────────
        // Begins its entrance at 40% of the current card's segment,
        // so there is genuine overlap from 40%→100% where both cards
        // coexist on screen. Uses ease-out so it arrives quickly and
        // settles gently — like a new page falling into place.
        if (cardProgress > 0.4) {
          const rawEnter = (cardProgress - 0.4) / 0.6;
          const enterP = easeOutCubic(rawEnter);
          opacity = enterP;
          translateY = 28 * (1 - enterP);  // rises from 28px to 0
          scale = 0.97 + 0.03 * enterP;    // settles from 0.97 to 1
        }
        // Before 40%, stays at defaults (opacity 0, hidden below)
      } else if (i < activeIndex) {
        // ─── Past cards: fully exited, parked above ─────────────
        // Held off-screen so they can never accidentally flash back in.
        opacity = 0;
        translateY = -24;
        scale = 0.975;
      }
      // Cards more than one ahead stay at future defaults (opacity 0, below)

      return {
        opacity,
        transform: `translateY(${translateY}px) scale(${scale})`,
        // Active card sits above incoming; incoming above all others
        zIndex: i === activeIndex ? 2 : i === activeIndex + 1 ? 1 : 0,
        pointerEvents: (i === activeIndex ? "auto" : "none") as React.CSSProperties["pointerEvents"],
        // No CSS transition — all motion is driven by scroll position directly
        transition: "none",
      } satisfies React.CSSProperties;
    });
  }, [activeIndex, cardProgress]);

  return (
    <div
      ref={containerRef}
      style={{
        height: `${features.length * 100}vh`,
        position: "relative",
      }}
    >
      {/* Sticky viewport container */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px 24px",
        }}
      >
        {/* Card viewport */}
        <div
          style={{
            position: "relative",
            width: "100%",
            maxWidth: "780px",
            flex: "1 1 auto",
            minHeight: 0,
            display: "flex",
            alignItems: "center",
          }}
        >
          {features.map((feature, i) => (
            <FeatureSlide
              key={i}
              feature={feature}
              style={cardStyles[i]}
            />
          ))}
        </div>

        <ProgressIndicator
          activeIndex={activeIndex}
          total={features.length}
        />
      </div>
    </div>
  );
}

/* ── Mobile Card Stack (Fallback) ────────────────────── */

function MobileCardStack() {
  return (
    <div className="flex flex-col gap-6 max-w-[640px] mx-auto">
      {features.map((feature, i) => {
        const Preview = PREVIEW_MAP[feature.preview];
        return (
          <div
            key={i}
            className="rounded-2xl p-6"
            style={{
              background: "white",
              border: `1px solid ${feature.borderColor}`,
              boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
            }}
          >
            <div className="flex justify-center mb-4">
              <Image
                src={feature.icon}
                alt=""
                width={96}
                height={96}
                style={{ objectFit: "contain", mixBlendMode: "multiply" }}
              />
            </div>
            <h3
              className="font-serif font-semibold text-center mb-1.5"
              style={{
                fontSize: "1.05rem",
                color: "var(--text)",
                lineHeight: 1.3,
              }}
            >
              {feature.title}
            </h3>
            <p
              className="text-[0.84rem] leading-relaxed text-center mb-4"
              style={{ color: "var(--text-muted)" }}
            >
              {feature.description}
            </p>
            <div
              className="mx-auto mb-4"
              style={{
                width: "40px",
                height: "1.5px",
                background:
                  "linear-gradient(to right, transparent, var(--gold), transparent)",
              }}
            />
            <Preview />
          </div>
        );
      })}
    </div>
  );
}

/* ── Main Section ────────────────────────────────────── */

export function SeeInsideV2() {
  const ref = useScrollReveal();
  const [isDesktop, setIsDesktop] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);

    const mql = window.matchMedia("(min-width: 768px)");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    );

    const check = () => {
      setIsDesktop(mql.matches && !prefersReduced.matches);
    };

    check();
    mql.addEventListener("change", check);
    prefersReduced.addEventListener("change", check);

    return () => {
      mql.removeEventListener("change", check);
      prefersReduced.removeEventListener("change", check);
    };
  }, []);

  return (
    <section
      id="preview"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        background: "var(--cream)",
      }}
    >
      {/* Ambient radial glow -- top left */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-10%",
          left: "-8%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.07) 0%, transparent 68%)",
        }}
      />
      {/* Ambient radial glow -- bottom right */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "-10%",
          right: "-8%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.08) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto px-6">
        {/* ── Section header ─────────────────────── */}
        <div className="text-center mb-14">
          <div
            className="reveal inline-flex items-center gap-3 mb-5"
            style={{ color: "var(--gold)" }}
          >
            <span
              style={{
                display: "block",
                width: "28px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.5,
              }}
            />
            <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
              See Inside
            </span>
            <span
              style={{
                display: "block",
                width: "28px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.5,
              }}
            />
          </div>

          <h2
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              color: "var(--text)",
              transitionDelay: "0.08s",
            }}
          >
            Here&apos;s what a day looks like.
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "520px",
              transitionDelay: "0.16s",
            }}
          >
            Each day brings a reflection, a journal prompt, an activity, and
            more. Here&apos;s Day 1 as an example.
          </p>
        </div>

        {/* ── Day 1 hero card ────────────────────── */}
        <div
          className="reveal-scale max-w-[680px] mx-auto rounded-[22px] overflow-hidden mb-12"
          style={{
            boxShadow:
              "0 20px 60px rgba(0,0,0,0.09), 0 4px 16px rgba(0,0,0,0.04)",
            border: "1px solid rgba(91,123,94,0.18)",
            transitionDelay: "0.24s",
          }}
        >
          {/* Sage gradient header with illustration */}
          <div
            className="relative text-white overflow-hidden"
            style={{
              background:
                "linear-gradient(155deg, var(--sage-dark) 0%, var(--sage) 60%, var(--sage-light) 100%)",
              minHeight: "148px",
            }}
          >
            <div className="absolute inset-0 flex items-end justify-end pointer-events-none overflow-hidden">
              <Image
                src="/illustrations/days/day01-header.png"
                alt=""
                width={220}
                height={160}
                className="object-contain object-right-bottom"
                style={{
                  opacity: 0.18,
                  mixBlendMode: "luminosity",
                  marginRight: "8px",
                }}
              />
            </div>

            <div
              className="absolute inset-y-0 left-0 w-[55%] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(62,87,64,0.35) 0%, transparent 100%)",
              }}
            />

            <div className="relative px-8 py-7 md:px-10 md:py-8">
              <div
                className="flex items-center gap-2 mb-3"
                style={{
                  opacity: 0.72,
                  fontSize: "0.7rem",
                  letterSpacing: "0.1em",
                }}
              >
                <span className="uppercase font-semibold tracking-[0.12em]">
                  Day 1 of 30
                </span>
                <span
                  style={{
                    width: "3px",
                    height: "3px",
                    borderRadius: "50%",
                    background: "rgba(255,255,255,0.6)",
                    display: "inline-block",
                  }}
                />
                <span>{DAY1.category}</span>
              </div>

              <h3
                className="font-serif font-semibold leading-tight mb-1.5"
                style={{ fontSize: "clamp(1.6rem, 3.5vw, 1.95rem)" }}
              >
                {DAY1.title}
              </h3>
              <p style={{ opacity: 0.82, fontSize: "0.95rem" }}>
                {DAY1.subtitle}
              </p>
            </div>
          </div>

          {/* Quote strip */}
          <div
            className="px-8 py-6 md:px-10"
            style={{ background: "white" }}
          >
            <div
              className="rounded-xl px-6 py-5 text-center relative overflow-hidden"
              style={{
                background: "var(--cream)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2"
                style={{
                  width: "40px",
                  height: "2.5px",
                  background: "var(--gold)",
                  borderRadius: "0 0 2px 2px",
                  opacity: 0.75,
                }}
              />
              <div
                className="font-serif select-none leading-none mb-1"
                style={{
                  fontSize: "2.2rem",
                  color: "rgba(196,162,101,0.30)",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p
                className="font-serif italic"
                style={{
                  fontSize: "clamp(0.95rem, 1.8vw, 1.08rem)",
                  lineHeight: 1.65,
                  color: "var(--text)",
                }}
              >
                {DAY1.quote}
              </p>
              <div
                className="mt-3 font-sans"
                style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}
              >
                &mdash; {DAY1.quoteAuthor}
              </div>
            </div>
          </div>
        </div>

        {/* ── Connector label ─────────────────────── */}
        <div
          className="reveal text-center mb-8"
          style={{
            transitionDelay: "0.1s",
            paddingBottom: isDesktop ? "0" : "0",
          }}
        >
          <div
            className="inline-flex items-center gap-3"
            style={{ color: "var(--text-muted)" }}
          >
            <span
              style={{
                display: "block",
                width: "36px",
                height: "1px",
                background: "var(--border-strong)",
              }}
            />
            <span style={{ fontSize: "0.75rem", letterSpacing: "0.04em" }}>
              Every day includes all of these
            </span>
            <span
              style={{
                display: "block",
                width: "36px",
                height: "1px",
                background: "var(--border-strong)",
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Feature cards region ─────────────────── */}
      {hasMounted && (
        isDesktop ? <StickyScrollSection /> : (
          <div className="px-6 pb-[clamp(80px,10vw,120px)]">
            <MobileCardStack />
          </div>
        )
      )}

      {/* Bottom padding for desktop (sticky section handles its own height) */}
      {hasMounted && isDesktop && (
        <div style={{ paddingBottom: "clamp(80px, 10vw, 120px)" }} />
      )}
    </section>
  );
}
