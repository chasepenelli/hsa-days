"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const phases = [
  {
    days: "Days 1–4",
    title: "The Shock",
    description:
      "Processing the diagnosis, understanding HSA, exploring treatment options, and telling the people who matter.",
    dotColor: "var(--terracotta)",
    labelColor: "var(--terracotta)",
    bgColor: "rgba(212,133,106,0.07)",
    borderColor: "rgba(212,133,106,0.25)",
    illustration: "/illustrations/home/home-journey-phase1.png",
    illustrationAlt: "Phone face-down with paw print stamp",
  },
  {
    days: "Days 5–10",
    title: "Building Ground",
    description:
      "Creating routines, supplements & nutrition, navigating good days and bad, and making your home safer.",
    dotColor: "var(--gold)",
    labelColor: "var(--gold)",
    bgColor: "rgba(196,162,101,0.07)",
    borderColor: "rgba(196,162,101,0.25)",
    illustration: "/illustrations/home/home-journey-phase2.png",
    illustrationAlt: "Coffee mug and dog leash",
  },
  {
    days: "Days 11–17",
    title: "The Emotions",
    description:
      "Confronting guilt, finding your support system, learning presence, the financial reality, and caring for other pets.",
    dotColor: "var(--sage-light)",
    labelColor: "var(--sage)",
    bgColor: "rgba(122,154,125,0.07)",
    borderColor: "rgba(122,154,125,0.25)",
    illustration: "/illustrations/home/home-journey-phase3.png",
    illustrationAlt: "Crumpled tissue beside a journal",
  },
  {
    days: "Days 18–24",
    title: "Going Deeper",
    description:
      "Processing anger, noticing the small things, having hard conversations, helping kids cope, and documenting the love.",
    dotColor: "var(--sage)",
    labelColor: "var(--sage)",
    bgColor: "rgba(91,123,94,0.07)",
    borderColor: "rgba(91,123,94,0.25)",
    illustration: "/illustrations/home/home-journey-phase4.png",
    illustrationAlt: "Pen resting on an open journal page",
  },
  {
    days: "Days 25–30",
    title: "Finding Meaning",
    description:
      "Self-care, legacy, gratitude in grief, community, and stepping into whatever comes next — with grace.",
    dotColor: "var(--sage-dark)",
    labelColor: "var(--sage-dark)",
    bgColor: "rgba(62,87,64,0.07)",
    borderColor: "rgba(62,87,64,0.25)",
    illustration: "/illustrations/home/home-journey-phase5.png",
    illustrationAlt: "Paw print and footprint side by side",
  },
];

