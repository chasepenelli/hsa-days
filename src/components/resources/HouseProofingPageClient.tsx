"use client";

import { useState, useCallback, useRef } from "react";
import Link from "next/link";
import type { RoomSection } from "@/lib/resources/home";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import SectionDivider from "./SectionDivider";

interface HouseProofingPageClientProps {
  rooms: RoomSection[];
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      className="transition-transform duration-300 flex-shrink-0"
      style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
    >
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function DetailCard({
  title,
  summary,
  whyItMatters,
  accentColor,
}: {
  title: string;
  summary: string;
  whyItMatters: string;
  accentColor: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl overflow-hidden transition-shadow duration-300"
      style={{
        background: "var(--cream)",
        borderLeft: `3px solid ${accentColor}`,
        boxShadow: open
          ? "0 2px 12px rgba(0,0,0,0.06)"
          : "0 1px 4px rgba(0,0,0,0.03)",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-4 py-3.5 flex items-start gap-3 cursor-pointer"
        aria-expanded={open}
      >
        <div className="flex-1 min-w-0">
          <div
            className="font-serif font-semibold mb-1"
            style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
          >
            {title}
          </div>
          <div
            className="leading-relaxed"
            style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
          >
            {summary}
          </div>
        </div>
        <div className="mt-0.5" style={{ color: "var(--text-muted)" }}>
          <ChevronIcon open={open} />
        </div>
      </button>

      <div
        className="grid transition-all duration-300"
        style={{
          gridTemplateRows: open ? "1fr" : "0fr",
        }}
      >
        <div className="overflow-hidden">
          <div
            className="px-4 pb-4 pt-0 leading-relaxed"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text)",
              borderTop: "1px solid var(--border)",
              marginLeft: "0",
              marginRight: "0",
              paddingTop: "12px",
            }}
          >
            <span
              className="font-semibold uppercase tracking-[0.1em] block mb-1.5"
              style={{ fontSize: "var(--text-label)", color: accentColor }}
            >
              Why it matters
            </span>
            {whyItMatters}
          </div>
        </div>
      </div>
    </div>
  );
}

function ChecklistItem({ text }: { text: string }) {
  return (
    <li className="flex items-start gap-2.5 leading-relaxed" style={{ fontSize: "var(--text-body)" }}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        className="mt-0.5 flex-shrink-0"
      >
        <rect
          x="1"
          y="1"
          width="14"
          height="14"
          rx="3"
          stroke="var(--border-strong)"
          strokeWidth="1.2"
          fill="none"
        />
        <path
          d="M4.5 8l2.5 2.5 4.5-4.5"
          stroke="var(--sage)"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span style={{ color: "var(--text)" }}>{text}</span>
    </li>
  );
}

