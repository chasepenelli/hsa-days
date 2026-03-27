"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { AmbientOrb } from "./AmbientOrb";

interface Props {
  intro: {
    title: string;
    subtitle: string;
    urgentNote: string;
  };
  gumColors: {
    color: string;
    hex: string;
    meaning: string;
    action: string;
    severity: "normal" | "warning" | "emergency";
  }[];
  emergencyScenarios: {
    id: string;
    title: string;
    subtitle: string;
    accentColor: string;
    description: string;
    signs: {
      sign: string;
      description: string;
      severity: "immediate" | "urgent" | "monitor";
    }[];
    whatToDo: string[];
    atTheVet: string;
  }[];
  emergencyKit: {
    item: string;
    why: string;
    priority: "essential" | "recommended";
  }[];
  vetConversations: {
    question: string;
    why: string;
  }[];
  dailyMonitoring: {
    item: string;
    detail: string;
  }[];
}

// Parse **bold** markdown into JSX with <strong> tags
function parseBold(text: string): React.ReactNode {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
}

const SEVERITY_SIGN_DOT: Record<
  "immediate" | "urgent" | "monitor",
  { color: string; label: string }
> = {
  immediate: { color: "#C0392B", label: "Immediate" },
  urgent: { color: "var(--gold)", label: "Urgent" },
  monitor: { color: "var(--text-muted)", label: "Monitor" },
};

const SEVERITY_GUM_STYLES: Record<
  "normal" | "warning" | "emergency",
  { bg: string; color: string; label: string }
> = {
  normal: { bg: "#E8F5E9", color: "#2E7D32", label: "Normal" },
  warning: {
    bg: "color-mix(in srgb, var(--gold) 15%, transparent)",
    color: "var(--gold)",
    label: "Warning",
  },
  emergency: {
    bg: "color-mix(in srgb, var(--terracotta) 15%, transparent)",
    color: "var(--terracotta)",
    label: "Emergency",
  },
};

const NAV_LINKS = [
  { href: "#gum-colors", label: "Gum Colors" },
  { href: "#emergencies", label: "Emergencies" },
  { href: "#emergency-kit", label: "Emergency Kit" },
  { href: "#vet-talks", label: "Talk to Your Vet" },
  { href: "#daily-monitoring", label: "Daily Monitoring" },
];

