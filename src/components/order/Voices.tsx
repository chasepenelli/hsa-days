"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

const testimonials = [
  {
    initials: "RL",
    name: "Rachel L.",
    detail: "Cooper, Golden Retriever",
    quote:
      "I carry it in my bag everywhere. Even now, months later, I open it and read what I wrote on Day 3 \u2014 the day I thought I couldn\u2019t do this. Turns out I could.",
    gradient: "linear-gradient(135deg, var(--sage) 0%, var(--sage-light) 100%)",
    featured: false,
  },
  {
    initials: "DM",
    name: "David M.",
    detail: "Bear, Bernese Mountain Dog",
    quote:
      "The digital program was beautiful. But there\u2019s something about writing with a pen that makes it feel more real. Like I\u2019m actually talking to him. The journal gave me that.",
    gradient: "linear-gradient(135deg, var(--gold) 0%, var(--gold-light) 100%)",
    featured: true,
  },
  {
    initials: "KS",
    name: "Karen S.",
    detail: "Maggie, Lab Mix",
    quote:
      "I didn\u2019t think I needed a journal. I was wrong. Having a place to put everything I was feeling \u2014 it didn\u2019t fix anything, but it made the hard days a little less heavy.",
    gradient:
      "linear-gradient(135deg, var(--terracotta) 0%, var(--terracotta-light) 100%)",
    featured: false,
  },
];

export function Voices() {
  const ref = useScrollReveal();

  return (
    <section
      id="voices"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--warm-white)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-15%",
          left: "-5%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,133,106,0.07) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold-text)" }}
          >
            FROM HSA FAMILIES
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-5"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              color: "var(--text)",
              transitionDelay: "0.08s",
            }}
          >
            Words from people who{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              understand.
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
            Real reflections from families who have walked this road with the
            HSA Days journal.
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-7 flex flex-col relative overflow-hidden transition-transform hover:-translate-y-1.5"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: t.featured
                  ? "0 12px 40px rgba(0,0,0,0.08)"
                  : "0 2px 16px rgba(0,0,0,0.03)",
              }}
            >
              {/* Featured badge */}
              {t.featured && (
                <div
                  className="absolute top-4 right-4 text-[0.62rem] font-semibold uppercase tracking-[0.1em] px-2.5 py-1 rounded-full"
                  style={{
                    background: "rgba(196,162,101,0.10)",
                    color: "var(--gold-text)",
                    border: "1px solid rgba(196,162,101,0.22)",
                  }}
                >
                  Most Loved
                </div>
              )}

              {/* Avatar */}
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center text-white font-semibold text-[0.8rem] mb-5 flex-shrink-0"
                style={{ background: t.gradient }}
              >
                {t.initials}
              </div>

              {/* Quote */}
              <div
                className="font-serif leading-none select-none mb-1"
                style={{
                  fontSize: "1.8rem",
                  color: "rgba(196,162,101,0.3)",
                  lineHeight: 1,
                }}
                aria-hidden="true"
              >
                &ldquo;
              </div>
              <p
                className="text-[0.92rem] leading-relaxed flex-1 mb-5"
                style={{ color: "var(--text-muted)", marginTop: "-4px" }}
              >
                {t.quote}
              </p>

              {/* Attribution */}
              <div>
                <div
                  className="text-[0.88rem] font-semibold"
                  style={{ color: "var(--text)" }}
                >
                  {t.name}
                </div>
                <div
                  className="text-[0.78rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {t.detail}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
