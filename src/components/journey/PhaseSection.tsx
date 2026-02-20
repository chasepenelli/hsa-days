import Image from "next/image";
import { DayPreviewCard } from "./DayPreviewCard";

interface DayPreview {
  day_number: number;
  title: string;
  subtitle: string;
  category: string;
  quote: string | null;
  quote_author: string | null;
}

interface PhaseConfig {
  number: number;
  title: string;
  days: string;
  description: string;
  color: string;
  labelColor: string;
  bgColor: string;
  borderColor: string;
  dotColor: string;
  illustration: string;
  illustrationAlt: string;
}

interface PhaseSectionProps {
  phase: PhaseConfig;
  days: DayPreview[];
  isEven: boolean;
}

export function PhaseSection({ phase, days, isEven }: PhaseSectionProps) {
  const phaseLabels = ["ONE", "TWO", "THREE", "FOUR", "FIVE"];
  const phaseLabel = phaseLabels[phase.number - 1] || String(phase.number);

  return (
    <section
      className="reveal relative"
      style={{
        background: phase.bgColor,
        paddingTop: "clamp(52px, 7vw, 88px)",
        paddingBottom: "clamp(52px, 7vw, 88px)",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        <div
          className={`flex flex-col ${
            isEven ? "lg:flex-row-reverse" : "lg:flex-row"
          } gap-10 lg:gap-20 items-start`}
        >
          {/* ── Illustration side ── */}
          {/* Mobile: constrained width centered; Desktop: fixed sidebar column */}
          <div className="w-full lg:w-[320px] shrink-0">
            <div
              className="mx-auto lg:mx-0 lg:sticky lg:top-28"
              style={{ maxWidth: "280px" }}
            >
              {/* Phase number — large editorial numeral, decorative */}
              <div
                className="font-serif font-semibold leading-none mb-2 select-none"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4rem)",
                  color: phase.labelColor,
                  opacity: 0.13,
                  letterSpacing: "-0.02em",
                }}
                aria-hidden="true"
              >
                {phase.number}
              </div>

              {/* Illustration — no frame */}
              <div
                className="relative w-full"
                style={{ aspectRatio: "4/5" }}
              >
                <Image
                  src={phase.illustration}
                  alt={phase.illustrationAlt}
                  fill
                  sizes="(max-width: 1024px) 280px, 320px"
                  className="object-contain"
                  style={{ mixBlendMode: "multiply", opacity: 0.88 }}
                />
              </div>

              {/* Day range pill */}
              <div
                className="mt-3 inline-flex items-center gap-1.5 text-[0.6rem] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full"
                style={{
                  color: phase.labelColor,
                  background: phase.bgColor,
                  border: `1px solid ${phase.borderColor}`,
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "6px",
                    height: "6px",
                    borderRadius: "50%",
                    background: phase.dotColor,
                    flexShrink: 0,
                  }}
                />
                {phase.days}
              </div>
            </div>
          </div>

          {/* ── Content side ── */}
          <div className="flex-1 min-w-0">
            {/* Phase badge */}
            <div
              className="text-[0.62rem] font-bold uppercase tracking-[0.16em] mb-2"
              style={{ color: phase.labelColor, opacity: 0.8 }}
            >
              Phase {phaseLabel}
            </div>

            <h2
              className="font-serif font-semibold tracking-tight mb-4"
              style={{
                fontSize: "clamp(1.7rem, 3.5vw, 2.3rem)",
                lineHeight: 1.2,
                color: "var(--text)",
              }}
            >
              {phase.title}
            </h2>

            {/* Thin accent rule under heading */}
            <div
              style={{
                width: "40px",
                height: "2px",
                borderRadius: "1px",
                background: phase.labelColor,
                opacity: 0.4,
                marginBottom: "16px",
              }}
            />

            <p
              className="text-[0.95rem] leading-relaxed mb-8"
              style={{
                color: "var(--text-muted)",
                maxWidth: "500px",
                lineHeight: 1.7,
              }}
            >
              {phase.description}
            </p>

            {/* Day count label */}
            <div
              className="text-[0.65rem] font-semibold uppercase tracking-[0.12em] mb-3"
              style={{ color: "var(--text-muted)", opacity: 0.5 }}
            >
              {days.length} {days.length === 1 ? "day" : "days"} in this phase
            </div>

            {/* Day cards — staggered reveal */}
            <div className="reveal-stagger flex flex-col gap-2.5">
              {days.map((day) => (
                <DayPreviewCard
                  key={day.day_number}
                  dayNumber={day.day_number}
                  title={day.title}
                  subtitle={day.subtitle}
                  category={day.category}
                  quote={day.quote}
                  quoteAuthor={day.quote_author}
                  phaseColor={phase.labelColor}
                  phaseDotColor={phase.dotColor}
                  phaseBgColor={phase.bgColor}
                  phaseBorderColor={phase.borderColor}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
