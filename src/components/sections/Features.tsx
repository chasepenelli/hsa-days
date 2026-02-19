export function Features() {
  const features = [
    {
      icon: "\uD83D\uDCDD",
      title: "30 Daily Reflections",
      description:
        "Honest, grounding writing that helps you process what you\u2019re feeling. Not clinical. Not cold. Just real words from someone who gets it.",
    },
    {
      icon: "\u270F\uFE0F",
      title: "Private Journaling",
      description:
        "Each day has a writing prompt with a journal built right into the page. Your entries are saved privately \u2014 only you can see them.",
    },
    {
      icon: "\uD83D\uDC3E",
      title: "Activities With Your Dog",
      description:
        "Simple, meaningful things to do together. Not bucket-list pressure \u2014 just intentional moments. A favorite walk. A new treat. Being present.",
    },
    {
      icon: "\uD83D\uDC8A",
      title: "Practical Guides",
      description:
        "Supplement research, nutrition guidance, house-proofing tips \u2014 the stuff you actually need but can\u2019t find in one place.",
    },
    {
      icon: "\u2709",
      title: "Daily Morning Emails",
      description:
        "A gentle nudge each morning with the day\u2019s quote and a preview. One tap to open the full day on the site. Go at your pace.",
    },
    {
      icon: "\uD83E\uDD1D",
      title: "Community Stories",
      description:
        "You\u2019re not the first to go through this. Read stories from other HSA families and share your own when you\u2019re ready.",
    },
  ];

  return (
    <section id="features" className="py-[100px] px-6 md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          What&apos;s Inside
        </div>
        <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
          More than a book. A companion that meets you where you are.
        </div>
        <p className="text-[1.05rem] text-text-muted max-w-[600px] leading-relaxed">
          Everything lives on the website, accessible anytime. Read, write, and
          come back whenever you need to.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-[50px]">
          {features.map((feature, i) => (
            <div
              key={i}
              className="bg-white border border-border rounded-2xl px-7 py-9 transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            >
              <div className="text-[1.6rem] mb-3.5">{feature.icon}</div>
              <h3 className="font-serif text-[1.1rem] font-semibold mb-2.5">
                {feature.title}
              </h3>
              <p className="text-[0.93rem] text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
