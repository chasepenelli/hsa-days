"use client";

interface VetCalloutProps {
  dogName?: string;
}

export default function VetCallout({ dogName }: VetCalloutProps) {
  return (
    <div
      className="rounded-2xl px-6 py-5 mb-8"
      style={{
        background: "rgba(212,133,106,0.06)",
        border: "1px solid rgba(212,133,106,0.25)",
      }}
    >
      <p
        className="text-[0.92rem] font-semibold mb-1"
        style={{ color: "var(--terracotta)" }}
      >
        Always discuss with your veterinarian
      </p>
      <p className="text-[0.85rem]" style={{ color: "var(--text-muted)" }}>
        This guide is for informational purposes only. Every dog is different
        {dogName ? ` — work with ${dogName}'s vet team` : ""} to determine what
        supplements and dosages are right for your situation.
      </p>
    </div>
  );
}
