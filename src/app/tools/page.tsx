"use client";

import Link from "next/link";

const tools = [
  {
    title: "Health Tracker",
    description:
      "Log daily symptoms, medications, meals, and vet visits. See trends over time with visual sparklines.",
    href: "/track",
    color: "var(--sage)",
    colorHex: "#5B7B5E",
    cta: "Start tracking",
  },
  {
    title: "Vet Report Analysis",
    description:
      "Upload bloodwork, lab results, or imaging reports. Get a plain-English explanation of what they mean.",
    href: "/tools/analyze",
    color: "var(--terracotta)",
    colorHex: "#D4856A",
    cta: "Analyze a report",
  },
  {
    title: "Supplement Tracker",
    description:
      "Browse 17 HSA-relevant supplements with weight-adjusted doses. Track what you're giving and see what other families use.",
    href: "/resources/supplements",
    color: "var(--gold)",
    colorHex: "#C4A265",
    cta: "Browse supplements",
  },
  {
    title: "Meal Plan Builder",
    description:
      "Build a custom anti-cancer meal plan based on your dog's weight and dietary preferences.",
    href: "/resources/diet#meal-plan",
    color: "var(--gold)",
    colorHex: "#C4A265",
    cta: "Build a plan",
  },
];

export default function ToolsPage() {
  return (
    <div
      className="px-6"
      style={{
        paddingTop: "clamp(100px, 14vw, 140px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      <div className="max-w-[900px] mx-auto">
        <div
          className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
          style={{ color: "var(--gold-text)" }}
        >
          Tools
        </div>
        <h1
          className="font-serif text-[clamp(1.8rem,4vw,2.6rem)] font-semibold tracking-tight mb-4"
          style={{ lineHeight: 1.25 }}
        >
          Track every day.{" "}
          <em className="italic" style={{ color: "var(--sage)" }}>
            Understand every report.
          </em>
        </h1>
        <p
          className="text-[1.05rem] leading-relaxed mb-12"
          style={{ color: "var(--text-muted)", maxWidth: "520px" }}
        >
          Practical tools built for HSA caregivers — because you have enough on
          your mind without hunting for answers.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group rounded-2xl p-6 no-underline paper-texture transition-all duration-300"
              style={{
                background: "white",
                border: "1px solid var(--border)",
                boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.boxShadow = `0 14px 36px ${tool.colorHex}18`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "";
                e.currentTarget.style.boxShadow =
                  "0 1px 4px rgba(0,0,0,0.04)";
              }}
            >
              {/* Accent bar */}
              <div
                className="w-10 h-[3px] rounded-full mb-4"
                style={{ background: tool.color }}
              />
              <h2
                className="font-serif text-[1.1rem] font-semibold mb-2"
                style={{ color: "var(--text)" }}
              >
                {tool.title}
              </h2>
              <p
                className="text-[0.88rem] leading-relaxed mb-5"
                style={{ color: "var(--text-muted)" }}
              >
                {tool.description}
              </p>
              <span
                className="inline-flex items-center gap-1 text-[0.85rem] font-semibold transition-all duration-200"
                style={{ color: tool.color }}
              >
                {tool.cta}
                <span
                  className="inline-block transition-transform duration-200 group-hover:translate-x-1"
                  aria-hidden="true"
                >
                  &rarr;
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
