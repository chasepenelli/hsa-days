"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

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
    icon: "/illustrations/icons/icon-journal.webp",
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.09)",
    borderColor: "rgba(91,123,94,0.20)",
    title: "30 Daily Reflections",
    description:
      "Honest, grounding writing that meets you where you are \u2014 not clinical, not cold, just real.",
    span: "md:col-span-2",
    preview: "reflection" as const,
  },
  {
    icon: "/illustrations/icons/icon-pencil.webp",
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.09)",
    borderColor: "rgba(196,162,101,0.22)",
    title: "Private Journaling",
    description:
      "A writing prompt each day with a journal built right into the page. Only you can see your entries.",
    span: "",
    preview: "journal" as const,
  },
  {
    icon: "/illustrations/icons/icon-dog-person.webp",
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.09)",
    borderColor: "rgba(212,133,106,0.22)",
    title: "Activities With Your Dog",
    description:
      "Simple, meaningful things to do together. Not bucket-list pressure \u2014 just intentional moments.",
    span: "",
    preview: "activity" as const,
  },
  {
    icon: "/illustrations/icons/icon-lightbulb.webp",
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.09)",
    borderColor: "rgba(91,123,94,0.20)",
    title: "Practical Guides",
    description:
      "Supplements, nutrition, house-proofing \u2014 the stuff you actually need but can\u2019t find in one place.",
    span: "",
    preview: "practical" as const,
  },
  {
    icon: "/illustrations/icons/icon-calendar.webp",
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.09)",
    borderColor: "rgba(196,162,101,0.22)",
    title: "Morning Emails",
    description:
      "A gentle nudge each morning with the day\u2019s quote and a preview. One tap to open today\u2019s page.",
    span: "",
    preview: "email" as const,
  },
  {
    icon: "/illustrations/icons/icon-community.webp",
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.09)",
    borderColor: "rgba(212,133,106,0.22)",
    title: "Community Stories",
    description:
      "You\u2019re not the first to walk this road. Read stories from other HSA families \u2014 and share yours when ready.",
    span: "md:col-span-2",
    preview: "community" as const,
  },
];

/* ── Mini preview components ──────────────────────────── */

function ReflectionPreview() {
  return (
    <div
      className="mt-5 relative overflow-hidden rounded-lg"
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
      {/* Fade out to match card bg */}
      <div
        className="absolute bottom-0 left-0 right-0 h-10 pointer-events-none"
        style={{
          background:
            "linear-gradient(transparent, var(--cream))",
        }}
      />
    </div>
  );
}

function JournalPreview() {
  return (
    <div className="mt-5">
      {/* Prompt chip */}
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
      {/* Lined writing area — 3 full lines at 32px per line */}
      <div
        className="mt-2 rounded-lg journal-lined"
        style={{
          height: "100px",
          border: "1px solid var(--border)",
          background: "white",
        }}
      >
        {/* Blinking cursor line */}
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
      className="mt-5 rounded-lg overflow-hidden flex items-stretch gap-0"
      style={{
        border: "1px solid rgba(212,133,106,0.20)",
        background: "rgba(212,133,106,0.05)",
      }}
    >
      {/* Left content */}
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
      {/* Right illustration */}
      <div
        className="flex-shrink-0 relative"
        style={{ width: "72px" }}
      >
        <Image
          src="/illustrations/days/day01-activity.webp"
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
      className="mt-5 rounded-lg px-3.5 py-3"
      style={{
        background: "rgba(196,162,101,0.07)",
        border: "1px solid rgba(196,162,101,0.22)",
      }}
    >
      <div className="flex items-start gap-2.5">
        {/* Gold bullet ornament */}
        <div
          className="flex-shrink-0 mt-0.5"
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

function EmailPreview() {
  return (
    <div
      className="mt-5 rounded-xl overflow-hidden"
      style={{
        border: "1px solid var(--border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.05)",
      }}
    >
      {/* Email chrome header */}
      <div
        className="px-3.5 py-2.5 flex items-center gap-2.5"
        style={{
          background: "var(--cream)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        {/* Sender avatar */}
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
      {/* Email body */}
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
    <div className="mt-5 grid grid-cols-2 gap-2.5">
      {stories.map((story) => (
        <div
          key={story.name}
          className="rounded-xl px-3.5 py-3 flex flex-col justify-between gap-2"
          style={{
            background: "rgba(212,133,106,0.06)",
            border: "1px solid rgba(212,133,106,0.18)",
          }}
        >
          {/* Quote mark accent */}
          <div
            className="font-serif leading-none select-none"
            style={{ fontSize: "1.4rem", color: "rgba(212,133,106,0.35)", lineHeight: 1 }}
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
  email: EmailPreview,
  community: CommunityPreview,
} as const;

/* ── Main section ─────────────────────────────────────── */

export function SeeInside() {
  const ref = useScrollReveal();

  return (
    <section
      id="preview"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        /* Slightly warmer than the surrounding warm-white sections */
        background: "var(--cream)",
      }}
    >
      {/* Ambient radial glow — top left */}
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
      {/* Ambient radial glow — bottom right */}
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

      <div className="relative max-w-[1100px] mx-auto">
        {/* ── Section header ─────────────────────── */}
        <div className="text-center mb-14">
          {/* Eyebrow with flanking ornamental rules */}
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
            <span
              className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]"
            >
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
            {/* Right-side illustration — luminosity blend keeps it readable */}
            <div className="absolute inset-0 flex items-end justify-end pointer-events-none overflow-hidden">
              <Image
                src="/illustrations/days/day01-header.webp"
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

            {/* Subtle left-edge vignette to keep text readable */}
            <div
              className="absolute inset-y-0 left-0 w-[55%] pointer-events-none"
              style={{
                background:
                  "linear-gradient(to right, rgba(62,87,64,0.35) 0%, transparent 100%)",
              }}
            />

            <div className="relative px-8 py-7 md:px-10 md:py-8">
              {/* Meta row */}
              <div
                className="flex items-center gap-2 mb-3"
                style={{ opacity: 0.72, fontSize: "0.7rem", letterSpacing: "0.1em" }}
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
              {/* Top gold accent bar */}
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
              {/* Opening quotation mark */}
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
          style={{ transitionDelay: "0.1s" }}
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
            <span
              style={{ fontSize: "0.75rem", letterSpacing: "0.04em" }}
            >
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

        {/* ── Feature bento grid ─────────────────── */}
        <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {features.map((feature, i) => {
            const Preview = PREVIEW_MAP[feature.preview];
            return (
              <div
                key={i}
                className={`group flex flex-col rounded-2xl p-6 transition-all duration-300 ${feature.span}`}
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                  // Hover is handled via CSS below via group/tailwind
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor = feature.borderColor;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 1px 4px rgba(0,0,0,0.03)";
                  (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
                }}
              >
                {/* Icon */}
                <div className="mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Image
                    src={feature.icon}
                    alt=""
                    width={128}
                    height={128}
                    style={{ objectFit: "contain" }}
                  />
                </div>

                <h3
                  className="font-serif font-semibold mb-1.5"
                  style={{ fontSize: "1.02rem", color: "var(--text)", lineHeight: 1.3 }}
                >
                  {feature.title}
                </h3>
                <p
                  className="text-[0.84rem] leading-relaxed"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feature.description}
                </p>

                {/* Divider before preview */}
                <div
                  className="my-4"
                  style={{
                    height: "1px",
                    background:
                      "linear-gradient(to right, var(--border), transparent)",
                  }}
                />

                {/* Mini Day 1 preview */}
                <div className="mt-0 flex-1">
                  <Preview />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
