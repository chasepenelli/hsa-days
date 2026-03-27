"use client";

import Image from "next/image";

interface ShareButtonProps {
  onClick: () => void;
  variant?: "primary" | "quiet";
  label?: string;
}

export function ShareButton({ onClick, variant = "primary", label }: ShareButtonProps) {
  const isPrimary = variant === "primary";

  return (
    <button
      onClick={onClick}
      className="inline-flex items-center gap-2 border-none cursor-pointer transition-all active:scale-[0.97]"
      style={{
        background: isPrimary ? "rgba(196,162,101,0.1)" : "transparent",
        color: isPrimary ? "var(--gold)" : "var(--text-muted)",
        padding: isPrimary ? "10px 20px" : "6px 12px",
        minHeight: isPrimary ? undefined : "44px",
        borderRadius: isPrimary ? 16 : 8,
        fontSize: isPrimary ? "0.88rem" : "0.8rem",
        fontWeight: 600,
        fontFamily: "var(--font-sans)",
        border: isPrimary ? "1px solid rgba(196,162,101,0.2)" : "none",
      }}
    >
      <Image
        src="/illustrations/icons/icon-share.png"
        alt=""
        width={isPrimary ? 16 : 14}
        height={isPrimary ? 16 : 14}
        style={{ objectFit: "contain", opacity: 0.85 }}
      />
      {label || "Share This Day"}
    </button>
  );
}
