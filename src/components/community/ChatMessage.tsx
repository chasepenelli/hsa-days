"use client";

import { HeartReaction } from "./HeartReaction";
import { GRADIENTS } from "./StoriesGrid";

interface ChatMessageProps {
  id: string;
  content: string;
  dogName: string;
  createdAt: string;
  isPending?: boolean;
  heartCount: number;
  isHearted: boolean;
  onToggleHeart: () => void;
}

function hashName(name: string): number {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = (hash << 5) - hash + name.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

function relativeTime(dateStr: string): string {
  const now = Date.now();
  const then = new Date(dateStr).getTime();
  const diff = Math.max(0, now - then);
  const seconds = Math.floor(diff / 1000);

  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return new Date(dateStr).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

export function ChatMessage({
  content,
  dogName,
  createdAt,
  isPending,
  heartCount,
  isHearted,
  onToggleHeart,
}: ChatMessageProps) {
  const gradientIndex = hashName(dogName) % GRADIENTS.length;
  const initial = dogName.charAt(0).toUpperCase();

  return (
    <div
      className="group flex gap-3 py-3 transition-opacity duration-200"
      style={{ opacity: isPending ? 0.55 : 1 }}
    >
      {/* Avatar */}
      <div
        className="w-9 h-9 rounded-full flex items-center justify-center text-white font-semibold text-[0.78rem] flex-shrink-0 font-sans"
        style={{ background: GRADIENTS[gradientIndex] }}
      >
        {initial}
      </div>

      {/* Body */}
      <div className="min-w-0 flex-1">
        {/* Name + timestamp */}
        <div className="flex items-baseline gap-2 mb-0.5">
          <span
            className="font-semibold text-sm"
            style={{ color: "var(--text)" }}
          >
            {dogName}
          </span>
          <span
            className="text-xs"
            style={{ color: "var(--text-muted)", opacity: 0.7 }}
          >
            {relativeTime(createdAt)}
          </span>
        </div>

        {/* Content */}
        <p
          className="text-[0.95rem] leading-relaxed mb-1"
          style={{ color: "var(--text)" }}
        >
          {content}
        </p>

        {/* Heart reaction — visible on hover (desktop) or always (mobile) */}
        <div className="md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-150">
          <HeartReaction
            count={heartCount}
            isActive={isHearted}
            onToggle={onToggleHeart}
          />
        </div>
      </div>
    </div>
  );
}
