"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { QuoteCard } from "./QuoteCard";
import { JournalEditor } from "@/components/forms/JournalEditor";
import { DayNav } from "./DayNav";
import { MediaGallery } from "./MediaGallery";
import { MediaUpload } from "./MediaUpload";
import type { MediaItem } from "./MediaUpload";
import { ShareButton } from "@/components/share/ShareButton";
import { ShareCardModal } from "@/components/share/ShareCardModal";
import type { ShareCardData } from "@/components/share/card-styles";

interface DayData {
  day_number: number;
  title: string;
  subtitle: string;
  category: string;
  quote: string;
  quote_author: string;
  reflection_intro: string;
  reflection_body: string;
  activity_title: string;
  activity_description: string;
  journal_prompt: string;
  practical_tip_title: string;
  practical_tip: string;
}

interface DayContentProps {
  day: DayData;
  dayNumber: number;
  isCompleted: boolean;
  journalEntry: string;
  initialMedia?: MediaItem[];
  dogName?: string;
}

/* ── Day illustration mapping ────────────────────────── */
const DAY_HEADER_ILLUSTRATIONS: Record<number, string> = {
  1: "/illustrations/days/day01-header.png",
  2: "/illustrations/days/day02-header.png",
  3: "/illustrations/days/day03-header.png",
};

const DAY_ACTIVITY_ILLUSTRATIONS: Record<number, string> = {
  1: "/illustrations/days/day01-activity.png",
  2: "/illustrations/days/day02-activity.png",
  3: "/illustrations/days/day03-activity.png",
};

function getMilestoneMessage(dayNumber: number): string | null {
  switch (dayNumber) {
    case 7:  return "One week. You\u2019re doing this.";
    case 14: return "Two weeks of showing up. That takes real strength.";
    case 21: return "Three weeks. Your dog is lucky to have you.";
    case 30: return "You made it. Thirty days of love, presence, and courage.";
    default: return null;
  }
}

const GENTLE_MESSAGES = [
  "That\u2019s enough for today.",
  "You showed up. That matters.",
  "One day at a time.",
  "Your dog is grateful you\u2019re here.",
];

function getCompletionMessage(dayNumber: number): string {
  const milestone = getMilestoneMessage(dayNumber);
  if (milestone) return milestone;
  return GENTLE_MESSAGES[dayNumber % GENTLE_MESSAGES.length];
}

/* ── Section label component ─────────────────────────── */
function SectionLabel({
  children,
  icon,
  color = "gold",
}: {
  children: React.ReactNode;
  icon?: React.ReactNode;
  color?: "gold" | "sage" | "muted";
}) {
  const colorMap = {
    gold:  "rgba(196,162,101,1)",
    sage:  "var(--sage)",
    muted: "rgba(107,107,107,0.6)",
  };

  return (
    <div
      className="flex items-center gap-2 mb-4 text-[0.68rem] font-semibold uppercase tracking-[0.14em]"
      style={{ color: colorMap[color] }}
    >
      {icon && <span className="opacity-80">{icon}</span>}
      {children}
    </div>
  );
}

/* ── Section container ───────────────────────────────── */
function DaySection({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`mb-12 ${className}`}>
      {children}
    </section>
  );
}

