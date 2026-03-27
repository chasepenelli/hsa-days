"use client";

import { useState, useEffect } from "react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed z-40 flex items-center justify-center rounded-full border-none cursor-pointer"
      style={{
        bottom: 24,
        right: 24,
        width: 44,
        height: 44,
        background: "var(--warm-white)",
        border: "1px solid var(--border)",
        boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
        color: "var(--text-muted)",
        opacity: visible ? 1 : 0,
        pointerEvents: visible ? "auto" : "none",
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition:
          "opacity var(--duration-normal) ease, transform var(--duration-normal) var(--ease-out-expo)",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        className="w-4 h-4"
      >
        <path d="M12 19V5M5 12l7-7 7 7" />
      </svg>
    </button>
  );
}
