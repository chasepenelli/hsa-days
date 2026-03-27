"use client";

import { useEffect, useState } from "react";

interface AmbientOrbProps {
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  size: number;
  color: string;
  duration?: number;
  delay?: number;
}

export function AmbientOrb({
  top,
  left,
  right,
  bottom,
  size,
  color,
  duration = 14,
  delay = 0,
}: AmbientOrbProps) {
  const [shouldAnimate, setShouldAnimate] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setShouldAnimate(!mq.matches);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        width: size,
        height: size,
        borderRadius: "50%",
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        filter: "blur(60px)",
        pointerEvents: "none",
        zIndex: 0,
        ...(shouldAnimate
          ? {
              animationName: "ambientGlow",
              animationDuration: `${duration}s`,
              animationDelay: `${delay}s`,
              animationTimingFunction: "ease-in-out",
              animationIterationCount: "infinite",
            }
          : {}),
      }}
    />
  );
}