export function DayContent({
  day,
  dayNumber,
  isCompleted: initialCompleted,
  journalEntry,
  initialMedia = [],
  dogName,
}: DayContentProps) {
  const [completed, setCompleted]         = useState(initialCompleted);
  const [justCompleted, setJustCompleted] = useState(false);
  const [completing, setCompleting]       = useState(false);
  const [media, setMedia]                 = useState<MediaItem[]>(initialMedia);
  const [shareOpen, setShareOpen]         = useState(false);

  const handleMediaUpload = useCallback((newMedia: MediaItem) => {
    setMedia((prev) => [...prev, newMedia]);
  }, []);

  const handleMediaDelete = useCallback((id: string) => {
    setMedia((prev) => prev.filter((m) => m.id !== id));
  }, []);

  const handleMarkComplete = useCallback(async () => {
    setCompleting(true);
    try {
      const res = await fetch("/api/progress", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ day_number: dayNumber, completed: true }),
      });
      if (res.ok) {
        setCompleted(true);
        setJustCompleted(true);
      }
    } catch (err) {
      console.error("Failed to mark complete:", err);
    } finally {
      setCompleting(false);
    }
  }, [dayNumber]);

  const isMilestone           = [7, 14, 21, 30].includes(dayNumber);
  const completionMessage     = getCompletionMessage(dayNumber);
  const progressPct           = Math.round((dayNumber / 30) * 100);
  const headerIllustration    = DAY_HEADER_ILLUSTRATIONS[dayNumber] ?? null;
  const activityIllustration  = DAY_ACTIVITY_ILLUSTRATIONS[dayNumber] ?? null;

  return (
    <div className="min-h-screen" style={{ background: "var(--warm-white)" }}>

      {/* ── Sticky top bar ───────────────────────────────── */}
      <div
        className="sticky top-16 z-10 flex items-center gap-4 px-5 py-2.5"
        style={{
          background: "rgba(250,248,245,0.94)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
        }}
      >
        <Link
          href="/days"
          className="flex items-center gap-1.5 text-[0.82rem] font-medium no-underline transition-colors hover:text-sage"
          style={{ color: "var(--text-muted)" }}
        >
          <Image
            src="/illustrations/icons/icon-arrow-left.png"
            alt=""
            width={14}
            height={14}
            style={{ objectFit: "contain", opacity: 0.7 }}
          />
          Journal
        </Link>
        <div
          className="flex-1 h-[3px] rounded-full overflow-hidden"
          style={{ background: "var(--border)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${progressPct}%`,
              background: completed
                ? "linear-gradient(to right, var(--sage), var(--sage-light))"
                : "linear-gradient(to right, var(--sage), var(--sage-light))",
            }}
          />
        </div>
        <span
          className="text-[0.72rem] font-medium whitespace-nowrap"
          style={{ color: "var(--text-muted)" }}
        >
          {dayNumber} / 30
        </span>
      </div>

      {/* ── Day header ───────────────────────────────────── */}
      <div
        className="relative overflow-hidden px-6 py-10 md:px-12 md:py-12 animate-fade-in-up"
        style={{
          background: "linear-gradient(155deg, var(--sage-dark) 0%, var(--sage) 100%)",
        }}
      >
        {/* Header illustration — behind gradient, right-aligned */}
        {headerIllustration && (
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <Image
              src={headerIllustration}
              alt=""
              fill
              sizes="(max-width: 768px) 100vw, 800px"
              className="object-cover object-right"
              style={{ opacity: 0.15, mixBlendMode: "luminosity" }}
              priority
            />
            {/* Fade illustration out towards left so text stays crisp */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to right, var(--sage-dark) 0%, transparent 55%)",
              }}
            />
          </div>
        )}

        <div className="max-w-[680px] mx-auto relative z-10">
          <div
            className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-3"
            style={{ color: "rgba(255,255,255,0.65)" }}
          >
            Day {dayNumber} of 30
            {day.category && (
              <>
                <span className="mx-2 opacity-40">&middot;</span>
                {day.category}
              </>
            )}
          </div>
          <h1 className="font-serif text-[clamp(1.65rem,4vw,2.3rem)] font-semibold text-white leading-[1.2] mb-2">
            {day.title}
          </h1>
          {day.subtitle && (
            <p className="text-[1rem] leading-relaxed" style={{ color: "rgba(255,255,255,0.72)" }}>
              {day.subtitle}
            </p>
          )}
        </div>
      </div>

      {/* ── Day body ─────────────────────────────────────── */}
      <div className="max-w-[680px] mx-auto px-5 md:px-8 py-10">

        {/* Quote */}
        {day.quote && (
          <DaySection className="animate-scale-in delay-1">
            <QuoteCard quote={day.quote} author={day.quote_author} />
          </DaySection>
        )}

        {/* Reflection */}
        {(day.reflection_intro || day.reflection_body) && (
          <DaySection className="animate-fade-in-up delay-2">
            <SectionLabel
              icon={
                <Image
                  src="/illustrations/icons/icon-pencil.png"
                  alt=""
                  width={14}
                  height={14}
                  style={{ objectFit: "contain" }}
                />
              }
            >
              Today&apos;s Reflection
            </SectionLabel>
            <div
              className="text-[0.98rem] leading-[1.85] space-y-4"
              style={{ color: "var(--text)" }}
            >
              {day.reflection_intro && (
                <p className="font-medium" style={{ color: "var(--text)" }}>
                  {day.reflection_intro}
                </p>
              )}
              {day.reflection_body?.split("\n\n").map((paragraph, i) => (
                <p key={i} style={{ color: "var(--text-muted)" }}>
                  {paragraph}
                </p>
              ))}
            </div>
          </DaySection>
        )}

        {/* Divider */}
        {(day.reflection_intro || day.reflection_body) && (
          <div
            className="my-10 flex items-center gap-3"
            style={{ color: "var(--border-strong)" }}
          >
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "var(--border-strong)" }} />
            <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
          </div>
        )}

        {/* Journal prompt */}
        <DaySection className="animate-fade-in-up delay-3">
          <JournalEditor
            dayNumber={dayNumber}
            prompt={day.journal_prompt}
            initialEntry={journalEntry}
          />
        </DaySection>

        {/* Activity */}
        {day.activity_title && (
          <DaySection className="animate-fade-in-up delay-4">
            <div
              className="rounded-xl px-6 py-5"
              style={{
                background: "rgba(91,123,94,0.05)",
                border: "1px solid rgba(91,123,94,0.12)",
              }}
            >
              <div className={activityIllustration ? "flex gap-5 items-start" : undefined}>
                {/* Activity spot illustration */}
                {activityIllustration && (
                  <div
                    className="relative flex-shrink-0 rounded-xl overflow-hidden"
                    style={{ width: "88px", height: "88px" }}
                  >
                    <Image
                      src={activityIllustration}
                      alt=""
                      fill
                      sizes="88px"
                      className="object-cover"
                      style={{ mixBlendMode: "multiply", opacity: 0.9 }}
                    />
                  </div>
                )}

                <div className="flex-1 min-w-0">
                  <SectionLabel
                    color="sage"
                    icon={
                      <Image
                        src="/illustrations/icons/icon-clock.png"
                        alt=""
                        width={14}
                        height={14}
                        style={{ objectFit: "contain" }}
                      />
                    }
                  >
                    Today&apos;s Activity
                  </SectionLabel>
                  <h3 className="font-serif text-[1.05rem] font-semibold text-text mb-2">
                    {day.activity_title}
                  </h3>
                  <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                    {day.activity_description}
                  </p>
                </div>
              </div>
            </div>
          </DaySection>
        )}

        {/* Practical tip */}
        {day.practical_tip && (
          <DaySection className="animate-fade-in-up delay-5">
            <div
              className="rounded-xl px-6 py-5"
              style={{
                background: "rgba(196,162,101,0.06)",
                border: "1px solid rgba(196,162,101,0.18)",
              }}
            >
              <SectionLabel
                color="gold"
                icon={
                  <Image
                    src="/illustrations/icons/icon-lightbulb.png"
                    alt=""
                    width={14}
                    height={14}
                    style={{ objectFit: "contain" }}
                  />
                }
              >
                Practical Tip
              </SectionLabel>
              {day.practical_tip_title && (
                <h3 className="font-serif text-[1.05rem] font-semibold text-text mb-2">
                  {day.practical_tip_title}
                </h3>
              )}
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {day.practical_tip}
              </p>
            </div>
          </DaySection>
        )}

        {/* Memories */}
        <DaySection className="animate-fade-in-up delay-6">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel
              color="muted"
              icon={
                <Image
                  src="/illustrations/icons/icon-camera.png"
                  alt=""
                  width={14}
                  height={14}
                  style={{ objectFit: "contain" }}
                />
              }
            >
              Memories
              {media.length > 0 && (
                <span
                  className="ml-1 font-normal normal-case tracking-normal text-[0.72rem]"
                  style={{ color: "var(--sage)" }}
                >
                  ({media.length})
                </span>
              )}
            </SectionLabel>
          </div>

          {media.length > 0 ? (
            <div className="mb-4">
              <MediaGallery media={media} onDelete={handleMediaDelete} />
            </div>
          ) : (
            <p
              className="text-[0.85rem] italic mb-4"
              style={{ color: "var(--text-muted)", opacity: 0.5 }}
            >
              No memories yet. Capture a moment from today.
            </p>
          )}
          <MediaUpload dayNumber={dayNumber} onUploadComplete={handleMediaUpload} />
        </DaySection>

        {/* ── Mark Complete ────────────────────────────────── */}
        <div
          className="pt-8 pb-4 text-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {completed ? (
            <div>
              <div
                className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold text-[0.95rem] ${
                  justCompleted ? "animate-gentle-pulse" : ""
                }`}
                style={{
                  background: "rgba(91,123,94,0.08)",
                  color: "var(--sage-dark)",
                }}
              >
                <span
                  className={`w-6 h-6 rounded-full flex items-center justify-center ${
                    justCompleted ? "animate-check-in" : ""
                  }`}
                  style={{ background: "var(--sage)" }}
                >
                  <Image
                    src="/illustrations/icons/icon-checkmark.png"
                    alt="Complete"
                    width={14}
                    height={14}
                    style={{ objectFit: "contain" }}
                  />
                </span>
                Day {dayNumber} Complete
              </div>

              {justCompleted && (
                <p
                  className={`mt-5 text-[0.95rem] italic animate-fade-in-up leading-relaxed ${
                    isMilestone ? "font-semibold font-serif" : ""
                  }`}
                  style={{
                    color: isMilestone ? "var(--gold)" : "var(--text-muted)",
                  }}
                >
                  {completionMessage}
                </p>
              )}

              {/* Share button */}
              <div className="mt-5">
                <ShareButton
                  onClick={() => setShareOpen(true)}
                  variant={justCompleted ? "primary" : "quiet"}
                />
              </div>

              {dayNumber < 30 && (
                <div className="mt-6">
                  <Link
                    href={`/days/${dayNumber + 1}`}
                    className="inline-flex items-center gap-2 text-[0.85rem] font-medium no-underline transition-colors hover:text-sage"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Continue to Day {dayNumber + 1}
                    <Image
                      src="/illustrations/icons/icon-arrow-right.png"
                      alt=""
                      width={14}
                      height={14}
                      style={{ objectFit: "contain", opacity: 0.7 }}
                    />
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <div>
              <button
                onClick={handleMarkComplete}
                disabled={completing}
                className="inline-flex items-center gap-2.5 px-8 py-4 text-white border-none rounded-2xl text-[0.95rem] font-semibold font-sans cursor-pointer transition-all active:scale-[0.98] disabled:opacity-70"
                style={{
                  background: "var(--sage)",
                  boxShadow: "0 4px 16px rgba(91,123,94,0.25)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--sage-dark)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--sage)";
                }}
              >
                {completing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Image
                      src="/illustrations/icons/icon-checkmark.png"
                      alt=""
                      width={16}
                      height={16}
                      style={{ objectFit: "contain" }}
                    />
                    Mark Day {dayNumber} Complete
                  </>
                )}
              </button>
              <p
                className="mt-3 text-[0.78rem] italic"
                style={{ color: "var(--text-muted)", opacity: 0.5 }}
              >
                You can always come back and add more.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Day navigation */}
      <DayNav currentDay={dayNumber} />

      {/* Share card modal */}
      {completed && (
        <ShareCardModal
          open={shareOpen}
          onClose={() => setShareOpen(false)}
          data={{
            dayNumber,
            title: day.title,
            category: day.category,
            quote: day.quote,
            quoteAuthor: day.quote_author,
            dogName,
            journalExcerpt: journalEntry
              ? journalEntry.slice(0, 200)
              : undefined,
            photoUrl: media[0]?.url || undefined,
          }}
          hasMedia={media.length > 0}
        />
      )}
    </div>
  );
}
