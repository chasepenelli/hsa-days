"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

/* ── Mini vignette: Health check-in preview ── */
function TrackVignette() {
  const metrics = [
    { label: "Energy", value: 4, color: "var(--sage)" },
    { label: "Appetite", value: 3, color: "var(--gold)" },
  ];
  return (
    <div aria-hidden="true" className="mt-5 px-1 pb-1 space-y-3">
      {metrics.map((m) => (
        <div key={m.label}>
          <div
            className="text-[0.6rem] font-semibold uppercase tracking-[0.12em] mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            {m.label}
          </div>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((v) => (
              <span
                key={v}
                className="w-6 h-6 rounded-full flex items-center justify-center text-[0.65rem] font-semibold"
                style={{
                  background: v <= m.value ? m.color : "var(--cream)",
                  color: v <= m.value ? "white" : "var(--text-muted)",
                  opacity: v <= m.value ? 1 : 0.5,
                }}
              >
                {v}
              </span>
            ))}
          </div>
        </div>
      ))}
      {/* Mini sparkline */}
      <svg viewBox="0 0 100 24" className="w-full h-5 mt-1" preserveAspectRatio="none">
        <polyline
          points="0,18 16,14 33,16 50,10 66,12 83,6 100,8"
          fill="none"
          stroke="var(--sage)"
          strokeWidth="2"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <polygon
          points="0,24 0,18 16,14 33,16 50,10 66,12 83,6 100,8 100,24"
          fill="var(--sage)"
          opacity="0.06"
        />
      </svg>
    </div>
  );
}

/* ── Mini vignette: Upload zone preview ── */
function AnalyzeVignette() {
  return (
    <div aria-hidden="true" className="mt-5 px-1 pb-1">
      <div
        className="rounded-lg p-3 mb-2.5 text-center"
        style={{
          border: "1.5px dashed var(--border-strong)",
          background: "rgba(255,255,255,0.5)",
        }}
      >
        <Image
          src="/illustrations/icons/icon-upload-cloud.png"
          alt=""
          width={18}
          height={18}
          className="mx-auto mb-1"
          style={{ objectFit: "contain", opacity: 0.5 }}
        />
        <span className="text-[0.68rem]" style={{ color: "var(--text-muted)" }}>
          Drop your vet report here
        </span>
      </div>
      <div
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-md"
        style={{ background: "rgba(212,133,106,0.06)" }}
      >
        <span
          className="w-1.5 h-1.5 rounded-full shrink-0"
          style={{ background: "var(--terracotta)" }}
        />
        <span className="text-[0.7rem]" style={{ color: "var(--text)" }}>
          Albumin: 2.8 g/dL — slightly low
        </span>
      </div>
    </div>
  );
}

/* ── Mini vignette: Supplement tracker preview ── */
function SupplementVignette() {
  const items = [
    { name: "Yunnan Baiyao", tag: "Blood Support", tagColor: "#D4856A" },
    { name: "Turkey Tail", tag: "Anti-Cancer", tagColor: "#5B7B5E" },
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

const panels = [
  {
    title: "Health Dashboard",
    description:
      "Log daily symptoms, track medications, and see trends over time. Know at a glance how your dog is doing.",
    href: "/track",
    color: "var(--sage)",
    colorHex: "#5B7B5E",
    cta: "Start tracking",
    Vignette: TrackVignette,
  },
  {
    title: "AI Report Analysis",
    description:
      "Upload vet reports, bloodwork, or lab results. Get a plain-English explanation and suggested questions for your vet.",
    href: "/tools/analyze",
    color: "var(--terracotta)",
    colorHex: "#D4856A",
    cta: "Analyze a report",
    Vignette: AnalyzeVignette,
  },
  {
    title: "Supplement Tracker",
    description:
      "17 HSA-relevant supplements with weight-adjusted doses. Track what you're giving and see what other families use.",
    href: "/resources/supplements",
    color: "var(--gold)",
    colorHex: "#C4A265",
    cta: "Browse supplements",
    Vignette: SupplementVignette,
  },
];

const staggerOffsets = [0, 36, 72];

export function Tools() {
  const ref = useScrollReveal();

  return (
    <section
      id="tools"
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
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold-text)" }}
          >
            Tools
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            Track every day.{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              Understand every report.
            </em>
          </h2>
          <p
            className="reveal text-[1.02rem] leading-relaxed mt-4"
            style={{
              color: "var(--text-muted)",
              maxWidth: "540px",
              transitionDelay: "0.16s",
            }}
          >
            Practical tools built for HSA caregivers — because you have enough
            on your mind without hunting for answers.
          </p>
        </div>

        {/* Panel grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-7">
          {panels.map((panel, i) => (
            <div
              key={panel.href}
              className="step-card-wrapper"
              style={{
                "--step-offset": `${staggerOffsets[i]}px`,
              } as React.CSSProperties}
            >
              <Link
                href={panel.href}
                className="group relative paper-texture rounded-2xl p-6 transition-all duration-300 h-full flex flex-col block no-underline"
                style={{
                  background: "white",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  color: "inherit",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.boxShadow = `0 14px 36px ${panel.colorHex}18`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                }}
              >
                {/* Accent bar */}
                <div
                  className="w-10 h-[3px] rounded-full mb-5"
                  style={{ background: panel.color }}
                />

                {/* Title */}
                <h3
                  className="font-serif text-[1.15rem] font-semibold mb-2"
                  style={{ color: "var(--text)", lineHeight: 1.3 }}
                >
                  {panel.title}
                </h3>

                {/* Description */}
                <p
                  className="text-[0.88rem] leading-relaxed flex-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {panel.description}
                </p>

                {/* Vignette */}
                <div className="mt-auto">
                  <panel.Vignette />
                </div>

                {/* CTA */}
                <div
                  className="flex items-center gap-1 mt-4 text-[0.84rem] font-semibold"
                  style={{ color: panel.colorHex }}
                >
                  <span>{panel.cta}</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-1">
                    &rarr;
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="reveal text-center mt-14" style={{ transitionDelay: "0.2s" }}>
          <Link
            href="/tools"
            className="inline-flex items-center gap-1.5 text-[0.88rem] font-semibold no-underline transition-opacity duration-200 hover:opacity-70"
            style={{ color: "var(--sage)" }}
          >
            See all tools
            <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
