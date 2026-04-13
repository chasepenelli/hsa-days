"use client";

import type { SymptomLog } from "@/lib/resources/types";

interface SparklineProps {
  values: (number | null)[];
  color: string;
  label: string;
  latest: number | null;
}

function Sparkline({ values, color, label, latest }: SparklineProps) {
  const valid = values.filter((v): v is number => v !== null);

  if (valid.length < 2) {
    return (
      <div className="flex items-center gap-3">
        <span
          className="text-[0.78rem] font-medium w-20 shrink-0"
          style={{ color: "var(--text-muted)" }}
        >
          {label}
        </span>
        <span className="text-[0.72rem] italic" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
          Not enough data yet
        </span>
      </div>
    );
  }

  const points = valid
    .slice()
    .reverse()
    .map((v, i, arr) => {
      const x = (i / (arr.length - 1)) * 100;
      const y = 30 - ((v - 1) / 4) * 26;
      return `${x},${y}`;
    });

  const areaPoints = [
    `0,32`,
    ...points,
    `100,32`,
  ].join(" ");

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[0.78rem] font-medium w-20 shrink-0"
        style={{ color: "var(--text-muted)" }}
      >
        {label}
      </span>
      <svg
        viewBox="0 0 100 32"
        className="flex-1 h-8"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon
          points={areaPoints}
          fill={color}
          opacity="0.08"
        />
        <polyline
          points={points.join(" ")}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      {latest !== null && (
        <span
          className="text-[0.82rem] font-semibold w-6 text-right shrink-0"
          style={{ color }}
        >
          {latest}
        </span>
      )}
    </div>
  );
}

function GumColorIndicator({ color }: { color: string | null }) {
  const colorMap: Record<string, { bg: string; label: string }> = {
    pink: { bg: "#E8A0B4", label: "Pink" },
    pale: { bg: "#F0D0B0", label: "Pale" },
    white: { bg: "#E8E4DF", label: "White" },
    blue: { bg: "#9BB0C8", label: "Blue" },
  };

  const info = color ? colorMap[color] : null;

  return (
    <div className="flex items-center gap-3">
      <span
        className="text-[0.78rem] font-medium w-20 shrink-0"
        style={{ color: "var(--text-muted)" }}
      >
        Gums
      </span>
      {info ? (
        <div className="flex items-center gap-2">
          <span
            className="w-4 h-4 rounded-full border"
            style={{ background: info.bg, borderColor: "var(--border)" }}
          />
          <span className="text-[0.78rem]" style={{ color: "var(--text-muted)" }}>
            {info.label}
          </span>
        </div>
      ) : (
        <span className="text-[0.72rem] italic" style={{ color: "var(--text-muted)", opacity: 0.6 }}>
          No data yet
        </span>
      )}
    </div>
  );
}

interface SparklineTrendsProps {
  logs: SymptomLog[];
}

export function SparklineTrends({ logs }: SparklineTrendsProps) {
  if (logs.length === 0) return null;

  // Logs come newest-first; sparkline needs chronological order for display
  const reversed = [...logs].reverse();
  const latestLog = logs[0];

  return (
    <div
      className="rounded-xl p-5 space-y-3"
      style={{
        background: "white",
        border: "1px solid var(--border)",
      }}
    >
      <div className="flex items-center justify-between mb-1">
        <h3
          className="text-[0.78rem] font-semibold uppercase tracking-[0.08em]"
          style={{ color: "var(--gold-text)" }}
        >
          {logs.length}-Day Trends
        </h3>
      </div>
      <Sparkline
        values={reversed.map((l) => l.energy)}
        color="var(--sage)"
        label="Energy"
        latest={latestLog.energy}
      />
      <Sparkline
        values={reversed.map((l) => l.appetite)}
        color="var(--gold)"
        label="Appetite"
        latest={latestLog.appetite}
      />
      <Sparkline
        values={reversed.map((l) => l.mobility)}
        color="#5B8FA8"
        label="Mobility"
        latest={latestLog.mobility}
      />
      <Sparkline
        values={reversed.map((l) => l.comfort)}
        color="var(--terracotta)"
        label="Comfort"
        latest={latestLog.comfort}
      />
      <GumColorIndicator color={latestLog.gum_color} />
    </div>
  );
}