export default function EmergencyPageClient({
  intro,
  gumColors,
  emergencyScenarios,
  emergencyKit,
  vetConversations,
  dailyMonitoring,
}: Props) {
  const sectionRef = useScrollReveal();

  // First scenario expanded by default
  const [expandedScenarios, setExpandedScenarios] = useState<Set<string>>(
    () => new Set(emergencyScenarios.length > 0 ? [emergencyScenarios[0].id] : [])
  );
  const [expandedVetSections, setExpandedVetSections] = useState<Set<string>>(
    new Set()
  );

  function toggleScenario(id: string) {
    setExpandedScenarios((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function toggleVetSection(id: string) {
    setExpandedVetSections((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  const essentialItems = emergencyKit.filter((i) => i.priority === "essential");
  const recommendedItems = emergencyKit.filter(
    (i) => i.priority === "recommended"
  );

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-[100dvh] pb-24"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Hero ═══ */}
      <div
        className="pt-24 pb-8 px-6"
        style={{
          background: "var(--warm-white)",
          borderBottom: "1px solid var(--border)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AmbientOrb top="0%" right="0%" size={220} color="rgba(212,133,106,0.10)" duration={10} />
        <div className="max-w-[800px] mx-auto">
          {/* Eyebrow */}
          <p
            className="font-semibold tracking-widest uppercase mb-3"
            style={{
              fontSize: "var(--text-fine)",
              color: "var(--terracotta)",
              letterSpacing: "0.12em",
            }}
          >
            Emergency Preparedness
          </p>

          {/* Title + illustration row */}
          <div className="flex items-start justify-between gap-6 mb-3">
            <div className="flex-1 min-w-0">
              <h1
                className="font-serif font-semibold reveal"
                style={{
                  fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
                  color: "var(--text)",
                  lineHeight: 1.2,
                }}
              >
                {intro.title}
              </h1>
            </div>
            {/* Hero illustration */}
            <div className="hidden sm:block flex-shrink-0">
              <Image
                src="/illustrations/resources/emergency-hero.png"
                alt="Emergency preparedness illustration"
                width={240}
                height={140}
                style={{
                  objectFit: "contain",
                }}
              />
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="mb-6 leading-relaxed reveal"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
              maxWidth: 600,
            }}
          >
            {intro.subtitle}
          </p>

          {/* Urgent callout — impossible to miss */}
          <div
            className="rounded-2xl px-6 py-5 reveal"
            style={{
              background: "color-mix(in srgb, var(--terracotta) 12%, #fff0ee)",
              border: "2.5px solid var(--terracotta)",
            }}
          >
            <div className="flex items-start gap-3">
              {/* Alert icon */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{
                  width: 36,
                  height: 36,
                  background: "var(--terracotta)",
                  marginTop: 2,
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>
              <p
                className="font-semibold leading-snug"
                style={{
                  fontSize: "clamp(1rem, 2.5vw, 1.125rem)",
                  color: "var(--terracotta)",
                }}
              >
                {intro.urgentNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Quick Nav ═══ */}
      <div
        className="sticky z-20 px-6"
        style={{
          top: 56,
          background: "rgba(250,248,245,0.96)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="max-w-[800px] mx-auto py-3 flex gap-2"
          style={{
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex-shrink-0 no-underline"
              style={{
                minHeight: 36,
                padding: "6px 14px",
                borderRadius: 9999,
                fontSize: "var(--text-body-sm)",
                fontWeight: 500,
                background: "white",
                color: "var(--text-muted)",
                border: "1.5px solid var(--border)",
                whiteSpace: "nowrap",
                display: "inline-flex",
                alignItems: "center",
                transition: "all 180ms ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--terracotta)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--terracotta)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-muted)";
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* ═══ Gum Color Guide — light terracotta band ═══ */}
      <div
        id="gum-colors"
        style={{ background: "rgba(212, 133, 106, 0.05)" }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-12">
          {/* Section header with illustration */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <h2
                className="font-serif font-semibold mb-1 reveal"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  color: "var(--text)",
                }}
              >
                Know Your Dog&apos;s Gum Color
              </h2>
              <p
                className="reveal"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                Healthy gums are pink and moist. Any deviation is a signal worth
                knowing.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/illustrations/resources/emergency-gum-check.png"
                alt="Gum color check illustration"
                width={120}
                height={120}
                style={{
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 reveal">
            {gumColors.map((gum) => {
              const sev = SEVERITY_GUM_STYLES[gum.severity];
              return (
                <div
                  key={gum.color}
                  className="rounded-2xl p-5"
                  style={{
                    background: "white",
                    border: "1.5px solid var(--border)",
                  }}
                >
                  {/* Color swatch + name + badge row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="rounded-full flex-shrink-0"
                      style={{
                        width: 56,
                        height: 56,
                        background: gum.hex,
                        border: "2px solid rgba(0,0,0,0.08)",
                        boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="font-semibold"
                        style={{
                          fontSize: "var(--text-body)",
                          color: "var(--text)",
                          lineHeight: 1.3,
                        }}
                      >
                        {gum.color}
                      </p>
                    </div>
                    {/* Severity badge */}
                    <span
                      className="flex-shrink-0 rounded-full px-2.5 py-0.5 font-semibold"
                      style={{
                        fontSize: "var(--text-fine)",
                        background: sev.bg,
                        color: sev.color,
                      }}
                    >
                      {sev.label}
                    </span>
                  </div>

                  {/* Meaning */}
                  <p
                    className="mb-2 leading-relaxed"
                    style={{
                      fontSize: "var(--text-body-sm)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{ color: "var(--text)" }}
                    >
                      What it means:{" "}
                    </span>
                    {gum.meaning}
                  </p>

                  {/* Action */}
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: "var(--text-body-sm)",
                      color:
                        gum.severity === "emergency"
                          ? "var(--terracotta)"
                          : "var(--text-muted)",
                      fontWeight:
                        gum.severity === "emergency" ? 600 : undefined,
                    }}
                  >
                    <span
                      className="font-semibold"
                      style={{
                        color:
                          gum.severity === "emergency"
                            ? "var(--terracotta)"
                            : "var(--text)",
                      }}
                    >
                      What to do:{" "}
                    </span>
                    {gum.action}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ Emergency Scenarios — warm-white band ═══ */}
      <div
        id="emergencies"
        style={{ background: "var(--warm-white)" }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-12">
          {/* Section header with illustration */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <h2
                className="font-serif font-semibold mb-1 reveal"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  color: "var(--text)",
                }}
              >
                Emergency Scenarios
              </h2>
              <p
                className="reveal"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                Learn the signs now so you can act quickly when it matters.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/illustrations/resources/emergency-crisis-scene.png"
                alt="Emergency crisis scene illustration"
                width={120}
                height={120}
                style={{
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>

          <div className="space-y-4">
            {emergencyScenarios.map((scenario) => {
              const isExpanded = expandedScenarios.has(scenario.id);
              const isVetExpanded = expandedVetSections.has(scenario.id);

              return (
                <div
                  key={scenario.id}
                  className="rounded-2xl overflow-hidden reveal"
                  style={{
                    background: "white",
                    border: "1.5px solid var(--border)",
                    borderLeft: `4px solid ${scenario.accentColor}`,
                  }}
                >
                  {/* Header — always visible, click to expand */}
                  <button
                    type="button"
                    onClick={() => toggleScenario(scenario.id)}
                    className="w-full text-left cursor-pointer"
                    style={{
                      padding: "20px 20px 16px 20px",
                      background: "transparent",
                      border: "none",
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p
                          className="font-serif font-semibold leading-snug"
                          style={{
                            fontSize: "clamp(1.05rem, 2.5vw, 1.25rem)",
                            color: "var(--text)",
                          }}
                        >
                          {scenario.title}
                        </p>
                        <p
                          style={{
                            fontSize: "var(--text-body-sm)",
                            color: scenario.accentColor,
                            fontWeight: 500,
                            marginTop: 2,
                          }}
                        >
                          {scenario.subtitle}
                        </p>
                      </div>
                      {/* Chevron */}
                      <div
                        className="flex-shrink-0 flex items-center justify-center rounded-full"
                        style={{
                          width: 32,
                          height: 32,
                          background: isExpanded
                            ? `color-mix(in srgb, ${scenario.accentColor} 12%, transparent)`
                            : "var(--cream)",
                          transition: "background 200ms ease",
                          marginTop: 2,
                        }}
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke={
                            isExpanded
                              ? scenario.accentColor
                              : "var(--text-muted)"
                          }
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={{
                            transform: isExpanded
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                            transition: "transform 200ms ease",
                          }}
                        >
                          <polyline points="6 9 12 15 18 9" />
                        </svg>
                      </div>
                    </div>

                    {/* Description — always visible */}
                    <p
                      className="mt-3 leading-relaxed"
                      style={{
                        fontSize: "var(--text-body-sm)",
                        color: "var(--text-muted)",
                        textAlign: "left",
                      }}
                    >
                      {scenario.description}
                    </p>
                  </button>

                  {/* Expanded content */}
                  {isExpanded && (
                    <div
                      style={{
                        borderTop: "1px solid var(--border)",
                        padding: "20px",
                      }}
                    >
                      {/* Signs */}
                      <p
                        className="font-semibold mb-3"
                        style={{
                          fontSize: "var(--text-body-sm)",
                          color: "var(--text)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        Warning Signs
                      </p>
                      <div className="space-y-2.5 mb-6">
                        {scenario.signs.map((s, idx) => {
                          const dot = SEVERITY_SIGN_DOT[s.severity];
                          return (
                            <div key={idx} className="flex items-start gap-3">
                              {/* Severity dot */}
                              <div
                                className="flex-shrink-0 rounded-full mt-1.5"
                                style={{
                                  width: 10,
                                  height: 10,
                                  background: dot.color,
                                  boxShadow:
                                    s.severity === "immediate"
                                      ? `0 0 0 3px color-mix(in srgb, ${dot.color} 20%, transparent)`
                                      : "none",
                                }}
                                title={dot.label}
                              />
                              <div>
                                <span
                                  className="font-semibold"
                                  style={{
                                    fontSize: "var(--text-body-sm)",
                                    color: "var(--text)",
                                  }}
                                >
                                  {s.sign}
                                </span>
                                {s.description && (
                                  <span
                                    style={{
                                      fontSize: "var(--text-body-sm)",
                                      color: "var(--text-muted)",
                                    }}
                                  >
                                    {" "}
                                    — {s.description}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Severity legend */}
                      <div className="flex flex-wrap gap-4 mb-6">
                        {(
                          [
                            "immediate",
                            "urgent",
                            "monitor",
                          ] as const
                        ).map((sev) => {
                          const dot = SEVERITY_SIGN_DOT[sev];
                          return (
                            <div
                              key={sev}
                              className="flex items-center gap-1.5"
                            >
                              <div
                                className="rounded-full"
                                style={{
                                  width: 8,
                                  height: 8,
                                  background: dot.color,
                                }}
                              />
                              <span
                                style={{
                                  fontSize: "var(--text-fine)",
                                  color: "var(--text-muted)",
                                }}
                              >
                                {dot.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* What To Do */}
                      <p
                        className="font-semibold mb-3"
                        style={{
                          fontSize: "var(--text-body-sm)",
                          color: "var(--text)",
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                        }}
                      >
                        What To Do
                      </p>
                      <ol className="space-y-2.5 mb-6">
                        {scenario.whatToDo.map((step, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            {/* Step number */}
                            <span
                              className="flex-shrink-0 flex items-center justify-center rounded-full font-bold"
                              style={{
                                width: 24,
                                height: 24,
                                minWidth: 24,
                                background: scenario.accentColor,
                                color: "white",
                                fontSize: 12,
                                marginTop: 1,
                              }}
                            >
                              {idx + 1}
                            </span>
                            <p
                              className="leading-relaxed"
                              style={{
                                fontSize: "var(--text-body)",
                                color: "var(--text)",
                              }}
                            >
                              {parseBold(step)}
                            </p>
                          </li>
                        ))}
                      </ol>

                      {/* At The Vet — expandable sub-section */}
                      <div
                        className="rounded-xl overflow-hidden"
                        style={{
                          border: "1px solid var(--border)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => toggleVetSection(scenario.id)}
                          className="w-full text-left cursor-pointer flex items-center justify-between gap-3"
                          style={{
                            padding: "14px 16px",
                            background: isVetExpanded
                              ? "var(--cream)"
                              : "white",
                            border: "none",
                            transition: "background 200ms ease",
                          }}
                        >
                          <span
                            className="font-semibold"
                            style={{
                              fontSize: "var(--text-body-sm)",
                              color: "var(--text)",
                            }}
                          >
                            What Happens at the Emergency Vet
                          </span>
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="var(--text-muted)"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              flexShrink: 0,
                              transform: isVetExpanded
                                ? "rotate(180deg)"
                                : "rotate(0deg)",
                              transition: "transform 200ms ease",
                            }}
                          >
                            <polyline points="6 9 12 15 18 9" />
                          </svg>
                        </button>
                        {isVetExpanded && (
                          <div
                            style={{
                              padding: "0 16px 16px",
                              borderTop: "1px solid var(--border)",
                            }}
                          >
                            <p
                              className="leading-relaxed pt-3"
                              style={{
                                fontSize: "var(--text-body-sm)",
                                color: "var(--text-muted)",
                              }}
                            >
                              {scenario.atTheVet}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ═══ Emergency Kit — light sage band ═══ */}
      <div
        id="emergency-kit"
        style={{ background: "rgba(91, 123, 94, 0.04)" }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-12">
          {/* Section header with illustration */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <h2
                className="font-serif font-semibold mb-1 reveal"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  color: "var(--text)",
                }}
              >
                Your Emergency Kit
              </h2>
              <p
                className="reveal"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                Assemble this before you need it. A moment of preparation can make
                a real difference.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/illustrations/resources/emergency-kit.png"
                alt="Emergency kit illustration"
                width={120}
                height={120}
                style={{
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>

          {/* Essential items */}
          {essentialItems.length > 0 && (
            <div className="mb-6 reveal">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--border)" }}
                />
                <span
                  className="font-semibold tracking-wider uppercase"
                  style={{
                    fontSize: "var(--text-fine)",
                    color: "var(--terracotta)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Essential
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--border)" }}
                />
              </div>
              <div className="space-y-3">
                {essentialItems.map((kit) => (
                  <div
                    key={kit.item}
                    className="rounded-xl px-5 py-4 flex items-start gap-4"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--border)",
                      borderLeft: "4px solid var(--terracotta)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <p
                          className="font-semibold"
                          style={{
                            fontSize: "var(--text-body)",
                            color: "var(--text)",
                          }}
                        >
                          {kit.item}
                        </p>
                        <span
                          className="rounded-full px-2.5 py-0.5 font-semibold"
                          style={{
                            fontSize: "var(--text-fine)",
                            background:
                              "color-mix(in srgb, var(--terracotta) 12%, transparent)",
                            color: "var(--terracotta)",
                          }}
                        >
                          Essential
                        </span>
                      </div>
                      <p
                        className="leading-relaxed"
                        style={{
                          fontSize: "var(--text-body)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {kit.why}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recommended items */}
          {recommendedItems.length > 0 && (
            <div className="reveal">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--border)" }}
                />
                <span
                  className="font-semibold tracking-wider uppercase"
                  style={{
                    fontSize: "var(--text-fine)",
                    color: "var(--gold)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Recommended
                </span>
                <div
                  className="h-px flex-1"
                  style={{ background: "var(--border)" }}
                />
              </div>
              <div className="space-y-3">
                {recommendedItems.map((kit) => (
                  <div
                    key={kit.item}
                    className="rounded-xl px-5 py-4 flex items-start gap-4"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--border)",
                      borderLeft: "4px solid var(--gold)",
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center flex-wrap gap-2 mb-1">
                        <p
                          className="font-semibold"
                          style={{
                            fontSize: "var(--text-body)",
                            color: "var(--text)",
                          }}
                        >
                          {kit.item}
                        </p>
                        <span
                          className="rounded-full px-2.5 py-0.5 font-semibold"
                          style={{
                            fontSize: "var(--text-fine)",
                            background:
                              "color-mix(in srgb, var(--gold) 15%, transparent)",
                            color: "var(--gold)",
                          }}
                        >
                          Recommended
                        </span>
                      </div>
                      <p
                        className="leading-relaxed"
                        style={{
                          fontSize: "var(--text-body)",
                          color: "var(--text-muted)",
                        }}
                      >
                        {kit.why}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ Vet Conversations — light gold band ═══ */}
      <div
        id="vet-talks"
        style={{ background: "rgba(196, 162, 101, 0.05)" }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-12">
          {/* Section header */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <h2
                className="font-serif font-semibold mb-1 reveal"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  color: "var(--text)",
                }}
              >
                Conversations to Have With Your Vet NOW
              </h2>
              <p
                className="reveal"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                Have these conversations before you need the answers.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/illustrations/icons/icon-dog-person.png"
                alt="Dog and person illustration"
                width={100}
                height={100}
                style={{
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>

          <ol className="space-y-4">
            {vetConversations.map((item, idx) => (
              <li
                key={idx}
                className="rounded-2xl px-5 py-5 flex items-start gap-4 reveal"
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                }}
              >
                {/* Number */}
                <span
                  className="flex-shrink-0 flex items-center justify-center rounded-full font-bold"
                  style={{
                    width: 32,
                    height: 32,
                    minWidth: 32,
                    background: "var(--sage)",
                    color: "white",
                    fontSize: "var(--text-body-sm)",
                    marginTop: 1,
                  }}
                >
                  {idx + 1}
                </span>
                <div>
                  <p
                    className="font-serif font-semibold mb-1 leading-snug"
                    style={{
                      fontSize: "var(--text-body)",
                      color: "var(--text)",
                    }}
                  >
                    {item.question}
                  </p>
                  <p
                    className="leading-relaxed"
                    style={{
                      fontSize: "var(--text-body)",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.why}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ═══ Daily Monitoring — light sage band ═══ */}
      <div
        id="daily-monitoring"
        style={{ background: "rgba(91, 123, 94, 0.04)" }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-12">
          {/* Section header with illustration */}
          <div className="flex items-start justify-between gap-6 mb-6">
            <div className="flex-1 min-w-0">
              <h2
                className="font-serif font-semibold mb-1 reveal"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 1.75rem)",
                  color: "var(--text)",
                }}
              >
                Daily Monitoring Checklist
              </h2>
              <p
                className="reveal"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--text-muted)",
                }}
              >
                Many families check these twice daily — morning and evening.
              </p>
            </div>
            <div className="flex-shrink-0">
              <Image
                src="/illustrations/resources/emergency-monitoring.png"
                alt="Daily monitoring illustration"
                width={120}
                height={120}
                style={{
                  objectFit: "contain",
                  mixBlendMode: "multiply",
                }}
              />
            </div>
          </div>

          <div className="space-y-3">
            {dailyMonitoring.map((check, idx) => (
              <div
                key={idx}
                className="rounded-xl px-5 py-4 flex items-start gap-4 reveal"
                style={{
                  background: "white",
                  border: "1.5px solid var(--border)",
                }}
              >
                {/* Checkbox visual */}
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded"
                  style={{
                    width: 22,
                    height: 22,
                    minWidth: 22,
                    border: "2px solid var(--sage)",
                    marginTop: 2,
                  }}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="var(--sage)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    style={{ opacity: 0.3 }}
                  >
                    <polyline points="2 6 5 9 10 3" />
                  </svg>
                </div>
                <div>
                  <p
                    className="font-semibold"
                    style={{
                      fontSize: "var(--text-body)",
                      color: "var(--text)",
                      lineHeight: 1.3,
                    }}
                  >
                    {check.item}
                  </p>
                  {check.detail && (
                    <p
                      className="mt-0.5 leading-relaxed"
                      style={{
                        fontSize: "var(--text-body)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {check.detail}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ═══ Back to Resources ═══ */}
      <div className="max-w-[800px] mx-auto px-6">
        <div className="mt-14 mb-4 flex justify-center reveal">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 no-underline font-medium"
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--text-muted)",
              transition: "color 180ms ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--sage)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--text-muted)";
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to Resources
          </Link>
        </div>
      </div>
    </div>
  );
}
