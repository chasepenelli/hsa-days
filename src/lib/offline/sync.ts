import {
  getUnsyncedEntries,
  markJournalSynced,
  clearSyncedEntries,
} from "./journal-store";

let syncing = false;

export async function syncPendingEntries(): Promise<number> {
  if (syncing) return 0;
  if (!navigator.onLine) return 0;

  syncing = true;
  let syncedCount = 0;

  try {
    const entries = await getUnsyncedEntries();

    for (const entry of entries) {
      try {
        const res = await fetch("/api/journal", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            day_number: entry.day_number,
            prompt_type: entry.prompt_type,
            entry_text: entry.entry_text,
          }),
        });

        if (res.ok) {
          await markJournalSynced(entry.day_number, entry.prompt_type);
          syncedCount++;
        }
      } catch {
        // Individual entry failed, continue with others
        break; // If one fails (likely offline again), stop trying
      }
    }

    // Clean up old synced entries
    await clearSyncedEntries();
  } finally {
    syncing = false;
  }

  return syncedCount;
}

export async function getPendingCount(): Promise<number> {
  const entries = await getUnsyncedEntries();
  return entries.length;
}
