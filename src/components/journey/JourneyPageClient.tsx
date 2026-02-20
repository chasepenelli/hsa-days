"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { PhaseSection } from "./PhaseSection";
import { JourneyCTA } from "./JourneyCTA";

interface DayPreview {
  day_number: number;
  title: string;
  subtitle: string;
  category: string;
  quote: string | null;
  quote_author: string | null;
}

const PHASES = [
  {
    number: 1,
    title: "The Shock",
    days: "Days 1\u20134",
    dayRange: [1, 4],
    description:
      "Processing the diagnosis, understanding HSA, exploring treatment options, and telling the people who matter.",
    color: "var(--terracotta)",
    labelColor: "var(--terracotta)",
    bgColor: "rgba(212,133,106,0.05)",
    borderColor: "rgba(212,133,106,0.25)",
    dotColor: "var(--terracotta)",
    illustration: "/illustrations/home/home-journey-phase1.png",
    illustrationAlt: "Phone face-down with paw print stamp",
  },
  {
    number: 2,
    title: "Building Ground",
    days: "Days 5\u201310",
    dayRange: [5, 10],
    description:
      "Creating routines, supplements & nutrition, navigating good days and bad, and making your home safer.",
    color: "var(--gold)",
    labelColor: "var(--gold)",
    bgColor: "rgba(196,162,101,0.05)",
    borderColor: "rgba(196,162,101,0.25)",
    dotColor: "var(--gold)",
    illustration: "/illustrations/home/home-journey-phase2.png",
    illustrationAlt: "Coffee mug and dog leash",
  },
  {
    number: 3,
    title: "The Emotions",
    days: "Days 11\u201317",
    dayRange: [11, 17],
    description:
      "Confronting guilt, finding your support system, learning presence, the financial reality, and caring for other pets.",
    color: "var(--sage-light)",
    labelColor: "var(--sage)",
    bgColor: "rgba(122,154,125,0.05)",
    borderColor: "rgba(122,154,125,0.25)",
    dotColor: "var(--sage-light)",
    illustration: "/illustrations/home/home-journey-phase3.png",
    illustrationAlt: "Crumpled tissue beside a journal",
  },
  {
    number: 4,
    title: "Going Deeper",
    days: "Days 18\u201324",
    dayRange: [18, 24],
    description:
      "Processing anger, noticing the small things, having hard conversations, helping kids cope, and documenting the love.",
    color: "var(--sage)",
    labelColor: "var(--sage)",
    bgColor: "rgba(91,123,94,0.05)",
    borderColor: "rgba(91,123,94,0.25)",
    dotColor: "var(--sage)",
    illustration: "/illustrations/home/home-journey-phase4.png",
    illustrationAlt: "Pen resting on an open journal page",
  },
  {
    number: 5,
    title: "Finding Meaning",
    days: "Days 25\u201330",
    dayRange: [25, 30],
    description:
      "Self-care, legacy, gratitude in grief, community, and stepping into whatever comes next \u2014 with grace.",
    color: "var(--sage-dark)",
    labelColor: "var(--sage-dark)",
    bgColor: "rgba(62,87,64,0.05)",
    borderColor: "rgba(62,87,64,0.25)",
    dotColor: "var(--sage-dark)",
    illustration: "/illustrations/home/home-journey-phase5.png",
    illustrationAlt: "Paw print and footprint side by side",
  },
];

interface JourneyPageClientProps {
  days: DayPreview[];
}

export function JourneyPageClient({ days }: JourneyPageClientProps) {
  const ref = useScrollReveal();

  function getDaysForPhase(range: number[]): DayPreview[] {
    return days.filter(
      (d) => d.day_number >= range[0] && d.day_number <= range[1]
    );
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="min-h-screen"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ─── Hero ─── */}
      <section
        className="relative overflow-hidden text-center"
        style={{
          paddingTop: "clamp(96px, 12vw, 156px)",
          paddingBottom: "clamp(56px, 7vw, 88px)",
          paddingLeft: "24px",
          paddingRight: "24px",
          background:
            "linear-gradient(to bottom, var(--cream) 0%, var(--warm-white) 100%)",
        }}
      >
        {/* Ambient background orb */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(196,162,101,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[640px] mx-auto relative z-10">
          {/* Eyebrow label */}
          <div
            className="reveal inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-5"
            style={{ color: "var(--gold)" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.6,
                verticalAlign: "middle",
              }}
            />
            The Journey
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.6,
                verticalAlign: "middle",
              }}
            />
          </div>

          <h1
            className="reveal font-serif font-semibold tracking-tight mb-5"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.2rem)",
              lineHeight: 1.2,
              color: "var(--text)",
              transitionDelay: "0.08s",
            }}
          >
            30 days.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              Five phases of healing.
            </em>
          </h1>

          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto mb-10"
            style={{
              color: "var(--text-muted)",
              maxWidth: "460px",
              transitionDelay: "0.16s",
            }}
          >
            Each phase builds on the last. You start with survival. You end with
            meaning. There&rsquo;s no right way through &mdash; only your way.
          </p>

          {/* Emotional arc gradient bar */}
          <div
            className="reveal mx-auto"
            style={{
              maxWidth: "420px",
              transitionDelay: "0.24s",
            }}
          >
            {/* Phase dot labels — above the bar */}
            <div
              className="hidden sm:flex justify-between mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.1em]"
              style={{ color: "var(--text-muted)", opacity: 0.55 }}
            >
              <span>Shock</span>
              <span>Ground</span>
              <span>Emotions</span>
              <span>Depth</span>
              <span>Meaning</span>
            </div>

            {/* Gradient progress bar */}
            <div
              className="relative h-[5px] rounded-full"
              style={{
                background: "rgba(0,0,0,0.06)",
              }}
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(to right, var(--terracotta), var(--gold), var(--sage-light), var(--sage), var(--sage-dark))",
                }}
              />
            </div>

            {/* Phase marker dots on the bar */}
            <div
              className="hidden sm:flex justify-between mt-[-3px] px-[2px]"
              aria-hidden="true"
            >
              {[
                "var(--terracotta)",
                "var(--gold)",
                "var(--sage-light)",
                "var(--sage)",
                "var(--sage-dark)",
              ].map((color, i) => (
                <div
                  key={i}
                  style={{
                    width: "9px",
                    height: "9px",
                    borderRadius: "50%",
                    background: color,
                    border: "2px solid var(--warm-white)",
                    boxShadow: `0 0 0 1px ${color}`,
                    marginTop: "-2px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Phase Sections ─── */}
      {PHASES.map((phase, i) => (
        <div key={phase.number}>
          {/* Thin ornamental rule between phases (not before first) */}
          {i > 0 && (
            <div
              aria-hidden="true"
              style={{
                height: "1px",
                background: `linear-gradient(to right, transparent, ${phase.borderColor}, transparent)`,
                margin: "0 auto",
                maxWidth: "1100px",
                paddingLeft: "24px",
                paddingRight: "24px",
              }}
            />
          )}

          <PhaseSection
            phase={phase}
            days={getDaysForPhase(phase.dayRange)}
            isEven={i % 2 === 1}
          />

          {/* Inline CTAs after Phase 2 and Phase 4 */}
          {(phase.number === 2 || phase.number === 4) && (
            <JourneyCTA variant="inline" />
          )}
        </div>
      ))}

      {/* ─── Final CTA ─── */}
      <JourneyCTA variant="full" />
    </div>
  );
}
