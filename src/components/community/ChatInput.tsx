"use client";

import { useState, useRef, useCallback } from "react";

interface ChatInputProps {
  onSend: (content: string) => void;
  disabled?: boolean;
}

const MAX_LENGTH = 2000;
const WARN_THRESHOLD = 1800;

export function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoResize = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    // Cap at roughly 3 lines (~72px)
    el.style.height = `${Math.min(el.scrollHeight, 72)}px`;
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length <= MAX_LENGTH) {
      setValue(e.target.value);
    }
    autoResize();
  };

  const handleSend = () => {
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue("");
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showCharCount = value.length > WARN_THRESHOLD;
  const remaining = MAX_LENGTH - value.length;

  return (
    <div
      className="rounded-2xl p-3 transition-shadow duration-200"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        boxShadow: "0 -2px 12px rgba(0,0,0,0.03)",
      }}
    >
      <div className="flex items-end gap-2.5">
        <textarea
          ref={textareaRef}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder="Share what's on your heart..."
          rows={1}
          className="flex-1 resize-none bg-transparent text-[0.95rem] leading-relaxed outline-none placeholder:text-[var(--text-muted)] placeholder:opacity-50 disabled:opacity-40"
          style={{
            color: "var(--text)",
            maxHeight: "72px",
          }}
        />

        <button
          onClick={handleSend}
          disabled={disabled || !value.trim()}
          className="flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed hover:opacity-90 active:scale-95"
          style={{ background: "var(--sage)" }}
        >
          Send
        </button>
      </div>

      {/* Character count warning */}
      {showCharCount && (
        <div className="flex justify-end mt-1.5 pr-1">
          <span
            className="text-[0.7rem]"
            style={{
              color: remaining < 50 ? "var(--terracotta)" : "var(--text-muted)",
              opacity: 0.7,
            }}
          >
            {remaining} remaining
          </span>
        </div>
      )}
    </div>
  );
}
