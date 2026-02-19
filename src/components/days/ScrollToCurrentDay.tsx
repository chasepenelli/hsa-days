"use client";

import { useEffect } from "react";

export function ScrollToCurrentDay() {
  useEffect(() => {
    const el = document.getElementById("current-day");
    if (el) {
      // Small delay so layout settles
      setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, []);

  return null;
}
