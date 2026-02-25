"use client";

import { useEffect, useRef, useState } from "react";

interface JourneyLineProps {
  completedCount: number;
  totalDays: number;
}

export function JourneyLine({ completedCount, totalDays }: JourneyLineProps) {
  const [frontierTop, setFrontierTop] = useState<number | null>(null);
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const fillRatio = completedCount / totalDays;

  useEffect(() => {
    // Measure the frontier node position once on mount
    const measure = () => {
      const currentEl = document.getElementById("current-day");
      const container = containerRef.current;
      if (currentEl && container) {
        const containerRect = container.getBoundingClientRect();
        const currentRect = currentEl.getBoundingClientRect();
        // Position at the thread dot location (18px from top of card wrapper)
        setFrontierTop(currentRect.top - containerRect.top + 18);
      }
      setReady(true);
    };

    // Allow layout to settle
    const timer = setTimeout(measure, 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      ref={containerRef}
      className="journey-line-container"
      data-line-ready={ready || undefined}
      aria-hidden="true"
    >
      {/* Layer 1: Completed fill gradient */}
      <div
        className="journey-line-fill"
        style={{
          transform: `scaleY(${fillRatio})`,
        }}
      />

      {/* Layer 2: Future gossamer */}
      <div
        className="journey-line-future"
        style={{
          transform: `scaleY(${1 - fillRatio})`,
        }}
      />

      {/* Layer 3: Frontier node */}
      {frontierTop !== null && completedCount < totalDays && (
        <div
          className="journey-node-current"
          style={{ top: `${frontierTop}px` }}
        />
      )}
    </div>
  );
}
