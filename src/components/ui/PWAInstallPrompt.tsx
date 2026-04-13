"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import Link from "next/link";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const DISMISS_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000; // 7 days
const RESOURCE_VISIT_KEY = "pwa-resource-visits";
const VISIT_THRESHOLD = 2;

function isDismissed(): boolean {
  const raw = localStorage.getItem("pwa-install-dismissed");
  if (!raw) return false;
  const ts = parseInt(raw, 10);
  if (isNaN(ts)) return false;
  return Date.now() - ts < DISMISS_EXPIRY_MS;
}

function hasEnoughVisits(): boolean {
  const count = parseInt(localStorage.getItem(RESOURCE_VISIT_KEY) || "0", 10);
  return count >= VISIT_THRESHOLD;
}

function trackResourceVisit(): void {
  const count = parseInt(localStorage.getItem(RESOURCE_VISIT_KEY) || "0", 10);
  localStorage.setItem(RESOURCE_VISIT_KEY, String(count + 1));
}

function isIOSSafari(): boolean {
  const ua = navigator.userAgent;
  const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  const isSafari = /Safari/.test(ua) && !/CriOS|FxiOS|OPiOS|EdgiOS/.test(ua);
  return isIOS && isSafari;
}

function isStandalone(): boolean {
  return (
    window.matchMedia("(display-mode: standalone)").matches ||
    ("standalone" in navigator && (navigator as { standalone?: boolean }).standalone === true)
  );
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [exiting, setExiting] = useState(false);
  const bannerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDismissed()) return;
    if (isStandalone()) return;

    // Track resource page visits
    if (window.location.pathname.startsWith("/resources/")) {
      trackResourceVisit();
    }

    const eligible = hasEnoughVisits();

    // iOS path: no beforeinstallprompt, show manual instructions
    if (isIOSSafari()) {
      setIsIOS(true);
      if (eligible) setShowBanner(true);
      return;
    }

    // Chromium path
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      if (eligible) setShowBanner(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstall);
    return () =>
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall);
  }, []);

  const handleInstall = useCallback(async () => {
    if (!deferredPrompt) return;

    await deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      animateOut();
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const animateOut = useCallback(() => {
    setExiting(true);
    setTimeout(() => setShowBanner(false), 400);
  }, []);

  const handleDismiss = useCallback(() => {
    localStorage.setItem("pwa-install-dismissed", String(Date.now()));
    animateOut();
  }, [animateOut]);

  if (!showBanner) return null;

  return (
    <div
      ref={bannerRef}
      role="alertdialog"
      aria-label="Install HSA Days app"
      className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]"
      style={{
        animationName: exiting ? "fadeOutDown" : "fadeInUp",
        animationDuration: exiting ? "0.4s" : "0.5s",
        animationFillMode: "both",
        animationTimingFunction: "var(--ease-out-expo)",
      }}
    >
      <div
        className="max-w-lg mx-auto rounded-xl px-5 py-4 flex items-center gap-4"
        style={{
          background: "var(--cream)",
          border: "1px solid var(--border)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.12), 0 2px 8px rgba(0,0,0,0.06)",
        }}
      >
        <Image
          src="/icons/icon-192.png"
          alt=""
          width={40}
          height={40}
          className="rounded-lg shrink-0"
        />
        <div className="flex-1 min-w-0">
          <p className="text-[0.9rem] font-semibold text-text font-serif">
            Keep HSA Days close
          </p>
          <p className="text-[0.75rem] text-text-muted mt-0.5">
            {isIOS
              ? "Add to your home screen for instant access, even offline."
              : "Access HSA resources instantly, even offline."}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDismiss}
            className="px-3 py-2 text-[0.8rem] text-text-muted bg-transparent border-none cursor-pointer hover:text-text transition-colors"
          >
            Maybe later
          </button>
          {isIOS ? (
            <Link
              href="/resources/install"
              onClick={handleDismiss}
              className="px-4 py-2 text-[0.8rem] font-semibold text-white bg-sage border-none rounded-lg no-underline hover:bg-sage-dark transition-colors"
              style={{ boxShadow: "0 2px 8px rgba(91,123,94,0.25)" }}
            >
              How to add
            </Link>
          ) : (
            <button
              onClick={handleInstall}
              className="px-4 py-2 text-[0.8rem] font-semibold text-white bg-sage border-none rounded-lg cursor-pointer hover:bg-sage-dark transition-colors"
              style={{ boxShadow: "0 2px 8px rgba(91,123,94,0.25)" }}
            >
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
