export function Resources() {
  const resources = [
    {
      icon: "\uD83D\uDC8A",
      title: "Supplement Guide",
      description:
        "Research-backed supplements organized by category \u2014 what they do, suggested dosages by weight, and what to discuss with your vet.",
      borderColor: "border-l-sage",
    },
    {
      icon: "\uD83E\uDD6A",
      title: "Food & Nutrition",
      description:
        "What to feed, what to avoid, and how to adjust their diet. Including homemade options, commercial foods, and appetite-boosting tips.",
      borderColor: "border-l-gold",
    },
    {
      icon: "\uD83C\uDFE0",
      title: "House-Proofing",
      description:
        "Small changes that make a big difference. Non-slip surfaces, ramp guides, temperature management, and comfort setups for recovery.",
      borderColor: "border-l-terracotta",
    },
  ];

  return (
    <section id="resources" className="py-[100px] px-6 md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Resources
        </div>
        <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
          Everything in one place.
        </div>
        <p className="text-[1.05rem] text-text-muted max-w-[600px] leading-relaxed">
          Practical guides researched and organized so you don&apos;t have to
          dig through the internet at your worst moment.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {resources.map((resource, i) => (
            <div
              key={i}
              className={`bg-white border border-border border-l-[3px] ${resource.borderColor} rounded-2xl px-7 py-9 transition-all hover:-translate-y-[3px] hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]`}
            >
              <h3 className="font-serif text-[1.1rem] font-semibold mb-2.5">
                {resource.icon} {resource.title}
              </h3>
              <p className="text-[0.93rem] text-text-muted leading-relaxed">
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
