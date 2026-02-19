"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function EmailPreview() {
  const ref = useScrollReveal();

  return (
    <section
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
      {/* Ambient background */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "50%",
          right: "-5%",
          transform: "translateY(-50%)",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.09) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "11s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">

          {/* Text side */}
          <div>
            <div
              className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
              style={{ color: "var(--gold)" }}
            >
              Your Morning Companion
            </div>
            <h2
              className="reveal font-serif font-semibold tracking-tight mb-5"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
                lineHeight: 1.25,
                transitionDelay: "0.08s",
              }}
            >
              A quiet nudge,{" "}
              <em className="italic" style={{ color: "var(--sage)" }}>
                not a flood.
              </em>
            </h2>
            <p
              className="reveal text-[1.05rem] leading-relaxed mb-8"
              style={{
                color: "var(--text-muted)",
                transitionDelay: "0.16s",
              }}
            >
              Each morning you&apos;ll get a short email with the day&apos;s
              quote and a few words. One tap opens the full day on the site.
            </p>

            {/* Features list */}
            <div
              className="reveal flex flex-col gap-3"
              style={{ transitionDelay: "0.24s" }}
            >
              {[
                "One email per day, sent at 8 AM",
                "The day's quote and a short preview",
                "One tap to your private journal",
                "Unsubscribe or pause anytime",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[0.7rem]"
                    style={{
                      background: "rgba(91,123,94,0.1)",
                      color: "var(--sage)",
                    }}
                  >
                    ✓
                  </div>
                  <span
                    className="text-[0.92rem]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Email mockup */}
          <div className="reveal-scale" style={{ transitionDelay: "0.12s" }}>
            <div
              className="bg-white rounded-xl overflow-hidden"
              style={{
                boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)",
                border: "1px solid var(--border)",
              }}
            >
              {/* Email header bar */}
              <div
                className="px-5 py-3 border-b flex items-center gap-3"
                style={{
                  background: "var(--warm-white)",
                  borderColor: "var(--border)",
                }}
              >
                <div
                  className="w-7 h-7 rounded-full flex items-center justify-center text-[0.7rem] font-bold text-white flex-shrink-0"
                  style={{ background: "var(--sage)" }}
                >
                  H
                </div>
                <div>
                  <div
                    className="text-[0.82rem] font-semibold leading-none"
                    style={{ color: "var(--text)" }}
                  >
                    HSA Days
                  </div>
                  <div
                    className="text-[0.72rem] mt-0.5"
                    style={{ color: "var(--text-muted)" }}
                  >
                    hello@hsadays.com · 8:00 AM
                  </div>
                </div>
              </div>

              {/* Subject line */}
              <div
                className="px-5 py-3.5 border-b"
                style={{ borderColor: "var(--border)" }}
              >
                <div
                  className="font-semibold text-[0.95rem]"
                  style={{ color: "var(--text)" }}
                >
                  Day 1: The Diagnosis
                </div>
              </div>

              {/* Email body */}
              <div className="px-6 py-6">
                <div
                  className="font-serif italic text-center mb-5 py-4 rounded-xl"
                  style={{
                    fontSize: "1rem",
                    color: "var(--text)",
                    background: "var(--cream)",
                  }}
                >
                  &ldquo;The wound is the place where the Light enters you.&rdquo;
                  <div
                    className="text-[0.78rem] mt-1.5 font-sans not-italic"
                    style={{ color: "var(--text-muted)" }}
                  >
                    — Rumi
                  </div>
                </div>

                <p
                  className="text-[0.88rem] leading-relaxed mb-3"
                  style={{ color: "var(--text-muted)" }}
                >
                  If you&apos;re reading this, you probably just heard a word
                  you wish you never had to learn. Today isn&apos;t about having
                  a plan. Today is about giving yourself permission to feel.
                </p>
                <p
                  className="text-[0.88rem] leading-relaxed mb-5"
                  style={{ color: "var(--text-muted)" }}
                >
                  Your reflection, activity, and journal prompt are ready.
                </p>

                <div
                  className="text-center py-3 rounded-lg font-semibold text-[0.9rem] text-white font-sans"
                  style={{ background: "var(--sage)" }}
                >
                  Continue Day 1 →
                </div>
              </div>

              <div
                className="px-6 py-3 border-t text-center text-[0.72rem]"
                style={{
                  borderColor: "var(--border)",
                  color: "var(--text-muted)",
                  opacity: 0.6,
                }}
              >
                Your journal is waiting for you.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
