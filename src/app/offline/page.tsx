import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "You're Offline — HSA Days",
  description: "You're currently offline. Your journal entries are saved locally.",
};

export default function OfflinePage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-16">
      <div className="max-w-md text-center">
        {/* Cloud icon */}
        <div
          className="mx-auto mb-6 w-16 h-16 rounded-full flex items-center justify-center"
          style={{ background: "var(--cream)" }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 22a5 5 0 01-.5-9.97A8 8 0 0123.4 14.1 4.5 4.5 0 0124 23H8z"
              stroke="var(--sage)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <line
              x1="12"
              y1="27"
              x2="20"
              y2="27"
              stroke="var(--border-strong)"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <h1 className="font-serif text-[1.6rem] font-semibold text-text mb-3">
          You&apos;re offline right now
        </h1>
        <p className="text-[0.95rem] text-text-muted leading-relaxed mb-6">
          No worries — your journal entries are saved on this device and will
          sync automatically when you reconnect.
        </p>

        <div
          className="rounded-xl p-5 text-left"
          style={{
            background: "var(--cream)",
            border: "1px solid var(--border)",
          }}
        >
          <p className="text-[0.85rem] font-semibold text-text mb-2">
            While you wait, you can:
          </p>
          <ul className="text-[0.85rem] text-text-muted leading-relaxed list-none p-0 m-0 flex flex-col gap-2">
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--sage)" }}>&#10003;</span>
              Continue writing in your journal
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--sage)" }}>&#10003;</span>
              Review days you&apos;ve already loaded
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--sage)" }}>&#10003;</span>
              Check back in a moment
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
