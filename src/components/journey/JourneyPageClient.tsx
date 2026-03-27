"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { JourneyHero } from "./JourneyHero";
import { JourneyArcBar } from "./JourneyArcBar";
import { WhatEachDayHolds } from "./WhatEachDayHolds";
import { Day1Preview } from "./Day1Preview";
import { JourneyTestimonial } from "./JourneyTestimonial";
import { SignupForm } from "@/components/forms/SignupForm";

interface Day1Data {
  day_number: number;
  title: string;
  subtitle: string | null;
  category: string;
  quote: string | null;
  quote_author: string | null;
  reflection_intro: string | null;
  journal_prompt: string | null;
}

interface JourneyPageClientProps {
  day1: Day1Data | null;
}

const TESTIMONIALS = [
  {
    quote:
      "I read Day 1 sitting in my car after the appointment. I couldn\u2019t stop crying. But for the first time that day, it felt like someone understood.",
    author: "Sarah M., Beau\u2019s mom",
  },
  {
    quote:
      "I didn\u2019t think I was ready for something like this. Turns out, Day 1 doesn\u2019t ask you to be ready. It just meets you where you are.",
    author: "Mike T., Luna\u2019s dad",
  },
  {
    quote:
      "The journal prompts were the thing that got me through. I didn\u2019t know how to put any of this into words, and having a question to answer each morning made it feel manageable.",
    author: "Rachel K., Cooper\u2019s mom",
  },
  {
    quote:
      "I thought the food guide alone was worth it. But then the daily reflections became the thing I looked forward to most.",
    author: "David L., Penny\u2019s dad",
  },
];

