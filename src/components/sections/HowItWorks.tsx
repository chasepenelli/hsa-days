"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Step data ── */
const steps = [
  {
    number: "01",
    label: "Step One",
    icon: "/illustrations/icons/icon-email-signup.png",
    color: "var(--sage)",
    colorHex: "#5B7B5E",
    title: "Sign up with your email",
    description:
      "No passwords, no accounts to remember. Just your email. We\u2019ll send a sign-in link whenever you want to come back.",
  },
  {
    number: "02",
    label: "Step Two",
    icon: "/illustrations/icons/icon-read-reflect.png",
    color: "var(--gold)",
    colorHex: "#C4A265",
    title: "Read, reflect, and journal",
    description:
      "Each day has a reflection, an activity, and a journaling prompt. Write your thoughts directly on the page \u2014 saved and private to you.",
  },
  {
    number: "03",
    label: "Step Three",
    icon: "/illustrations/icons/icon-morning-nudge.png",
    color: "var(--terracotta)",
    colorHex: "#D4856A",
    title: "A gentle nudge each morning",
    description:
      "A short email with the day\u2019s quote and a preview. One tap to open today\u2019s full page. Go at your own pace \u2014 there\u2019s no wrong speed.",
  },
];

const staggerOffsets = [0, 40, 80]; // px vertical offset per card (desktop)

/* ── Mini-mockup: Typing email input ── */
function EmailMockup() {
  const [typed, setTyped] = useState("");
  const full = "your@email.com";
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    let i = 0;
    intervalRef.current = setInterval(() => {
      i++;
      if (i <= full.length) {
        setTyped(full.slice(0, i));
      } else if (i > full.length + 8) {
        // pause then restart
        i = 0;
        setTyped("");
      }
    }, 90);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div aria-hidden="true" className="mt-5 px-3 pb-1">
      <div
        className="rounded-lg px-3 py-2 text-[0.78rem] font-sans relative"
        style={{
          background: "var(--cream)",
          borderBottom: "2px solid var(--gold)",
        }}
      >
        <span style={{ color: typed ? "var(--text)" : "var(--text-muted)", opacity: typed ? 1 : 0.5 }}>
          {typed || "your@email.com"}
        </span>
        <span
          className="inline-block w-[2px] h-[14px] ml-[1px] align-middle"
          style={{
            background: "var(--sage)",
            animation: "cursorBlink 1s step-end infinite",
          }}
        />
      </div>
      <div
        className="mt-2 inline-block rounded-full px-3 py-1 text-[0.68rem] font-semibold"
        style={{
          background: "var(--sage)",
          color: "white",
        }}
      >
        Start free &rarr;
      </div>
    </div>
  );
}

/* ── Mini-mockup: Journal snippet ── */
function JournalMockup() {
  return (
    <div aria-hidden="true" className="mt-5 px-3 pb-1">
      <div
        className="rounded-lg p-3 relative overflow-hidden"
        style={{
          background: "var(--cream)",
          backgroundImage:
            "repeating-linear-gradient(transparent, transparent 19px, rgba(196,162,101,0.15) 19px, rgba(196,162,101,0.15) 20px)",
          backgroundPosition: "0 6px",
          minHeight: 72,
        }}
      >
        {/* Prompt label */}
        <div
          className="text-[0.58rem] font-semibold uppercase tracking-[0.12em] mb-1.5"
          style={{ color: "var(--gold)" }}
        >
          Today&apos;s prompt
        </div>
        {/* Italic question */}
        <p
          className="font-serif italic text-[0.82rem] leading-snug mb-2.5"
          style={{ color: "var(--sage)" }}
        >
          What did you notice about your dog today?
        </p>
        {/* Blurred handwriting lines */}
        <div className="space-y-[6px]">
          <div className="h-[7px] rounded-full" style={{ background: "#c4c0b8", filter: "blur(3px)", width: "80%" }} />
          <div className="h-[7px] rounded-full" style={{ background: "#c4c0b8", filter: "blur(3px)", width: "55%" }} />
        </div>
        {/* Pencil icon */}
        <div className="absolute bottom-2 right-2">
          <Image
            src="/illustrations/icons/icon-pencil.png"
            alt=""
            width={18}
            height={18}
            style={{ transform: "rotate(15deg)", opacity: 0.4 }}
          />
        </div>
      </div>
    </div>
  );
}

