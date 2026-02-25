"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { JourneyArcBar } from "./JourneyArcBar";
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
];

export function JourneyPageClient({ day1 }: JourneyPageClientProps) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className="min-h-screen"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══════════════════════════════════════════
          Section 1: Hero — "Meet them in crisis"
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden flex flex-col items-center justify-center text-center"
        style={{
          minHeight: "100svh",
          paddingLeft: "24px",
          paddingRight: "24px",
          background:
            "linear-gradient(to bottom, var(--cream) 0%, var(--warm-white) 100%)",
        }}
      >
        {/* Sage radial glow */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(91,123,94,0.06) 0%, transparent 70%)",
          }}
        />

        {/* Desktop watermark — Day 1 journal illustration */}
        <div
          className="absolute pointer-events-none hidden lg:block"
          aria-hidden="true"
          style={{
            top: "50%",
            right: "6%",
            transform: "translateY(-50%)",
            opacity: 0.06,
          }}
        >
          <Image
            src="/illustrations/journal/day01-illust.png"
            alt=""
            width={320}
            height={320}
            priority={false}
          />
        </div>

        <div className="max-w-[640px] mx-auto relative z-10">
          {/* Eyebrow */}
          <div
            className="reveal inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-5"
            style={{ color: "var(--gold)" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.6,
              }}
            />
            HSA Days &mdash; A Free 30-Day Companion
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.6,
              }}
            />
          </div>

          {/* Headline */}
          <h1
            className="reveal font-serif font-semibold tracking-tight mb-5"
            style={{
              fontSize: "clamp(2rem, 6vw, 3.2rem)",
              lineHeight: 1.18,
              color: "var(--text)",
              transitionDelay: "0.08s",
            }}
          >
            Your dog was just diagnosed.
            <br />
            <em className="italic" style={{ color: "var(--sage)" }}>
              There&rsquo;s a path through this.
            </em>
          </h1>

          {/* Body */}
          <p
            className="reveal leading-relaxed mx-auto mb-10"
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)",
              color: "var(--text-muted)",
              maxWidth: "480px",
              transitionDelay: "0.16s",
            }}
          >
            HSA Days walks beside you &mdash; one day at a time. Reflections,
            journaling, and practical guidance for the hardest season with your
            dog.
          </p>
        </div>

        {/* Scroll indicator */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          aria-hidden="true"
          style={{ animation: "arrowBounce 2s ease-in-out infinite" }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--text-muted)"
            strokeWidth={1.5}
            width={24}
            height={24}
            style={{ opacity: 0.4 }}
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          Section 2: The Arc — "The emotional map"
      ═══════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(56px, 8vw, 96px)",
          paddingBottom: "clamp(56px, 8vw, 96px)",
          paddingLeft: "24px",
          paddingRight: "24px",
          background: "var(--warm-white)",
        }}
      >
        <div className="max-w-[600px] mx-auto text-center">
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-8"
            style={{
              fontSize: "clamp(1.6rem, 4vw, 2.2rem)",
              lineHeight: 1.2,
              color: "var(--text)",
            }}
          >
            Five phases.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              Your pace.
            </em>
          </h2>

          <JourneyArcBar />
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          Section 3: Day 1 Preview — "The trailer scene"
      ═══════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(48px, 7vw, 80px)",
          paddingBottom: "clamp(56px, 8vw, 96px)",
          paddingLeft: "0",
          paddingRight: "0",
          background:
            "linear-gradient(to bottom, var(--warm-white) 0%, var(--cream) 100%)",
        }}
      >
        <div className="text-center mb-8 px-6">
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-3"
            style={{
              fontSize: "clamp(1.4rem, 3.5vw, 1.8rem)",
              lineHeight: 1.25,
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
      </section>

      {/* ═══════════════════════════════════════════
          Section 4: Social Proof — "You're not the only one"
      ═══════════════════════════════════════════ */}
      <section
        className="relative"
        style={{
          paddingTop: "clamp(48px, 7vw, 80px)",
          paddingBottom: "clamp(48px, 7vw, 80px)",
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          Section 5: Signup CTA — "The door is open"
      ═══════════════════════════════════════════ */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "clamp(64px, 9vw, 112px)",
          paddingBottom: "clamp(64px, 9vw, 112px)",
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
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4.5vw, 2.6rem)",
              lineHeight: 1.2,
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
            className="reveal flex items-center justify-center gap-3 mb-5"
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
            A free 30-day companion for the hardest season with your dog. Just
            your email to save your place.
          </p>

          <div
            className="reveal"
            style={{ transitionDelay: "0.16s" }}
          >
            <SignupForm variant="dark" />
          </div>

          {/* Trust line */}
          <p
            className="reveal mt-5 text-[0.78rem]"
            style={{
              color: "rgba(255,255,255,0.4)",
              transitionDelay: "0.2s",
            }}
          >
            Free forever &middot; No credit card &middot; Unsubscribe anytime
          </p>
        </div>
      </section>
    </div>
  );
}
