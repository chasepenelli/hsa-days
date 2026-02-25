"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/* ── Item data ── */
const ITEMS = [
  {
    label: "A reflection",
    description:
      "Written for where you are. Personal, second-person \u2014 like a letter from someone who\u2019s been here.",
    color: "var(--sage)",
    colorHex: "#5B7B5E",
    icon: "/illustrations/icons/icon-read-reflect.png",
  },
  {
    label: "A journal prompt",
    description:
      "A single question to sit with. Write as much or as little as you want. Private and saved.",
    color: "var(--gold)",
    colorHex: "#C4A265",
    icon: "/illustrations/icons/icon-journal.png",
  },
  {
    label: "A gentle activity",
    description:
      "Something small to do together. A photo walk. A paw print. Writing a letter. Never homework \u2014 always an invitation.",
    color: "var(--terracotta)",
    colorHex: "#D4856A",
    icon: "/illustrations/icons/icon-paw-print.png",
  },
  {
    label: "A practical tip",
    description:
      "Real information, delivered gently. What to ask your vet. How to adjust their diet. When to seek a second opinion.",
    color: "var(--sage-light)",
    colorHex: "#7A9A7D",
    icon: "/illustrations/icons/icon-lightbulb.png",
  },
  {
    label: "A quote to carry",
    description:
      "Words for the hardest moments. From Rumi to Mary Oliver \u2014 something to hold onto for the rest of the day.",
    color: "var(--gold-light)",
    colorHex: "#D4B87A",
    icon: "/illustrations/icons/icon-star.png",
  },
];

const TRUNK_HEIGHT = 80;

