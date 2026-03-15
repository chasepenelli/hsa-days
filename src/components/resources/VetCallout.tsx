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
        className="font-semibold mb-1"
        style={{ fontSize: "var(--text-body)", color: "var(--terracotta)" }}
      >
        Always discuss with your veterinarian
      </p>
      <p style={{ fontSize: "var(--text-body-sm)", color: "var(--text-muted)" }}>
        This guide is for informational purposes only. Every dog is different
        {dogName ? ` — work with ${dogName}'s vet team` : ""} to determine what
        supplements and dosages are right for your situation.
      </p>
    </div>
  );
}
