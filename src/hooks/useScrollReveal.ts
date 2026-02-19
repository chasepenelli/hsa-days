"use client";

import { useEffect, useRef } from "react";

/**
 * Attaches an IntersectionObserver to a container element.
 * Adds "is-visible" to all descendants with class "reveal", "reveal-scale",
 * "reveal-stagger", "timeline-line-h", or "timeline-line-v" when they enter
 * the viewport. Each element is only revealed once.
 */
export function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    const targets = container.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-scale, .reveal-stagger, .timeline-line-h, .timeline-line-v"
    );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -60px 0px" }
    );

    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [threshold]);

  return ref;
}