/* ── Mini-mockup: Morning notification ── */
function NotificationMockup() {
  return (
    <div aria-hidden="true" className="mt-5 px-3 pb-1">
      <div
        className="rounded-lg p-3 flex items-start gap-2.5"
        style={{
          background: "white",
          border: "1px solid var(--border)",
        }}
      >
        {/* Avatar */}
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-[0.72rem] font-bold shrink-0"
          style={{ background: "rgba(91,123,94,0.12)", color: "var(--sage)" }}
        >
          H
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="font-serif text-[0.78rem] font-semibold truncate" style={{ color: "var(--text)" }}>
              Day 1: The Diagnosis
            </span>
            {/* "new" dot */}
            <span
              className="w-[7px] h-[7px] rounded-full shrink-0"
              style={{
                background: "var(--terracotta)",
                animation: "checkIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) 0.6s both",
              }}
            />
          </div>
          <div
            className="h-[7px] rounded-full mt-1.5"
            style={{ background: "var(--border)", width: "75%" }}
          />
        </div>
      </div>
    </div>
  );
}

const mockups = [EmailMockup, JournalMockup, NotificationMockup];

/* ── SVG Connector (desktop) ── */
function StepConnector() {
  return (
    <svg
      className="step-path hidden md:block absolute pointer-events-none"
      style={{
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "visible",
      }}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="stepGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#5B7B5E" />
          <stop offset="50%" stopColor="#C4A265" />
          <stop offset="100%" stopColor="#D4856A" />
        </linearGradient>
      </defs>
      <path
        d="M 16.5% 85% Q 33% 55%, 50% 62% T 83.5% 42%"
        fill="none"
        stroke="url(#stepGradient)"
        strokeWidth="1.5"
        strokeDasharray="5 5"
        opacity="0.35"
        style={{
          strokeDashoffset: 1200,
          transition: "stroke-dashoffset 1.4s cubic-bezier(0.22, 1, 0.36, 1) 0.4s",
        }}
      />
    </svg>
  );
}