function RoomSectionBlock({ room, isLast }: { room: RoomSection; isLast: boolean }) {
  return (
    <>
      <section id={room.id} className="mb-8">
        <div className="reveal mb-5">
          <div className="flex items-center gap-2.5 mb-1">
            <div
              className="w-2 h-2 rounded-full"
              style={{ background: room.accentColor }}
            />
            <h2
              className="font-serif font-semibold"
              style={{ fontSize: "var(--text-h2)", color: "var(--text)" }}
            >
              {room.title}
            </h2>
          </div>
          <p
            className="ml-[18px]"
            style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
          >
            {room.subtitle}
          </p>
        </div>

        {/* Intro */}
        <div className="reveal mb-6">
          <p
            className="leading-relaxed"
            style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
          >
            {room.intro}
          </p>
        </div>

        {/* Checklist */}
        <div className="reveal mb-6">
          <div
            className="rounded-xl px-5 py-4"
            style={{
              background: "rgba(91,123,94,0.04)",
              border: "1px solid var(--border)",
            }}
          >
            <div
              className="font-semibold uppercase tracking-[0.1em] mb-3"
              style={{ fontSize: "var(--text-label)", color: "var(--sage)" }}
            >
              Quick checklist
            </div>
            <ul className="space-y-3">
              {room.checklist.map((item, i) => (
                <ChecklistItem key={i} text={item.text} />
              ))}
            </ul>
          </div>
        </div>

        {/* Detail cards */}
        <div className="space-y-4 reveal-stagger">
          {room.details.map((detail, i) => (
            <DetailCard
              key={i}
              title={detail.title}
              summary={detail.summary}
              whyItMatters={detail.whyItMatters}
              accentColor={room.accentColor}
            />
          ))}
        </div>

        {/* Product picks */}
        {room.products.length > 0 && (
          <div className="reveal mt-6">
            <div
              className="rounded-xl px-5 py-4"
              style={{
                background: "rgba(196,162,101,0.05)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="font-semibold uppercase tracking-[0.1em] mb-3"
                style={{ fontSize: "var(--text-label)", color: "var(--gold-text)" }}
              >
                Our recommended picks
              </div>
              <div className="space-y-3">
                {room.products.map((product, i) => (
                  <a
                    key={i}
                    href={product.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-4 py-3 transition-colors duration-200"
                    style={{
                      background: "var(--warm-white)",
                      border: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--gold-light)";
                      e.currentTarget.style.background = "var(--cream)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)";
                      e.currentTarget.style.background = "var(--warm-white)";
                    }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div
                          className="font-semibold mb-0.5"
                          style={{ fontSize: "var(--text-body)", color: "var(--text)" }}
                        >
                          {product.name}
                        </div>
                        <div
                          className="leading-relaxed"
                          style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
                        >
                          {product.description}
                        </div>
                      </div>
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        className="mt-1 flex-shrink-0"
                        style={{ color: "var(--gold)" }}
                      >
                        <path
                          d="M3 11L11 3M11 3H5M11 3v6"
                          stroke="currentColor"
                          strokeWidth="1.3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </a>
                ))}
              </div>
              <p
                className="mt-3"
                style={{ fontSize: "var(--text-fine)", color: "var(--text-muted)", opacity: 0.7 }}
              >
                Links go to Amazon. We are not affiliated and receive no commission.
              </p>
            </div>
          </div>
        )}
      </section>

      {!isLast && <SectionDivider />}
    </>
  );
}

export default function HouseProofingPageClient({
  rooms,
}: HouseProofingPageClientProps) {
  const sectionRef = useScrollReveal();
  const roomRefs = useRef<Record<string, HTMLElement | null>>({});

  const scrollToRoom = useCallback((id: string) => {
    const el = roomRefs.current[id] || document.getElementById(id);
    if (el) {
      const offset = 140;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  return (
    <div
      ref={sectionRef as React.RefObject<HTMLDivElement>}
      className="min-h-screen pb-16"
      style={{ background: "var(--warm-white)" }}
    >
      {/* Hero */}
      <div
        className="pt-20 pb-14 px-6 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(160deg, rgba(91,123,94,0.08) 0%, rgba(196,162,101,0.04) 40%, rgba(245,240,234,0.5) 70%, var(--warm-white) 100%)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div
          className="absolute top-0 right-0 w-64 h-64 pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 70% 30%, rgba(91,123,94,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="max-w-[800px] mx-auto reveal">
          <div className="inline-flex items-center gap-2 mb-4">
            <Link
              href="/resources"
              className="font-semibold uppercase tracking-[0.14em] no-underline hover:opacity-70 transition-opacity"
              style={{ fontSize: "var(--text-label)", color: "var(--sage)" }}
            >
              Resources
            </Link>
            <span
              className="w-px h-3"
              style={{ background: "var(--border-strong)" }}
            />
            <span
              className="font-semibold uppercase tracking-[0.14em]"
              style={{ fontSize: "var(--text-label)", color: "var(--text-muted)" }}
            >
              House-Proofing
            </span>
          </div>

          <h1
            className="font-serif font-semibold mb-3"
            style={{
              fontSize: "var(--text-title)",
              color: "var(--text)",
              lineHeight: 1.2,
            }}
          >
            House-Proofing Guide
          </h1>
          <p
            className="leading-relaxed max-w-[560px]"
            style={{
              fontSize: "var(--text-body)",
              color: "var(--text-muted)",
            }}
          >
            Room-by-room adjustments to keep your dog comfortable, safe, and
            moving confidently through treatment and recovery.
          </p>
        </div>
      </div>

      <div className="px-6">
        <div className="max-w-[800px] mx-auto">
          {/* Room quick nav */}
          <div className="reveal mt-8 mb-10">
            <div
              className="flex flex-wrap gap-2"
              role="navigation"
              aria-label="Jump to room section"
            >
              {rooms.map((room) => (
                <button
                  key={room.id}
                  onClick={() => scrollToRoom(room.id)}
                  className="px-4 py-2 rounded-full font-medium transition-colors duration-200 cursor-pointer"
                  style={{
                    fontSize: "var(--text-label)",
                    background: "var(--cream)",
                    color: "var(--text-muted)",
                    border: "1px solid var(--border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--cream-deep)";
                    e.currentTarget.style.color = "var(--text)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--cream)";
                    e.currentTarget.style.color = "var(--text-muted)";
                  }}
                >
                  {room.title}
                </button>
              ))}
            </div>
          </div>

          {/* Room sections */}
          {rooms.map((room, i) => (
            <RoomSectionBlock
              key={room.id}
              room={room}
              isLast={i === rooms.length - 1}
            />
          ))}

          {/* Print hint */}
          <div
            className="text-center mt-10 pt-8 reveal"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(91,123,94,0.05)",
                border: "1px solid var(--border)",
              }}
            >
              <svg
                width="13"
                height="13"
                viewBox="0 0 16 16"
                fill="none"
                style={{ color: "var(--text-muted)", flexShrink: 0 }}
              >
                <path
                  d="M3 4h10v7H3V4zM1 7h2M13 7h2M5 2h6M5 14h6"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                />
              </svg>
              <p
                style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}
              >
                Use your browser&apos;s print function to save this page as a
                PDF to share with your vet.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
