import Image from "next/image";

const PHASES = [
  {
    title: "The Shock",
    days: "Days 1-4",
    description: "Processing the diagnosis and catching your breath.",
    color: "var(--terracotta)",
    illustration: "/illustrations/home/home-journey-phase1.webp",
    alt: "Phone face-down with paw print stamp",
  },
  {
    title: "Building Ground",
    days: "Days 5-10",
    description: "Creating routines and finding your footing.",
    color: "var(--gold)",
    illustration: "/illustrations/home/home-journey-phase2.webp",
    alt: "Coffee mug and dog leash",
  },
  {
    title: "The Emotions",
    days: "Days 11-17",
    description: "Confronting guilt, anger, and the weight of love.",
    color: "var(--sage-light)",
    illustration: "/illustrations/home/home-journey-phase3.webp",
    alt: "Crumpled tissue beside a journal",
  },
  {
    title: "Going Deeper",
    days: "Days 18-24",
    description: "Hard conversations and documenting what matters.",
    color: "var(--sage)",
    illustration: "/illustrations/home/home-journey-phase4.webp",
    alt: "Pen resting on an open journal page",
  },
  {
    title: "Finding Meaning",
    days: "Days 25-30",
    description: "Gratitude, legacy, and stepping forward with grace.",
    color: "var(--sage-dark)",
    illustration: "/illustrations/home/home-journey-phase5.webp",
    alt: "Paw print and footprint side by side",
  },
];

export function JourneyArcBar() {
  return (
    <div className="reveal">
      {/* Gradient bar */}
      <div className="mx-auto" style={{ maxWidth: "480px" }}>
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

      {/* Phase rows */}
      <div
        className="mt-8 space-y-3 mx-auto"
        style={{ maxWidth: "520px" }}
      >
        {PHASES.map((phase, i) => (
          <div
            key={i}
            className="flex items-center gap-3 md:gap-4"
          >
            {/* Color dot */}
            <div
              className="shrink-0"
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                background: phase.color,
              }}
            />

            {/* Thumbnail illustration */}
            <div className="shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-lg overflow-hidden relative">
              <Image
                src={phase.illustration}
                alt={phase.alt}
                fill
                className="object-cover"
                sizes="48px"
              />
            </div>

            {/* Text */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2">
                <span
                  className="font-serif font-semibold text-[0.92rem]"
                  style={{ color: "var(--text)" }}
                >
                  {phase.title}
                </span>
                <span
                  className="text-[0.72rem] font-medium"
                  style={{ color: "var(--text-muted)", opacity: 0.7 }}
                >
                  {phase.days}
                </span>
              </div>
              <p
                className="text-[0.82rem] leading-snug mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {phase.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
