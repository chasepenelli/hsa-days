"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { syncPendingEntries, getPendingCount } from "@/lib/offline/sync";

export function OfflineIndicator() {
  const [offline, setOffline] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [syncing, setSyncing] = useState(false);
  const [showSynced, setShowSynced] = useState(false);
  const syncedTimer = useRef<NodeJS.Timeout>(null);

  const checkPending = useCallback(async () => {
    const count = await getPendingCount();
    setPendingCount(count);
  }, []);

  const doSync = useCallback(async () => {
    const countBefore = await getPendingCount();
    if (countBefore === 0) return;

    setSyncing(true);
    await syncPendingEntries();
    await checkPending();
    setSyncing(false);

    // Show "All synced" confirmation
    const countAfter = await getPendingCount();
    if (countAfter === 0 && countBefore > 0) {
      setShowSynced(true);
      if (syncedTimer.current) clearTimeout(syncedTimer.current);
      syncedTimer.current = setTimeout(() => setShowSynced(false), 2500);
    }
  }, [checkPending]);

  useEffect(() => {
    setOffline(!navigator.onLine);
    checkPending();

    const handleOnline = () => {
      setOffline(false);
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

    // Check for pending entries periodically (every 30s)
    const interval = setInterval(checkPending, 30000);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
      window.removeEventListener("focus", handleFocus);
      clearInterval(interval);
      if (syncedTimer.current) clearTimeout(syncedTimer.current);
    };
  }, [checkPending, doSync]);

  // Don't show anything when online with nothing pending and no status to show
  if (!offline && pendingCount === 0 && !syncing && !showSynced) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="bg-cream border-b border-border px-4 py-2 text-center text-[0.8rem] text-text-muted"
    >
      {offline && (
        <span>
          You&apos;re offline — your journal saves locally
          {pendingCount > 0 && ` (${pendingCount} pending)`}
        </span>
      )}
      {!offline && syncing && (
        <span className="text-sage">Syncing your journal entries...</span>
      )}
      {!offline && !syncing && showSynced && (
        <span className="text-sage">All synced</span>
      )}
      {!offline && !syncing && !showSynced && pendingCount > 0 && (
        <span className="text-gold">
          {pendingCount} journal {pendingCount === 1 ? "entry" : "entries"}{" "}
          waiting to sync
        </span>
      )}
    </div>
  );
}
