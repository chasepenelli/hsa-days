"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface StickyScrollState {
  containerRef: React.RefObject<HTMLDivElement | null>;
  activeIndex: number;
  cardProgress: number;
  overallProgress: number;
  isSticky: boolean;
}

export function useStickyScroll(cardCount: number): StickyScrollState {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [cardProgress, setCardProgress] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  const rafRef = useRef<number>(0);

  const update = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const containerHeight = container.offsetHeight;
    const viewportHeight = window.innerHeight;

    // How far we've scrolled into the sticky container.
    // rect.top = 0  →  scrolled = 0  (just entered the sticky zone)
    // rect.bottom = viewportHeight  →  scrolled = containerHeight - viewportHeight
    const scrollableDistance = containerHeight - viewportHeight;
    const scrolled = -rect.top;
    const progress = Math.max(0, Math.min(1, scrolled / scrollableDistance));

    setOverallProgress(progress);

    // True when the container is pinned and filling the viewport
    const stuck = rect.top <= 0 && rect.bottom >= viewportHeight;
    setIsSticky(stuck);

    // Split total progress into equal per-card segments.
    // Each card "owns" 1/cardCount of the total scroll range.
    // cardProg = 0 → start of card's segment; cardProg = 1 → end of segment.
    const perCard = 1 / cardCount;
    const rawIndex = progress / perCard;
    const index = Math.min(Math.floor(rawIndex), cardCount - 1);

    // Clamp the last card so it never reports cardProg > 0 once it's reached —
    // this prevents the last card from beginning its own exit math.
    const isLastCard = index === cardCount - 1;
    const cardProg = isLastCard
      ? 0
      : Math.max(0, Math.min(1, rawIndex - index));

    setActiveIndex(index);
    setCardProgress(cardProg);
  }, [cardCount]);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(update);
    };

    // Compute initial position for mid-page refreshes
    update();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [update]);

  return { containerRef, activeIndex, cardProgress, overallProgress, isSticky };
}
