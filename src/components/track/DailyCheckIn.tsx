"use client";

import { useState, useEffect } from "react";
import type { SymptomLog, GumColor } from "@/lib/resources/types";

interface DailyCheckInProps {
  dogName: string;
  recentLogs: SymptomLog[];
  onSave: (log: SymptomLog, recent: SymptomLog[]) => void;
}

const METRICS = [
  { key: "energy", label: "Energy", color: "var(--sage)" },
  { key: "appetite", label: "Appetite", color: "var(--gold)" },
  { key: "mobility", label: "Mobility", color: "#5B8FA8" },
  { key: "comfort", label: "Comfort", color: "var(--terracotta)" },
] as const;

const GUM_COLORS: { value: GumColor; label: string; bg: string }[] = [
  { value: "pink", label: "Pink", bg: "#E8A0B4" },
  { value: "pale", label: "Pale", bg: "#F0D0B0" },
  { value: "white", label: "White", bg: "#E8E4DF" },
  { value: "blue", label: "Blue", bg: "#9BB0C8" },
];

function isToday(dateStr: string): boolean {
  const d = new Date(dateStr);
  const now = new Date();
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  );
}

export function DailyCheckIn({ dogName, recentLogs, onSave }: DailyCheckInProps) {
  const todayLog = recentLogs.find((l) => isToday(l.logged_at));
  const isUpdate = !!todayLog;

  const [energy, setEnergy] = useState<number | null>(todayLog?.energy ?? null);
  const [appetite, setAppetite] = useState<number | null>(todayLog?.appetite ?? null);
  const [mobility, setMobility] = useState<number | null>(todayLog?.mobility ?? null);
  const [comfort, setComfort] = useState<number | null>(todayLog?.comfort ?? null);
  const [gumColor, setGumColor] = useState<GumColor | null>(todayLog?.gum_color ?? null);
  const [notes, setNotes] = useState(todayLog?.notes ?? "");
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Reset when recentLogs change (e.g. after save)
  useEffect(() => {
    const latest = recentLogs.find((l) => isToday(l.logged_at));
    if (latest) {
      setEnergy(latest.energy);
      setAppetite(latest.appetite);
      setMobility(latest.mobility);
      setComfort(latest.comfort);
      setGumColor(latest.gum_color);
      setNotes(latest.notes ?? "");
    }
  }, [recentLogs]);

  const values: Record<string, number | null> = {
    energy,
    appetite,
    mobility,
    comfort,
  };
  const setters: Record<string, (v: number | null) => void> = {
    energy: setEnergy,
    appetite: setAppetite,
    mobility: setMobility,
    comfort: setComfort,
  };

  const hasAnyValue =
    energy !== null ||
    appetite !== null ||
    mobility !== null ||
    comfort !== null ||
    gumColor !== null;

  const handleSubmit = async () => {
    if (!hasAnyValue) return;
    setStatus("saving");

    try {
      const res = await fetch("/api/health-log/symptoms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          energy,
          appetite,
          gum_color: gumColor,
          mobility,
          comfort,
          notes: notes.trim() || null,
        }),
      });

      if (!res.ok) {
        setStatus("idle");
        return;
      }

      const data = await res.json();
      onSave(data.log, data.recent);
      setStatus("saved");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("idle");
    }
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <h2
        className="font-serif text-[1.15rem] font-semibold mb-5"
        style={{ color: "var(--text)" }}
      >
        How is {dogName} today?
      </h2>

      <div className="space-y-5">
        {METRICS.map((m) => (
          <div key={m.key}>
            <label
              className="block text-[0.78rem] font-medium mb-2"
              style={{ color: "var(--text-muted)" }}
            >
              {m.label}
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((v) => {
                const isSelected = values[m.key] === v;
                return (
                  <button
                    key={v}
                    type="button"
                    onClick={() =>
                      setters[m.key](values[m.key] === v ? null : v)
                    }
                    className="w-11 h-11 rounded-full font-semibold text-[0.88rem] transition-all duration-200 cursor-pointer flex items-center justify-center shrink-0"
                    style={{
                      background: isSelected ? m.color : "var(--cream)",
                      color: isSelected ? "white" : "var(--text-muted)",
                      border: isSelected
                        ? `2px solid ${m.color}`
                        : "2px solid transparent",
                      boxShadow: isSelected
                        ? `0 2px 8px ${m.color}33`
                        : "none",
                    }}
                  >
                    {v}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Gum color */}
        <div>
          <label
            className="block text-[0.78rem] font-medium mb-2"
            style={{ color: "var(--text-muted)" }}
          >
            Gum Color
          </label>
          <div className="flex gap-2">
            {GUM_COLORS.map((g) => {
              const isSelected = gumColor === g.value;
              return (
                <button
                  key={g.value}
                  type="button"
                  onClick={() =>
                    setGumColor(gumColor === g.value ? null : g.value)
                  }
                  className="flex items-center gap-2 px-3.5 py-2 rounded-full text-[0.82rem] font-medium transition-all duration-200 cursor-pointer"
                  style={{
                    background: isSelected ? g.bg : "var(--cream)",
                    color: isSelected ? "var(--text)" : "var(--text-muted)",
                    border: isSelected
                      ? `2px solid ${g.bg}`
                      : "2px solid transparent",
                    boxShadow: isSelected
                      ? `0 2px 8px ${g.bg}44`
                      : "none",
                  }}
                >
                  <span
                    className="w-3.5 h-3.5 rounded-full shrink-0"
                    style={{
                      background: g.bg,
                      border: "1px solid rgba(0,0,0,0.1)",
                    }}
                  />
                  {g.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Notes */}
        <div>
          <label
            htmlFor="checkin-notes"
            className="block text-[0.78rem] font-medium mb-2"
            style={{ color: "var(--text-muted)" }}
          >
            Notes (optional)
          </label>
          <textarea
            id="checkin-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Anything you noticed today..."
            className="w-full px-4 py-3 rounded-xl text-[0.9rem] resize-none transition-all duration-200"
            style={{
              background: "var(--cream)",
              border: "1.5px solid var(--border)",
              color: "var(--text)",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--sage)")}
            onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
      </div>

      {/* Save button */}
      <button
        onClick={handleSubmit}
        disabled={!hasAnyValue || status === "saving"}
        className="w-full mt-6 py-3.5 rounded-xl font-semibold text-[0.95rem] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          background:
            status === "saved" ? "var(--sage)" : "var(--sage)",
          color: "white",
          boxShadow:
            hasAnyValue && status !== "saving"
              ? "0 4px 14px rgba(91,123,94,0.3)"
              : "none",
        }}
      >
        {status === "saving"
          ? "Saving..."
          : status === "saved"
            ? "Saved!"
            : isUpdate
              ? "Update today's check-in"
              : "Save check-in"}
      </button>
    </div>
  );
}
