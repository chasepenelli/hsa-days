"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShopifyButton } from "@/components/ui/ShopifyButton";

const faqs = [
  {
    q: "Is the digital program really free?",
    a: "Yes, always. The digital HSA Days program is free forever. The printed journal is a separate product for people who want a physical companion for their journey.",
  },
  {
    q: "What\u2019s the difference between the journal and the website?",
    a: "The website gives you all 30 days digitally \u2014 daily reflections, journaling, activities, and guides. The printed journal includes all of the same content, plus dedicated writing space, thicker pages, and lay-flat binding designed for actually writing in.",
  },
  {
    q: "When does it ship?",
    a: "We\u2019re targeting Spring 2026. Pre-orders help us finalize the print run. You\u2019ll receive an email the moment it ships.",
  },
  {
    q: "Can I buy it as a gift?",
    a: "Absolutely. We think it\u2019s one of the most meaningful gifts you can give someone going through this. Gift messaging will be available at checkout.",
  },
  {
    q: "What if I already started the digital program?",
    a: "The journal is designed to work alongside the digital program or on its own. Many families use both \u2014 the website for daily emails and journaling, the physical book for deeper writing and keepsakes.",
  },
  {
    q: "What is your refund policy?",
    a: "If you\u2019re not happy with the journal for any reason, we\u2019ll refund your purchase. No questions asked. We\u2019re building this with love, and we want you to love it too.",
  },
];

export function OrderFAQ() {
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
      id="faq"
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
      {/* Paper grain */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Mouse-reactive glow */}
      <div
        ref={glowRef}
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.12) 0%, transparent 60%)",
          transition: "transform 0.3s ease-out",
        }}
      />

      {/* Paw print watermark */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "5%",
          right: "5%",
          opacity: 0.05,
        }}
      >
        <Image
          src="/illustrations/icons/icon-paw-print.webp"
          alt=""
          width={200}
          height={200}
          style={{ objectFit: "contain" }}
        />
      </div>

      <div className="relative max-w-[700px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--gold-light)" }}
          >
            QUESTIONS
          </div>
          <h2
            className="reveal font-serif font-semibold tracking-tight"
            style={{
              fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
              lineHeight: 1.25,
              color: "white",
              transitionDelay: "0.08s",
            }}
          >
            Everything you might be wondering.
          </h2>
        </div>

        {/* FAQ items */}
        <div className="reveal-stagger flex flex-col gap-8 mb-16">
          {faqs.map((faq) => (
            <div
              key={faq.q}
              className="pb-8"
              style={{
                borderBottom: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <h3
                className="font-serif font-semibold text-[1.1rem] mb-3"
                style={{ color: "white", lineHeight: 1.4 }}
              >
                {faq.q}
              </h3>
              <p
                className="text-[0.92rem] leading-relaxed"
                style={{ color: "rgba(255,255,255,0.72)" }}
              >
                {faq.a}
              </p>
            </div>
          ))}
        </div>

        {/* Closing section */}
        <div className="reveal text-center" style={{ transitionDelay: "0.1s" }}>
          {/* Ornamental divider */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div
              className="h-px"
              style={{
                width: "48px",
                background: "linear-gradient(to right, transparent, var(--gold))",
                opacity: 0.5,
              }}
            />
            <Image
              src="/illustrations/icons/icon-flower-ornament.webp"
              alt=""
              width={14}
              height={14}
              style={{ objectFit: "contain", opacity: 0.5 }}
            />
            <div
              className="h-px"
              style={{
                width: "48px",
                background: "linear-gradient(to left, transparent, var(--gold))",
                opacity: 0.5,
              }}
            />
          </div>

          {/* Closing quote */}
          <p
            className="font-serif italic text-[1.1rem] leading-relaxed mb-10 mx-auto"
            style={{ color: "rgba(255,255,255,0.85)", maxWidth: "480px" }}
          >
            Your dog doesn&apos;t need a perfect owner. They just need you
            &mdash; present, here, today.
          </p>

          {/* CTA */}
          <ShopifyButton
            productSlug="guided-journal"
            label="Pre-Order the Guided Journal — $29"
            colorScheme="terracotta"
            className="mb-4"
          />
          <p
            className="text-[0.82rem]"
            style={{ color: "rgba(255,255,255,0.5)" }}
          >
            Ships Spring 2026. Cancel anytime before shipping.
          </p>
        </div>
      </div>
    </section>
  );
}
