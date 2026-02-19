export function HowItWorks() {
  const steps = [
    {
      icon: "\u2709",
      title: "Sign up with your email",
      description:
        "No passwords, no accounts to remember. Just your email. We\u2019ll send a magic link whenever you want to come back.",
      active: true,
    },
    {
      icon: "\uD83D\uDCD6",
      title: "Read, reflect, and journal",
      description:
        "Each day has a reflection, an activity, and a journaling prompt. Write your thoughts directly on the page \u2014 they\u2019re saved and private to you.",
      active: false,
    },
    {
      icon: "\u2600",
      title: "Get a gentle nudge each morning",
      description:
        "A short email with the day\u2019s quote and a preview. One tap to open today\u2019s full page on the site. Go at your own pace.",
      active: false,
    },
  ];

  return (
    <section className="py-[100px] px-6 bg-cream md:py-[100px] py-12">
      <div className="max-w-[1100px] mx-auto">
        <div className="text-center">
          <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
            How It Works
          </div>
          <div className="font-serif text-[clamp(1.8rem,3.5vw,2.4rem)] font-semibold leading-[1.3] mb-5 tracking-tight">
            Three steps. That&apos;s it.
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mt-[50px] relative">
          {/* Connector line (desktop only) */}
          <div className="hidden md:block absolute top-10 left-[calc(16.66%+20px)] right-[calc(16.66%+20px)] h-[2px] bg-border" />

          {steps.map((step, i) => (
            <div key={i} className="text-center relative">
              <div
                className={`w-20 h-20 rounded-full mx-auto mb-5 flex items-center justify-center text-[2rem] relative z-10 border-2 ${
                  step.active
                    ? "bg-sage border-sage"
                    : "bg-white border-border"
                }`}
              >
                <span className={step.active ? "brightness-0 invert" : ""}>
                  {step.icon}
                </span>
              </div>
              <div className="text-[0.65rem] font-bold text-sage uppercase tracking-[0.1em] mb-2">
                Step {i + 1}
              </div>
              <h3 className="font-serif text-[1.1rem] font-semibold mb-2">
                {step.title}
              </h3>
              <p className="text-[0.92rem] text-text-muted leading-relaxed max-w-[280px] mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
