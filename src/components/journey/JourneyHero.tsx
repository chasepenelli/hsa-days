"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export function JourneyHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion || !heroRef.current) return;

      const hero = heroRef.current;

      // Kill the gold ornament CSS animation when scroll begins
      const ornament = hero.querySelector<HTMLElement>(".hero-gold-ornament");

      // Main pinned timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: hero,
          pin: true,
          start: "top top",
          end: "+=250%",
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            // Kill ornament breathing once scroll starts
            if (self.progress > 0.01 && ornament) {
              ornament.style.animation = "none";
            }
          },
        },
      });

      // ─── Beat 1: "We See You" (0% – 35%) ───

      // Ornament fades out (0% → 8%)
      tl.to(
        ".hero-gold-ornament",
        { opacity: 0, duration: 0.08, ease: "none" },
        0
      );

      // First line materializes (0% → 12%)
      tl.fromTo(
        ".hero-line-1",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.12, ease: "power2.out" },
        0
      );

      // Dead space (12% → 22%): nothing happens — intentional

      // Second line appears (22% → 35%)
      tl.fromTo(
        ".hero-line-2",
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.13, ease: "power2.out" },
        0.22
      );

      // Ambient glow subtly scales during Beat 1
      tl.to(
        ".hero-glow",
        { scale: 1.06, opacity: 0.08, duration: 0.35, ease: "none" },
        0
      );

      // ─── Beat 2: "Here's What This Is" (35% – 65%) ───

      // Gold horizontal rule draws from center (35% → 42%)
      tl.fromTo(
        ".hero-gold-rule",
        { scaleX: 0 },
        { scaleX: 1, duration: 0.07, ease: "power2.out" },
        0.35
      );

      // Description fades in (42% → 52%)
      tl.fromTo(
        ".hero-description",
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.10, ease: "power2.out" },
        0.42
      );

      // Desktop watermark fades in during Beat 2
      tl.fromTo(
        ".hero-watermark",
        { opacity: 0 },
        { opacity: 1, duration: 0.15, ease: "none" },
        0.40
      );

      // Plateau 55% → 65%: holds

      // ─── Beat 3: "The Door is Open" (65% – 100%) ───

      // Beat 1+2 content fades out upward (65% → 75%)
      tl.to(
        ".hero-beat-12",
        { opacity: 0, y: -20, duration: 0.10, ease: "power2.in" },
        0.65
      );

      // Desktop watermark fades out
      tl.to(
        ".hero-watermark",
        { opacity: 0, duration: 0.08, ease: "none" },
        0.65
      );

      // "Day 1 is waiting" enters from below (72% → 82%)
      tl.fromTo(
        ".hero-beat-3",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.10, ease: "power2.out" },
        0.72
      );

      // Gold vertical thread grows (82% → 95%)
      tl.fromTo(
        ".hero-gold-thread",
        { scaleY: 0 },
        { scaleY: 1, duration: 0.13, ease: "power2.out" },
        0.82
      );

      // Desktop watermark parallax
      if (window.innerWidth >= 1024) {
        gsap.to(".hero-watermark-inner", {
          y: -60,
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "+=250%",
            scrub: 0.5,
          },
        });
      }
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] }
  );

  // ─── Reduced motion: show everything statically ───
  if (prefersReducedMotion) {
    return (
      <section
        className="relative text-center"
        style={{
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          paddingLeft: "24px",
          paddingRight: "24px",
          background:
            "linear-gradient(to bottom, var(--cream) 0%, var(--warm-white) 100%)",
        }}
      >
        <div className="max-w-[640px] mx-auto">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-5"
            style={{ color: "var(--gold-text)" }}
          >
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.6,
              }}
            />
            HSA Days &mdash; A Free 30-Day Companion
            <span
              style={{
                display: "inline-block",
                width: "24px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.6,
              }}
            />
          </div>

          <h1
            className="font-serif font-semibold tracking-tight mb-3"
            style={{
              fontSize: "clamp(2.2rem, 6vw, 3.4rem)",
              lineHeight: 1.18,
              color: "var(--text)",
            }}
          >
            Your dog was just diagnosed.
          </h1>
          <p
            className="font-serif italic mb-6"
            style={{
              fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
              lineHeight: 1.2,
              color: "var(--sage)",
            }}
          >
            There&rsquo;s a path through this.
          </p>

          {/* Gold rule */}
          <div
            className="mx-auto mb-6"
            style={{
              width: "48px",
              height: "2px",
              background: "var(--gold)",
              opacity: 0.5,
            }}
          />

          <p
            className="leading-relaxed mb-8 mx-auto"
            style={{
              fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)",
              color: "var(--text-muted)",
              maxWidth: "480px",
            }}
          >
            A free 30-day companion that walks beside you &mdash; one day at a
            time. Daily reflections, a private journal, and guidance for the
            hardest season with your dog.
          </p>

          <p
            className="font-serif italic"
            style={{ color: "var(--sage)", fontSize: "1rem" }}
          >
            Day 1 is waiting whenever you&rsquo;re ready.
          </p>
        </div>
      </section>
    );
  }

  // ─── Scroll-driven hero ───
  return (
    <div ref={containerRef}>
      <section
        ref={heroRef}
        className="relative overflow-hidden"
        style={{
          height: "100svh",
          paddingLeft: "24px",
          paddingRight: "24px",
          background:
            "linear-gradient(to bottom, var(--cream) 0%, var(--warm-white) 100%)",
        }}
      >
        {/* Sage ambient glow */}
        <div
          className="hero-glow absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "30%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "clamp(300px, 50vw, 600px)",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(91,123,94,0.05) 0%, transparent 70%)",
            willChange: "transform, opacity",
          }}
        />

        {/* Desktop watermark — Day 1 illustration */}
        <div
          className="hero-watermark absolute pointer-events-none hidden lg:block"
          aria-hidden="true"
          style={{
            top: "50%",
            right: "6%",
            transform: "translateY(-50%)",
            opacity: 0,
          }}
        >
          <div className="hero-watermark-inner" style={{ opacity: 0.045 }}>
            <Image
              src="/illustrations/journal/day01-illust.png"
              alt=""
              width={300}
              height={300}
              priority={false}
            />
          </div>
        </div>

        {/* Center content wrapper */}
        <div
          className="relative z-10 flex flex-col items-center justify-center text-center"
          style={{ height: "100%" }}
        >
          {/* Gold breathing ornament — visible before scroll */}
          <div
            className="hero-gold-ornament flex items-center gap-3 mb-8"
            aria-hidden="true"
            style={{
              animation: "heroOrnamentBreathe 4s ease-in-out infinite",
            }}
          >
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.5,
              }}
            />
            <div
              style={{
                width: "5px",
                height: "5px",
                borderRadius: "50%",
                background: "var(--gold)",
                opacity: 0.6,
              }}
            />
            <div
              style={{
                width: "32px",
                height: "1px",
                background: "var(--gold)",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Beat 1 + 2 content (fades out together in Beat 3) */}
          <div className="hero-beat-12" style={{ willChange: "transform, opacity" }}>
            {/* Eyebrow */}
            <div
              className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-6"
              style={{ color: "var(--gold-text)", opacity: 0.7 }}
            >
              HSA Days &mdash; A Free 30-Day Companion
            </div>

            {/* Headline line 1 */}
            <h1
              className="hero-line-1 font-serif font-semibold tracking-tight"
              style={{
                fontSize: "clamp(2.2rem, 6vw, 3.4rem)",
                lineHeight: 1.18,
                color: "var(--text)",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              Your dog was just diagnosed.
            </h1>

            {/* Headline line 2 */}
            <p
              className="hero-line-2 font-serif italic mt-2 mb-8"
              style={{
                fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
                lineHeight: 1.2,
                color: "var(--sage)",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              There&rsquo;s a path through this.
            </p>

            {/* Gold horizontal rule */}
            <div
              className="hero-gold-rule mx-auto mb-6"
              style={{
                width: "48px",
                height: "2px",
                background: "var(--gold)",
                opacity: 0.5,
                transformOrigin: "center",
                transform: "scaleX(0)",
                willChange: "transform",
              }}
            />

            {/* Description */}
            <p
              className="hero-description leading-relaxed mx-auto"
              style={{
                fontSize: "clamp(0.95rem, 2.2vw, 1.05rem)",
                color: "var(--text-muted)",
                maxWidth: "480px",
                opacity: 0,
                willChange: "transform, opacity",
              }}
            >
              A free 30-day companion that walks beside you &mdash; one day at a
              time. Daily reflections, a private journal, and guidance for the
              hardest season with your dog.
            </p>
          </div>

          {/* Beat 3 content (enters after Beat 1+2 exits) */}
          <div
            className="hero-beat-3 absolute inset-0 flex flex-col items-center justify-center"
            style={{ opacity: 0, willChange: "transform, opacity" }}
          >
            <p
              className="font-serif italic mb-4"
              style={{
                fontSize: "clamp(1.3rem, 3.5vw, 1.8rem)",
                lineHeight: 1.3,
                color: "var(--sage)",
              }}
            >
              Day 1 is waiting whenever you&rsquo;re ready.
            </p>

            {/* Scroll indicator with copy */}
            <div
              className="flex flex-col items-center gap-2 mt-6"
              style={{ animation: "arrowBounce 2s ease-in-out infinite" }}
            >
              <span
                className="text-[0.75rem] tracking-wide"
                style={{ color: "var(--text-muted)", opacity: 0.5 }}
              >
                Scroll when you&rsquo;re ready
              </span>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="var(--text-muted)"
                strokeWidth={1.5}
                width={20}
                height={20}
                style={{ opacity: 0.35 }}
              >
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>

          {/* Gold vertical thread (grows at end of Beat 3) */}
          <div
            className="hero-gold-thread absolute left-1/2 -translate-x-1/2"
            aria-hidden="true"
            style={{
              bottom: "24px",
              width: "1px",
              height: "40px",
              background:
                "linear-gradient(to bottom, var(--gold), rgba(196,162,101,0.3))",
              transformOrigin: "top",
              transform: "scaleY(0)",
              willChange: "transform",
            }}
          />
        </div>
      </section>
    </div>
  );
}
