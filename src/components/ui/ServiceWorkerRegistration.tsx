"use client";

import { useEffect, useState, useCallback } from "react";

export function ServiceWorkerRegistration() {
  const [waitingWorker, setWaitingWorker] = useState<ServiceWorker | null>(null);
  const [showUpdate, setShowUpdate] = useState(false);

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        // Check if there's already a waiting worker
        if (registration.waiting) {
          setWaitingWorker(registration.waiting);
          setShowUpdate(true);
          return;
        }

        // Listen for new workers
        registration.addEventListener("updatefound", () => {
          const newWorker = registration.installing;
          if (!newWorker) return;

          newWorker.addEventListener("statechange", () => {
            if (newWorker.state === "installed" && navigator.serviceWorker.controller) {
              // New version installed, waiting to activate
              setWaitingWorker(newWorker);
              setShowUpdate(true);
            }
          });
        });
      })
      .catch(() => {
        // SW registration failed — not critical
      });

    // Handle controller change (new SW took over)
    let refreshing = false;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      if (!refreshing) {
        refreshing = true;
        window.location.reload();
      }
    });
  }, []);

  const handleUpdate = useCallback(() => {
    if (waitingWorker) {
      waitingWorker.postMessage({ type: "SKIP_WAITING" });
    }
    setShowUpdate(false);
  }, [waitingWorker]);

  if (!showUpdate) return null;

  return (
    <div
      className="fixed bottom-20 left-4 right-4 z-50 mx-auto max-w-sm animate-fade-in-up"
      style={{
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <div
        className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl shadow-lg"
        style={{
          background: "var(--sage-dark)",
          color: "white",
          boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
        }}
      >
        <p className="text-[0.82rem] font-medium">
          A new version is available
        </p>
        <button
          onClick={handleUpdate}
          className="px-3 py-1.5 rounded-lg text-[0.78rem] font-semibold cursor-pointer border-none transition-opacity hover:opacity-90"
          style={{
            background: "rgba(255,255,255,0.2)",
            color: "white",
            flexShrink: 0,
          }}
        >
          Refresh
        </button>
      </div>
    </div>
  );
}
