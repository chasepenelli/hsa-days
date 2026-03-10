"use client";

import { useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";
import { usePresence } from "@/hooks/usePresence";
import { useUser } from "@/hooks/useUser";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { CommunityAuthGate } from "./CommunityAuthGate";
import { OnlineIndicator } from "./OnlineIndicator";

interface ChatRoomProps {
  channel: {
    id: string;
    slug: string;
    name: string;
    description: string | null;
    color: string;
  };
}

function formatDateLabel(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const isToday =
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate();

  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const isYesterday =
    date.getFullYear() === yesterday.getFullYear() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getDate() === yesterday.getDate();

  if (isToday) return "Today";
  if (isYesterday) return "Yesterday";

  return date.toLocaleDateString(undefined, {
    month: "long",
    day: "numeric",
  });
}

function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center gap-3 py-4">
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(to right, transparent, var(--gold))",
          opacity: 0.4,
          maxWidth: "80px",
        }}
      />
      <span
        className="text-[0.72rem] font-semibold uppercase tracking-[0.12em]"
        style={{ color: "var(--gold)", opacity: 0.7 }}
      >
        {label}
      </span>
      <div
        className="h-px flex-1"
        style={{
          background: "linear-gradient(to left, transparent, var(--gold))",
          opacity: 0.4,
          maxWidth: "80px",
        }}
      />
    </div>
  );
}

export function ChatRoom({ channel }: ChatRoomProps) {
  const { messages, isLoading, sendMessage } = useRealtimeMessages(channel.id);
  const { user, subscriber } = useUser();

  const presenceInfo = useMemo(
    () =>
      user && subscriber
        ? { userId: subscriber.id, dogName: subscriber.dog_name }
        : undefined,
    [user, subscriber]
  );

  const { onlineCount } = usePresence(channel.slug, presenceInfo);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Group messages by date
  const groupedMessages = useMemo(() => {
    const groups: { date: string; label: string; messages: typeof messages }[] =
      [];
    let currentDate = "";

    for (const msg of messages) {
      const msgDate = new Date(msg.created_at).toDateString();
      if (msgDate !== currentDate) {
        currentDate = msgDate;
        groups.push({
          date: msgDate,
          label: formatDateLabel(msg.created_at),
          messages: [msg],
        });
      } else {
        groups[groups.length - 1].messages.push(msg);
      }
    }

    return groups;
  }, [messages]);

  const handleSend = (content: string) => {
    if (!subscriber) return;
    sendMessage(content, subscriber.id);
  };

  return (
    <div
      className="flex flex-col min-h-screen"
      style={{ background: "var(--cream)" }}
    >
      {/* ── Sticky header bar ── */}
      <div
        className="sticky top-0 z-30 backdrop-blur-md"
        style={{
          background: "rgba(245, 240, 234, 0.92)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <div className="max-w-[800px] mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Back link + channel name */}
            <div className="flex items-center gap-3 min-w-0">
              <Link
                href="/community"
                className="flex items-center gap-1.5 text-[0.82rem] font-medium no-underline transition-opacity hover:opacity-70 flex-shrink-0"
                style={{ color: "var(--text-muted)" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  className="flex-shrink-0"
                >
                  <path
                    d="M10 12L6 8L10 4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Community
              </Link>
              <span
                className="text-[0.7rem]"
                style={{ color: "var(--border)", opacity: 0.6 }}
              >
                /
              </span>
              <h1
                className="font-serif font-semibold text-[1.05rem] truncate"
                style={{ color: "var(--text)" }}
              >
                {channel.name}
              </h1>
            </div>

            {/* Online indicator */}
            <OnlineIndicator count={onlineCount} />
          </div>
        </div>
      </div>

      {/* ── Messages area ── */}
      <div
        ref={messagesContainerRef}
        className="flex-1 overflow-y-auto px-6"
        style={{ paddingTop: "8px", paddingBottom: "8px" }}
      >
        <div className="max-w-[800px] mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div
                className="w-6 h-6 rounded-full border-2 animate-spin"
                style={{
                  borderColor: "var(--border)",
                  borderTopColor: "var(--sage)",
                }}
              />
            </div>
          ) : messages.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Image
                src="/illustrations/icons/icon-community.png"
                alt=""
                width={64}
                height={64}
                style={{ objectFit: "contain", opacity: 0.4, mixBlendMode: "multiply" }}
                className="mb-4"
              />
              <p
                className="font-serif italic text-[1rem] mb-1"
                style={{ color: "var(--text-muted)" }}
              >
                This room is quiet for now.
              </p>
              <p
                className="text-[0.85rem]"
                style={{ color: "var(--text-muted)", opacity: 0.7 }}
              >
                Be the first to say hello.
              </p>
            </div>
          ) : (
            /* Messages grouped by date */
            groupedMessages.map((group) => (
              <div key={group.date}>
                <DateDivider label={group.label} />
                {group.messages.map((msg) => (
                  <ChatMessage
                    key={msg.id}
                    id={msg.id}
                    content={msg.content}
                    dogName={msg.subscribers?.dog_name ?? "Someone"}
                    createdAt={msg.created_at}
                    isPending={msg._pending}
                    heartCount={0}
                    isHearted={false}
                    onToggleHeart={() => {}}
                  />
                ))}
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* ── Bottom input or auth gate ── */}
      <div
        className="sticky bottom-0 z-20 px-6 pb-6 pt-3"
        style={{
          background:
            "linear-gradient(to top, var(--cream) 60%, transparent)",
        }}
      >
        <div className="max-w-[800px] mx-auto">
          {user && subscriber ? (
            <ChatInput onSend={handleSend} />
          ) : (
            <CommunityAuthGate />
          )}
        </div>
      </div>
    </div>
  );
}
