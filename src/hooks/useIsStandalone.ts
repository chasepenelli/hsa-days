"use client";

import { useState, useEffect } from "react";

const STORAGE_KEY = "hsa-is-standalone";

function readCached(): boolean {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(STORAGE_KEY) === "1";
}

export function useIsStandalone(): boolean {
  const [isStandalone, setIsStandalone] = useState(readCached);

  useEffect(() => {
    // Check iOS Safari standalone mode
    const iosStandalone =
      "standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true;

    // Check display-mode: standalone media query
    const mql = window.matchMedia("(display-mode: standalone)");
    const standalone = iosStandalone || mql.matches;

    setIsStandalone(standalone);
    sessionStorage.setItem(STORAGE_KEY, standalone ? "1" : "0");

    const handler = (e: MediaQueryListEvent) => {
      const val = e.matches || iosStandalone;
      setIsStandalone(val);
      sessionStorage.setItem(STORAGE_KEY, val ? "1" : "0");
    };
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  return isStandalone;
}
