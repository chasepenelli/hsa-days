import Image from "next/image";

const PHASES = [
  {
    title: "The Shock",
    days: "Days 1–4",
    description: "Permission to feel. Guided reflections, your first journal entries, and practical next steps.",
    color: "var(--terracotta)",
    illustration: "/illustrations/home/home-journey-phase1.webp",
    alt: "Phone face-down with paw print stamp",
  },
  {
    title: "Building Ground",
    days: "Days 5–10",
    description: "Finding your footing. Daily routines, supplement guides, feeding tips, and making home safer.",
    color: "var(--gold)",
    illustration: "/illustrations/home/home-journey-phase2.webp",
    alt: "Coffee mug and dog leash",
  },
  {
    title: "The Emotions",
    days: "Days 11–17",
    description: "Confronting guilt, anger, and unsolicited advice. A video activity, building a care routine, finding your people.",
    color: "var(--sage-light)",
    illustration: "/illustrations/home/home-journey-phase3.webp",
    alt: "Crumpled tissue beside a journal",
  },
  {
    title: "Going Deeper",
    days: "Days 18–24",
    description: "Hard conversations. A paw print project, a slow walk, writing a letter, documenting what matters.",
    color: "var(--sage)",
    illustration: "/illustrations/home/home-journey-phase4.webp",
    alt: "Pen resting on an open journal page",
  },
  {
    title: "Finding Meaning",
    days: "Days 25–30",
    description: "Gratitude, legacy, and what comes next. Reflecting on what they taught you and stepping forward.",
    color: "var(--sage-dark)",
    illustration: "/illustrations/home/home-journey-phase5.webp",
    alt: "Paw print and footprint side by side",
  },
];

export function JourneyArcBar() {
  return (
    <div>
      {/* Gradient bar */}
      <div className="reveal mx-auto" style={{ maxWidth: "480px" }}>
        {/* Phase labels */}
        <div
          className="flex justify-between mb-2 text-[0.6rem] font-semibold uppercase tracking-[0.1em]"
          style={{ color: "var(--text-muted)", opacity: 0.55 }}
        >
          <span>Shock</span>
          <span>Ground</span>
          <span>Emotions</span>
          <span>Depth</span>
          <span>Meaning</span>
        </div>

        {/* Bar */}
        <div
          className="relative h-[6px] rounded-full"
          style={{ background: "rgba(0,0,0,0.06)" }}
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(to right, var(--terracotta), var(--gold), var(--sage-light), var(--sage), var(--sage-dark))",
            }}
          />
        </div>

        {/* Phase dots */}
        <div
          className="flex justify-between mt-[-4px] px-[2px]"
          aria-hidden="true"
        >
          {PHASES.map((phase, i) => (
            <div
              key={i}
              style={{
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                background: phase.color,
                border: "2.5px solid var(--warm-white)",
                boxShadow: `0 0 0 1px ${phase.color}`,
                marginTop: "-4px",
              }}
            />
          ))}
        </div>
      </div>

      {/* Phase vignettes — centered, vertical */}
      <div className="mt-14 mx-auto" style={{ maxWidth: "400px" }}>
        <div className="space-y-12">
          {PHASES.map((phase, i) => (
            <div
              key={i}
              className="reveal flex flex-col items-center text-center"
              style={{ transitionDelay: `${i * 0.07}s` }}
            >
              {/* Illustration */}
              <div
                className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl overflow-hidden"
                style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}
              >
                <Image
                  src={phase.illustration}
                  alt={phase.alt}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>

              {/* Color dot */}
              <div
                className="mt-3 mb-1"
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: phase.color,
                }}
              />

              {/* Title */}
              <span
                className="font-serif font-semibold text-[1.08rem]"
                style={{ color: "var(--text)" }}
              >
                {phase.title}
              </span>

              {/* Days */}
              <span
                className="text-[0.75rem] font-medium mt-1"
                style={{ color: "var(--text-muted)", opacity: 0.7 }}
              >
                {phase.days}
              </span>

              {/* Description */}
              <p
                className="text-[0.9rem] leading-relaxed mt-2 mx-auto"
                style={{
                  color: "var(--text-muted)",
                  maxWidth: "320px",
                }}
              >
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
