"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const gallery = [
  {
    src: "/illustrations/order/order-lifestyle-morning.webp",
    caption: "Morning coffee. Day 7. Just us.",
    aspect: "16 / 9" as const,
    span: "full" as const,
  },
  {
    src: "/illustrations/order/order-lifestyle-writing.webp",
    caption: "Writing what I couldn\u2019t say out loud.",
    aspect: "1 / 1" as const,
    span: "half" as const,
  },
  {
    src: "/illustrations/order/order-lifestyle-couch.webp",
    caption: "She slept through the whole entry.",
    aspect: "3 / 4" as const,
    span: "half" as const,
  },
  {
    src: "/illustrations/order/order-lifestyle-complete.webp",
    caption: "Thirty days later. Still holding on.",
    aspect: "16 / 9" as const,
    span: "full" as const,
  },
];

export function LifestyleGallery() {
  const ref = useScrollReveal();

  return (
    <section
      id="in-your-hands"
      ref={ref as React.RefObject<HTMLElement>}
      className="relative overflow-hidden"
      style={{
        paddingTop: "clamp(80px, 10vw, 120px)",
        paddingBottom: "clamp(80px, 10vw, 120px)",
        paddingLeft: "24px",
        paddingRight: "24px",
        background: "var(--cream)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "30%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(196,162,101,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[900px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            IN YOUR HANDS
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight mb-5"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              color: "var(--text)",
              transitionDelay: "0.08s",
            }}
          >
            Built for real life &mdash;{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              not a coffee table.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "520px",
              transitionDelay: "0.16s",
            }}
          >
            Designed to sit next to your coffee, your dog, and your messy,
            beautiful reality.
          </p>
        </div>

        {/* Gallery grid */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 gap-6">
          {gallery.map((img) => (
            <div
              key={img.src}
              className={img.span === "full" ? "md:col-span-2" : ""}
            >
              <div
                className="relative"
                style={{
                  aspectRatio: img.aspect,
                }}
              >
                <Image
                  src={img.src}
                  alt={img.caption}
                  fill
                  sizes={
                    img.span === "full"
                      ? "(max-width: 768px) 100vw, 900px"
                      : "(max-width: 768px) 100vw, 440px"
                  }
                  className="object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
              <p
                className="font-serif italic text-[0.88rem] mt-3 text-center"
                style={{ color: "var(--text-muted)" }}
              >
                {img.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
