"use client";

import { useEffect, useRef } from "react";
import { SignupForm } from "@/components/forms/SignupForm";
import { useScrollReveal } from "@/hooks/useScrollReveal";

function FloatingPaw({ style, delay }: { style: React.CSSProperties; delay: number }) {
  return (
    <div
      aria-hidden="true"
      className="absolute pointer-events-none select-none"
      style={{
        ...style,
        animationName: "gentleFloat",
        animationDuration: `${7 + delay * 1.5}s`,
        animationDelay: `${delay}s`,
        animationTimingFunction: "ease-in-out",
        animationIterationCount: "infinite",
        opacity: 0.1,
        fontSize: "clamp(14px, 2vw, 22px)",
        filter: "brightness(10)",
      }}
    >
      🐾
    </div>
  );
}

export function FinalCTA() {
  const ref = useScrollReveal();
  const glowRef = useRef<HTMLDivElement>(null);

  // Mouse parallax on the glow orb
  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const handleMove = (e: MouseEvent) => {
      const rect = glow.parentElement?.getBoundingClientRect();
      if (!rect) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
      glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
    };

    document.addEventListener("mousemove", handleMove, { passive: true });
    return () => document.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <section
      id="signup"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 12vw, 140px)",
        paddingBottom: "clamp(80px, 12vw, 140px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background:
          "linear-gradient(160deg, var(--sage-dark) 0%, var(--sage) 55%, rgba(62,87,64,0.95) 100%)",
      }}
    >
      {/* Paper grain on sage */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Ambient glow orb — mouse-reactive */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none will-change-transform"
        aria-hidden="true"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(ellipse, rgba(196,162,101,0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          animationName: "ambientGlow",
          animationDuration: "7s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
        }}
      />

      {/* Floating paws */}
      <FloatingPaw style={{ top: "15%", left: "5%" }} delay={0} />
      <FloatingPaw style={{ top: "65%", left: "2%" }} delay={2} />
      <FloatingPaw style={{ top: "20%", right: "4%" }} delay={1.2} />
      <FloatingPaw style={{ bottom: "20%", right: "8%" }} delay={3.5} />
      <FloatingPaw style={{ top: "45%", left: "8%" }} delay={0.8} />
      <FloatingPaw style={{ top: "50%", right: "6%" }} delay={4.2} />

      {/* Content */}
      <div className="max-w-[660px] mx-auto text-center relative z-10">

        {/* Section label */}
        <div
          className="reveal inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] mb-8 px-4 py-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.8)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: "var(--gold)",
              animationName: "breathe",
              animationDuration: "3s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            }}
          />
          Begin Your Journey
        </div>

        {/* Main headline */}
        <h2
          className="reveal font-serif font-semibold tracking-tight text-white mb-5"
          style={{
            fontSize: "clamp(2.2rem, 5.5vw, 3.6rem)",
            lineHeight: 1.12,
            transitionDelay: "0.1s",
          }}
        >
          Day 1 is ready
          <br />
          <em
            className="italic"
            style={{
              color: "var(--gold-light)",
            }}
          >
            when you are.
          </em>
        </h2>

        {/* Supporting copy */}
        <p
          className="reveal font-serif italic text-[1.12rem] leading-relaxed mb-4"
          style={{
            color: "rgba(255,255,255,0.75)",
            maxWidth: "520px",
            margin: "0 auto 20px",
            transitionDelay: "0.2s",
          }}
        >
          It&apos;s free. It&apos;s private. And it&apos;s built by someone
          who&apos;s been exactly where you are right now.
        </p>
        <p
          className="reveal text-[1.05rem] leading-relaxed mb-10"
          style={{
            color: "rgba(255,255,255,0.65)",
            maxWidth: "480px",
            margin: "0 auto 40px",
            transitionDelay: "0.28s",
          }}
        >
          Your dog needs you present — this helps you get there.
        </p>

        {/* Signup form */}
        <div
          className="reveal"
          style={{ transitionDelay: "0.36s" }}
        >
          <SignupForm variant="dark" />
        </div>

        <p
          className="reveal text-[0.85rem] mt-5"
          style={{
            color: "rgba(255,255,255,0.45)",
            transitionDelay: "0.44s",
          }}
        >
          No spam. No passwords. Just 30 days of real support.
        </p>

        {/* Ornament */}
        <div
          className="reveal flex items-center justify-center gap-3 mt-14"
          style={{
            color: "rgba(255,255,255,0.2)",
            transitionDelay: "0.5s",
          }}
          aria-hidden="true"
        >
          <div
            className="h-px"
            style={{
              flex: 1,
              maxWidth: "60px",
              background: "linear-gradient(to right, transparent, rgba(196,162,101,0.5))",
            }}
          />
          <svg viewBox="0 0 20 20" className="w-3.5 h-3.5 flex-shrink-0" style={{ color: "var(--gold)", opacity: 0.6 }}>
            <circle cx="10" cy="4" r="2.2" fill="currentColor" />
            <circle cx="4.5" cy="9" r="2" fill="currentColor" />
            <circle cx="15.5" cy="9" r="2" fill="currentColor" />
            <ellipse cx="10" cy="15.5" rx="3.5" ry="4" fill="currentColor" />
          </svg>
          <div
            className="h-px"
            style={{
              flex: 1,
              maxWidth: "60px",
              background: "linear-gradient(to left, transparent, rgba(196,162,101,0.5))",
            }}
          />
        </div>
      </div>
    </section>
  );
}