export function JourneyTimeline() {
  const ref = useScrollReveal();

  return (
    <section
      id="journey"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      {/* Background ambient */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "-20%",
          left: "-10%",
          width: "600px",
          height: "600px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.07) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "10s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: "2s",
        }}
      />

      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold-text)" }}
          >
            The Journey
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-5"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            30 days.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              Five chapters of healing.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "560px",
              transitionDelay: "0.16s",
            }}
          >
            Each week builds on the last. You start with survival. You end with meaning.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:block">
          {/* The drawing line */}
          <div className="relative mb-3 h-[3px]">
            <div
              className="absolute inset-0 rounded-full opacity-10"
              style={{
                background:
                  "linear-gradient(to right, var(--terracotta), var(--gold), var(--sage-light), var(--sage), var(--sage-dark))",
              }}
            />
            <div
              className="timeline-line-h absolute inset-0 rounded-full"
              style={{
                background:
                  "linear-gradient(to right, var(--terracotta), var(--gold), var(--sage-light), var(--sage), var(--sage-dark))",
              }}
            />
          </div>

          {/* Dots and cards */}
          <div className="reveal-stagger grid grid-cols-5 gap-3">
            {phases.map((phase, i) => (
              <div key={i} className="flex flex-col items-center text-center pt-3">
                {/* Dot */}
                <div
                  className="w-4 h-4 rounded-full mb-5 transition-transform duration-300 hover:scale-125"
                  style={{
                    background: phase.dotColor,
                    boxShadow: `0 0 0 4px white, 0 0 0 6px ${phase.dotColor}40`,
                  }}
                />

                {/* Card */}
                <div
                  className="w-full rounded-xl p-5 text-left"
                  data-card
                  style={{
                    background: phase.bgColor,
                    border: `1px solid ${phase.borderColor}`,
                  }}
                >
                  {/* Phase spot illustration */}
                  <div
                    className="relative w-full mb-4"
                    style={{ aspectRatio: "1/1" }}
                  >
                    <Image
                      src={phase.illustration}
                      alt={phase.illustrationAlt}
                      fill
                      sizes="(max-width: 1100px) 20vw, 200px"
                      className="object-contain"
                      style={{ mixBlendMode: "multiply", opacity: 0.92 }}
                    />
                  </div>

                  <div
                    className="text-[0.62rem] font-bold uppercase tracking-[0.1em] mb-1.5"
                    style={{ color: phase.labelColor }}
                  >
                    {phase.days}
                  </div>
                  <h4
                    className="font-serif text-[0.95rem] font-semibold mb-1.5"
                    style={{ color: "var(--text)" }}
                  >
                    {phase.title}
                  </h4>
                  <p
                    className="text-[0.8rem] leading-relaxed"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {phase.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden">
          <div className="relative pl-10">
            {/* Vertical drawing line */}
            <div className="absolute top-0 bottom-0 left-4 w-[3px] rounded-full overflow-hidden">
              <div
                className="absolute inset-0 opacity-10 rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--terracotta), var(--gold), var(--sage-light), var(--sage), var(--sage-dark))",
                }}
              />
              <div
                className="timeline-line-v absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(to bottom, var(--terracotta), var(--gold), var(--sage-light), var(--sage), var(--sage-dark))",
                }}
              />
            </div>

            <div className="reveal-stagger flex flex-col gap-6">
              {phases.map((phase, i) => (
                <div key={i} className="relative">
                  {/* Dot */}
                  <div
                    className="absolute -left-[25px] top-5 w-4 h-4 rounded-full"
                    style={{
                      background: phase.dotColor,
                      boxShadow: `0 0 0 3px white, 0 0 0 5px ${phase.dotColor}40`,
                    }}
                  />

                  {/* Card */}
                  <div
                    className="rounded-xl p-5 transition-all duration-300"
                    style={{
                      background: phase.bgColor,
                      border: `1px solid ${phase.borderColor}`,
                    }}
                  >
                    <div className="flex items-start gap-4">
                      {/* Phase spot illustration — mobile */}
                      <div
                        className="relative flex-shrink-0"
                        style={{ width: "88px", height: "88px" }}
                      >
                        <Image
                          src={phase.illustration}
                          alt={phase.illustrationAlt}
                          fill
                          sizes="88px"
                          className="object-contain"
                          style={{ mixBlendMode: "multiply", opacity: 0.92 }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div
                          className="text-[0.62rem] font-bold uppercase tracking-[0.1em] mb-1"
                          style={{ color: phase.labelColor }}
                        >
                          {phase.days}
                        </div>
                        <h4
                          className="font-serif text-base font-semibold mb-1.5"
                          style={{ color: "var(--text)" }}
                        >
                          {phase.title}
                        </h4>
                        <p
                          className="text-[0.88rem] leading-relaxed"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {phase.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Link to full journey page */}
        <div className="reveal text-center mt-14" style={{ transitionDelay: "0.2s" }}>
          <Link
            href="/journey"
            className="inline-flex items-center gap-2 text-[0.88rem] font-medium no-underline px-5 py-2.5 rounded-full"
            style={{
              color: "var(--sage)",
              background: "rgba(91,123,94,0.06)",
              border: "1px solid rgba(91,123,94,0.15)",
              transition: "background var(--duration-fast) ease, border-color var(--duration-fast) ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "rgba(91,123,94,0.12)";
              e.currentTarget.style.borderColor = "rgba(91,123,94,0.25)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "rgba(91,123,94,0.06)";
              e.currentTarget.style.borderColor = "rgba(91,123,94,0.15)";
            }}
          >
            See the full journey
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="w-4 h-4"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
