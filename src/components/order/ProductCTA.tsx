"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShopifyButton } from "@/components/ui/ShopifyButton";

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

        {/* Product section — unboxed, sitting naturally on the page */}
        <div className="max-w-[640px] mx-auto relative">
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
                background: "rgba(91,123,94,0.10)",
                color: "var(--sage)",
                border: "1px solid rgba(91,123,94,0.20)",
              }}
            >
              PRE-ORDER NOW
            </span>
          </div>

          {/* Product illustration — sits on the page, no container */}
          <div className="reveal-scale flex justify-center mb-10" style={{ transitionDelay: "0.24s" }}>
            <div
              className="relative"
              style={{
                width: "100%",
                maxWidth: "456px",
                aspectRatio: "4 / 3",
              }}
            >
              <Image
                src="/illustrations/order/order-product-mockup.png"
                alt="HSA Days: The Guided Journal"
                fill
                sizes="456px"
                className="object-contain"
              />
            </div>
          </div>

          {/* Title */}
          <div className="reveal" style={{ transitionDelay: "0.32s" }}>
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
          </div>

          {/* Divider */}
          <div
            className="reveal mx-auto mb-8"
            style={{
              width: "60px",
              height: "1px",
              background:
                "linear-gradient(to right, transparent, var(--border-strong), transparent)",
              transitionDelay: "0.36s",
            }}
          />

          {/* Features grid */}
          <div className="reveal grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-[500px] mx-auto mb-8" style={{ transitionDelay: "0.4s" }}>
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

          {/* Price */}
          <div className="reveal text-center mb-6" style={{ transitionDelay: "0.44s" }}>
            <span
              className="font-serif font-semibold"
              style={{
                fontSize: "2.4rem",
                color: "var(--sage)",
                lineHeight: 1,
              }}
            >
              $29
            </span>
          </div>

          {/* CTA */}
          <div className="reveal text-center" style={{ transitionDelay: "0.48s" }}>
            <ShopifyButton
              productSlug="guided-journal"
              label="Pre-Order the Guided Journal"
              colorScheme="terracotta"
            />
            <p
              className="mt-4 text-[0.84rem]"
              style={{ color: "var(--text-muted)" }}
            >
              Ships Spring 2026. Free digital access included with every
              pre-order.
            </p>
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
