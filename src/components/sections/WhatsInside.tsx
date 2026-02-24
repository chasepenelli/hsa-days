"use client";

import { useState } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: "/illustrations/icons/icon-journal.png",
    rgb: "91,123,94",
    accent: "var(--sage)",
    title: "30 Daily Reflections",
    description:
      "Honest, grounding writing that meets you where you are \u2014 not clinical, not cold, just real.",
  },
  {
    icon: "/illustrations/icons/icon-pencil.png",
    rgb: "196,162,101",
    accent: "var(--gold)",
    title: "Private Journaling",
    description:
      "A writing prompt each day with a journal built right in. Only you can see what you write.",
  },
  {
    icon: "/illustrations/icons/icon-dog-person.png",
    rgb: "212,133,106",
    accent: "var(--terracotta)",
    title: "Activities Together",
    description:
      "Simple, meaningful things to do with your dog. Not bucket-list pressure \u2014 just intentional moments.",
  },
  {
    icon: "/illustrations/icons/icon-lightbulb.png",
    rgb: "91,123,94",
    accent: "var(--sage)",
    title: "Practical Guides",
    description:
      "Supplements, nutrition, house-proofing \u2014 the stuff you actually need but can\u2019t find in one place.",
  },
  {
    icon: "/illustrations/icons/icon-calendar.png",
    rgb: "196,162,101",
    accent: "var(--gold)",
    title: "Morning Emails",
    description:
      "A gentle nudge each morning with the day\u2019s quote and a preview. One tap to open today\u2019s page.",
  },
  {
    icon: "/illustrations/icons/icon-community.png",
    rgb: "212,133,106",
    accent: "var(--terracotta)",
    title: "Community Stories",
    description:
      "You\u2019re not the first to walk this road. Read stories from other families \u2014 and share yours when ready.",
  },
];

function FeatureCard({ feature }: { feature: (typeof features)[number] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        border: hovered
          ? `1px solid rgba(${feature.rgb},0.3)`
          : "1px solid var(--border)",
        boxShadow: hovered
          ? `0 8px 24px rgba(${feature.rgb},0.12)`
          : "0 2px 8px rgba(0,0,0,0.03)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition:
          "border 0.22s ease, box-shadow 0.22s ease, transform 0.22s cubic-bezier(0.22,1,0.36,1)",
      }}
    >
      {/* Illustration area */}
      <div
        className="relative w-full flex items-center justify-center overflow-hidden"
        style={{
          aspectRatio: "4 / 3",
          background: hovered
            ? `rgba(${feature.rgb},0.08)`
            : `rgba(${feature.rgb},0.04)`,
          transition: "background 0.22s ease",
        }}
      >
        <Image
          src={feature.icon}
          alt=""
          width={120}
          height={120}
          style={{
            objectFit: "contain",
            mixBlendMode: "multiply",
            transform: hovered ? "scale(1.06)" : "scale(1)",
            transition: "transform 0.35s cubic-bezier(0.22,1,0.36,1)",
          }}
        />
      </div>

      {/* Content */}
      <div className="px-5 py-5">
        {/* Accent line */}
        <div
          className="w-6 h-[2.5px] rounded-full mb-3"
          style={{ background: feature.accent }}
        />
        <h3
          className="font-serif font-semibold mb-2"
          style={{
            fontSize: "1.05rem",
            color: "var(--text)",
            lineHeight: 1.3,
          }}
        >
          {feature.title}
        </h3>
        <p
          className="text-[0.88rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          {feature.description}
        </p>
      </div>
    </div>
  );
}

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
          left: "-10%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.06) 0%, transparent 68%)",
          animationName: "ambientGlow",
          animationDuration: "8s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      <div className="relative max-w-[960px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--sage)" }}
          >
            What&apos;s Inside
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
            Everything a day{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              brings you
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "480px",
              transitionDelay: "0.16s",
            }}
          >
            Six elements, woven together, every single day for 30 days.
          </p>
        </div>

        {/* Feature card grid */}
        <div className="reveal-stagger grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
