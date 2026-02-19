"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const steps = [
  {
    number: "01",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <rect x="6" y="10" width="28" height="22" rx="4" stroke="currentColor" strokeWidth="1.8" />
        <path d="M6 17h28" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="13" cy="13.5" r="1.5" fill="currentColor" />
        <circle cx="20" cy="13.5" r="1.5" fill="currentColor" />
        <circle cx="27" cy="13.5" r="1.5" fill="currentColor" />
        <path d="M12 24h7M12 28.5h12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.08)",
    title: "Sign up with your email",
    description:
      "No passwords, no accounts to remember. Just your email. We'll send a magic link whenever you want to come back.",
  },
  {
    number: "02",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <rect x="8" y="6" width="24" height="30" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13 13h14M13 18h10M13 23h8M13 28h5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M27 22l2 2-2 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.08)",
    title: "Read, reflect, and journal",
    description:
      "Each day has a reflection, an activity, and a journaling prompt. Write your thoughts directly on the page — saved and private to you.",
  },
  {
    number: "03",
    icon: (
      <svg viewBox="0 0 40 40" fill="none" className="w-9 h-9">
        <circle cx="20" cy="20" r="12" stroke="currentColor" strokeWidth="1.8" />
        <path d="M20 13v7.5l5 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M20 6v2M20 32v2M6 20h2M32 20h2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.08)",
    title: "A gentle nudge each morning",
    description:
      "A short email with the day's quote and a preview. One tap to open today's full page. Go at your own pace — there's no wrong speed.",
  },
];

export function HowItWorks() {
  const ref = useScrollReveal();

  return (
    <section
      id="how"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--warm-white)",
      }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            How It Works
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            Three steps.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              That&apos;s it.
            </em>
          </h2>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Desktop connector */}
          <div
            className="timeline-line-h hidden md:block absolute h-[2px] top-[52px] rounded-full"
            style={{
              left: "calc(16.66% + 40px)",
              right: "calc(16.66% + 40px)",
              background:
                "linear-gradient(to right, var(--sage), var(--gold), var(--terracotta))",
              opacity: 0.3,
            }}
            aria-hidden="true"
          />

          <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center md:items-center">
                {/* Icon circle */}
                <div
                  className="relative w-[104px] h-[104px] rounded-full flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105 z-10"
                  style={{
                    background: step.bg,
                    border: `1.5px solid ${step.bg.replace("0.08", "0.25")}`,
                    color: step.color,
                    boxShadow: `0 4px 24px ${step.bg.replace("0.08", "0.18")}`,
                  }}
                >
                  {step.icon}
                  {/* Step number badge */}
                  <div
                    className="absolute -top-1.5 -right-1.5 w-7 h-7 rounded-full flex items-center justify-center text-[0.65rem] font-bold font-sans"
                    style={{
                      background: step.color,
                      color: "white",
                      boxShadow: `0 2px 8px ${step.bg.replace("0.08", "0.35")}`,
                    }}
                  >
                    {i + 1}
                  </div>
                </div>

                <h3
                  className="font-serif text-[1.1rem] font-semibold mb-3"
                  style={{ color: "var(--text)" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-[0.91rem] leading-relaxed max-w-[280px] mx-auto"
                  style={{ color: "var(--text-muted)" }}
                >
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
