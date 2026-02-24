"use client";

import { useState, useEffect } from "react";

export function PWASplash() {
  const [visible, setVisible] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Only show in standalone PWA mode
    const isStandalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in window.navigator && (window.navigator as { standalone?: boolean }).standalone === true);

    if (!isStandalone) return;

    // Only show once per session
    if (sessionStorage.getItem("hsa-splash-shown")) return;
    sessionStorage.setItem("hsa-splash-shown", "1");

    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    setVisible(true);

    // Begin fade-out after 3.2s
    const fadeTimer = setTimeout(() => setFadeOut(true), 3200);
    // Unmount after fade completes
    const removeTimer = setTimeout(() => setVisible(false), 3800);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`pwa-splash ${fadeOut ? "pwa-splash-out" : ""}`}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/illustrations/order/order-hero-lifestyle.webp"
        alt=""
        className="pwa-splash-illustration"
      />
      {/* Warm gradient overlay for contrast */}
      <div className="pwa-splash-overlay" />
      <div className="pwa-splash-content">
        <span className="pwa-splash-wordmark">
          HSA <span className="pwa-splash-accent">Days</span>
        </span>
        <span className="pwa-splash-tagline">Your 30-day companion</span>
      </div>

      <style jsx>{`
        .pwa-splash {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          overflow: hidden;
          animation: splashIn 0.4s ease-out;
        }

        .pwa-splash-out {
          animation: splashOut 0.6s ease-in forwards;
        }

        .pwa-splash-illustration {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          opacity: 0;
          animation: illustrationIn 1.2s cubic-bezier(0.16, 1, 0.3, 1) 0.2s forwards;
        }

        .pwa-splash-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            180deg,
            rgba(62,87,64,0.3) 0%,
            rgba(62,87,64,0.15) 40%,
            rgba(62,87,64,0.5) 100%
          );
          z-index: 1;
        }

        .pwa-splash-content {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }

        .pwa-splash-wordmark {
          font-family: var(--font-lora), serif;
          font-size: 2.2rem;
          font-weight: 600;
          color: #fff;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 16px rgba(0, 0, 0, 0.4);
          opacity: 0;
          animation: wordmarkIn 0.7s ease-out 0.8s forwards;
        }

        .pwa-splash-tagline {
          font-family: var(--font-lora), serif;
          font-style: italic;
          font-size: 0.88rem;
          color: rgba(255,255,255,0.7);
          text-shadow: 0 1px 8px rgba(0, 0, 0, 0.3);
          opacity: 0;
          animation: wordmarkIn 0.6s ease-out 1.2s forwards;
        }

        .pwa-splash-accent {
          color: var(--gold, #C4A265);
        }

        @keyframes splashIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes splashOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }

        @keyframes illustrationIn {
          from {
            opacity: 0;
            transform: scale(1.1);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes wordmarkIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
