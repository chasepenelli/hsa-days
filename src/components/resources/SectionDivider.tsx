"use client";

export default function SectionDivider() {
  return (
    <div className="flex items-center justify-center gap-4 my-12 reveal">
      <div
        className="h-px flex-1 max-w-[100px]"
        style={{
          background:
            "linear-gradient(to right, transparent, var(--border-strong))",
        }}
      />
      {/* Three small ornamental dots flanking a center motif */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--border-strong)" }}
        />
        {/* Center leaf / paw motif */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          style={{ opacity: 0.28, color: "var(--sage)" }}
        >
          <path
            d="M12 3C9.2 3 7 5.7 7 8c0 1.8.9 3.1 2 4.2 1 1 1.8 2 2 3.8h2c.2-1.8 1-2.8 2-3.8 1.1-1.1 2-2.4 2-4.2 0-2.3-2.2-5-5-5z"
            fill="currentColor"
          />
          <ellipse
            cx="8"
            cy="5.5"
            rx="2.2"
            ry="1.7"
            transform="rotate(-35 8 5.5)"
            fill="currentColor"
          />
          <ellipse
            cx="16"
            cy="5.5"
            rx="2.2"
            ry="1.7"
            transform="rotate(35 16 5.5)"
            fill="currentColor"
          />
          <ellipse
            cx="6"
            cy="9"
            rx="1.8"
            ry="2.2"
            transform="rotate(-50 6 9)"
            fill="currentColor"
          />
          <ellipse
            cx="18"
            cy="9"
            rx="1.8"
            ry="2.2"
            transform="rotate(50 18 9)"
            fill="currentColor"
          />
          <ellipse cx="12" cy="21" rx="2.8" ry="1.4" fill="currentColor" />
        </svg>
        <div
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--border-strong)" }}
        />
      </div>
      <div
        className="h-px flex-1 max-w-[100px]"
        style={{
          background:
            "linear-gradient(to left, transparent, var(--border-strong))",
        }}
      />
    </div>
  );
}
