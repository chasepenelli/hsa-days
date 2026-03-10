"use client";

import Image from "next/image";
import Link from "next/link";
import { OnlineIndicator } from "./OnlineIndicator";

const COLOR_MAP: Record<string, string> = {
  sage: "var(--sage)",
  gold: "var(--gold)",
  terracotta: "var(--terracotta)",
};

interface ChannelCardProps {
  slug: string;
  name: string;
  description: string;
  iconPath: string;
  color: "sage" | "gold" | "terracotta";
  onlineCount: number;
  lastMessage?: string;
}

export function ChannelCard({
  slug,
  name,
  description,
  iconPath,
  color,
  onlineCount,
  lastMessage,
}: ChannelCardProps) {
  const borderColor = COLOR_MAP[color] || "var(--sage)";

  return (
    <Link
      href={`/community/chat/${slug}`}
      className="block no-underline group"
    >
      <div
        className="relative rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          borderLeft: `3px solid ${borderColor}`,
          boxShadow: "0 2px 8px rgba(0,0,0,0.03)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 8px 28px rgba(0,0,0,0.07), 0 2px 6px rgba(0,0,0,0.03)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.boxShadow =
            "0 2px 8px rgba(0,0,0,0.03)";
        }}
      >
        {/* Header with icon and name */}
        <div className="flex items-start gap-3 mb-2.5">
          <Image
            src={iconPath}
            alt=""
            width={32}
            height={32}
            className="flex-shrink-0 rounded-lg"
            style={{ objectFit: "contain" }}
          />
          <div className="min-w-0">
            <h3
              className="font-semibold text-[0.95rem] leading-snug"
              style={{ color: "var(--text)" }}
            >
              {name}
            </h3>
          </div>
        </div>

        {/* Description */}
        <p
          className="text-[0.82rem] leading-relaxed mb-4"
          style={{ color: "var(--text-muted)" }}
        >
          {description}
        </p>

        {/* Bottom row */}
        <div className="flex items-center justify-between gap-3">
          <OnlineIndicator count={onlineCount} />
          {lastMessage && (
            <span
              className="text-[0.75rem] truncate max-w-[180px]"
              style={{ color: "var(--text-muted)", opacity: 0.7 }}
            >
              {lastMessage}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
