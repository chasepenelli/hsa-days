"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const benefits = [
  {
    title: "No screens, no distractions.",
    description:
      "Put the phone down. Pick up a pen. Be fully present with your dog \u2014 that\u2019s what this time is for.",
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.08)",
  },
  {
    title: "Your words, on real pages.",
    description:
      "Thick archival paper with lay-flat binding. Room to write, sketch, tape in a photo, or just let the tears fall.",
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.08)",
  },
  {
    title: "A permanent record of love.",
    description:
      "Digital entries can disappear. This journal is yours forever \u2014 a tangible proof that this time mattered.",
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.08)",
  },
];

export function WhyPhysical() {
  const ref = useScrollReveal();

  return (
    <section
      id="why-physical"
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
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.10) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "8s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center mb-16">
          {/* Text column */}
          <div>
            <div
              className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
              style={{ color: "var(--gold)" }}
            >
              WHY A PHYSICAL JOURNAL
            </div>
            <h2
              className="reveal font-serif font-semibold tracking-tight mb-6"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
                lineHeight: 1.25,
                color: "var(--text)",
                transitionDelay: "0.08s",
              }}
            >
              There&apos;s something different about{" "}
              <em className="italic" style={{ color: "var(--sage)" }}>
                holding it in your hands.
              </em>
            </h2>
            <p
              className="reveal text-[1.02rem] leading-relaxed mb-5"
              style={{ color: "var(--text-muted)", transitionDelay: "0.16s" }}
            >
              When you&apos;re going through something this hard, screens start
              to feel like noise. Another tab open. Another notification pulling
              you away from the moment.
            </p>
            <p
              className="reveal text-[1.02rem] leading-relaxed mb-8"
              style={{ color: "var(--text-muted)", transitionDelay: "0.24s" }}
            >
              A physical journal doesn&apos;t buzz. It doesn&apos;t have an
              algorithm. It just waits &mdash; on the nightstand, next to your
              coffee, beside the couch where your dog is sleeping.
            </p>

            {/* Pull quote */}
            <div
              className="reveal"
              style={{ transitionDelay: "0.32s" }}
            >
              <div
                className="mb-4"
                style={{
                  width: "48px",
                  height: "2px",
                  borderRadius: "1px",
                  background:
                    "linear-gradient(to right, var(--gold), transparent)",
                }}
              />
              <blockquote>
                <p
                  className="font-serif italic text-[1.02rem] leading-[1.75] mb-2"
                  style={{ color: "var(--text)" }}
                >
                  &ldquo;I needed something I could close at the end of the day
                  and know my words were safe. Something that would still be
                  there in ten years.&rdquo;
                </p>
                <cite
                  className="not-italic text-[0.82rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  &mdash; From an HSA Days family
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Illustration column */}
          <div
            className="reveal-scale flex justify-center"
            style={{ transitionDelay: "0.2s" }}
          >
            <div
              className="relative"
              style={{
                maxWidth: "400px",
                width: "100%",
                aspectRatio: "3 / 4",
              }}
            >
              <Image
                src="/illustrations/order/order-why-physical.webp"
                alt="Hands holding an open journal"
                fill
                sizes="(max-width: 768px) 100vw, 400px"
                className="object-contain"
                style={{ mixBlendMode: "multiply" }}
              />
            </div>
          </div>
        </div>

        {/* ── Benefit cards ── */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-6">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="rounded-2xl p-7 relative overflow-hidden"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: "0 2px 16px rgba(0,0,0,0.03)",
              }}
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 right-0"
                style={{ height: "3px", background: b.color }}
              />
              <h3
                className="font-serif font-semibold text-[1.1rem] mb-2"
                style={{ color: "var(--text)", lineHeight: 1.3 }}
              >
                {b.title}
              </h3>
              <p
                className="text-[0.9rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {b.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
