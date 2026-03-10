"use client";

interface OnlineIndicatorProps {
  count: number;
}

export function OnlineIndicator({ count }: OnlineIndicatorProps) {
  return (
    <div className="flex items-center gap-1.5">
      <span
        className="inline-block w-2 h-2 rounded-full animate-pulse flex-shrink-0"
        style={{ background: "#4ade80" }}
      />
      <span
        className="text-[0.75rem]"
        style={{ color: "var(--text-muted)" }}
      >
        {count > 0 ? `${count} here now` : "Be the first one here"}
      </span>
    </div>
  );
}
