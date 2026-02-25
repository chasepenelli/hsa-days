"use client";

import { useEffect } from "react";

export function ScrollToCurrentDay() {
  useEffect(() => {
    const el = document.getElementById("current-day");
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Longer delay for line geometry to compute
    setTimeout(() => {
      el.scrollIntoView({
        behavior: prefersReducedMotion ? "instant" : "smooth",
        block: "start",
      });
    }, 400);
  }, []);

  return null;
}
