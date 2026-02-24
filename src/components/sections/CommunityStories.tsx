"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const stories = [
  {
    initials: "SM",
    gradient: "linear-gradient(135deg, var(--sage-light), var(--sage))",
    quote:
      "Having a place to write about what I was feeling each day — and knowing it was just for me — gave me something to hold onto when everything felt out of control.",
    name: "Sarah M.",
    detail: "Beau, Golden Retriever · Day 14",
  },
  {
    initials: "MT",
    gradient: "linear-gradient(135deg, var(--gold-light), var(--gold))",
    quote:
      "The supplement guide alone saved me hours of research. But it was the daily reflections that really helped. Feeling like someone understood what I was going through made all the difference.",
    name: "Mike T.",
    detail: "Luna, German Shepherd · Day 22",
    featured: true,
  },
  {
    initials: "JK",
    gradient: "linear-gradient(135deg, var(--terracotta-light), var(--terracotta))",
    quote:
      "I didn't want to 'make the most' of every day. I just wanted to stop crying long enough to enjoy the small stuff. HSA Days helped me get there, one day at a time.",
    name: "Jen K.",
    detail: "Rosie, Lab Mix · Day 30",
  },
];

export function CommunityStories() {
  const ref = useScrollReveal();

  return (
    <section
      id="community-section"
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
      {/* Ambient background glows */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(91,123,94,0.07) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "9s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: "1s",
        }}
      />

      <div className="max-w-[1100px] mx-auto relative">

        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            Community
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            Stories from the{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              HSA family.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "520px",
              transitionDelay: "0.16s",
            }}
          >
            Every dog is different. Every journey is different. But the love
            — that&apos;s the same.
          </p>
        </div>

        {/* Stories grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-5">
          {stories.map((story, i) => (
            <div
              key={i}
              className="group relative overflow-visible flex flex-col rounded-2xl p-7 paper-texture"
              data-card
              style={{
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: story.featured
                  ? "0 8px 40px rgba(91,123,94,0.12)"
                  : "var(--card-shadow-rest)",
                transition: "var(--card-transition)",
              }}
            >
              {/* Featured accent */}
              {story.featured && (
                <div
                  className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[0.62rem] font-semibold uppercase tracking-[0.1em] px-3.5 py-1 rounded-full"
                  style={{
                    background: "var(--sage)",
                    color: "white",
                  }}
                >
                  Most Shared
                </div>
              )}

              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-[0.9rem] mb-5 font-sans flex-shrink-0"
                style={{ background: story.gradient }}
              >
                {story.initials}
              </div>

              {/* Quote mark */}
              <div
                className="font-serif text-[3rem] leading-none absolute -top-1 left-6"
                style={{ color: "rgba(196,162,101,0.28)", lineHeight: 1 }}
                aria-hidden="true"
              >
                &ldquo;
              </div>

              <blockquote
                className="font-serif italic text-[0.97rem] leading-relaxed flex-1 mb-5"
                style={{ color: "var(--text-muted)" }}
              >
                {story.quote}
              </blockquote>

              {/* Attribution */}
              <div
                className="pt-5"
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                <div
                  className="font-semibold text-[0.88rem]"
                  style={{ color: "var(--text)" }}
                >
                  {story.name}
                </div>
                <div
                  className="text-[0.78rem] mt-0.5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {story.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Community stat strip */}
        <div
          className="reveal mt-14 flex flex-wrap justify-center gap-x-12 gap-y-4"
          style={{ transitionDelay: "0.4s" }}
        >
          {[
            { num: "Hundreds", label: "of families supported" },
            { num: "30", label: "days of guided content" },
            { num: "Free", label: "always and forever" },
          ].map((s) => (
            <div key={s.label} className="flex items-center gap-3">
              <div
                className="text-[1.3rem] font-serif font-semibold"
                style={{ color: "var(--sage-dark)" }}
              >
                {s.num}
              </div>
              <div
                className="text-[0.82rem]"
                style={{ color: "var(--text-muted)" }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
