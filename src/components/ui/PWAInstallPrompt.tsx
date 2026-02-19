"use client";

import { useState, useEffect, useCallback } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Don't show if already dismissed
    if (localStorage.getItem("pwa-install-dismissed")) return;

    // Don't show if already installed (standalone mode)
    if (window.matchMedia("(display-mode: standalone)").matches) return;

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);

      // Check if user has completed Day 2
      checkDay2Completion().then((completed) => {
        if (completed) setShowBanner(true);
      });
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
      setShowBanner(false);
    }
    setDeferredPrompt(null);
  }, [deferredPrompt]);

  const handleDismiss = useCallback(() => {
    setShowBanner(false);
    localStorage.setItem("pwa-install-dismissed", "true");
  }, []);

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
      <div className="max-w-lg mx-auto bg-cream border border-border rounded-xl px-5 py-4 shadow-lg flex items-center gap-4">
        <div className="flex-1">
          <p className="text-[0.9rem] font-semibold text-text">
            Add HSA Days to your home screen
          </p>
          <p className="text-[0.75rem] text-text-muted mt-0.5">
            Quick access to your journal and daily reflections.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={handleDismiss}
            className="px-3 py-2 text-[0.8rem] text-text-muted bg-transparent border-none cursor-pointer hover:text-text transition-colors"
          >
            Not now
          </button>
          <button
            onClick={handleInstall}
            className="px-4 py-2 text-[0.8rem] font-semibold text-white bg-sage border-none rounded-lg cursor-pointer hover:bg-sage-dark transition-colors"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

async function checkDay2Completion(): Promise<boolean> {
  try {
    const res = await fetch("/api/progress");
    if (!res.ok) return false;
    const { progress } = await res.json();
    return progress?.some(
      (p: { day_number: number; completed_at: string | null }) =>
        p.day_number === 2 && p.completed_at
    );
  } catch {
    return false;
  }
}
