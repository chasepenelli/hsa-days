"use client";

import { useState, useEffect, useCallback } from "react";
import { syncPendingEntries, getPendingCount } from "@/lib/offline/sync";

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);

  const checkPending = useCallback(async () => {
    const count = await getPendingCount();
    setPendingCount(count);
  }, []);

  const doSync = useCallback(async () => {
    setSyncing(true);
    await syncPendingEntries();
    await checkPending();
    setSyncing(false);
  }, [checkPending]);

  useEffect(() => {
    setOffline(!navigator.onLine);
    checkPending();

    const handleOnline = () => {
      setOffline(false);
      // Sync pending entries when back online
      doSync();
    };
    const handleOffline = () => setOffline(true);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    // Also sync on focus (user returns to tab)
    const handleFocus = () => {
      if (navigator.onLine) doSync();
    };
    window.addEventListener("focus", handleFocus);

    // Check for pending entries periodically
    const interval = setInterval(checkPending, 10000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
    };
  }, [checkPending, doSync]);

  // Don't show anything when online with nothing pending
  if (!offline && pendingCount === 0 && !syncing) return null;

  return (
    <div className="bg-cream border-b border-border px-4 py-2 text-center text-[0.8rem] text-text-muted">
      {offline && (
        <span>
          You&apos;re offline — your journal saves locally
          {pendingCount > 0 && ` (${pendingCount} pending)`}
        </span>
      )}
      {!offline && syncing && (
        <span className="text-sage">Syncing your journal entries...</span>
      )}
      {!offline && !syncing && pendingCount > 0 && (
        <span className="text-gold">
          {pendingCount} journal {pendingCount === 1 ? "entry" : "entries"}{" "}
          waiting to sync
        </span>
      )}
    </div>
  );
}
