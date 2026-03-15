import { get, set, del, keys } from "idb-keyval";

export interface OfflineJournalEntry {
  day_number: number;
  prompt_type: string;
  entry_text: string;
  updated_at: string;
  synced: boolean;
}

function journalKey(dayNumber: number, promptType: string): string {
  return `journal:${dayNumber}:${promptType}`;
}

export async function saveJournalLocally(
  dayNumber: number,
  promptType: string,
  entryText: string
): Promise<void> {
  const entry: OfflineJournalEntry = {
    day_number: dayNumber,
    prompt_type: promptType,
    entry_text: entryText,
    updated_at: new Date().toISOString(),
    synced: false,
  };
  await set(journalKey(dayNumber, promptType), entry);
}

export async function getJournalLocally(
  dayNumber: number,
  promptType: string
): Promise<OfflineJournalEntry | undefined> {
  return get<OfflineJournalEntry>(journalKey(dayNumber, promptType));
}

export async function markJournalSynced(
  dayNumber: number,
  promptType: string
): Promise<void> {
  const entry = await getJournalLocally(dayNumber, promptType);
  if (entry) {
    await set(journalKey(dayNumber, promptType), { ...entry, synced: true });
  }
}

export async function getUnsyncedEntries(): Promise<OfflineJournalEntry[]> {
  const allKeys = await keys();
  const journalKeys = allKeys.filter(
    (k) => typeof k === "string" && k.startsWith("journal:")
  );

  const entries: OfflineJournalEntry[] = [];
  for (const key of journalKeys) {
    const entry = await get<OfflineJournalEntry>(key);
    if (entry && !entry.synced) {
      entries.push(entry);
    }
  }
  return entries;
}

export async function clearSyncedEntries(): Promise<void> {
  const allKeys = await keys();
  const journalKeys = allKeys.filter(
    (k) => typeof k === "string" && k.startsWith("journal:")
  );

  for (const key of journalKeys) {
    const entry = await get<OfflineJournalEntry>(key);
    if (entry?.synced) {
      await del(key);
    }
  }
}

export async function clearAllJournalEntries(): Promise<void> {
  const allKeys = await keys();
  const journalKeys = allKeys.filter(
    (k) => typeof k === "string" && k.startsWith("journal:")
  );

  for (const key of journalKeys) {
    await del(key);
  }
}
