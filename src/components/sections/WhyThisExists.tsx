export function WhyThisExists() {
  const points = [
    {
      icon: "\uD83D\uDCCB",
      title: "Information overload.",
      description:
        "You\u2019re Googling survival rates at 2 AM, reading forums that make you feel worse, and drowning in decisions you never expected to face.",
    },
    {
      icon: "\uD83E\uDD0D",
      title: "Emotional isolation.",
      description:
        'Friends say "it\'s just a dog." Family doesn\'t get it. You need someone who truly understands this specific grief.',
    },
    {
      icon: "\u2728",
      title: "Every day matters.",
      description:
        "Whether your dog has weeks or months, you want to make each day intentional \u2014 not consumed by worry and regret.",
    },
  ];

  return (
    <section id="why" className="py-[100px] px-6 bg-cream md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Why This Exists
        </div>
        <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
          When you hear the word hemangiosarcoma,
          <br className="hidden md:block" /> everything stops.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-[60px] mt-[50px] items-center">
          <div className="font-serif text-[1.35rem] italic leading-relaxed text-text pl-6 border-l-[3px] border-gold">
            &ldquo;Before Graffiti was diagnosed, I had never even heard the
            word hemangiosarcoma. Suddenly I was drowning in medical terms,
            treatment options, and timelines &mdash; and none of it told me how
            to just <em>be</em> with my dog through it.&rdquo;
          </div>

          <ul className="flex flex-col gap-5">
            {points.map((point, i) => (
              <li key={i} className="flex gap-4 items-start">
                <div className="w-10 h-10 min-w-[40px] bg-sage/10 rounded-[10px] flex items-center justify-center text-[1.2rem]">
                  {point.icon}
                </div>
                <div className="text-base text-text-muted leading-relaxed">
                  <strong className="text-text">{point.title}</strong>{" "}
                  {point.description}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
