"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  saveJournalLocally,
  markJournalSynced,
} from "@/lib/offline/journal-store";

interface JournalEditorProps {
  dayNumber: number;
  prompt: string;
  initialEntry: string;
}

const PLACEHOLDERS = [
  "Take your time. There\u2019s no wrong way to do this\u2026",
  "Whatever comes to mind is enough\u2026",
  "Start wherever feels right\u2026",
  "Write for yourself, no one else\u2026",
];

export function JournalEditor({
  dayNumber,
  prompt,
  initialEntry,
}: JournalEditorProps) {
  const [entry, setEntry]   = useState(initialEntry);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved]   = useState(false);
  const [offline, setOffline] = useState(false);
  const [focused, setFocused] = useState(false);
  const saveTimeout = useRef<NodeJS.Timeout>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const wordCount = entry.trim().length > 0
    ? entry.trim().split(/\s+/).filter(Boolean).length
    : 0;

  const placeholder = PLACEHOLDERS[(dayNumber - 1) % PLACEHOLDERS.length];

  // Track online/offline
  useEffect(() => {
    const handleOnline  = () => setOffline(false);
    const handleOffline = () => setOffline(true);

    setOffline(!navigator.onLine);
    window.addEventListener("online",  handleOnline);
    window.addEventListener("offline", handleOffline);
    return () => {
      window.removeEventListener("online",  handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  // Cleanup save timeout on unmount
  useEffect(() => {
    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, []);

  // Auto-grow textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.max(160, textareaRef.current.scrollHeight) + "px";
    }
  }, [entry]);

  const saveEntry = useCallback(
    async (text: string) => {
      setSaving(true);
      setSaved(false);

      // Always save locally first
      await saveJournalLocally(dayNumber, "reflection", text);

      // Then try to sync to server
      if (navigator.onLine) {
        try {
          const res = await fetch("/api/journal", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              day_number: dayNumber,
              prompt_type: "reflection",
              entry_text: text,
            }),
          });
          if (res.ok) {
            await markJournalSynced(dayNumber, "reflection");
            setSaved(true);
          }
        } catch {
          setSaved(true);
        }
      } else {
        setSaved(true);
      }

      setSaving(false);
    },
    [dayNumber]
  );

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEntry(text);
    setSaved(false);

    // Auto-save after 1.5s of inactivity
    if (saveTimeout.current) clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      if (text.trim()) saveEntry(text);
    }, 1500);
  };

  return (
    <div
      className="rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: "white",
        border: focused
          ? "1.5px solid rgba(91,123,94,0.45)"
          : "1.5px solid var(--border)",
        boxShadow: focused
          ? "0 4px 20px rgba(91,123,94,0.08)"
          : "0 1px 4px rgba(0,0,0,0.03)",
      }}
    >
      {/* Editor header */}
      <div
        className="flex items-center justify-between px-5 py-3 transition-colors duration-300"
        style={{
          borderBottom: "1px solid var(--border)",
          background: focused
            ? "rgba(91,123,94,0.04)"
            : "rgba(245,240,234,0.5)",
        }}
      >
        <div
          className="flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.1em]"
          style={{ color: "var(--sage)" }}
        >
          <Image
            src="/illustrations/icons/icon-pencil.webp"
            alt=""
            width={14}
            height={14}
            style={{ objectFit: "contain" }}
          />
          Your Journal
        </div>

        {/* Save status */}
        <div className="text-[0.7rem] min-w-[60px] text-right">
          {saving && (
            <span style={{ color: "var(--text-muted)" }}>Saving...</span>
          )}
          {saved && !saving && !offline && (
            <span className="animate-ink-write inline-flex items-center gap-1" style={{ color: "var(--sage)" }}>
              <Image
                src="/illustrations/icons/icon-checkmark.webp"
                alt=""
                width={10}
                height={10}
                style={{ objectFit: "contain" }}
              />
              Saved
            </span>
          )}
          {saved && !saving && offline && (
            <span className="inline-flex items-center gap-1" style={{ color: "var(--gold)" }}>
              <Image
                src="/illustrations/icons/icon-checkmark.webp"
                alt=""
                width={10}
                height={10}
                style={{ objectFit: "contain" }}
              />
              Saved locally
            </span>
          )}
        </div>
      </div>

      {/* Journal prompt */}
      {prompt && (
        <div
          className="relative px-5 py-4"
          style={{
            borderBottom: "1px solid var(--border)",
            background: "rgba(196,162,101,0.07)",
          }}
        >
          {/* Decorative opening quote mark */}
          <span
            className="absolute top-2 left-3 font-serif text-[2.2rem] leading-none select-none pointer-events-none"
            style={{ color: "var(--gold)", opacity: 0.3 }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          <div
            className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-2"
            style={{ color: "var(--gold)" }}
          >
            Today&apos;s prompt
          </div>
          <p
            className="font-serif text-[1.02rem] italic leading-relaxed"
            style={{ color: "var(--text-muted)" }}
          >
            {prompt}
          </p>
        </div>
      )}

      {/* Textarea */}
      <div className="px-5 pt-4 pb-3">
        <textarea
          ref={textareaRef}
          value={entry}
          onChange={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          placeholder={placeholder}
          className="w-full min-h-[160px] outline-none resize-none font-serif text-[0.98rem] leading-[32px] journal-lined"
          style={{
            border: "none",
            background: "transparent",
            color: "var(--text)",
            caretColor: "var(--sage)",
          }}
        />
      </div>

      {/* Footer */}
      <div
        className="px-5 py-2.5 flex items-center justify-between"
        style={{
          borderTop: "1px solid var(--border)",
          background: "rgba(245,240,234,0.3)",
        }}
      >
        <p
          className="text-[0.65rem] italic"
          style={{ color: "var(--text-muted)", opacity: 0.45 }}
        >
          Private &middot; Only you can see this
        </p>
        {wordCount > 0 && (
          <p
            className={`text-[0.65rem] transition-opacity duration-300 ${
              wordCount >= 50 ? "animate-ink-write" : ""
            }`}
            style={{
              color: wordCount >= 150 ? "var(--sage)" : "var(--text-muted)",
              opacity: wordCount >= 50 ? 0.55 : 0.35,
            }}
          >
            {wordCount >= 150
              ? `${wordCount} words \u2014 you\u2019re really showing up today`
              : `${wordCount} words`}
          </p>
        )}
      </div>
    </div>
  );
}
