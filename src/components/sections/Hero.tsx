"use client";

import { useEffect, useRef, useState } from "react";
import { SignupForm } from "@/components/forms/SignupForm";

/* ─── Ambient floating orb ─────────────────── */
function Orb({
  top,
  left,
  size,
  color,
  duration,
  delay,
}: {
  top: string;
  left: string;
  size: number;
  color: string;
  duration: number;
  delay: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute rounded-full pointer-events-none"
      style={{
        top,
        left,
        width: size,
        height: size,
        background: color,
        filter: "blur(40px)",
        animationName: "gentleFloat",
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        opacity: 0.55,
      }}
    />
  );
}

/* ─── Tiny floating paw dot ─────────────────── */
function PawDot({
  style,
  delay,
}: {
  style: React.CSSProperties;
  delay: number;
}) {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        ...style,
        animationName: "gentleFloat",
        animationDuration: `${6 + delay * 1.5}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        fontSize: "clamp(10px, 1.5vw, 16px)",
        opacity: 0.18,
        filter: "grayscale(1)",
      }}
    >
      🐾
    </div>
  );
}

/* ─── Animated headline line ─────────────────── */
function AnimatedLine({
  children,
  delay,
  className = "",
  style,
}: {
  children: React.ReactNode;
  delay: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <span
      className={`block ${className}`}
      style={{
        animationName: "wordReveal",
        animationDuration: "0.9s",
        animationDelay: `${delay}s`,
        animationFillMode: "both",
        animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
        ...style,
      }}
    >
      {children}
    </span>
  );
}

export function Hero() {
  const [mounted, setMounted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Subtle parallax on scroll — hero background moves at 40% scroll rate
  useEffect(() => {
    const bg = scrollRef.current;
    if (!bg) return;

    const handleScroll = () => {
      const y = window.scrollY;
      bg.style.transform = `translateY(${y * 0.35}px)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative overflow-hidden flex items-center justify-center"
      style={{
        minHeight: "100svh",
        paddingTop: "clamp(100px, 14vw, 140px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
      }}
    >
      {/* ── Parallax background layer ── */}
      <div
        ref={scrollRef}
        className="absolute inset-[-20%] pointer-events-none will-change-transform"
        aria-hidden="true"
      >
        {/* Base warm gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              "radial-gradient(ellipse 90% 70% at 60% 5%, rgba(196,162,101,0.10) 0%, transparent 65%)",
              "radial-gradient(ellipse 70% 60% at 15% 80%, rgba(91,123,94,0.09) 0%, transparent 60%)",
              "radial-gradient(ellipse 50% 50% at 85% 75%, rgba(212,133,106,0.06) 0%, transparent 55%)",
              "linear-gradient(170deg, rgba(250,248,245,0) 0%, rgba(245,240,234,0.4) 100%)",
            ].join(", "),
          }}
        />

        {/* Ambient glow orbs */}
        <Orb top="8%" left="62%" size={360} color="rgba(196,162,101,0.18)" duration={14} delay={0} />
        <Orb top="55%" left="8%" size={280} color="rgba(91,123,94,0.14)" duration={18} delay={3} />
        <Orb top="70%" left="75%" size={220} color="rgba(212,133,106,0.10)" duration={12} delay={6} />
        <Orb top="20%" left="3%" size={180} color="rgba(122,154,125,0.12)" duration={16} delay={9} />
      </div>

      {/* ── Floating paw prints ── */}
      {mounted && (
        <>
          <PawDot style={{ top: "18%", right: "8%" }} delay={0} />
          <PawDot style={{ top: "60%", left: "4%" }} delay={1.5} />
          <PawDot style={{ top: "38%", right: "14%" }} delay={2.8} />
          <PawDot style={{ bottom: "22%", left: "9%" }} delay={0.7} />
          <PawDot style={{ top: "72%", right: "6%" }} delay={4} />
        </>
      )}

      {/* ── Paper grain overlay ── */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* ── Main content ── */}
      <div
        className="max-w-[720px] text-center relative z-10"
      >

        {/* Eyebrow — fades in first */}
        <div
          className="inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] px-4 py-1.5 rounded-full mb-10"
          style={{
            background: "rgba(91,123,94,0.09)",
            color: "var(--sage-dark)",
            border: "1px solid rgba(91,123,94,0.18)",
            animationName: "fadeInUp",
            animationDuration: "0.7s",
            animationFillMode: "both",
            animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
            animationDelay: "0.1s",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full animate-breathe"
            style={{ background: "var(--sage)" }}
          />
          Free &middot; Interactive &middot; 30 Days
        </div>

        {/* Main headline — staggered line-by-line reveal */}
        <h1
          className="font-serif font-semibold tracking-tight mb-8"
          style={{
            fontSize: "clamp(2.5rem, 6.5vw, 4.2rem)",
            lineHeight: 1.12,
            color: "var(--text)",
          }}
        >
          <AnimatedLine delay={0.25}>
            Your dog was just diagnosed.
          </AnimatedLine>
          <AnimatedLine
            delay={0.55}
            className="italic"
            style={{ color: "var(--sage)", marginTop: "0.12em" }}
          >
            You&apos;re not alone in this.
          </AnimatedLine>
        </h1>

        {/* Ornamental rule */}
        <div
          className="flex items-center justify-center gap-3 mb-8"
          style={{
            animationName: "fadeIn",
            animationDuration: "0.8s",
            animationDelay: "0.85s",
            animationFillMode: "both",
          }}
        >
          <div
            className="h-px"
            style={{
              width: "48px",
              background: "linear-gradient(to right, transparent, var(--gold))",
              opacity: 0.6,
            }}
          />
          <svg
            viewBox="0 0 20 20"
            className="w-3 h-3 flex-shrink-0"
            style={{ color: "var(--gold)", opacity: 0.7 }}
            aria-hidden="true"
          >
            <circle cx="10" cy="4" r="2.2" fill="currentColor" />
            <circle cx="4.5" cy="9" r="2" fill="currentColor" />
            <circle cx="15.5" cy="9" r="2" fill="currentColor" />
            <ellipse cx="10" cy="15.5" rx="3.5" ry="4" fill="currentColor" />
          </svg>
          <div
            className="h-px"
            style={{
              width: "48px",
              background: "linear-gradient(to left, transparent, var(--gold))",
              opacity: 0.6,
            }}
          />
        </div>

        {/* Pull-quote — intimate, personal */}
        <p
          className="font-serif italic leading-relaxed mx-auto mb-10"
          style={{
            fontSize: "clamp(1.08rem, 2.4vw, 1.25rem)",
            color: "var(--text-muted)",
            maxWidth: "580px",
            animationName: "wordReveal",
            animationDuration: "0.9s",
            animationDelay: "0.7s",
            animationFillMode: "both",
            animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          HSA Days is a free 30-day companion for families navigating a
          hemangiosarcoma diagnosis. Daily reflections, a private journal,
          and a community that truly understands.
        </p>

        {/* Signup form */}
        <div
          style={{
            animationName: "fadeInUp",
            animationDuration: "0.75s",
            animationDelay: "1s",
            animationFillMode: "both",
            animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <div className="mb-5">
            <SignupForm />
          </div>

          {/* Trust signals */}
          <p
            className="text-[0.84rem] mb-1.5"
            style={{ color: "var(--text-muted)" }}
          >
            Free forever &middot; No passwords &middot; Start immediately
          </p>
          <p
            className="text-[0.78rem] italic"
            style={{ color: "var(--text-muted)", opacity: 0.55 }}
          >
            Built by a dog dad who needed this. Read by hundreds of HSA families.
          </p>
        </div>

        {/* Social proof / stat row */}
        <div
          className="flex items-center justify-center gap-8 mt-12 flex-wrap"
          style={{
            animationName: "fadeIn",
            animationDuration: "1s",
            animationDelay: "1.3s",
            animationFillMode: "both",
          }}
        >
          {[
            { number: "30", label: "Daily Reflections" },
            { number: "Free", label: "Always & Forever" },
            { number: "Private", label: "Just For You" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div
                className="font-serif font-semibold"
                style={{
                  fontSize: "1.4rem",
                  color: "var(--sage-dark)",
                  lineHeight: 1,
                }}
              >
                {stat.number}
              </div>
              <div
                className="text-[0.72rem] uppercase tracking-[0.1em] mt-1 font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        style={{
          animationName: "fadeIn",
          animationDuration: "1s",
          animationDelay: "1.8s",
          animationFillMode: "both",
          color: "var(--text-muted)",
          opacity: 0.45,
        }}
        aria-hidden="true"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.14em] font-medium">
          Scroll
        </span>
        <svg
          viewBox="0 0 24 24"
          className="w-4 h-4"
          style={{
            animationName: "gentleFloat",
            animationDuration: "2s",
            animationIterationCount: "infinite",
            animationTimingFunction: "ease-in-out",
          }}
        >
          <path
            d="M12 5v14M5 12l7 7 7-7"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </div>
    </section>
  );
}
