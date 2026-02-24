"use client";

import { useScrollReveal } from "@/hooks/useScrollReveal";
import { ShopifyButton } from "@/components/ui/ShopifyButton";
import { isShopifyConfigured } from "@/lib/shopify";
import type { ProductSlug } from "@/lib/shopify";

const amounts: { slug: ProductSlug; amount: string; label: string }[] = [
  { slug: "support-5", amount: "$5", label: "Buy us a coffee" },
  { slug: "support-10", amount: "$10", label: "Support the mission" },
  { slug: "support-25", amount: "$25", label: "Champion this project" },
];

export function SupportSection() {
  const ref = useScrollReveal();
  const configured = isShopifyConfigured();

  return (
    <section
      id="support"
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
          top: "30%",
          right: "-8%",
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.06) 0%, transparent 68%)",
        }}
      />

      <div className="relative max-w-[800px] mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div
            className="reveal text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
            style={{ color: "var(--sage)" }}
          >
            SUPPORT
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
            Support{" "}
            <em className="italic" style={{ color: "var(--sage)" }}>
              HSA Days
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
            The 30-day digital experience is free. Your support helps us keep it
            that way &mdash; and build what comes next.
          </p>
        </div>

        {/* Amount cards */}
        {configured ? (
          <div className="reveal-stagger grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
            {amounts.map((item) => (
              <div
                key={item.slug}
                className="rounded-[16px] p-6 text-center flex flex-col"
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                }}
              >
                <div
                  className="font-serif font-semibold mb-1"
                  style={{
                    fontSize: "2rem",
                    color: "var(--sage)",
                    lineHeight: 1,
                  }}
                >
                  {item.amount}
                </div>
                <p
                  className="text-[0.84rem] mb-5"
                  style={{ color: "var(--text-muted)" }}
                >
                  {item.label}
                </p>
                <div className="mt-auto">
                  <ShopifyButton
                    productSlug={item.slug}
                    label={`Give ${item.amount}`}
                    colorScheme="sage"
                    fullWidth
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="reveal rounded-[16px] p-8 text-center"
            style={{
              background: "white",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
              transitionDelay: "0.24s",
            }}
          >
            <div className="grid grid-cols-3 gap-4 mb-6 max-w-[320px] mx-auto">
              {amounts.map((item) => (
                <div
                  key={item.slug}
                  className="font-serif font-semibold"
                  style={{ fontSize: "1.5rem", color: "var(--sage)" }}
                >
                  {item.amount}
                </div>
              ))}
            </div>
            <p
              className="text-[0.95rem] mb-1"
              style={{ color: "var(--text)" }}
            >
              Support options coming soon.
            </p>
            <p
              className="text-[0.84rem]"
              style={{ color: "var(--text-muted)" }}
            >
              Sign up below to be notified when support goes live.
            </p>
          </div>
        )}

        {/* Trust note */}
        <p
          className="reveal text-[0.82rem] text-center mt-6"
          style={{ color: "var(--text-muted)", transitionDelay: "0.1s" }}
        >
          100% of contributions go directly to HSA Days. Thank you.
        </p>
      </div>
    </section>
  );
}
