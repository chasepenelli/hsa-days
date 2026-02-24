"use client";

import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShopifyButton } from "@/components/ui/ShopifyButton";
import type { ProductSlug } from "@/lib/shopify";

/* ── Product data ─────────────────────────────────────── */

type Product = {
  slug: ProductSlug;
  badge: string;
  badgeBg: string;
  badgeColor: string;
  badgeBorder: string;
  accentColor: string;
  watermark: string;
  title: string;
  subtitle: string;
  description: string;
  features: { icon: string; title: string; description: string }[];
  price: string;
  priceColor: string;
  ctaLabel: string;
  ctaStyle: "solid" | "outline";
  ctaColorScheme: "sage" | "terracotta" | "gold";
  subtext: string;
};

const guidedJournal: Product = {
  slug: "guided-journal",
  badge: "AVAILABLE NOW",
  badgeBg: "rgba(91,123,94,0.10)",
  badgeColor: "var(--sage)",
  badgeBorder: "rgba(91,123,94,0.20)",
  accentColor: "var(--sage)",
  watermark: "/illustrations/icons/icon-journal.png",
  title: "The Guided Journal",
  subtitle: "Record your journey as it happens.",
  description:
    "All 30 days in a beautiful printed format with dedicated writing space, thick archival pages, lay-flat binding, and room for photos and keepsakes.",
  features: [
    {
      icon: "/illustrations/icons/icon-journal.png",
      title: "30 Days of Guided Space",
      description: "Every reflection, prompt, and activity with room to write.",
    },
    {
      icon: "/illustrations/icons/icon-supplement.png",
      title: "Complete Resource Guides",
      description: "Supplements, nutrition, and practical care references.",
    },
    {
      icon: "/illustrations/icons/icon-pencil.png",
      title: "Built for Writing",
      description: "Thick archival pages with lay-flat binding.",
    },
  ],
  price: "$29",
  priceColor: "var(--sage)",
  ctaLabel: "Pre-Order the Guided Journal",
  ctaStyle: "solid" as const,
  ctaColorScheme: "terracotta",
  subtext: "Ships Spring 2026. Free digital access included.",
};

const keepsakeBook: Product = {
  slug: "keepsake-edition",
  badge: "PRE-ORDER",
  badgeBg: "rgba(196,162,101,0.10)",
  badgeColor: "var(--gold)",
  badgeBorder: "rgba(196,162,101,0.22)",
  accentColor: "var(--gold)",
  watermark: "/illustrations/icons/icon-heart.png",
  title: "The Keepsake Book",
  subtitle: "Celebrate your completed journey.",
  description:
    "We compile your journal entries, reflections, and photos from the digital program into a one-of-a-kind printed book. Your words, your memories, bound forever.",
  features: [
    {
      icon: "/illustrations/icons/icon-camera.png",
      title: "Your Words & Photos",
      description: "Everything you wrote and captured, beautifully arranged.",
    },
    {
      icon: "/illustrations/icons/icon-heart.png",
      title: "One of a Kind",
      description: "Unique to your journey \u2014 no two books are the same.",
    },
    {
      icon: "/illustrations/icons/icon-star.png",
      title: "Heirloom Quality",
      description: "Printed on premium paper with hardcover binding.",
    },
  ],
  price: "$49",
  priceColor: "var(--gold)",
  ctaLabel: "Pre-Order the Keepsake Edition",
  ctaStyle: "outline" as const,
  ctaColorScheme: "gold",
  subtext: "Ships Spring 2026. Your journey, bound forever.",
};

const storyEdition: Product = {
  slug: "story-edition-ebook",
  badge: "NEW",
  badgeBg: "rgba(212,133,106,0.10)",
  badgeColor: "var(--terracotta)",
  badgeBorder: "rgba(212,133,106,0.22)",
  accentColor: "var(--terracotta)",
  watermark: "/illustrations/icons/icon-pencil.png",
  title: "The Story Edition",
  subtitle: "Chase & Graffiti\u2019s journey, in full.",
  description:
    "The complete memoir behind HSA Days \u2014 30 chapters of the unfiltered, honest story of one man and his dog navigating what it means to truly show up.",
  features: [
    {
      icon: "/illustrations/icons/icon-journal.png",
      title: "30 Chapters",
      description: "The full story behind every day of the program.",
    },
    {
      icon: "/illustrations/icons/icon-heart.png",
      title: "The Full Story",
      description: "Raw, honest, and unfiltered \u2014 the real journey.",
    },
    {
      icon: "/illustrations/icons/icon-star.png",
      title: "Instant Download",
      description: "Digital delivery \u2014 start reading immediately.",
    },
  ],
  price: "$9.99",
  priceColor: "var(--terracotta)",
  ctaLabel: "Get the Story Edition",
  ctaStyle: "solid" as const,
  ctaColorScheme: "terracotta",
  subtext: "Instant digital delivery. Read on any device.",
};

/* ── Sub-components ───────────────────────────────────── */

