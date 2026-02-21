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

    // Begin fade-out after 2.2s
    const fadeTimer = setTimeout(() => setFadeOut(true), 2200);
    // Unmount after fade completes
    const removeTimer = setTimeout(() => setVisible(false), 2800);

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
      <div className="pwa-splash-content">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/icons/icon-512.png"
          alt=""
          className="pwa-splash-icon"
          width={80}
          height={80}
        />
        <span className="pwa-splash-wordmark">
          HSA <span className="pwa-splash-accent">Days</span>
        </span>
      </div>

      <style jsx>{`
        .pwa-splash {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(160deg, var(--cream) 0%, var(--warm-white) 100%);
          animation: splashIn 0.3s ease-out;
        }

        .pwa-splash-out {
          animation: splashOut 0.6s ease-in forwards;
        }

        .pwa-splash-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          animation: contentIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.1s both;
        }

        .pwa-splash-icon {
          border-radius: 20px;
          animation: iconPulse 1.6s ease-in-out 0.4s 1;
        }

        .pwa-splash-wordmark {
          font-family: var(--font-lora), serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--sage-dark, #4a6b4d);
          letter-spacing: -0.02em;
          animation: wordmarkIn 0.6s ease-out 0.5s both;
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

        @keyframes contentIn {
          from {
            opacity: 0;
            transform: scale(0.85);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }

        @keyframes wordmarkIn {
          from {
            opacity: 0;
            transform: translateY(8px);
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
