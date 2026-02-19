"use client";

interface ShareButtonProps {
  onClick: () => void;
  variant?: "primary" | "quiet";
}

export function ShareButton({ onClick, variant = "primary" }: ShareButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 border-none cursor-pointer transition-all active:scale-[0.97]"
      style={{
        background: isPrimary ? "rgba(196,162,101,0.1)" : "transparent",
        color: isPrimary ? "var(--gold)" : "var(--text-muted)",
        padding: isPrimary ? "10px 20px" : "6px 12px",
        borderRadius: isPrimary ? 16 : 8,
        fontSize: isPrimary ? "0.88rem" : "0.8rem",
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        border: isPrimary ? "1px solid rgba(196,162,101,0.2)" : "none",
      }}
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        style={{ width: isPrimary ? 16 : 14, height: isPrimary ? 16 : 14 }}
      >
        <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" y1="2" x2="12" y2="15" />
      </svg>
      Share This Day
    </button>
  );
}
