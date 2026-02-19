"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const resources = [
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <rect x="5" y="4" width="22" height="26" rx="3" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="16" cy="14" r="4" stroke="currentColor" strokeWidth="1.7" />
        <path d="M9 24c1-3 4-5 7-5s6 2 7 5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
      </svg>
    ),
    accentColor: "var(--sage)",
    accentBg: "rgba(91,123,94,0.08)",
    title: "Supplement Guide",
    description:
      "Research-backed supplements organized by category — what they do, suggested dosages by weight, and what to discuss with your vet.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M8 26V10l8-6 8 6v16H8z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M13 26v-7h6v7" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <circle cx="16" cy="14" r="2" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    accentColor: "var(--gold)",
    accentBg: "rgba(196,162,101,0.08)",
    title: "Food & Nutrition",
    description:
      "What to feed, what to avoid, and how to adjust their diet. Including homemade options, commercial foods, and appetite-boosting tips.",
  },
  {
    icon: (
      <svg viewBox="0 0 32 32" fill="none" className="w-7 h-7">
        <path d="M16 5l10 5v8c0 5.5-4.4 10.7-10 12-5.6-1.3-10-6.5-10-12V10l10-5z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
        <path d="M12 16l2.5 2.5L20 13" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    accentColor: "var(--terracotta)",
    accentBg: "rgba(212,133,106,0.08)",
    title: "House-Proofing",
    description:
      "Small changes that make a big difference. Non-slip surfaces, ramp guides, temperature management, and comfort setups for recovery.",
  },
];

export function Resources() {
  const ref = useScrollReveal();

  return (
    <section
      id="resources"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            Resources
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            Everything{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              in one place.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed"
            style={{
              color: "var(--text-muted)",
              maxWidth: "560px",
              transitionDelay: "0.16s",
            }}
          >
            Practical guides researched and organized so you don&apos;t have to
            dig through the internet at your worst moment.
          </p>
        </div>

        {/* Resource cards */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-5">
          {resources.map((resource, i) => (
            <div
              key={i}
              className="group relative rounded-2xl p-8 overflow-hidden transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)]"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              {/* Accent bar at top */}
              <div
                className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl"
                style={{ background: resource.accentColor, opacity: 0.7 }}
              />

              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: resource.accentBg,
                  color: resource.accentColor,
                  border: `1px solid ${resource.accentBg.replace("0.08", "0.2")}`,
                }}
              >
                {resource.icon}
              </div>

              <h3
                className="font-serif text-[1.1rem] font-semibold mb-3"
                style={{ color: "var(--text)" }}
              >
                {resource.title}
              </h3>
              <p
                className="text-[0.91rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {resource.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