export function JourneyPageClient({ day1 }: JourneyPageClientProps) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="min-h-[100dvh]"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══════════════════════════════════════════
          Section 1: Hero — Scroll-driven GSAP
      ═══════════════════════════════════════════ */}
      <JourneyHero />

      {/* ═══════════════════════════════════════════
          Section 2: The Arc — "The emotional map"
      ═══════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
          paddingLeft: "24px",
          paddingRight: "24px",
          background: "var(--warm-white)",
        }}
      >
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-10"
            style={{
              fontSize: "clamp(1.8rem, 4.5vw, 2.5rem)",
              lineHeight: 1.15,
              color: "var(--text)",
            }}
          >
            Five phases.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              No rush.
            </em>
          </h2>

          <JourneyArcBar />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          Section 3: What Each Day Holds — "Here's what's inside"
      ═══════════════════════════════════════════ */}
      <WhatEachDayHolds />

      {/* ═══════════════════════════════════════════
          Section 4: Day 1 Preview — "The trailer scene"
      ═══════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
          paddingLeft: "0",
          paddingRight: "0",
          background:
            "linear-gradient(to bottom, var(--warm-white) 0%, var(--cream) 100%)",
        }}
      >
        <div className="text-center mb-10 px-6">
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              lineHeight: 1.2,
              color: "var(--text)",
            }}
          >
            A look inside{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              Day 1
            </em>
          </h2>
          <p
            className="reveal text-[0.92rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "420px",
              transitionDelay: "0.08s",
            }}
          >
            Real content from the first day of your journey.
          </p>
        </div>

        <div className="reveal" style={{ transitionDelay: "0.12s" }}>
          {day1 ? (
            <Day1Preview day1={day1} />
          ) : (
            <div
              className="mx-4 sm:mx-auto rounded-2xl px-6 py-10 text-center"
              style={{
                maxWidth: "560px",
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <p style={{ color: "var(--text-muted)" }}>
                Day 1 content is coming soon.
              </p>
            </div>
          )}
        </div>

        {/* "There's more" text */}
        <p
          className="reveal text-center mt-6 font-serif italic"
          style={{
            fontSize: "clamp(0.88rem, 2vw, 1rem)",
            color: "var(--text-muted)",
            opacity: 0.7,
            transitionDelay: "0.2s",
          }}
        >
          This is Day 1. Twenty-nine more are waiting.
        </p>

        {/* Whispered day titles */}
        <div className="text-center mt-4 space-y-1">
          {[
            "Day 9 \u2014 The Photo Walk",
            "Day 16 \u2014 The Video",
            "Day 24 \u2014 What I Want You to Know",
          ].map((title, i) => (
            <p
              key={i}
              className="reveal font-serif"
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                opacity: 0.45,
                transitionDelay: `${0.28 + i * 0.12}s`,
              }}
            >
              {title}
            </p>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          Section 5: Social Proof — "You're not the only one"
      ═══════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
          paddingLeft: "24px",
          paddingRight: "24px",
          background: "var(--cream)",
        }}
      >
        {/* Sage glow */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "500px",
            height: "300px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(91,123,94,0.04) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[680px] mx-auto relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <JourneyTestimonial quote={t.quote} author={t.author} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          Section 6: Signup CTA — "The door is open"
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(80px, 11vw, 132px)",
          paddingBottom: "clamp(80px, 11vw, 132px)",
          paddingLeft: "24px",
          paddingRight: "24px",
          background:
            "linear-gradient(155deg, var(--sage-dark) 0%, var(--sage) 60%, var(--sage-light) 100%)",
        }}
      >
        {/* Radial glow */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "700px",
            height: "500px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,255,255,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Paw watermark */}
        <div
          className="absolute top-1/2 right-[8%] -translate-y-1/2 pointer-events-none"
          aria-hidden="true"
          style={{ opacity: 0.05 }}
        >
          <svg viewBox="0 0 100 100" fill="white" width={200} height={200}>
            <circle cx="35" cy="20" r="10" />
            <circle cx="65" cy="20" r="10" />
            <circle cx="20" cy="42" r="9" />
            <circle cx="80" cy="42" r="9" />
            <ellipse cx="50" cy="65" rx="22" ry="20" />
          </svg>
        </div>

        <div className="max-w-[520px] mx-auto text-center relative z-10">
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-6"
            style={{
              fontSize: "clamp(2.1rem, 5vw, 2.8rem)",
              lineHeight: 1.15,
              color: "white",
            }}
          >
            You don&rsquo;t have to be ready.
            <br />
            <em className="italic" style={{ opacity: 0.85 }}>
              Day 1 is here.
            </em>
          </h2>

          {/* Ornamental rule */}
          <div
            className="reveal flex items-center justify-center gap-3 mb-6"
            aria-hidden="true"
            style={{ transitionDelay: "0.08s" }}
          >
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(255,255,255,0.25)",
              }}
            />
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: "rgba(255,255,255,0.4)",
              }}
            />
            <div
              style={{
                width: "40px",
                height: "1px",
                background: "rgba(255,255,255,0.25)",
              }}
            />
          </div>

          <p
            className="reveal leading-relaxed mb-9"
            style={{
              fontSize: "clamp(0.92rem, 2vw, 1rem)",
              color: "rgba(255,255,255,0.72)",
              maxWidth: "420px",
              margin: "0 auto 36px",
              transitionDelay: "0.12s",
            }}
          >
            Thirty days of reflections, journal prompts, gentle activities, and
            practical guidance — starting from the moment of diagnosis. Just
            your email to begin.
          </p>

          <div
            className="reveal"
            style={{ transitionDelay: "0.16s" }}
          >
            <SignupForm variant="dark" />
          </div>

          {/* Resource line */}
          <p
            className="reveal mt-5 mx-auto leading-relaxed"
            style={{
              fontSize: "0.82rem",
              color: "rgba(255,255,255,0.55)",
              maxWidth: "380px",
              transitionDelay: "0.2s",
            }}
          >
            You&rsquo;ll also get access to our supplement guide, food safety
            reference, and a private community.
          </p>

          {/* Trust line */}
          <p
            className="reveal mt-4 text-[0.78rem]"
            style={{
              color: "rgba(255,255,255,0.4)",
              transitionDelay: "0.24s",
            }}
          >
            Free forever &middot; No credit card &middot; Unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
