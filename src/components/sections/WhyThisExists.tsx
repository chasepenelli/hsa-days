"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function WhyThisExists() {
  const ref = useScrollReveal();

  const points = [
    {
      title: "Information overload.",
      description:
        "You're Googling survival rates at 2 AM, reading forums that make you feel worse, and drowning in decisions you never expected to face.",
      color: "var(--terracotta)",
      bg: "rgba(212,133,106,0.08)",
    },
    {
      title: "Emotional isolation.",
      description:
        'Friends say "it\'s just a dog." Family doesn\'t get it. You need someone who truly understands this specific grief.',
      color: "var(--sage)",
      bg: "rgba(91,123,94,0.08)",
    },
    {
      title: "Every day matters.",
      description:
        "Whether your dog has weeks or months, you want to make each day intentional — not consumed by worry and regret.",
      color: "var(--gold)",
      bg: "rgba(196,162,101,0.08)",
    },
  ];

  return (
    <section
      id="why"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      {/* Background ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(196,162,101,0.10) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "8s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      <div className="max-w-[1100px] mx-auto">

        {/* Section label */}
        <div
          className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
          style={{ color: "var(--gold)" }}
        >
          Why This Exists
        </div>

        {/* Section heading */}
        <h2
          className="reveal font-serif font-semibold tracking-tight mb-16"
          style={{
            fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
            lineHeight: 1.25,
            transitionDelay: "0.08s",
          }}
        >
          When you hear the word hemangiosarcoma,
          <br className="hidden md:block" />{" "}
          <em className="italic" style={{ color: "var(--sage)" }}>
            everything stops.
          </em>
        </h2>

        {/* Cinematic quote block */}
        <div
          className="reveal mb-16"
          style={{ transitionDelay: "0.16s" }}
        >
          <div
            className="relative max-w-[820px] mx-auto text-center paper-texture"
            style={{ padding: "clamp(32px, 5vw, 56px) clamp(24px, 6vw, 72px)" }}
          >
            {/* Decorative top rule */}
            <div
              className="flex items-center gap-4 mb-8"
            >
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, var(--gold))",
                  opacity: 0.5,
                }}
              />
              <div
                className="text-[1.6rem] font-serif leading-none"
                style={{ color: "var(--gold)", opacity: 0.6 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(to left, transparent, var(--gold))",
                  opacity: 0.5,
                }}
              />
            </div>

            <blockquote
              className="font-serif italic leading-relaxed"
              style={{
                fontSize: "clamp(1.15rem, 2.6vw, 1.5rem)",
                color: "var(--text)",
                lineHeight: 1.65,
              }}
            >
              Before Graffiti was diagnosed, I had never even heard the word
              hemangiosarcoma. Suddenly I was drowning in medical terms,
              treatment options, and timelines — and none of it told me how to
              just{" "}
              <em
                style={{
                  color: "var(--sage)",
                  fontStyle: "italic",
                }}
              >
                be
              </em>{" "}
              with my dog through it.
            </blockquote>

            {/* Decorative bottom rule */}
            <div
              className="flex items-center gap-4 mt-8"
            >
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(to right, transparent, var(--gold))",
                  opacity: 0.35,
                }}
              />
              <div
                className="text-[0.75rem] font-medium uppercase tracking-[0.1em]"
                style={{ color: "var(--text-muted)", opacity: 0.7 }}
              >
                Chase &amp; Graffiti
              </div>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(to left, transparent, var(--gold))",
                  opacity: 0.35,
                }}
              />
            </div>
          </div>
        </div>

        {/* Three pain points */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-5">
          {points.map((point, i) => (
            <div
              key={i}
              className="rounded-2xl p-7"
              data-card
              style={{
                background: point.bg,
                border: `1px solid ${point.bg.replace("0.08", "0.2")}`,
              }}
            >
              {/* Accent line */}
              <div
                className="w-8 h-[3px] rounded-full mb-4"
                style={{ background: point.color }}
              />
              <h3
                className="font-serif text-[1.05rem] font-semibold mb-2.5"
                style={{ color: "var(--text)" }}
              >
                {point.title}
              </h3>
              <p
                className="text-[0.9rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Resolution beat — tonal pivot */}
        <div
          className="reveal mt-16 text-center max-w-[520px] mx-auto"
          style={{ transitionDelay: "0.32s" }}
        >
          {/* Gold gradient rule */}
          <div
            className="mx-auto mb-8"
            style={{
              width: "64px",
              height: "2px",
              borderRadius: "1px",
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />
          <p
            className="font-serif italic text-[1.1rem] leading-relaxed mb-3"
            style={{ color: "var(--text)", opacity: 0.85 }}
          >
            HSA Days doesn&apos;t fix any of this. But it gives you something to hold onto
            &mdash; one day at a time.
          </p>
          <a
            href="#journey"
            className="inline-flex items-center gap-1.5 text-[0.84rem] font-medium"
            style={{ color: "var(--sage)", transition: "opacity var(--duration-fast) ease" }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            See the journey
            <span aria-hidden="true" style={{ fontSize: "0.9em" }}>&darr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
