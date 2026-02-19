"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";

export function DayPreview() {
  const ref = useScrollReveal();

  return (
    <section
      id="preview"
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
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      <div className="max-w-[1100px] mx-auto">
        <div className="text-center mb-12">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            See Inside
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            Here&apos;s what Day 1 looks like{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              on the site.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "560px",
              transitionDelay: "0.16s",
            }}
          >
            This is the actual experience. Sign up, and this page is yours —
            with a journal that saves your thoughts as you go.
          </p>
        </div>

        {/* Browser mockup */}
        <div
          className="reveal-scale max-w-[720px] mx-auto rounded-[20px] overflow-hidden"
          style={{
            boxShadow: "0 24px 80px rgba(0,0,0,0.12), 0 4px 20px rgba(0,0,0,0.06)",
            border: "1px solid var(--border)",
            transitionDelay: "0.24s",
          }}
        >
          {/* Browser chrome (desktop only) */}
          <div
            className="hidden md:flex px-4 py-3 items-center gap-2.5 border-b"
            style={{
              background: "#f0edea",
              borderColor: "var(--border)",
            }}
          >
            <div className="flex gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#FF6058" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#FFC130" }}
              />
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ background: "#27CA40" }}
              />
            </div>
            <div
              className="flex-1 bg-white rounded-md px-3.5 py-1.5 text-[0.75rem] font-sans"
              style={{ color: "var(--text-muted)" }}
            >
              <span style={{ color: "var(--sage)", fontWeight: 500 }}>
                hsadays.com
              </span>
              /days/1
            </div>
          </div>

          {/* Progress bar */}
          <div
            className="px-8 py-4 flex items-center gap-4 border-b"
            style={{
              background: "var(--warm-white)",
              borderColor: "var(--border)",
            }}
          >
            <div
              className="flex-1 h-1.5 rounded-full overflow-hidden"
              style={{ background: "var(--border)" }}
            >
              <div
                className="h-full rounded-full"
                style={{ width: "3.3%", background: "var(--sage)" }}
              />
            </div>
            <div
              className="text-[0.75rem] whitespace-nowrap"
              style={{ color: "var(--text-muted)" }}
            >
              Day 1 of 30
            </div>
          </div>

          {/* Day header */}
          <div
            className="text-white px-9 py-7 md:px-9 px-5 md:py-7 py-5"
            style={{
              background: "linear-gradient(135deg, var(--sage-dark), var(--sage))",
            }}
          >
            <div
              className="text-[0.72rem] uppercase tracking-[0.12em] mb-1.5"
              style={{ opacity: 0.75 }}
            >
              Day 1 of 30
            </div>
            <h3
              className="font-serif text-[1.6rem] font-semibold"
            >
              The Diagnosis
            </h3>
          </div>

          {/* Day body */}
          <div
            className="p-9 md:p-9 p-5"
            style={{ background: "white" }}
          >
            {/* Quote */}
            <div
              className="mb-7 rounded-xl px-7 py-6 text-center"
              style={{
                background: "var(--cream)",
                borderLeft: "3px solid var(--gold)",
              }}
            >
              <p
                className="font-serif italic text-[1.05rem]"
                style={{ color: "var(--text)" }}
              >
                &ldquo;The wound is the place where the Light enters you.&rdquo;
              </p>
              <div
                className="text-[0.8rem] mt-2 font-sans"
                style={{ color: "var(--text-muted)" }}
              >
                — Rumi
              </div>
            </div>

            {/* Reflection */}
            <div className="mb-7">
              <div
                className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold mb-2"
                style={{ color: "var(--gold)" }}
              >
                Today&apos;s Reflection
              </div>
              <p
                className="text-[0.95rem] leading-relaxed mb-3"
                style={{ color: "var(--text-muted)" }}
              >
                If you&apos;re reading this, you probably just heard a word you
                wish you never had to learn. Hemangiosarcoma. Maybe you&apos;re
                still in shock. Maybe you&apos;ve been crying for hours. Maybe
                you feel strangely numb. All of that is okay.
              </p>
              <p
                className="text-[0.95rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Today isn&apos;t about having a plan. Today is about giving
                yourself permission to feel whatever you feel — and giving your
                dog an extra long hug.
              </p>
            </div>

            {/* Journal prompt */}
            <div
              className="mb-7 rounded-xl px-6 py-5"
              style={{
                background: "var(--warm-white)",
                border: "1.5px dashed var(--border)",
              }}
            >
              <div
                className="flex items-center gap-1.5 text-[0.72rem] font-semibold mb-2"
                style={{ color: "var(--sage)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z" />
                </svg>
                Your Journal
              </div>
              <div
                className="w-full min-h-[80px] rounded-lg px-4 py-3 text-[0.9rem]"
                style={{
                  border: "1px solid var(--border)",
                  background: "white",
                  color: "rgba(107,107,107,0.4)",
                }}
              >
                What are you feeling right now? There are no wrong answers...
              </div>
            </div>

            {/* Activity */}
            <div>
              <div
                className="text-[0.68rem] uppercase tracking-[0.12em] font-semibold mb-2"
                style={{ color: "var(--gold)" }}
              >
                Today&apos;s Activity
              </div>
              <p
                className="text-[0.95rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                Sit on the floor with your dog. Not to do anything — just to be
                near them. Let them lean into you. Let yourself lean into them.
                That&apos;s enough for today.
              </p>
            </div>
          </div>

          {/* Day navigation */}
          <div
            className="px-9 py-5 flex justify-between items-center flex-wrap gap-3 border-t md:px-9 px-5"
            style={{
              borderColor: "var(--border)",
              background: "var(--warm-white)",
            }}
          >
            <span
              className="text-[0.85rem] flex items-center gap-1.5 font-medium"
              style={{ color: "var(--text-muted)", opacity: 0.3 }}
            >
              ← Previous Day
            </span>
            <button
              className="px-6 py-2.5 text-white border-none rounded-lg text-[0.85rem] font-semibold font-sans flex items-center gap-2 md:w-auto w-full justify-center"
              style={{
                background: "var(--sage)",
                cursor: "default",
                minHeight: "44px",
              }}
            >
              ✓ Mark Day Complete
            </button>
            <span
              className="text-[0.85rem] flex items-center gap-1.5 font-medium"
              style={{ color: "var(--text-muted)" }}
            >
              Next Day →
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
