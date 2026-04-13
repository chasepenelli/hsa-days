"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { useIsStandalone } from "@/hooks/useIsStandalone";
import { DailyCheckIn } from "./DailyCheckIn";
import { SparklineTrends } from "./SparklineTrends";
import { TimelineLog } from "./TimelineLog";
import type { SymptomLog, HealthLogEntry } from "@/lib/resources/types";

interface TrackPageClientProps {
  dogName: string;
  isAuthenticated: boolean;
  initialLogs: SymptomLog[];
  initialEntries: HealthLogEntry[];
}

export function TrackPageClient({
  dogName,
  isAuthenticated,
  initialLogs,
  initialEntries,
}: TrackPageClientProps) {
  const isStandalone = useIsStandalone();
  const [recentLogs, setRecentLogs] = useState<SymptomLog[]>(initialLogs);
  const [entries, setEntries] = useState<HealthLogEntry[]>(initialEntries);

  const handleCheckInSave = useCallback(
    (_log: SymptomLog, recent: SymptomLog[]) => {
      setRecentLogs(recent);
      // Refresh entries to show the new symptom_checkin entry
      fetch("/api/health-log/entries?limit=50")
        .then((r) => r.json())
        .then((d) => setEntries(d.entries ?? []))
        .catch(() => {});
    },
    []
  );

  const handleAddEntry = useCallback((entry: HealthLogEntry) => {
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const handleDeleteEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((e) => e.id !== id));
  }, []);

  if (!isAuthenticated) {
    return (
      <div
        className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center"
        style={{ paddingTop: isStandalone ? "24px" : "clamp(100px, 14vw, 140px)" }}
      >
        <h1
          className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold mb-4"
          style={{ color: "var(--text)" }}
        >
          Track your dog&apos;s health
        </h1>
        <p
          className="text-[1rem] leading-relaxed mb-8 max-w-[420px]"
          style={{ color: "var(--text-muted)" }}
        >
          Log daily symptoms, medications, vet visits, and more.
          Sign in to get started with personalized tracking.
        </p>
        <Link
          href="/login"
          className="bg-sage text-white px-6 py-3 rounded-xl font-semibold text-[0.95rem] no-underline transition-opacity hover:opacity-90"
          style={{ boxShadow: "0 4px 14px rgba(91,123,94,0.3)" }}
        >
          Sign in to start tracking
        </Link>
      </div>
    );
  }

  return (
    <div
      className="px-6"
      style={{
        paddingTop: isStandalone ? "24px" : "clamp(100px, 14vw, 140px)",
        paddingBottom: "clamp(60px, 8vw, 100px)",
      }}
    >
      <div className="max-w-[600px] mx-auto space-y-8">
        {/* Daily check-in */}
        <DailyCheckIn
          dogName={dogName}
          recentLogs={recentLogs}
          onSave={handleCheckInSave}
        />

        {/* Sparkline trends */}
        <SparklineTrends logs={recentLogs} />

        {/* Timeline */}
        <TimelineLog
          entries={entries}
          onAddEntry={handleAddEntry}
          onDeleteEntry={handleDeleteEntry}
        />
      </div>
    </div>
  );
}
