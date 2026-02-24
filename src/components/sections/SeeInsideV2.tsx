"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Day 1 content (matches Supabase) ──────────────────── */
const DAY1 = {
  title: "The Word",
  subtitle: "Giving yourself permission to feel",
  quote: "The wound is the place where the Light enters you.",
  quoteAuthor: "Rumi",
  reflection:
    "I keep staring at him sleeping on the couch like nothing happened. Like the vet didn\u2019t just say those words. Like everything isn\u2019t different now. But it is. And I don\u2019t know what to do with that yet.",
  activityTitle: "Tonight",
  activityDescription:
    "Put your phone in another room. Sit on the floor next to them. Don\u2019t try to be strong. Just be there.",
  journalPrompt:
    "What are you feeling right now? There are no wrong answers...",
  practicalTitle: "Start a Notes File",
  practicalTip:
    "Open a note on your phone. Write down your dog\u2019s diagnosis details, the vet\u2019s name, and any medications. You\u2019ll be glad you did.",
};

/* ── Feature inventory (quiet footer) ──────────────────── */
const inventory = [
  { icon: "/illustrations/icons/icon-journal.png", label: "Daily reflections" },
  { icon: "/illustrations/icons/icon-pencil.png", label: "Private journaling" },
  { icon: "/illustrations/icons/icon-dog-person.png", label: "Activities together" },
  { icon: "/illustrations/icons/icon-lightbulb.png", label: "Practical guides" },
  { icon: "/illustrations/icons/icon-calendar.png", label: "Morning emails" },
  { icon: "/illustrations/icons/icon-community.png", label: "Community stories" },
];

/* ── Main Section ──────────────────────────────────────── */

