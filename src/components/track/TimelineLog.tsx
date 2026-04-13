"use client";

import { useState, useCallback } from "react";
import type { HealthLogEntry, HealthLogEntryType } from "@/lib/resources/types";

const ENTRY_TYPES: {
  value: HealthLogEntryType;
  label: string;
  icon: string;
  color: string;
}[] = [
  { value: "medication", label: "Medication", icon: "icon-supplement.png", color: "var(--sage)" },
  { value: "meal", label: "Meal", icon: "icon-food-bowl.png", color: "var(--gold)" },
  { value: "vet_visit", label: "Vet Visit", icon: "icon-heart.png", color: "var(--terracotta)" },
  { value: "weight", label: "Weight", icon: "icon-paw-print.png", color: "#5B8FA8" },
  { value: "note", label: "Note", icon: "icon-flower-ornament.png", color: "var(--text-muted)" },
];

function formatTime(dateStr: string): string {
  return new Date(dateStr).toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

function getDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const entryDate = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  const diff = today.getTime() - entryDate.getTime();

  if (diff === 0) return "Today";
  if (diff === 86400000) return "Yesterday";
  return date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function groupByDate(entries: HealthLogEntry[]): Map<string, HealthLogEntry[]> {
  const groups = new Map<string, HealthLogEntry[]>();
  for (const entry of entries) {
    const date = new Date(entry.logged_at);
    const key = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
    const existing = groups.get(key) ?? [];
    existing.push(entry);
    groups.set(key, existing);
  }
  return groups;
}

function getEntryIcon(type: HealthLogEntryType): string {
  return (
    ENTRY_TYPES.find((t) => t.value === type)?.icon ??
    "icon-flower-ornament.png"
  );
}

function getEntryColor(type: HealthLogEntryType): string {
  return ENTRY_TYPES.find((t) => t.value === type)?.color ?? "var(--text-muted)";
}

interface TimelineLogProps {
  entries: HealthLogEntry[];
  onAddEntry: (entry: HealthLogEntry) => void;
  onDeleteEntry: (id: string) => void;
}

export function TimelineLog({ entries, onAddEntry, onDeleteEntry }: TimelineLogProps) {
  const [showSheet, setShowSheet] = useState(false);
  const [selectedType, setSelectedType] = useState<HealthLogEntryType | null>(null);
  const [title, setTitle] = useState("");
  const [entryNotes, setEntryNotes] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const resetForm = useCallback(() => {
    setSelectedType(null);
    setTitle("");
    setEntryNotes("");
    setShowSheet(false);
  }, []);

  const handleSaveEntry = async () => {
    if (!selectedType || !title.trim()) return;
    setIsSaving(true);

    try {
      const res = await fetch("/api/health-log/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          entry_type: selectedType,
          title: title.trim(),
          notes: entryNotes.trim() || null,
        }),
      });

      if (res.ok) {
        const { entry } = await res.json();
        onAddEntry(entry);
        resetForm();
      }
    } catch {
      // silently fail
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/health-log/entries?id=${id}`, {
        method: "DELETE",
      });
      if (res.ok) onDeleteEntry(id);
    } catch {
      // silently fail
    }
  };

  const grouped = groupByDate(entries);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h3
          className="font-serif text-[1.05rem] font-semibold"
          style={{ color: "var(--text)" }}
        >
          Health Log
        </h3>
        <button
          onClick={() => setShowSheet(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-[0.82rem] font-semibold transition-all duration-200 cursor-pointer"
          style={{
            background: "var(--sage)",
            color: "white",
            boxShadow: "0 2px 8px rgba(91,123,94,0.25)",
          }}
        >
          <span className="text-[1rem] leading-none">+</span>
          Add Entry
        </button>
      </div>

      {entries.length === 0 ? (
        <p
          className="text-center py-10 text-[0.9rem] italic"
          style={{ color: "var(--text-muted)" }}
        >
          No entries yet. Start tracking to see your timeline here.
        </p>
      ) : (
        <div className="space-y-6">
          {Array.from(grouped.entries()).map(([dateKey, dayEntries]) => (
            <div key={dateKey}>
              <div
                className="text-[0.72rem] font-semibold uppercase tracking-[0.1em] mb-3"
                style={{ color: "var(--gold-text)" }}
              >
                {getDateLabel(dayEntries[0].logged_at)}
              </div>
              <div className="space-y-2">
                {dayEntries.map((entry) => (
                  <div
                    key={entry.id}
                    className="group flex items-start gap-3 px-4 py-3 rounded-xl transition-colors duration-200 hover:bg-cream/50"
                    style={{ background: "white", border: "1px solid var(--border)" }}
                  >
                    <span
                      className="text-[0.72rem] font-medium shrink-0 pt-0.5"
                      style={{ color: "var(--text-muted)", minWidth: "3.5rem" }}
                    >
                      {formatTime(entry.logged_at)}
                    </span>
                    <div
                      className="w-2 h-2 rounded-full shrink-0 mt-1.5"
                      style={{ background: getEntryColor(entry.entry_type) }}
                    />
                    <div className="flex-1 min-w-0">
                      <p
                        className="text-[0.88rem] font-medium"
                        style={{ color: "var(--text)" }}
                      >
                        {entry.title}
                      </p>
                      {entry.notes && (
                        <p
                          className="text-[0.78rem] mt-0.5 truncate"
                          style={{ color: "var(--text-muted)" }}
                        >
                          {entry.notes}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="opacity-0 group-hover:opacity-60 hover:!opacity-100 transition-opacity duration-200 p-1 cursor-pointer"
                      style={{ background: "none", border: "none", color: "var(--text-muted)" }}
                      aria-label="Delete entry"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Entry Sheet */}
      {showSheet && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(0,0,0,0.3)",
              animationName: "fadeIn",
              animationDuration: "0.2s",
              animationFillMode: "both",
            }}
            onClick={resetForm}
          />
          {/* Sheet */}
          <div
            className="fixed bottom-0 left-0 right-0 z-50 rounded-t-2xl p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]"
            style={{
              background: "var(--warm-white)",
              boxShadow: "0 -8px 32px rgba(0,0,0,0.12)",
              animationName: "fadeInUp",
              animationDuration: "0.3s",
              animationFillMode: "both",
              animationTimingFunction: "var(--ease-out-expo)",
              maxHeight: "80vh",
              overflowY: "auto",
            }}
          >
            <div className="w-8 h-1 rounded-full bg-border mx-auto mb-5" />

            <h3
              className="font-serif text-[1.05rem] font-semibold mb-4"
              style={{ color: "var(--text)" }}
            >
              Add an entry
            </h3>

            {/* Type selector */}
            <div className="flex flex-wrap gap-2 mb-5">
              {ENTRY_TYPES.map((t) => {
                const isSelected = selectedType === t.value;
                return (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => setSelectedType(t.value)}
                    className="px-3.5 py-2 rounded-lg text-[0.82rem] font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background: isSelected ? t.color : "white",
                      color: isSelected ? "white" : "var(--text-muted)",
                      border: isSelected
                        ? `1.5px solid ${t.color}`
                        : "1.5px solid var(--border-strong)",
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>

            {selectedType && (
              <>
                <div className="mb-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder={
                      selectedType === "medication"
                        ? "e.g. Yunnan Baiyao — morning dose"
                        : selectedType === "meal"
                          ? "e.g. Ate breakfast, good appetite"
                          : selectedType === "vet_visit"
                            ? "e.g. Follow-up with Dr. Lee"
                            : selectedType === "weight"
                              ? "e.g. Weighed at vet: 62 lbs"
                              : "What happened?"
                    }
                    autoFocus
                    className="w-full px-4 py-3 rounded-xl text-[0.9rem] transition-all duration-200"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--border-strong)",
                      color: "var(--text)",
                      outline: "none",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--sage)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border-strong)")
                    }
                  />
                </div>
                <div className="mb-5">
                  <textarea
                    value={entryNotes}
                    onChange={(e) => setEntryNotes(e.target.value)}
                    rows={2}
                    placeholder="Notes (optional)"
                    className="w-full px-4 py-3 rounded-xl text-[0.9rem] resize-none transition-all duration-200"
                    style={{
                      background: "white",
                      border: "1.5px solid var(--border-strong)",
                      color: "var(--text)",
                      outline: "none",
                    }}
                    onFocus={(e) =>
                      (e.target.style.borderColor = "var(--sage)")
                    }
                    onBlur={(e) =>
                      (e.target.style.borderColor = "var(--border-strong)")
                    }
                  />
                </div>
                <button
                  onClick={handleSaveEntry}
                  disabled={!title.trim() || isSaving}
                  className="w-full py-3.5 rounded-xl font-semibold text-[0.95rem] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
                  style={{
                    background: "var(--sage)",
                    color: "white",
                    boxShadow: title.trim()
                      ? "0 4px 14px rgba(91,123,94,0.3)"
                      : "none",
                  }}
                >
                  {isSaving ? "Saving..." : "Save"}
                </button>
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
}