/* ── Main component ── */
export function HowItWorks() {
  const ref = useScrollReveal();

  // Drive the SVG draw once .step-path gets is-visible
  useEffect(() => {
    const container = ref.current as HTMLElement | null;
    if (!container) return;
    const svg = container.querySelector<SVGElement>(".step-path");
    if (!svg) return;

    const pathEl = svg.querySelector("path");
    if (!pathEl) return;

    // Measure actual path length and set dasharray/offset accordingly
    const len = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = `5 5`;
    pathEl.style.strokeDashoffset = `${len}`;

    const observer = new MutationObserver(() => {
      if (svg.classList.contains("is-visible")) {
        pathEl.style.strokeDashoffset = "0";
        observer.disconnect();
      }
    });
    observer.observe(svg, { attributes: true, attributeFilter: ["class"] });

    return () => observer.disconnect();
  }, [ref]);

  return (
    <section
      id="how"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--warm-white)",
      }}
    >
      {/* ── Ambient background blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            left: "-5%", top: "10%",
            background: "radial-gradient(circle, rgba(91,123,94,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            left: "30%", top: "20%",
            background: "radial-gradient(circle, rgba(196,162,101,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 400, height: 400,
            right: "-5%", top: "30%",
            background: "radial-gradient(circle, rgba(212,133,106,0.05) 0%, transparent 70%)",
          }}
        />
        {/* Floating decorative illustrations */}
        <Image
          src="/illustrations/icons/icon-paw-print.png"
          alt=""
          width={100}
          height={100}
          className="absolute hidden md:block animate-drift-slow"
          style={{ top: "8%", right: "6%", opacity: 0.035 }}
        />
        <Image
          src="/illustrations/icons/icon-heart.png"
          alt=""
          width={90}
          height={90}
          className="absolute hidden md:block animate-drift-slow"
          style={{ bottom: "12%", left: "4%", opacity: 0.03, animationDelay: "4s" }}
        />
      </div>

      <div className="relative max-w-[1100px] mx-auto">

        {/* ── Header ── */}
        <div className="text-center mb-16">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            How It Works
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            All you have to do{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              is show up.
            </em>
          </h2>

          {/* Ornament divider */}
          <div className="reveal flex items-center justify-center gap-3 mt-5" style={{ transitionDelay: "0.16s" }}>
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to right, transparent, var(--gold-light))" }}
            />
            <Image
              src="/illustrations/icons/icon-flower-ornament.png"
              alt=""
              width={14}
              height={14}
              style={{ opacity: 0.5 }}
            />
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to left, transparent, var(--gold-light))" }}
            />
          </div>
        </div>

        {/* ── Cards grid with SVG connector ── */}
        <div className="relative pb-[20px] md:pb-[100px]">
          <StepConnector />

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7">
            {steps.map((step, i) => {
              const Mockup = mockups[i];
              return (
                <div
                  key={i}
                  className="step-card-wrapper"
                  style={{
                    // stagger offset applied only on md+ via CSS below
                    "--step-offset": `${staggerOffsets[i]}px`,
                  } as React.CSSProperties}
                >
                  <div
                    className="relative paper-texture rounded-2xl p-6 transition-all duration-300 h-full flex flex-col"
                    style={{
                      background: "white",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = `0 14px 36px ${step.colorHex}18`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget;
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                    }}
                  >
                    {/* Ghost numeral */}
                    <span
                      className="absolute top-3 right-4 font-serif font-bold select-none pointer-events-none"
                      style={{
                        fontSize: "7rem",
                        lineHeight: 1,
                        color: step.colorHex,
                        opacity: 0.055,
                      }}
                      aria-hidden="true"
                    >
                      {step.number}
                    </span>

                    {/* Icon */}
                    <div className="mb-4">
                      <Image
                        src={step.icon}
                        alt=""
                        width={72}
                        height={72}
                        style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                      />
                    </div>

                    {/* Step label */}
                    <div
                      className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-2"
                      style={{ color: step.colorHex }}
                    >
                      {step.label}
                    </div>

                    {/* Title */}
                    <h3
                      className="font-serif text-[1.2rem] font-semibold mb-2"
                      style={{ color: "var(--text)", lineHeight: 1.3 }}
                    >
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p
                      className="text-[0.91rem] leading-relaxed flex-1"
                      style={{ color: "var(--text-muted)" }}
                    >
                      {step.description}
                    </p>

                    {/* Mini mockup */}
                    <div className="mt-auto">
                      <Mockup />
                    </div>

                    {/* Closing ornament rule */}
                    <div className="flex justify-center mt-5">
                      <div
                        className="h-[1px] w-[32px] rounded-full"
                        style={{
                          background: step.colorHex,
                          opacity: 0.4,
                        }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── Closing beat ── */}
        <div className="reveal text-center mt-8" style={{ transitionDelay: "0.2s" }}>
          {/* Gold ornament divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to right, transparent, var(--gold-light))" }}
            />
            <Image
              src="/illustrations/icons/icon-flower-ornament.png"
              alt=""
              width={14}
              height={14}
              style={{ opacity: 0.5 }}
            />
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to left, transparent, var(--gold-light))" }}
            />
          </div>

          <p
            className="font-serif font-semibold"
            style={{
              fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)",
              lineHeight: 1.4,
              color: "var(--text)",
            }}
          >
            Show up. Read. Write.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              Breathe.
            </em>
          </p>
          <p
            className="mt-3 text-[0.88rem]"
            style={{ color: "var(--text-muted)" }}
          >
            No app to download. No subscription. Just you and your dog.
          </p>
        </div>
      </div>
    </section>
  );
}