export function SeeInsideV2() {
  const ref = useScrollReveal();

  // Split reflection into first letter + rest for drop cap
  const firstLetter = DAY1.reflection[0];
  const restOfReflection = DAY1.reflection.slice(1);

  return (
    <section
      id="preview"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-10%",
          right: "-12%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.08) 0%, transparent 68%)",
          animationName: "ambientGlow",
          animationDuration: "10s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      {/* ── Narrow column — like a book page ──────── */}
      <div className="relative max-w-[640px] mx-auto">

        {/* Eyebrow */}
        <div
          className="reveal text-center mb-5"
          style={{ color: "var(--gold)" }}
        >
          <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em]">
            See Inside
          </span>
        </div>

        {/* Heading */}
        <h2
          className="reveal font-serif font-semibold text-center mb-16"
          style={{
            fontSize: "clamp(2rem, 5vw, 2.8rem)",
            lineHeight: 1.2,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            transitionDelay: "0.08s",
          }}
        >
          This is Day 1.
        </h2>

        {/* ── The Quote ───────────────────────────── */}
        <div
          className="reveal text-center mb-16"
          style={{ transitionDelay: "0.16s" }}
        >
          {/* Decorative quote mark */}
          <div
            className="font-serif select-none leading-none mb-2"
            style={{
              fontSize: "4rem",
              color: "rgba(196,162,101,0.20)",
              lineHeight: 0.6,
            }}
            aria-hidden="true"
          >
            &ldquo;
          </div>
          <p
            className="font-serif italic mx-auto"
            style={{
              fontSize: "clamp(1.3rem, 3vw, 1.8rem)",
              lineHeight: 1.65,
              color: "var(--text)",
              maxWidth: "520px",
            }}
          >
            {DAY1.quote}
          </p>
          <div
            className="mt-4"
            style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
          >
            &mdash; {DAY1.quoteAuthor}
          </div>
        </div>

        {/* Gold divider */}
        <div
          className="reveal mx-auto mb-16"
          style={{
            width: "64px",
            height: "2px",
            borderRadius: "1px",
            background:
              "linear-gradient(to right, transparent, var(--gold), transparent)",
            transitionDelay: "0.24s",
          }}
        />

        {/* ── The Reflection (with drop cap) ──────── */}
        <div
          className="reveal relative mb-6"
          style={{ transitionDelay: "0.32s" }}
        >
          <p
            className="font-serif"
            style={{
              fontSize: "clamp(1.05rem, 2.2vw, 1.15rem)",
              lineHeight: 1.85,
              color: "var(--text)",
            }}
          >
            {/* Drop cap */}
            <span
              className="font-serif font-semibold float-left"
              style={{
                fontSize: "3.4rem",
                lineHeight: 0.8,
                color: "var(--sage)",
                marginRight: "8px",
                marginTop: "6px",
              }}
            >
              {firstLetter}
            </span>
            {restOfReflection}
          </p>
        </div>

        {/* Fade-out + continuation whisper */}
        <div
          className="reveal text-center mb-16"
          style={{ transitionDelay: "0.36s" }}
        >
          <p
            className="font-serif italic text-[0.88rem]"
            style={{ color: "var(--text-muted)", opacity: 0.7 }}
          >
            ...the reflection continues inside.
          </p>
        </div>

        {/* ── The Activity ────────────────────────── */}
        <div
          className="reveal mb-12"
          style={{ transitionDelay: "0.4s" }}
        >
          <div
            style={{
              borderLeft: "2.5px solid var(--terracotta)",
              paddingLeft: "20px",
            }}
          >
            <div
              className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold mb-2"
              style={{ color: "var(--terracotta)" }}
            >
              {DAY1.activityTitle}
            </div>
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.1rem)",
                lineHeight: 1.75,
                color: "var(--text)",
              }}
            >
              {DAY1.activityDescription}
            </p>
          </div>
        </div>

        {/* ── The Journal Prompt ──────────────────── */}
        <div
          className="reveal mb-12"
          style={{ transitionDelay: "0.44s" }}
        >
          <div
            className="rounded-xl"
            style={{
              border: "1.5px dashed rgba(196,162,101,0.40)",
              background: "rgba(196,162,101,0.04)",
              padding: "24px 28px",
              transform: "rotate(-0.3deg)",
            }}
          >
            <p
              className="font-serif italic"
              style={{
                fontSize: "clamp(1rem, 2vw, 1.08rem)",
                lineHeight: 1.65,
                color: "var(--text-muted)",
              }}
            >
              {DAY1.journalPrompt}
            </p>
            {/* Blinking cursor */}
            <div
              className="mt-3"
              style={{
                width: "2px",
                height: "16px",
                background: "rgba(91,123,94,0.5)",
                borderRadius: "1px",
                animationName: "cursorBlink",
                animationDuration: "1s",
                animationTimingFunction: "step-end",
                animationIterationCount: "infinite",
              }}
            />
          </div>
        </div>

        {/* ── The Practical Tip ──────────────────── */}
        <div
          className="reveal mb-16"
          style={{ transitionDelay: "0.48s" }}
        >
          <div
            className="rounded-lg"
            style={{
              background: "rgba(196,162,101,0.06)",
              border: "1px solid rgba(196,162,101,0.18)",
              padding: "20px 24px",
            }}
          >
            <div
              className="text-[0.68rem] uppercase tracking-[0.14em] font-semibold mb-2"
              style={{ color: "var(--gold)" }}
            >
              {DAY1.practicalTitle}
            </div>
            <p
              className="text-[0.95rem] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              {DAY1.practicalTip}
            </p>
          </div>
        </div>

        {/* ── Gold divider before inventory ───────── */}
        <div
          className="reveal mx-auto mb-10"
          style={{
            width: "64px",
            height: "2px",
            borderRadius: "1px",
            background:
              "linear-gradient(to right, transparent, var(--gold), transparent)",
            transitionDelay: "0.52s",
          }}
        />

        {/* ── Feature inventory (quiet) ──────────── */}
        <div
          className="reveal mb-10"
          style={{ transitionDelay: "0.56s" }}
        >
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3">
            {inventory.map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2"
                style={{ opacity: 0.55 }}
              >
                <Image
                  src={item.icon}
                  alt=""
                  width={18}
                  height={18}
                  style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                />
                <span
                  className="text-[0.78rem]"
                  style={{ color: "var(--text-muted)", whiteSpace: "nowrap" }}
                >
                  {item.label}
                </span>
              </div>
            ))}
          </div>
          <p
            className="font-serif italic text-center mt-4"
            style={{
              fontSize: "0.88rem",
              color: "var(--text-muted)",
              opacity: 0.65,
            }}
          >
            Every day includes all of these. 30 days total.
          </p>
        </div>

        {/* ── Closing line ────────────────────────── */}
        <div
          className="reveal text-center"
          style={{ transitionDelay: "0.6s" }}
        >
          <p
            className="font-serif italic"
            style={{
              fontSize: "clamp(1rem, 2vw, 1.1rem)",
              lineHeight: 1.65,
              color: "var(--text)",
              opacity: 0.8,
            }}
          >
            Written by someone who walked this road.
          </p>
        </div>
      </div>
    </section>
  );
}
