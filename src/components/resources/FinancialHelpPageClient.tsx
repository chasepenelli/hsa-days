"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionDivider from "./SectionDivider";

interface Props {
  intro: {
    title: string;
    subtitle: string;
    description: string;
    importantNote: string;
  };
  orgs: {
    slug: string;
    name: string;
    description: string;
    focus: string;
    url: string;
    typicalAmount: string;
    turnaround: string;
    eligibility: string[];
    tags: string[];
    accentColor: string;
  }[];
  tips: {
    title: string;
    detail: string;
  }[];
}

type FilterTab = "All" | "Grants" | "Financing";

function tagColor(tag: string): { bg: string; text: string } {
  const t = tag.toLowerCase();
  if (t.includes("grant")) return { bg: "color-mix(in srgb, var(--sage) 14%, transparent)", text: "var(--sage)" };
  if (t.includes("cancer")) return { bg: "color-mix(in srgb, var(--terracotta) 14%, transparent)", text: "var(--terracotta)" };
  if (t.includes("emergency")) return { bg: "color-mix(in srgb, var(--terracotta) 18%, transparent)", text: "var(--terracotta)" };
  if (t.includes("financ") || t.includes("loan") || t.includes("credit")) return { bg: "color-mix(in srgb, var(--gold) 16%, transparent)", text: "color-mix(in srgb, var(--gold) 90%, #7a5e30)" };
  return { bg: "color-mix(in srgb, var(--text-muted) 10%, transparent)", text: "var(--text-muted)" };
}

