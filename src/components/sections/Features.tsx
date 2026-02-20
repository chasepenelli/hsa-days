"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  {
    icon: "/illustrations/icons/icon-journal.png",
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.09)",
    title: "30 Daily Reflections",
    description:
      "Honest, grounding writing that helps you process what you're feeling. Not clinical. Not cold. Just real words from someone who gets it.",
    span: "md:col-span-2",
  },
  {
    icon: "/illustrations/icons/icon-house.png",
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.09)",
    title: "Private Journaling",
    description:
      "Each day has a writing prompt with a journal built right into the page. Your entries are saved privately — only you can see them.",
    span: "",
  },
  {
    icon: "/illustrations/icons/icon-dog-person.png",
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.09)",
    title: "Activities With Your Dog",
    description:
      "Simple, meaningful things to do together. Not bucket-list pressure — just intentional moments. A favorite walk. A new treat. Being present.",
    span: "",
  },
  {
    icon: "/illustrations/icons/icon-star.png",
    color: "var(--sage)",
    bg: "rgba(91,123,94,0.09)",
    title: "Practical Guides",
    description:
      "Supplement research, nutrition guidance, house-proofing tips — the stuff you actually need but can't find in one place.",
    span: "",
  },
  {
    icon: "/illustrations/icons/icon-calendar.png",
    color: "var(--gold)",
    bg: "rgba(196,162,101,0.09)",
    title: "Daily Morning Emails",
    description:
      "A gentle nudge each morning with the day's quote and a preview. One tap to open today's full page. Go at your pace.",
    span: "",
  },
  {
    icon: "/illustrations/icons/icon-community.png",
    color: "var(--terracotta)",
    bg: "rgba(212,133,106,0.09)",
    title: "Community Stories",
    description:
      "You're not the first to go through this. Read stories from other HSA families and share your own when you're ready.",
    span: "md:col-span-2",
  },
];

export function Features() {
  const ref = useScrollReveal();

  return (
    <section
      id="features"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--warm-white)",
      }}
    >
      <div className="max-w-[1100px] mx-auto">

        {/* Header */}
        <div className="mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            What&apos;s Inside
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            More than a book.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              A companion that meets you where you are.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed"
            style={{
              color: "var(--text-muted)",
              maxWidth: "560px",
              transitionDelay: "0.16s",
            }}
          >
            Everything lives on the website, accessible anytime. Read, write, and
            come back whenever you need to.
          </p>
        </div>

        {/* Feature grid — asymmetric bento-style */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-4">
          {features.map((feature, i) => (
            <div
              key={i}
              className={`group rounded-2xl p-7 transition-all duration-350 hover:-translate-y-1.5 hover:shadow-[0_10px_40px_rgba(0,0,0,0.07)] ${feature.span}`}
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110"
                style={{
                  background: feature.bg,
                  border: `1px solid ${feature.bg.replace("0.09", "0.2")}`,
                }}
              >
                <Image
                  src={feature.icon}
                  alt=""
                  width={28}
                  height={28}
                  style={{ objectFit: "contain" }}
                />
              </div>

              <h3
                className="font-serif text-[1.08rem] font-semibold mb-2.5"
                style={{ color: "var(--text)" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-[0.91rem] leading-relaxed"
                style={{ color: "var(--text-muted)" }}
              >
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
