"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Resource data ── */
const resources = [
  {
    label: "Guide",
    icon: "/illustrations/icons/icon-supplement.webp",
    color: "var(--sage)",
    colorHex: "#5B7B5E",
    title: "Supplement Guide",
    description:
      "Research-backed supplements organized by category \u2014 what they do, suggested dosages by weight, and what to discuss with your vet.",
    href: "/resources/supplements",
    cta: "Browse supplements",
  },
  {
    label: "Guide",
    icon: "/illustrations/icons/icon-food-bowl.webp",
    color: "var(--gold)",
    colorHex: "#C4A265",
    title: "Food & Nutrition",
    description:
      "What to feed, what to avoid, and how to adjust their diet. Including homemade options, commercial foods, and appetite-boosting tips.",
    href: "/resources/food",
    cta: "Explore nutrition",
  },
  {
    label: "Guide",
    icon: "/illustrations/icons/icon-shield.webp",
    color: "var(--terracotta)",
    colorHex: "#D4856A",
    title: "House-Proofing",
    description:
      "Small changes that make a big difference. Non-slip surfaces, ramp guides, temperature management, and comfort setups for recovery.",
    href: "/resources/home",
    cta: "See checklist",
  },
];

const staggerOffsets = [0, 36, 72];

/* ── Mini vignette: Supplement preview ── */
function SupplementVignette() {
  const items = [
    { name: "Yunnan Baiyao", tag: "Blood Support", tagColor: "#D4856A" },
    { name: "Turkey Tail", tag: "Anti-Cancer", tagColor: "#5B7B5E" },
    { name: "Fish Oil", tag: "Quality of Life", tagColor: "#C4A265" },
  ];
  return (
    <div aria-hidden="true" className="mt-5 space-y-2 px-1 pb-1">
      {items.map((item) => (
        <div
          key={item.name}
          className="flex items-center justify-between rounded-lg px-3 py-1.5"
          style={{ background: "var(--cream)" }}
        >
          <span className="text-[0.74rem] font-medium" style={{ color: "var(--text)" }}>
            {item.name}
          </span>
          <span
            className="text-[0.6rem] font-semibold uppercase tracking-wide rounded-full px-2 py-0.5"
            style={{
              color: item.tagColor,
              background: `${item.tagColor}12`,
            }}
          >
            {item.tag}
          </span>
        </div>
      ))}
    </div>
  );
}

