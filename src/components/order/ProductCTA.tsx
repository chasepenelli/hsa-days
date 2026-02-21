"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const features = [
  "30 daily reflections & guided prompts",
  "Complete supplement & nutrition guides",
  "Dedicated journaling space on every page",
  "Room for photos, notes, and keepsakes",
  "Lay-flat binding for comfortable writing",
  "Free digital access included",
];

export function ProductCTA() {
  const ref = useScrollReveal();

  return (
    <section
      id="the-journal"
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
          top: "20%",
          right: "-10%",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.08) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[1100px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            THE JOURNAL
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
            Ready when{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              you are.
            </em>
          </h2>
        </div>

        {/* Product card */}
        <div
          className="reveal-scale max-w-[780px] mx-auto rounded-[24px] overflow-hidden relative"
          style={{
            background: "white",
            border: "1px solid var(--border)",
            boxShadow: "0 16px 56px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)",
            transitionDelay: "0.16s",
          }}
        >
          {/* Sage accent bar */}
          <div
            style={{
              height: "3px",
              background: "var(--sage)",
              borderRadius: "24px 24px 0 0",
            }}
          />

          {/* Watermark */}
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src="/illustrations/icons/icon-journal.png"
              alt=""
              width={280}
              height={280}
              className="absolute"
              style={{
                right: "-20px",
                bottom: "-20px",
                width: "280px",
                height: "280px",
                objectFit: "contain",
                opacity: 0.06,
                mixBlendMode: "multiply",
              }}
            />
          </div>

          <div className="relative p-7 md:p-12">
            {/* Badge */}
            <div className="text-center mb-6">
              <span
                className="inline-block text-[0.68rem] font-semibold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full"
                style={{
                  background: "rgba(91,123,94,0.10)",
                  color: "var(--sage)",
                  border: "1px solid rgba(91,123,94,0.20)",
                }}
              >
                PRE-ORDER NOW
              </span>
            </div>

            {/* Product illustration */}
            <div className="flex justify-center mb-8">
              <div
                className="relative"
                style={{
                  width: "100%",
                  maxWidth: "360px",
                  aspectRatio: "4 / 3",
                }}
              >
                <Image
                  src="/illustrations/order/order-product-mockup.webp"
                  alt="HSA Days: The Guided Journal"
                  fill
                  sizes="360px"
                  className="object-contain"
                  style={{ mixBlendMode: "multiply" }}
                />
              </div>
            </div>

            {/* Title */}
            <h3
              className="font-serif font-semibold text-center mb-2"
              style={{
                fontSize: "1.6rem",
                color: "var(--text)",
                lineHeight: 1.3,
              }}
            >
              HSA Days: The Guided Journal
            </h3>
            <p
              className="font-serif italic text-[0.95rem] text-center mb-3"
              style={{ color: "var(--text-muted)" }}
            >
              Record your journey as it happens.
            </p>
            <p
              className="text-[0.92rem] leading-relaxed text-center mx-auto mb-8"
              style={{ color: "var(--text-muted)", maxWidth: "520px" }}
            >
              All 30 days in a beautiful printed format with dedicated writing
              space, thick archival pages, lay-flat binding, and room for photos
              and keepsakes.
            </p>

            {/* Features grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px] mx-auto mb-8">
              {features.map((feature) => (
                <div key={feature} className="flex items-center gap-2.5">
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 text-[0.7rem]"
                    style={{
                      background: "rgba(91,123,94,0.1)",
                      color: "var(--sage)",
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

            {/* Divider */}
            <div
              className="mx-auto mb-6"
              style={{
                width: "60px",
                height: "1px",
                background:
                  "linear-gradient(to right, transparent, var(--border-strong), transparent)",
              }}
            />

            {/* Price */}
            <div className="text-center mb-6">
              <span
                className="font-serif font-semibold"
                style={{
                  fontSize: "2.4rem",
                  color: "var(--sage)",
                  lineHeight: 1,
                }}
              >
                $49
              </span>
            </div>

            {/* CTA */}
            <div className="text-center">
              <button
                className="inline-block px-10 py-4 text-white border-none rounded-xl text-[1.05rem] font-semibold font-sans cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] md:w-auto w-full"
                style={{
                  background: "var(--terracotta)",
                  boxShadow: "0 4px 20px rgba(212,133,106,0.3)",
                  minHeight: "52px",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#c4775f";
                  e.currentTarget.style.boxShadow =
                    "0 6px 24px rgba(212,133,106,0.4)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--terracotta)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(212,133,106,0.3)";
                }}
              >
                Pre-Order the Guided Journal
              </button>
              <p
                className="mt-4 text-[0.84rem]"
                style={{ color: "var(--text-muted)" }}
              >
                Ships Spring 2026. Free digital access included with every
                pre-order.
              </p>
            </div>
          </div>
        </div>

        {/* Trust strip */}
        <div className="reveal flex flex-wrap items-center justify-center gap-x-12 gap-y-4 mt-12">
          {[
            "Designed with love",
            "Ships Spring 2026",
            "Free digital access included",
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2.5">
              <div
                style={{
                  width: "5px",
                  height: "5px",
                  borderRadius: "50%",
                  background: "var(--gold)",
                  opacity: 0.6,
                }}
              />
              <span
                className="text-[0.84rem]"
                style={{ color: "var(--text-muted)" }}
              >
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