function FeatureBlock({
  icon,
  title,
  description,
  accentColor,
}: {
  icon: string;
  title: string;
  description: string;
  accentColor: string;
}) {
  return (
    <div className="flex items-start gap-3.5">
      <div
        className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
        style={{
          background:
            accentColor === "var(--sage)"
              ? "rgba(91,123,94,0.09)"
              : accentColor === "var(--terracotta)"
                ? "rgba(212,133,106,0.09)"
                : "rgba(196,162,101,0.09)",
        }}
      >
        <Image
          src={icon}
          alt=""
          width={22}
          height={22}
          style={{ objectFit: "contain", mixBlendMode: "multiply" }}
        />
      </div>
      <div className="flex-1 min-w-0">
        <div
          className="text-[0.88rem] font-semibold mb-0.5"
          style={{ color: "var(--text)" }}
        >
          {title}
        </div>
        <p className="text-[0.82rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
          {description}
        </p>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  isPrimary,
}: {
  product: Product;
  isPrimary: boolean;
}) {
  return (
    <div
      className="relative rounded-[20px] overflow-hidden flex flex-col"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        boxShadow: isPrimary
          ? "0 12px 48px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.04)"
          : "0 4px 24px rgba(0,0,0,0.05)",
      }}
    >
      {/* Accent top bar */}
      <div
        style={{
          height: "3px",
          background: product.accentColor,
          borderRadius: "20px 20px 0 0",
        }}
      />

      {/* Watermark illustration */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <Image
          src={product.watermark}
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

      {/* Card content */}
      <div className="relative p-7 md:p-10 flex flex-col flex-1">
        {/* Badge */}
        <div className="mb-5">
          <span
            className="inline-block text-[0.68rem] font-semibold uppercase tracking-[0.12em] px-3.5 py-1.5 rounded-full"
            style={{
              background: product.badgeBg,
              color: product.badgeColor,
              border: `1px solid ${product.badgeBorder}`,
            }}
          >
            {product.badge}
          </span>
        </div>

        {/* Title & subtitle */}
        <h3
          className="font-serif font-semibold mb-1.5"
          style={{ fontSize: "1.45rem", color: "var(--text)", lineHeight: 1.3 }}
        >
          {product.title}
        </h3>
        <p
          className="font-serif italic text-[0.95rem] mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {product.subtitle}
        </p>

        {/* Description */}
        <p
          className="text-[0.92rem] leading-relaxed mb-6"
          style={{ color: "var(--text-muted)" }}
        >
          {product.description}
        </p>

        {/* Feature blocks */}
        <div className="flex flex-col gap-4 mb-8">
          {product.features.map((f) => (
            <FeatureBlock
              key={f.title}
              icon={f.icon}
              title={f.title}
              description={f.description}
              accentColor={product.accentColor}
            />
          ))}
        </div>

        {/* Spacer to push price + CTA to bottom */}
        <div className="mt-auto">
          {/* Divider */}
          <div
            className="mb-6"
            style={{
              height: "1px",
              background:
                "linear-gradient(to right, transparent, var(--border-strong), transparent)",
            }}
          />

          {/* Price */}
          <div className="text-center mb-5">
            <span
              className="font-serif font-semibold"
              style={{
                fontSize: isPrimary ? "2rem" : "1.15rem",
                color: product.priceColor,
                lineHeight: 1,
              }}
            >
              {product.price}
            </span>
          </div>

          {/* CTA Button */}
          <ShopifyButton
            productSlug={product.slug}
            label={product.ctaLabel}
            variant={product.ctaStyle}
            colorScheme={product.ctaColorScheme}
          />

          {/* Subtext */}
          <p
            className="mt-3.5 text-[0.82rem] text-center"
            style={{ color: "var(--text-muted)" }}
          >
            {product.subtext}
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ─────────────────────────────────────── */

export function PreOrder() {
  const ref = useScrollReveal();

  return (
    <section
      id="order-section"
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
      {/* Ambient glows */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "-10%",
          left: "-8%",
          width: "480px",
          height: "480px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.06) 0%, transparent 68%)",
        }}
      />
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "-10%",
          right: "-8%",
          width: "420px",
          height: "420px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.07) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* ── Zone A: Empathy Opening ───────────────── */}
        <div className="text-center mb-10">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold)" }}
          >
            HOLD IT FOREVER
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
            Some things deserve to be{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              more than digital.
            </em>
          </h2>
          <p
            className="reveal text-[1.05rem] leading-relaxed mx-auto"
            style={{
              color: "var(--text-muted)",
              maxWidth: "600px",
              transitionDelay: "0.16s",
            }}
          >
            You&apos;re building something deeply personal through these 30 days
            &mdash; reflections, memories, quiet moments with your dog that
            you&apos;ll never get back. We believe those deserve a permanent
            home.
          </p>
        </div>

        {/* ── Zone B: Emotional Bridge ──────────────── */}
        <div
          className="reveal max-w-[640px] mx-auto text-center mb-14"
          style={{ transitionDelay: "0.24s" }}
        >
          {/* Top rule */}
          <div
            className="mx-auto mb-5"
            style={{
              width: "48px",
              height: "2px",
              borderRadius: "1px",
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />
          <blockquote>
            <p
              className="font-serif italic text-[1.05rem] leading-[1.75] mb-3"
              style={{ color: "var(--text)" }}
            >
              &ldquo;I wanted something I could hold in my hands. Something that
              proved this time happened &mdash; that it mattered, that we were
              here together.&rdquo;
            </p>
            <cite
              className="not-italic text-[0.84rem]"
              style={{ color: "var(--text-muted)" }}
            >
              &mdash; From an HSA Days family
            </cite>
          </blockquote>
          {/* Bottom rule */}
          <div
            className="mx-auto mt-5"
            style={{
              width: "48px",
              height: "2px",
              borderRadius: "1px",
              background:
                "linear-gradient(to right, transparent, var(--gold), transparent)",
            }}
          />
        </div>

        {/* ── Zone C: Product Cards ─────────────────── */}
        <div className="reveal-stagger grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-14">
          <ProductCard product={guidedJournal} isPrimary={true} />
          <ProductCard product={keepsakeBook} isPrimary={false} />
          <ProductCard product={storyEdition} isPrimary={false} />
        </div>

        {/* ── Zone D: Trust Strip ───────────────────── */}
        <div
          className="reveal flex flex-wrap items-center justify-center gap-x-12 gap-y-4"
          style={{ transitionDelay: "0.1s" }}
        >
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