export function WhatEachDayHolds() {
  const sectionRef = useRef<HTMLElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const trunkRef = useRef<SVGPathElement>(null);
  const branchRefs = useRef<(SVGPathElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const headingRef = useRef<HTMLDivElement>(null);
  const closerRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  // Detect reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) =>
      setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Detect desktop vs mobile
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    setIsDesktop(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── Compute SVG paths dynamically ── */
  const computePaths = useCallback(() => {
    const svg = svgRef.current;
    if (!svg) return;

    const svgRect = svg.getBoundingClientRect();

    if (isDesktop) {
      // Desktop: trunk from top-center, then 5 bezier branches to each icon
      const cx = svgRect.width / 2;

      // Trunk path
      if (trunkRef.current) {
        trunkRef.current.setAttribute("d", `M ${cx},0 L ${cx},${TRUNK_HEIGHT}`);
      }

      // Branch paths to each icon
      iconRefs.current.forEach((iconEl, i) => {
        const branchEl = branchRefs.current[i];
        if (!iconEl || !branchEl) return;

        const iconRect = iconEl.getBoundingClientRect();
        const targetX = iconRect.left - svgRect.left + iconRect.width / 2;
        const targetY = iconRect.top - svgRect.top;

        const cp1Y = TRUNK_HEIGHT + 40;
        const cp2Y = targetY - 40;

        branchEl.setAttribute(
          "d",
          `M ${cx},${TRUNK_HEIGHT} C ${cx},${cp1Y} ${targetX},${cp2Y} ${targetX},${targetY}`
        );
      });
    } else {
      // Mobile: single vertical line + horizontal stubs
      const lineX = 28; // left offset for the vertical line

      // Trunk: full vertical line — we'll compute total height from last icon
      const allY: number[] = [];
      iconRefs.current.forEach((iconEl) => {
        if (!iconEl) return;
        const iconRect = iconEl.getBoundingClientRect();
        const cy = iconRect.top - svgRect.top + iconRect.height / 2;
        allY.push(cy);
      });

      if (allY.length > 0) {
        const startY = Math.max(0, allY[0] - 20);
        const endY = allY[allY.length - 1] + 20;
        if (trunkRef.current) {
          trunkRef.current.setAttribute("d", `M ${lineX},${startY} L ${lineX},${endY}`);
        }
      }

      // Stubs from vertical line to each icon
      iconRefs.current.forEach((iconEl, i) => {
        const branchEl = branchRefs.current[i];
        if (!iconEl || !branchEl) return;

        const iconRect = iconEl.getBoundingClientRect();
        const cy = iconRect.top - svgRect.top + iconRect.height / 2;
        const targetX = iconRect.left - svgRect.left;

        branchEl.setAttribute("d", `M ${lineX},${cy} L ${targetX},${cy}`);
      });
    }

    // Update dash arrays after path geometry changes
    [trunkRef.current, ...branchRefs.current].forEach((path) => {
      if (!path) return;
      const len = path.getTotalLength();
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = `${len}`;
    });
  }, [isDesktop]);

  // Compute paths on mount + resize
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Small delay to let layout settle
    const raf = requestAnimationFrame(() => {
      computePaths();
    });

    let debounceTimer: ReturnType<typeof setTimeout>;
    const ro = new ResizeObserver(() => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => {
        computePaths();
        ScrollTrigger.refresh();
      }, 150);
    });

    if (sectionRef.current) ro.observe(sectionRef.current);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(debounceTimer);
      ro.disconnect();
    };
  }, [prefersReducedMotion, isDesktop, computePaths]);

  /* ── GSAP scroll animation ── */
  useGSAP(
    () => {
      if (prefersReducedMotion || !sectionRef.current) return;

      // Wait a tick for paths to be computed
      const raf = requestAnimationFrame(() => {
        computePaths();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "bottom 80%",
            scrub: 0.6,
          },
        });

        // Phase: Heading fade in (0-10%)
        if (headingRef.current) {
          tl.fromTo(
            headingRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.10, ease: "power2.out" },
            0
          );
        }

        // Phase: Trunk draw (10-22%)
        if (trunkRef.current) {
          tl.to(
            trunkRef.current,
            { strokeDashoffset: 0, duration: 0.12, ease: "none" },
            0.10
          );
        }

        // Phase: Branches + icons + items cascade (22-76%)
        const branchStarts = [0.22, 0.32, 0.42, 0.52, 0.62];
        const branchDurations = [0.14, 0.14, 0.14, 0.14, 0.14];

        ITEMS.forEach((_, i) => {
          const start = branchStarts[i];
          const dur = branchDurations[i];

          // Branch line draws
          const branchEl = branchRefs.current[i];
          if (branchEl) {
            tl.to(
              branchEl,
              { strokeDashoffset: 0, duration: dur * 0.6, ease: "none" },
              start
            );
          }

          // Icon pops in
          const iconEl = iconRefs.current[i];
          if (iconEl) {
            tl.fromTo(
              iconEl,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                duration: dur * 0.5,
                ease: "back.out(1.7)",
              },
              start + dur * 0.3
            );
          }

          // Item text fades in
          const itemEl = itemRefs.current[i];
          if (itemEl) {
            tl.fromTo(
              itemEl,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: dur * 0.6, ease: "power2.out" },
              start + dur * 0.4
            );
          }
        });

        // Phase: Closer (76-88%)
        if (closerRef.current) {
          tl.fromTo(
            closerRef.current,
            { opacity: 0, y: 16 },
            { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
            0.76
          );
        }
      });

      return () => cancelAnimationFrame(raf);
    },
    { scope: sectionRef, dependencies: [prefersReducedMotion, isDesktop] }
  );

  /* ── Reduced motion: static layout ── */
  if (prefersReducedMotion) {
    return (
      <section
        className="relative"
        style={{
          paddingTop: "clamp(72px, 10vw, 120px)",
          paddingBottom: "clamp(72px, 10vw, 120px)",
          paddingLeft: "24px",
          paddingRight: "24px",
          background: "var(--cream)",
        }}
      >
        <div className="mx-auto" style={{ maxWidth: "880px" }}>
          {/* Heading */}
          <div className="text-center mb-12">
            <p
              className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-4"
              style={{ color: "var(--text-muted)", opacity: 0.6 }}
            >
              Every day includes
            </p>
            <h2
              className="font-serif font-semibold tracking-tight"
              style={{
                fontSize: "clamp(1.75rem, 4.2vw, 2.4rem)",
                lineHeight: 1.2,
                color: "var(--text)",
              }}
            >
              Five things waiting{" "}
              <em className="italic" style={{ color: "var(--sage)" }}>
                for you
              </em>
            </h2>
          </div>

          {/* Static grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-5">
            {ITEMS.map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div
                  className="flex items-center justify-center rounded-full mb-3"
                  style={{
                    width: 64,
                    height: 64,
                    background: `color-mix(in srgb, ${item.colorHex} 12%, transparent)`,
                    border: `2px solid ${item.colorHex}`,
                  }}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={36}
                    height={36}
                    style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                  />
                </div>
                <span
                  className="font-serif font-semibold text-[1rem]"
                  style={{ color: "var(--text)" }}
                >
                  {item.label}
                </span>
                <p
                  className="text-[0.85rem] leading-relaxed mt-1"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.description}
                </p>
              </div>
            ))}
          </div>

          {/* Closer */}
          <div className="text-center pt-8">
            <div className="flex items-center justify-center gap-3 mb-5">
              <div
                className="h-[1px] w-[48px]"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--gold-light))",
                }}
              />
              <Image
                src="/illustrations/icons/icon-flower-ornament.png"
                alt=""
                width={14}
                height={14}
                style={{ opacity: 0.5 }}
              />
              <div
                className="h-[1px] w-[48px]"
                style={{
                  background:
                    "linear-gradient(to left, transparent, var(--gold-light))",
                }}
              />
            </div>
            <p
              className="font-serif italic leading-relaxed"
              style={{
                fontSize: "0.85rem",
                color: "var(--text-muted)",
                opacity: 0.6,
              }}
            >
              Plus supplement guides, a food safety reference, and a community of
              people who understand.
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* ── Animated layout ── */
  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{
        paddingTop: "clamp(72px, 10vw, 120px)",
        paddingBottom: "clamp(96px, 12vw, 160px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      <div
        ref={containerRef}
        className="mx-auto"
        style={{ maxWidth: "880px" }}
      >
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-12" style={{ opacity: 0 }}>
          <p
            className="text-[0.7rem] font-semibold uppercase tracking-[0.12em] mb-4"
            style={{ color: "var(--text-muted)", opacity: 0.6 }}
          >
            Every day includes
          </p>
          <h2
            className="font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.75rem, 4.2vw, 2.4rem)",
              lineHeight: 1.2,
              color: "var(--text)",
            }}
          >
            Five things waiting{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              for you
            </em>
          </h2>
        </div>

        {/* Branching area — relative container */}
        <div className="relative" style={{ minHeight: isDesktop ? 320 : undefined }}>
          {/* SVG overlay */}
          <svg
            ref={svgRef}
            className="branch-svg"
            aria-hidden="true"
            preserveAspectRatio="none"
          >
            {/* Trunk */}
            <path
              ref={trunkRef}
              fill="none"
              stroke="#5B7B5E"
              strokeWidth={2}
              strokeLinecap="round"
              style={{ opacity: 0.6 }}
            />
            {/* Branches */}
            {ITEMS.map((item, i) => (
              <path
                key={i}
                ref={(el) => { branchRefs.current[i] = el; }}
                fill="none"
                stroke={item.colorHex}
                strokeWidth={2.5}
                strokeLinecap="round"
                style={{ opacity: 0.45 }}
              />
            ))}
          </svg>

          {/* Items */}
          <div
            className={`branch-items ${
              isDesktop
                ? "flex justify-between gap-4"
                : "flex flex-col gap-8"
            }`}
            style={isDesktop ? { paddingTop: TRUNK_HEIGHT + 60 } : undefined}
          >
            {ITEMS.map((item, i) => (
              <div
                key={i}
                className={
                  isDesktop
                    ? "flex flex-col items-center text-center"
                    : "flex items-start gap-4"
                }
                style={isDesktop ? { flex: "1 1 0", maxWidth: 160 } : { paddingLeft: 56 }}
              >
                {/* Icon circle */}
                <div
                  ref={(el) => { iconRefs.current[i] = el; }}
                  data-branch-icon
                  className="flex items-center justify-center rounded-full shrink-0"
                  style={{
                    width: isDesktop ? 64 : 56,
                    height: isDesktop ? 64 : 56,
                    background: `color-mix(in srgb, ${item.colorHex} 12%, transparent)`,
                    border: `2px solid ${item.colorHex}`,
                    opacity: 0,
                    transform: "scale(0)",
                    ...(isDesktop
                      ? { marginBottom: 12 }
                      : { position: "absolute", left: 0 }),
                  }}
                >
                  <Image
                    src={item.icon}
                    alt=""
                    width={isDesktop ? 36 : 32}
                    height={isDesktop ? 36 : 32}
                    style={{ objectFit: "contain", mixBlendMode: "multiply" }}
                  />
                </div>

                {/* Text content */}
                <div
                  ref={(el) => { itemRefs.current[i] = el; }}
                  data-branch-item
                  style={{ opacity: 0 }}
                >
                  <span
                    className="font-serif font-semibold"
                    style={{
                      fontSize: isDesktop ? "1rem" : "1.05rem",
                      color: "var(--text)",
                      display: "block",
                    }}
                  >
                    {item.label}
                  </span>
                  <p
                    className="leading-relaxed mt-1"
                    style={{
                      fontSize: isDesktop ? "0.83rem" : "0.9rem",
                      color: "var(--text-muted)",
                    }}
                  >
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Closer */}
        <div ref={closerRef} className="text-center pt-8" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-3 mb-5">
            <div
              className="h-[1px] w-[48px]"
              style={{
                background:
                  "linear-gradient(to right, transparent, var(--gold-light))",
              }}
            />
            <Image
              src="/illustrations/icons/icon-flower-ornament.png"
              alt=""
              width={14}
              height={14}
              style={{ opacity: 0.5 }}
            />
            <div
              className="h-[1px] w-[48px]"
              style={{
                background:
                  "linear-gradient(to left, transparent, var(--gold-light))",
              }}
            />
          </div>
          <p
            className="font-serif italic leading-relaxed"
            style={{
              fontSize: "0.85rem",
              color: "var(--text-muted)",
              opacity: 0.6,
            }}
          >
            Plus supplement guides, a food safety reference, and a community of
            people who understand.
          </p>
        </div>
      </div>
    </section>
  );
}
