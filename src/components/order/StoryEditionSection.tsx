"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShopifyButton } from "@/components/ui/ShopifyButton";

const features = [
  "30 chapters of Chase's unfiltered journey",
  "The real story behind every HSA Day",
  "Raw, honest reflections on life with Graffiti",
  "Instant digital delivery",
  "Read on any device",
  "The memoir that started it all",
];

export function StoryEditionSection() {
  const ref = useScrollReveal();

  return (
    <section
      id="story-edition"
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
      {/* Ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(212,133,106,0.08) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--terracotta)" }}
          >
            THE STORY EDITION
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              color: "var(--text)",
              transitionDelay: "0.08s",
            }}
          >
            The story behind{" "}
            <em className="italic" style={{ color: "var(--terracotta)" }}>
              every day.
            </em>
          </h2>
        </div>

        <div className="max-w-[640px] mx-auto relative">
          {/* Watermark */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/illustrations/icons/icon-pencil.webp"
              alt=""
              width={280}
              height={280}
              className="absolute"
              style={{
                right: "-60px",
                bottom: "10%",
                width: "280px",
                height: "280px",
                objectFit: "contain",
                opacity: 0.05,
                mixBlendMode: "multiply",
              }}
            />
          </div>

          {/* Badge */}
          <div className="reveal text-center mb-8" style={{ transitionDelay: "0.16s" }}>
            <span
              className="inline-block text-[0.68rem] font-semibold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full"
              style={{
                background: "rgba(212,133,106,0.10)",
                color: "var(--terracotta)",
                border: "1px solid rgba(212,133,106,0.22)",
              }}
            >
              NEW — EBOOK
            </span>
          </div>

          {/* Title */}
          <div className="reveal" style={{ transitionDelay: "0.24s" }}>
            <h3
              className="font-serif font-semibold text-center mb-2"
              style={{
                fontSize: "1.6rem",
                color: "var(--text)",
                lineHeight: 1.3,
              }}
            >
              The Story Edition
            </h3>
            <p
              className="font-serif italic text-[0.95rem] text-center mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Chase &amp; Graffiti&apos;s journey, in full.
            </p>
            <p
              className="text-[0.92rem] leading-relaxed text-center mx-auto mb-8"
              style={{ color: "var(--text-muted)", maxWidth: "520px" }}
            >
              The complete memoir behind HSA Days &mdash; 30 chapters of the
              unfiltered, honest story of one man and his dog navigating what it
              means to truly show up. This is the story that started it all.
            </p>
          </div>

          {/* Divider */}
          <div
            className="reveal mx-auto mb-8"
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, var(--border-strong), transparent)",
              transitionDelay: "0.28s",
            }}
          />

          {/* Features grid */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px] mx-auto mb-8" style={{ transitionDelay: "0.32s" }}>
            {features.map((feature) => (
              <div key={feature} className="flex items-center gap-2.5">
                <div
                  className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[0.7rem]"
                  style={{
                    background: "rgba(212,133,106,0.1)",
                    color: "var(--terracotta)",
                  }}
                >
                  &#x2713;
                </div>
                <span
                  className="text-[0.88rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* Price */}
          <div className="reveal text-center mb-6" style={{ transitionDelay: "0.36s" }}>
            <span
              className="font-serif font-semibold"
              style={{
                fontSize: "2.4rem",
                color: "var(--terracotta)",
                lineHeight: 1,
              }}
            >
              $9.99
            </span>
          </div>

          {/* CTA */}
          <div className="reveal text-center" style={{ transitionDelay: "0.4s" }}>
            <ShopifyButton
              productSlug="story-edition-ebook"
              label="Get the Story Edition"
              colorScheme="terracotta"
            />
            <p
              className="mt-4 text-[0.84rem]"
              style={{ color: "var(--text-muted)" }}
            >
              Instant digital delivery. Read on any device.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
