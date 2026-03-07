"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

export function About() {
  const ref = useScrollReveal();

  return (
    <section
      id="about"
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
      {/* Ambient background */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "0",
          right: "0",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(ellipse at top right, rgba(196,162,101,0.07) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-[1100px] mx-auto">

        <div className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
          style={{ color: "var(--gold)" }}
        >
          Our Story
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-12 md:gap-16 items-center">

          {/* Portrait column */}
          <div className="reveal" style={{ transitionDelay: "0.08s" }}>
            {/* Graffiti portrait placeholder — styled as a warm, organic frame */}
            <div
              className="relative w-full overflow-hidden"
              style={{
                aspectRatio: "4/5",
                borderRadius: "24px",
                background:
                  "linear-gradient(155deg, rgba(245,240,234,1) 0%, rgba(237,232,224,1) 100%)",
                border: "1px solid var(--border)",
                boxShadow: "0 16px 60px rgba(91,123,94,0.10), 0 4px 16px rgba(0,0,0,0.04)",
              }}
            >
              {/* Decorative inner frame */}
              <div
                className="absolute inset-4 rounded-[18px]"
                style={{
                  border: "1px dashed rgba(196,162,101,0.25)",
                }}
              />

              {/* Graffiti corgi portrait illustration */}
              <div className="absolute inset-0">
                <Image
                  src="/illustrations/home/home-about-graffiti.png"
                  alt="Graffiti the corgi — a golden ink wash portrait"
                  fill
                  sizes="(max-width: 768px) 90vw, 420px"
                  className="object-cover object-top"
                  style={{ borderRadius: "22px" }}
                />
                {/* Subtle warm vignette overlay to blend with frame */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    borderRadius: "22px",
                    background:
                      "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 55%, rgba(237,232,224,0.35) 100%)",
                  }}
                />
              </div>

              {/* Gold corner accents */}
              <div
                className="absolute top-6 left-6 w-5 h-5"
                aria-hidden="true"
                style={{
                  borderTop: "2px solid rgba(196,162,101,0.5)",
                  borderLeft: "2px solid rgba(196,162,101,0.5)",
                  borderRadius: "2px 0 0 0",
                }}
              />
              <div
                className="absolute top-6 right-6 w-5 h-5"
                aria-hidden="true"
                style={{
                  borderTop: "2px solid rgba(196,162,101,0.5)",
                  borderRight: "2px solid rgba(196,162,101,0.5)",
                  borderRadius: "0 2px 0 0",
                }}
              />
              <div
                className="absolute bottom-6 left-6 w-5 h-5"
                aria-hidden="true"
                style={{
                  borderBottom: "2px solid rgba(196,162,101,0.5)",
                  borderLeft: "2px solid rgba(196,162,101,0.5)",
                  borderRadius: "0 0 0 2px",
                }}
              />
              <div
                className="absolute bottom-6 right-6 w-5 h-5"
                aria-hidden="true"
                style={{
                  borderBottom: "2px solid rgba(196,162,101,0.5)",
                  borderRight: "2px solid rgba(196,162,101,0.5)",
                  borderRadius: "0 0 2px 0",
                }}
              />
            </div>

            {/* Caption beneath portrait */}
            <p
              className="text-center mt-4 font-serif italic text-[0.9rem]"
              style={{ color: "var(--text-muted)", opacity: 0.7 }}
            >
              Graffiti — corgi, muse, best friend
            </p>
          </div>

          {/* Text column */}
          <div>
            <h2
              className="reveal font-serif font-semibold tracking-tight mb-6"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
                lineHeight: 1.2,
                transitionDelay: "0.12s",
              }}
            >
              Meet{" "}
              <em className="italic" style={{ color: "var(--sage)" }}>
                Graffiti.
              </em>
            </h2>

            <div
              className="reveal space-y-4"
              style={{ transitionDelay: "0.2s" }}
            >
              <p
                className="text-[1.05rem] leading-relaxed"
                style={{ color: "var(--text)", maxWidth: 520 }}
              >
                Graffiti isn&apos;t just a dog. She&apos;s a personality, a
                comfort, a best friend who communicates through side-eye and
                strategic cuddling. When she was diagnosed with hemangiosarcoma,
                the world didn&apos;t stop — but it felt like it should have.
              </p>
              <p
                className="text-[0.95rem] leading-relaxed"
                style={{ color: "var(--text-muted)", maxWidth: 520 }}
              >
                I built HSA Days because I needed it. I needed something that
                wasn&apos;t a clinical research paper or a Reddit thread full of
                worst-case timelines. I needed a companion — something that would
                meet me where I was each day and help me show up for Graffiti in
                the ways that mattered.
              </p>
              <p
                className="text-[0.95rem] leading-relaxed"
                style={{ color: "var(--text-muted)", maxWidth: 520 }}
              >
                This is that thing. It&apos;s not perfect. It&apos;s not medical
                advice. It&apos;s just one person sharing what helped, what hurt,
                and what they wish they&apos;d known — so you don&apos;t have to
                figure it all out alone.
              </p>
            </div>

            {/* Signature */}
            <div
              className="reveal mt-8 flex items-center gap-4"
              style={{ transitionDelay: "0.3s" }}
            >
              <div
                className="h-px flex-1"
                style={{
                  maxWidth: "40px",
                  background: "var(--gold)",
                  opacity: 0.5,
                }}
              />
              <p
                className="font-serif italic text-[1.1rem]"
                style={{ color: "var(--sage)" }}
              >
                — Chase &amp; Graffiti
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