function OrgCard({ org }: { org: Props["orgs"][0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className="reveal rounded-2xl overflow-hidden"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* Top color strip */}
      <div
        style={{
          height: 4,
          background: org.accentColor,
          borderRadius: "16px 16px 0 0",
        }}
      />

      <div className="p-6">
        {/* Name + focus badge */}
        <div className="flex flex-wrap items-start gap-3 mb-3">
          <h3
            className="font-serif font-semibold leading-snug"
            style={{
              fontSize: "var(--text-h3)",
              color: "var(--text)",
              flex: "1 1 auto",
              minWidth: 0,
            }}
          >
            {org.name}
          </h3>
          <span
            className="inline-flex items-center rounded-full px-2.5 py-1 flex-shrink-0"
            style={{
              fontSize: "var(--text-fine)",
              fontWeight: 500,
              background: `color-mix(in srgb, ${org.accentColor} 12%, transparent)`,
              color: org.accentColor,
              whiteSpace: "nowrap",
            }}
          >
            {org.focus}
          </span>
        </div>

        {/* Description */}
        <p
          className="leading-relaxed mb-4"
          style={{
            fontSize: "var(--text-body)",
            color: "var(--text-muted)",
          }}
        >
          {org.description}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap gap-2 mb-4">
          <div
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5"
            style={{
              background: "var(--cream)",
              border: "1px solid var(--border)",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--sage)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="1" x2="12" y2="23" />
              <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--text)",
                fontWeight: 500,
              }}
            >
              {org.typicalAmount}
            </span>
          </div>
          <div
            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5"
            style={{
              background: "var(--cream)",
              border: "1px solid var(--border)",
            }}
          >
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--gold)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--text)",
                fontWeight: 500,
              }}
            >
              {org.turnaround}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {org.tags.map((tag) => {
            const colors = tagColor(tag);
            return (
              <span
                key={tag}
                className="inline-flex items-center rounded-full px-2.5 py-0.5"
                style={{
                  fontSize: "var(--text-fine)",
                  fontWeight: 500,
                  background: colors.bg,
                  color: colors.text,
                }}
              >
                {tag}
              </span>
            );
          })}
        </div>

        {/* Expandable eligibility */}
        {org.eligibility.length > 0 && (
          <div>
            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 cursor-pointer"
              style={{
                fontSize: "var(--text-body-sm)",
                color: org.accentColor,
                fontWeight: 500,
                background: "none",
                border: "none",
                padding: 0,
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 200ms ease",
                  flexShrink: 0,
                }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
              {expanded ? "Hide requirements" : "View requirements"}
            </button>

            {expanded && (
              <ul
                className="mt-3 space-y-1.5 pl-4"
                style={{ listStyle: "none" }}
              >
                {org.eligibility.map((item, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2"
                    style={{
                      fontSize: "var(--text-body-sm)",
                      color: "var(--text-muted)",
                    }}
                  >
                    <span
                      className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full"
                      style={{ background: org.accentColor, opacity: 0.6 }}
                    />
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {/* Visit website link */}
        <div className="mt-4 pt-4" style={{ borderTop: "1px solid var(--border)" }}>
          <a
            href={org.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
            style={{
              fontSize: "var(--text-body-sm)",
              color: org.accentColor,
              fontWeight: 500,
              textDecoration: "none",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.textDecoration = "underline";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.textDecoration = "none";
            }}
          >
            Visit website
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

export default function FinancialHelpPageClient({ intro, orgs, tips }: Props) {
  const sectionRef = useScrollReveal();
  const [activeFilter, setActiveFilter] = useState<FilterTab>("All");

  const filterTabs: FilterTab[] = ["All", "Grants", "Financing"];

  function orgMatchesFilter(org: Props["orgs"][0], filter: FilterTab): boolean {
    if (filter === "All") return true;
    const tagLower = org.tags.map((t) => t.toLowerCase());
    if (filter === "Grants") {
      return tagLower.some((t) => t.includes("grant"));
    }
    if (filter === "Financing") {
      return tagLower.some((t) => t.includes("financ") || t.includes("loan") || t.includes("credit") || t.includes("payment"));
    }
    return true;
  }

  const filteredOrgs = orgs.filter((org) => orgMatchesFilter(org, activeFilter));

  // Split filtered orgs: grants first, then financing
  const grantOrgs = filteredOrgs.filter((org) =>
    org.tags.some((t) => t.toLowerCase().includes("grant"))
  );
  const financingOrgs = filteredOrgs.filter(
    (org) => !org.tags.some((t) => t.toLowerCase().includes("grant"))
  );

  const showGrantSection = grantOrgs.length > 0;
  const showFinancingSection = financingOrgs.length > 0;
  const showBothSections = showGrantSection && showFinancingSection;

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-24"
      style={{ background: "var(--warm-white)" }}
    >
      {/* ═══ Hero ═══ */}
      <div
        className="pt-24 pb-10 px-6"
        style={{ background: "var(--warm-white)" }}
      >
        <div className="max-w-[800px] mx-auto">
          {/* Eyebrow */}
          <p
            className="reveal tracking-widest font-medium mb-3"
            style={{
              fontSize: "var(--text-fine)",
              color: "var(--gold)",
              letterSpacing: "0.12em",
            }}
          >
            RESOURCE
          </p>

          {/* Title */}
          <h1
            className="reveal font-serif font-semibold mb-3 leading-tight"
            style={{
              fontSize: "clamp(1.75rem, 4vw, 2.5rem)",
              color: "var(--text)",
            }}
          >
            {intro.title}
          </h1>

          {/* Subtitle */}
          <p
            className="reveal font-serif mb-4 leading-snug"
            style={{
              fontSize: "var(--text-h3)",
              color: "var(--text-muted)",
            }}
          >
            {intro.subtitle}
          </p>

          {/* Description */}
          <p
            className="reveal leading-relaxed mb-6"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
              maxWidth: 640,
            }}
          >
            {intro.description}
          </p>

          {/* Hero illustration */}
          <div className="reveal flex justify-center mb-8">
            <Image
              src="/illustrations/resources/financial-hero.png"
              alt=""
              width={280}
              height={160}
              className="mx-auto"
              style={{ objectFit: "contain" }}
            />
          </div>

          {/* Important note callout */}
          <div
            className="reveal rounded-2xl px-5 py-4"
            style={{
              background: "color-mix(in srgb, var(--terracotta) 8%, white)",
              border: "1px solid color-mix(in srgb, var(--terracotta) 20%, transparent)",
            }}
          >
            <div className="flex items-start gap-3">
              <svg
                className="flex-shrink-0 mt-0.5"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--terracotta)"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <p
                className="leading-relaxed"
                style={{
                  fontSize: "var(--text-body-sm)",
                  color: "var(--terracotta)",
                }}
              >
                {intro.importantNote}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ═══ Content ═══ */}
      <div className="px-6">
        <div className="max-w-[800px] mx-auto">

          {/* ═══ Filter Tabs ═══ */}
          <div className="flex flex-wrap gap-2 mb-8 reveal">
            {filterTabs.map((tab) => {
              const isActive = activeFilter === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveFilter(tab)}
                  className="cursor-pointer"
                  style={{
                    padding: "8px 18px",
                    borderRadius: 9999,
                    fontSize: "var(--text-body-sm)",
                    fontWeight: isActive ? 600 : 400,
                    background: isActive ? "var(--sage)" : "white",
                    color: isActive ? "white" : "var(--text-muted)",
                    border: isActive ? "none" : "1.5px solid var(--border)",
                    boxShadow: isActive ? "0 2px 8px rgba(91,123,94,0.18)" : "none",
                    transition: "all 180ms ease",
                    minHeight: 40,
                  }}
                  onMouseDown={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(0.96)";
                  }}
                  onMouseUp={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.transform = "scale(1)";
                  }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

        </div>
      </div>

      {/* ═══ Grants Section (full-bleed sage tint) ═══ */}
      {showGrantSection && (
        <div
          style={{ background: "rgba(91, 123, 94, 0.04)" }}
          className="px-6 py-10"
        >
          <div className="max-w-[800px] mx-auto">
            <section>
              {showBothSections && (
                <div className="reveal flex items-center justify-between gap-4 mb-5">
                  <h2
                    className="font-serif font-semibold"
                    style={{
                      fontSize: "var(--text-h3)",
                      color: "var(--text)",
                    }}
                  >
                    Grants &amp; Direct Assistance
                  </h2>
                  <Image
                    src="/illustrations/resources/financial-grants.png"
                    alt=""
                    width={80}
                    height={80}
                    className="hidden sm:block flex-shrink-0"
                    style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                  />
                </div>
              )}
              <div className="space-y-5">
                {grantOrgs.map((org) => (
                  <OrgCard key={org.slug} org={org} />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Separator between grant and financing sections */}
      {showBothSections && (
        <div className="px-6">
          <div className="max-w-[800px] mx-auto">
            <div
              className="reveal my-10 h-px"
              style={{
                background: "linear-gradient(to right, transparent, var(--border), transparent)",
              }}
            />
          </div>
        </div>
      )}

      {/* ═══ Financing Section (full-bleed gold tint) ═══ */}
      {showFinancingSection && (
        <div
          style={{ background: "rgba(196, 162, 101, 0.04)" }}
          className="px-6 py-10"
        >
          <div className="max-w-[800px] mx-auto">
            <section>
              {showBothSections && (
                <h2
                  className="reveal font-serif font-semibold mb-5"
                  style={{
                    fontSize: "var(--text-h3)",
                    color: "var(--text)",
                  }}
                >
                  Financing &amp; Payment Options
                </h2>
              )}
              <div className="space-y-5">
                {financingOrgs.map((org) => (
                  <OrgCard key={org.slug} org={org} />
                ))}
              </div>
            </section>
          </div>
        </div>
      )}

      {/* Empty state */}
      {filteredOrgs.length === 0 && (
        <div className="px-6">
          <div className="max-w-[800px] mx-auto">
            <div
              className="reveal text-center py-16 rounded-2xl"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <p
                style={{
                  fontSize: "var(--text-body)",
                  color: "var(--text-muted)",
                }}
              >
                No organizations match this filter.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ═══ Content resumed ═══ */}
      <div className="px-6">
        <div className="max-w-[800px] mx-auto">

          {/* ═══ Section Divider ═══ */}
          <SectionDivider />

          {/* ═══ Application Tips (cream tint full-bleed) ═══ */}
        </div>
      </div>

      <div
        style={{ background: "rgba(245, 240, 234, 0.5)" }}
        className="px-6 py-10"
      >
        <div className="max-w-[800px] mx-auto">
          <section className="mb-12">
            <div className="reveal flex items-center justify-between gap-4 mb-2">
              <h2
                className="font-serif font-semibold"
                style={{
                  fontSize: "clamp(1.3rem, 3vw, 1.75rem)",
                  color: "var(--text)",
                }}
              >
                How to Navigate the Process
              </h2>
              <Image
                src="/illustrations/resources/financial-tips.png"
                alt=""
                width={80}
                height={80}
                className="hidden sm:block flex-shrink-0"
                style={{ objectFit: "contain", mixBlendMode: "multiply" }}
              />
            </div>
            <p
              className="reveal mb-8 leading-relaxed"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--text-muted)",
              }}
            >
              Applying for financial assistance can feel overwhelming on top of
              everything else. These tips are meant to make it a little easier.
            </p>

            <div className="space-y-4">
              {tips.map((tip, index) => (
                <div
                  key={index}
                  className="reveal flex items-start gap-4 rounded-2xl px-5 py-5"
                  style={{
                    background: "color-mix(in srgb, var(--sage) 6%, white)",
                    border: "1px solid color-mix(in srgb, var(--sage) 14%, transparent)",
                  }}
                >
                  {/* Step number */}
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full font-semibold"
                    style={{
                      width: 34,
                      height: 34,
                      background: "var(--sage)",
                      color: "white",
                      fontSize: "var(--text-body-sm)",
                      marginTop: 1,
                    }}
                  >
                    {index + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="font-semibold mb-1 leading-snug"
                      style={{
                        fontSize: "var(--text-body)",
                        color: "var(--text)",
                      }}
                    >
                      {tip.title}
                    </p>
                    <p
                      className="leading-relaxed"
                      style={{
                        fontSize: "var(--text-body-sm)",
                        color: "var(--text-muted)",
                      }}
                    >
                      {tip.detail}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>

      {/* ═══ Bottom content ═══ */}
      <div className="px-6">
        <div className="max-w-[800px] mx-auto">

          {/* ═══ Bottom Callout ═══ */}
          <div
            className="reveal rounded-2xl px-6 py-7 mb-12 text-center mt-10"
            style={{
              background: "color-mix(in srgb, var(--terracotta) 7%, white)",
              border: "1px solid color-mix(in srgb, var(--terracotta) 16%, transparent)",
            }}
          >
            <div
              className="mx-auto mb-4 flex items-center justify-center rounded-full"
              style={{
                width: 44,
                height: 44,
                background: "color-mix(in srgb, var(--terracotta) 14%, transparent)",
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--terracotta)"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </div>
            <p
              className="font-serif leading-relaxed mx-auto"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--terracotta)",
                maxWidth: 560,
              }}
            >
              You are not a bad owner for needing help. The cost of HSA
              treatment is not your fault, and asking for financial assistance
              is an act of love, not failure.
            </p>
          </div>

          {/* ═══ Back to Resources ═══ */}
          <div className="reveal flex justify-center pb-4">
            <Link
              href="/resources"
              className="inline-flex items-center gap-2 no-underline"
              style={{
                fontSize: "var(--text-body-sm)",
                color: "var(--sage)",
                fontWeight: 500,
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
    </div>
  );
}
