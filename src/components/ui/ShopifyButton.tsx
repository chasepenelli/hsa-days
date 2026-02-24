"use client";

import { useState } from "react";
import { isShopifyConfigured, createCheckout, type ProductSlug } from "@/lib/shopify";

type ColorScheme = "sage" | "terracotta" | "gold";

const COLORS: Record<ColorScheme, { bg: string; hoverBg: string; shadow: string; hoverShadow: string }> = {
  terracotta: {
    bg: "var(--terracotta)",
    hoverBg: "#c4775f",
    shadow: "rgba(212,133,106,0.3)",
    hoverShadow: "rgba(212,133,106,0.4)",
  },
  sage: {
    bg: "var(--sage)",
    hoverBg: "var(--sage-dark)",
    shadow: "rgba(91,123,94,0.3)",
    hoverShadow: "rgba(91,123,94,0.4)",
  },
  gold: {
    bg: "var(--gold)",
    hoverBg: "#b39458",
    shadow: "rgba(196,162,101,0.3)",
    hoverShadow: "rgba(196,162,101,0.4)",
  },
};

export function ShopifyButton({
  productSlug,
  label,
  variant = "solid",
  colorScheme = "terracotta",
  className = "",
  fullWidth = false,
  onDark = false,
}: {
  productSlug: ProductSlug;
  label: string;
  variant?: "solid" | "outline";
  colorScheme?: ColorScheme;
  className?: string;
  fullWidth?: boolean;
  onDark?: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const configured = isShopifyConfigured();
  const colors = COLORS[colorScheme];

  const handleClick = async () => {
    if (!configured) {
      // Scroll to signup section
      const el = document.getElementById("signup");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
      return;
    }

    setLoading(true);
    setError(false);
    try {
      await createCheckout(productSlug);
    } catch {
      setError(true);
      setLoading(false);
    }
  };

  const displayLabel = configured ? label : "Pre-Orders Opening Soon";

  if (variant === "outline") {
    const outlineColor = colorScheme === "sage" ? "var(--sage)" : colorScheme === "gold" ? "var(--gold)" : "var(--terracotta)";

    return (
      <button
        onClick={handleClick}
        disabled={loading}
        className={`${fullWidth ? "w-full" : "w-full md:w-auto md:mx-auto md:px-10"} px-6 py-4 rounded-xl text-[1rem] font-semibold font-sans cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] block ${className}`}
        style={{
          background: "transparent",
          color: onDark ? "white" : outlineColor,
          border: `2px solid ${onDark ? "rgba(255,255,255,0.4)" : outlineColor}`,
          minHeight: "52px",
          opacity: loading ? 0.7 : 1,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = onDark ? "rgba(255,255,255,0.08)" : `${outlineColor}11`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "transparent";
        }}
      >
        {loading ? (
          <span className="inline-flex items-center gap-2">
            <Spinner />
            Processing...
          </span>
        ) : error ? (
          "Something went wrong — try again"
        ) : (
          displayLabel
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={`${fullWidth ? "w-full" : "w-full md:w-auto md:mx-auto md:px-10"} px-6 py-4 text-white border-none rounded-xl text-[1rem] font-semibold font-sans cursor-pointer transition-all hover:-translate-y-0.5 active:scale-[0.98] block ${className}`}
      style={{
        background: colors.bg,
        boxShadow: `0 4px 20px ${colors.shadow}`,
        minHeight: "52px",
        opacity: loading ? 0.7 : 1,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = colors.hoverBg;
        e.currentTarget.style.boxShadow = `0 6px 24px ${colors.hoverShadow}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = colors.bg;
        e.currentTarget.style.boxShadow = `0 4px 20px ${colors.shadow}`;
      }}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2 justify-center">
          <Spinner />
          Processing...
        </span>
      ) : error ? (
        "Something went wrong — try again"
      ) : (
        displayLabel
      )}
    </button>
  );
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <circle cx="12" cy="12" r="10" strokeOpacity={0.3} />
      <path d="M12 2a10 10 0 0 1 10 10" strokeLinecap="round" />
    </svg>
  );
}
