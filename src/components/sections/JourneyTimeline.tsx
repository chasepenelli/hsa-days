export function JourneyTimeline() {
  const phases = [
    {
      days: "Days 1\u20134",
      color: "bg-terracotta",
      title: "The Shock",
      description:
        "Processing the diagnosis, understanding HSA, exploring treatment options, and telling the people who matter.",
    },
    {
      days: "Days 5\u201310",
      color: "bg-gold",
      title: "Building Ground",
      description:
        "Creating routines, supplements & nutrition, navigating good days and bad, and making your home safer.",
    },
    {
      days: "Days 11\u201317",
      color: "bg-sage-light",
      title: "The Emotions",
      description:
        "Confronting guilt, finding your support system, learning presence, the financial reality, and caring for other pets.",
    },
    {
      days: "Days 18\u201324",
      color: "bg-sage",
      title: "Going Deeper",
      description:
        "Processing anger, noticing the small things, having hard conversations, helping kids cope, and documenting the love.",
    },
    {
      days: "Days 25\u201330",
      color: "bg-sage-dark",
      title: "Finding Meaning",
      description:
        "Self-care, legacy, gratitude in grief, community, and stepping into whatever comes next \u2014 with grace.",
    },
  ];

  return (
    <section id="journey" className="py-[100px] px-6 md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center">
          <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
            The Journey
          </div>
          <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
            30 days, five chapters of healing.
          </div>
          <p className="text-[1.05rem] text-text-muted max-w-[600px] mx-auto leading-relaxed mb-[50px]">
            Each week builds on the last. You start with survival. You end with
            meaning.
          </p>
        </div>

        {/* Desktop: horizontal timeline */}
        <div className="hidden md:flex relative">
          {/* Connector line */}
          <div className="absolute top-[36px] left-10 right-10 h-[3px] rounded-sm bg-gradient-to-r from-terracotta via-gold via-sage-light via-sage to-sage-dark" />

          {phases.map((phase, i) => (
            <div key={i} className="flex-1 text-center relative px-3">
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-muted mb-3">
                {phase.days}
              </div>
              <div
                className={`w-4 h-4 rounded-full mx-auto mb-4 relative z-10 border-[3px] border-warm-white shadow-[0_0_0_2px_var(--border)] ${phase.color}`}
              />
              <h4 className="font-serif text-base font-semibold mb-2 text-text">
                {phase.title}
              </h4>
              <p className="text-[0.85rem] text-text-muted leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mobile: vertical timeline */}
        <div className="md:hidden flex flex-col gap-6 pl-8 relative">
          {/* Vertical line */}
          <div className="absolute top-0 bottom-0 left-5 w-[3px] rounded-sm bg-gradient-to-b from-terracotta via-gold via-sage-light via-sage to-sage-dark" />

          {phases.map((phase, i) => (
            <div key={i} className="relative pl-6">
              <div
                className={`absolute -left-[12px] top-[18px] w-4 h-4 rounded-full border-[3px] border-warm-white shadow-[0_0_0_2px_var(--border)] ${phase.color}`}
              />
              <div className="text-[0.7rem] font-semibold uppercase tracking-[0.08em] text-text-muted mb-1">
                {phase.days}
              </div>
              <h4 className="font-serif text-base font-semibold mb-2 text-text">
                {phase.title}
              </h4>
              <p className="text-[0.85rem] text-text-muted leading-relaxed">
                {phase.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
