"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const screens = [
  {
    label: "Health Tracker",
    description: "Daily symptom check-ins and trends",
    mockup: "/illustrations/app-preview/screen-track.png",
    color: "var(--sage)",
  },
  {
    label: "Supplement Guide",
    description: "Weight-adjusted doses for 17 supplements",
    mockup: "/illustrations/app-preview/screen-supplements.png",
    color: "var(--gold)",
  },
  {
    label: "Vet Report Analysis",
    description: "AI-powered plain-English explanations",
    mockup: "/illustrations/app-preview/screen-analyze.png",
    color: "var(--terracotta)",
  },
];

export function AppPreview() {
  const ref = useScrollReveal();

  return (
    <section
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(60px, 8vw, 100px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--warm-white)",
      }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="reveal text-center mb-12">
          <div
            className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold-text)" }}
          >
            Install the App
          </div>
          <h2
            className="font-serif font-semibold tracking-tight mb-4"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              transitionDelay: "0.08s",
            }}
          >
            Everything you need,{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              one tap away.
            </em>
          </h2>
          <p
            className="text-[1.02rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "480px",
              transitionDelay: "0.16s",
            }}
          >
            Add HSA Days to your home screen for instant access, offline
            browsing, and a full-screen experience — no app store needed.
          </p>
        </div>

        {/* Phone mockups */}
        <div className="reveal-stagger flex justify-center gap-5 md:gap-8 mb-12 px-2">
          {screens.map((screen, i) => (
            <div
              key={screen.label}
              className="flex flex-col items-center"
              style={{
                maxWidth: "220px",
                flex: "0 1 220px",
                // Stagger vertically for depth
                transform: i === 1 ? "translateY(-12px)" : "none",
              }}
            >
              {/* Phone frame */}
              <div
                className="relative w-full rounded-[24px] overflow-hidden"
                style={{
                  aspectRatio: "9 / 16",
                  background: "var(--cream)",
                  border: "3px solid var(--border-strong)",
                  boxShadow:
                    "0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04), inset 0 0 0 1px rgba(255,255,255,0.5)",
                }}
              >
                {/* Status bar */}
                <div
                  className="flex items-center justify-between px-4 pt-2 pb-1"
                  style={{ background: "var(--warm-white)" }}
                >
                  <span
                    className="text-[0.5rem] font-semibold"
                    style={{ color: "var(--text-muted)" }}
                  >
                    9:41
                  </span>
                  <div className="flex gap-1 items-center">
                    <span
                      className="block w-3 h-1.5 rounded-sm"
                      style={{ background: "var(--text-muted)", opacity: 0.4 }}
                    />
                    <span
                      className="block w-2.5 h-1.5 rounded-sm"
                      style={{ background: "var(--text-muted)", opacity: 0.3 }}
                    />
                  </div>
                </div>

                {/* Screen content — illustration as preview */}
                <div className="relative flex-1" style={{ height: "calc(100% - 68px)" }}>
                  <Image
                    src={screen.mockup}
                    alt={`${screen.label} screen`}
                    fill
                    sizes="220px"
                    className="object-cover object-top"
                    style={{ opacity: 1 }}
                  />
                </div>

                {/* Bottom nav mockup */}
                <div
                  className="flex items-center justify-around px-2 py-1.5"
                  style={{
                    background: "rgba(250,248,245,0.95)",
                    borderTop: "1px solid var(--border)",
                  }}
                >
                  {["Resources", "Track", "Tools"].map((tab, ti) => (
                    <div key={tab} className="flex flex-col items-center gap-0.5">
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{
                          background:
                            ti === i ? "var(--sage)" : "var(--border-strong)",
                          opacity: ti === i ? 1 : 0.4,
                        }}
                      />
                      <span
                        className="text-[0.4rem] font-semibold"
                        style={{
                          color:
                            ti === i ? "var(--sage)" : "var(--text-muted)",
                          opacity: ti === i ? 1 : 0.5,
                        }}
                      >
                        {tab}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Label below phone */}
              <div className="mt-4 text-center">
                <div
                  className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] mb-0.5"
                  style={{ color: screen.color }}
                >
                  {screen.label}
                </div>
                <div
                  className="text-[0.72rem] leading-snug"
                  style={{ color: "var(--text-muted)" }}
                >
                  {screen.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Features row */}
        <div className="reveal flex flex-wrap justify-center gap-6 md:gap-10 mb-10" style={{ transitionDelay: "0.2s" }}>
          {[
            { icon: "icon-paw-print.png", text: "Works offline" },
            { icon: "icon-heart.png", text: "No app store needed" },
            { icon: "icon-supplement.png", text: "Full-screen experience" },
          ].map((feature) => (
            <div
              key={feature.text}
              className="flex items-center gap-2.5"
            >
              <Image
                src={`/illustrations/icons/${feature.icon}`}
                alt=""
                width={20}
                height={20}
                style={{ objectFit: "contain", opacity: 0.6 }}
              />
              <span
                className="text-[0.85rem] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {feature.text}
              </span>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="reveal text-center" style={{ transitionDelay: "0.28s" }}>
          <Link
            href="/resources/install"
            className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl no-underline font-semibold text-[0.9rem] transition-all duration-200"
            style={{
              background: "var(--sage)",
              color: "white",
              boxShadow: "0 4px 14px rgba(91,123,94,0.3)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "translateY(-2px)";
              e.currentTarget.style.boxShadow = "0 8px 20px rgba(91,123,94,0.35)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(91,123,94,0.3)";
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
              <rect x="3" y="1" width="10" height="14" rx="2" stroke="currentColor" strokeWidth="1.3" />
              <line x1="6" y1="12" x2="10" y2="12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
            </svg>
            Add to Home Screen
          </Link>
          <p
            className="mt-3 text-[0.78rem]"
            style={{ color: "var(--text-muted)", opacity: 0.6 }}
          >
            iPhone &middot; Android &middot; Desktop
          </p>
        </div>
      </div>
    </section>
  );
}
