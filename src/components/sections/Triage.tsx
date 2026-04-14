"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const paths = [
  {
    eyebrow: "Right now",
    title: "Is this an emergency?",
    description:
      "Pale gums, sudden collapse, labored breathing, distended belly. Know the signs and what to do.",
    href: "/resources/emergency",
    cta: "Emergency guide",
    color: "var(--terracotta)",
    colorHex: "#D4856A",
    bg: "rgba(212,133,106,0.06)",
    borderColor: "rgba(212,133,106,0.2)",
    icon: "/illustrations/icons/icon-heart.png",
  },
  {
    eyebrow: "Just diagnosed",
    title: "Where do I even start?",
    description:
      "What HSA actually is, what the stages mean, treatment options explained in plain English, and what to ask your vet.",
    href: "/resources/understanding-hsa",
    cta: "Start here",
    color: "var(--sage)",
    colorHex: "#5B7B5E",
    bg: "rgba(91,123,94,0.05)",
    borderColor: "rgba(91,123,94,0.18)",
    icon: "/illustrations/icons/icon-paw-print.png",
  },
  {
    eyebrow: "In treatment",
    title: "What can I do right now?",
    description:
      "Supplements, nutrition, house-proofing, daily health tracking — practical things you can start today.",
    href: "/resources/supplements",
    cta: "See the guides",
    color: "var(--gold)",
    colorHex: "#C4A265",
    bg: "rgba(196,162,101,0.06)",
    borderColor: "rgba(196,162,101,0.2)",
    icon: "/illustrations/icons/icon-supplement.png",
  },
];

export function Triage() {
  const ref = useScrollReveal();

  return (
    <section
      id="triage"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative"
      style={{
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--warm-white)",
      }}
    >
      <div className="max-w-[900px] mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-10">
          <h2
            className="font-serif font-semibold tracking-tight mb-3"
            style={{
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              lineHeight: 1.3,
            }}
          >
            What do you need{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              right now?
            </em>
          </h2>
          <p
            className="text-[0.95rem] leading-relaxed mx-auto"
            style={{ color: "var(--text-muted)", maxWidth: "440px" }}
          >
            There&apos;s no wrong place to start. Pick what feels most urgent.
          </p>
        </div>

        {/* Triage cards */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-5">
          {paths.map((path) => (
            <Link
              key={path.href}
              href={path.href}
              className="group relative rounded-2xl p-6 no-underline transition-all duration-300 flex flex-col"
              style={{
                background: path.bg,
                border: `1px solid ${path.borderColor}`,
                color: "inherit",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 12px 32px ${path.colorHex}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow = "";
              }}
            >
              {/* Icon */}
              <div className="mb-4">
                <Image
                  src={path.icon}
                  alt=""
                  width={36}
                  height={36}
                  style={{ objectFit: "contain", opacity: 0.7 }}
                />
              </div>

              {/* Eyebrow */}
              <div
                className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] mb-2"
                style={{ color: path.colorHex }}
              >
                {path.eyebrow}
              </div>

              {/* Title */}
              <h3
                className="font-serif text-[1.1rem] font-semibold mb-2.5"
                style={{ color: "var(--text)", lineHeight: 1.3 }}
              >
                {path.title}
              </h3>

              {/* Description */}
              <p
                className="text-[0.88rem] leading-relaxed flex-1 mb-4"
                style={{ color: "var(--text-muted)" }}
              >
                {path.description}
              </p>

              {/* CTA */}
              <div
                className="flex items-center gap-1 text-[0.85rem] font-semibold"
                style={{ color: path.colorHex }}
              >
                <span>{path.cta}</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                  &rarr;
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
