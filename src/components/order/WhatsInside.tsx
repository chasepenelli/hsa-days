"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    title: "Daily Reflections",
    description:
      "Honest writing that meets you in the hard moments. Not platitudes \u2014 real words from someone who\u2019s been there.",
    image: "/illustrations/order/order-inside-reflection.png",
    color: "var(--sage)",
  },
  {
    title: "Guided Journal Prompts",
    description:
      "A question each day that helps you process what you\u2019re feeling. No right answers. Just space to be honest.",
    image: "/illustrations/order/order-inside-prompt.png",
    color: "var(--gold)",
  },
  {
    title: "Activities With Your Dog",
    description:
      "Simple, intentional things to do together. Not a bucket list. Just quiet moments you\u2019ll be glad you had.",
    image: "/illustrations/order/order-inside-activity.png",
    color: "var(--terracotta)",
  },
  {
    title: "Resource Guides",
    description:
      "Supplements, nutrition, house-proofing \u2014 everything you need in one place, so you can stop Googling at 2 AM.",
    image: "/illustrations/order/order-inside-resources.png",
    color: "var(--sage)",
  },
  {
    title: "Room for Photos & Keepsakes",
    description:
      "Thick pages and extra space designed for taping in photos, collar tags, or anything you want to keep close.",
    image: "/illustrations/order/order-inside-keepsakes.png",
    color: "var(--gold)",
  },
  {
    title: "Lay-Flat Binding",
    description:
      "The journal stays open on any page. Write with both hands free. Set it on the couch arm while your dog sleeps beside you.",
    image: "/illustrations/order/order-inside-binding.png",
    color: "var(--terracotta)",
  },
];

export function WhatsInside() {
  const ref = useScrollReveal();

  return (
    <section
      id="whats-inside"
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
          bottom: "-15%",
          left: "-8%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.07) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold-text)" }}
          >
            WHAT&apos;S INSIDE
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
            Every day of being present &mdash;{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              printed and bound.
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
            Every page was designed for where you actually are, not where
            someone thinks you should be.
          </p>
        </div>

        {/* Feature blocks — alternating layout */}
        <div className="flex flex-col gap-16">
          {features.map((f, i) => {
            const isReversed = i % 2 === 1;

            return (
              <div
                key={f.title}
                className={`reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-14 items-center`}
                style={{ transitionDelay: `${0.08 * i}s` }}
              >
                {/* Image */}
                <div
                  className={`flex justify-center ${isReversed ? "md:order-2" : ""}`}
                >
                  <div
                    className="relative"
                    style={{
                      width: "100%",
                      maxWidth: "384px",
                      aspectRatio: "1 / 1",
                    }}
                  >
                    <Image
                      src={f.image}
                      alt={f.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 384px"
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Text */}
                <div className={isReversed ? "md:order-1" : ""}>
                  {/* Accent bar */}
                  <div
                    className="mb-4"
                    style={{
                      width: "32px",
                      height: "3px",
                      borderRadius: "2px",
                      background: f.color,
                    }}
                  />
                  <h3
                    className="font-serif font-semibold mb-3"
                    style={{
                      fontSize: "1.35rem",
                      color: "var(--text)",
                      lineHeight: 1.3,
                    }}
                  >
                    {f.title}
                  </h3>
                  <p
                    className="text-[0.95rem] leading-relaxed"
                    style={{ color: "var(--text-muted)", maxWidth: "440px" }}
                  >
                    {f.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
