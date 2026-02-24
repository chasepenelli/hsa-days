"use client";

import { useState, useEffect } from "react";

export function useIsStandalone(): boolean {
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    // Check iOS Safari standalone mode
    const iosStandalone =
      "standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true;

    // Check display-mode: standalone media query
    const mql = window.matchMedia("(display-mode: standalone)");
    setIsStandalone(iosStandalone || mql.matches);

    const handler = (e: MediaQueryListEvent) => {
      setIsStandalone(e.matches || iosStandalone);
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isStandalone;
}