/* ── Mini vignette: Food principles ── */
function FoodVignette() {
  const principles = [
    "High protein, low carb",
    "Healthy fats are essential",
    "Cancer cells feed on glucose",
  ];
  return (
    <div aria-hidden="true" className="mt-5 px-1 pb-1">
      <div
        className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] mb-2"
        style={{ color: "var(--gold)" }}
      >
        Key Principles
      </div>
      <ul className="space-y-1.5">
        {principles.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span
              className="mt-[5px] w-[5px] h-[5px] rounded-full shrink-0"
              style={{ background: "var(--gold)", opacity: 0.5 }}
            />
            <span className="text-[0.76rem] leading-snug" style={{ color: "var(--text-muted)" }}>
              {p}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ── Mini vignette: House-proofing checklist ── */
function HouseVignette() {
  const checks = [
    "Non-slip rugs on tile floors",
    "Ramp for bed or couch access",
    "Cool, quiet resting area",
  ];
  return (
    <div aria-hidden="true" className="mt-5 px-1 pb-1">
      <div
        className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] mb-2"
        style={{ color: "var(--terracotta)" }}
      >
        Quick Checklist
      </div>
      <ul className="space-y-1.5">
        {checks.map((c) => (
          <li key={c} className="flex items-start gap-2">
            <svg
              className="mt-[3px] shrink-0"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M2.5 6L5 8.5L9.5 3.5"
                stroke="var(--terracotta)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.6"
              />
            </svg>
            <span className="text-[0.76rem] leading-snug" style={{ color: "var(--text-muted)" }}>
              {c}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const vignettes = [SupplementVignette, FoodVignette, HouseVignette];

/* ── Main component ── */
export function Resources() {
  const ref = useScrollReveal();

  return (
    <section
      id="resources"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 140px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      {/* ── Ambient background blobs ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div
          className="absolute rounded-full"
          style={{
            width: 500, height: 500,
            left: "-5%", top: "10%",
            background: "radial-gradient(circle, rgba(91,123,94,0.05) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 600, height: 600,
            left: "35%", top: "25%",
            background: "radial-gradient(circle, rgba(196,162,101,0.04) 0%, transparent 70%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            width: 420, height: 420,
            right: "-5%", top: "35%",
            background: "radial-gradient(circle, rgba(212,133,106,0.045) 0%, transparent 70%)",
          }}
        />
        {/* Floating ghost icons */}
        <Image
          src="/illustrations/icons/icon-paw-print.webp"
          alt=""
          width={90}
          height={90}
          className="absolute hidden md:block animate-drift-slow"
          style={{ top: "6%", right: "7%", opacity: 0.03 }}
        />
        <Image
          src="/illustrations/icons/icon-heart.webp"
          alt=""
          width={80}
          height={80}
          className="absolute hidden md:block animate-drift-slow"
          style={{ bottom: "10%", left: "5%", opacity: 0.025, animationDelay: "5s" }}
        />
      </div>

      <div className="relative max-w-[1100px] mx-auto">
        {/* ── Header (left-aligned) ── */}
        <div className="mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            Resources
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            The things you&apos;ll wish{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              someone had gathered for you.
            </em>
          </h2>

          {/* Gold ornament divider */}
          <div className="reveal flex items-center gap-3 mt-5" style={{ transitionDelay: "0.12s" }}>
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to right, transparent, var(--gold-light))" }}
            />
            <Image
              src="/illustrations/icons/icon-flower-ornament.webp"
              alt=""
              width={14}
              height={14}
              style={{ opacity: 0.5 }}
            />
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to left, transparent, var(--gold-light))" }}
            />
          </div>

          <p
            className="reveal text-[1.02rem] leading-relaxed mt-5"
            style={{
              color: "var(--text-muted)",
              maxWidth: "540px",
              transitionDelay: "0.16s",
            }}
          >
            Practical, research-backed guides so you don&apos;t have to dig through the internet at
            your worst moment.
          </p>
        </div>

        {/* ── Staggered card grid ── */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7">
          {resources.map((resource, i) => {
            const Vignette = vignettes[i];
            return (
              <div
                key={i}
                className="step-card-wrapper"
                style={{
                  "--step-offset": `${staggerOffsets[i]}px`,
                } as React.CSSProperties}
              >
                <Link
                  href={resource.href}
                  className="group relative paper-texture rounded-2xl p-6 transition-all duration-300 h-full flex flex-col block no-underline"
                  style={{
                    background: "white",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    color: "inherit",
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = `0 14px 36px ${resource.colorHex}18`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                  }}
                >
                  {/* Ghost icon — large, faded, top-right */}
                  <div
                    className="absolute top-2 right-2 pointer-events-none select-none"
                    aria-hidden="true"
                  >
                    <Image
                      src={resource.icon}
                      alt=""
                      width={140}
                      height={140}
                      style={{ opacity: 0.04, objectFit: "contain" }}
                    />
                  </div>

                  {/* Hero illustration */}
                  <div className="relative mb-5 transition-transform duration-300 group-hover:scale-105 origin-bottom-left">
                    <Image
                      src={resource.icon}
                      alt=""
                      width={100}
                      height={100}
                      style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                    />
                  </div>

                  {/* Label */}
                  <div
                    className="text-[0.6rem] font-semibold uppercase tracking-[0.14em] mb-2"
                    style={{ color: resource.colorHex }}
                  >
                    {resource.label}
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif text-[1.2rem] font-semibold mb-2"
                    style={{ color: "var(--text)", lineHeight: 1.3 }}
                  >
                    {resource.title}
                  </h3>

                  {/* Description */}
                  <p
                    className="text-[0.91rem] leading-relaxed flex-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {resource.description}
                  </p>

                  {/* Mini vignette */}
                  <div className="mt-auto">
                    <Vignette />
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1 mt-4 text-[0.84rem] font-semibold"
                    style={{ color: resource.colorHex }}
                  >
                    <span>{resource.cta}</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                      &rarr;
                    </span>
                  </div>

                  {/* Closing ornament rule */}
                  <div className="flex justify-center mt-5">
                    <div
                      className="h-[1px] w-[32px] rounded-full"
                      style={{
                        background: resource.colorHex,
                        opacity: 0.4,
                      }}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </div>

        {/* ── Closing beat ── */}
        <div className="reveal text-center mt-16" style={{ transitionDelay: "0.2s" }}>
          {/* Gold ornament divider */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to right, transparent, var(--gold-light))" }}
            />
            <Image
              src="/illustrations/icons/icon-flower-ornament.webp"
              alt=""
              width={14}
              height={14}
              style={{ opacity: 0.5 }}
            />
            <div
              className="h-[1px] w-[48px]"
              style={{ background: "linear-gradient(to left, transparent, var(--gold-light))" }}
            />
          </div>

          <p
            className="font-serif font-semibold"
            style={{
              fontSize: "clamp(1.15rem, 2.2vw, 1.4rem)",
              lineHeight: 1.4,
              color: "var(--text)",
            }}
          >
            You shouldn&apos;t have to be a researcher{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              and a caregiver.
            </em>
          </p>
          <p
            className="mt-3 text-[0.88rem]"
            style={{ color: "var(--text-muted)" }}
          >
            We did the digging. You focus on your dog.
          </p>
        </div>
      </div>
    </section>
  );
}
