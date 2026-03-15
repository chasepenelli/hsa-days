"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { QuoteCard } from "./QuoteCard";
import { JournalEditor } from "@/components/forms/JournalEditor";
import { DayNav } from "./DayNav";
import { MediaGallery } from "./MediaGallery";
import { MediaUpload } from "./MediaUpload";
import type { MediaItem } from "./MediaUpload";
import { ShareButton } from "@/components/share/ShareButton";
import { ShareCardModal } from "@/components/share/ShareCardModal";
import { useIsStandalone } from "@/hooks/useIsStandalone";
import { isChapterEnd } from "@/lib/day-utils";

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
  pillDoodle?: string | null;
  pillWatermark?: string | null;
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

/* ── Reduced motion hook ─────────────────────────────── */
function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mql.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);
  return reduced;
}

export function DayContent({
  day,
  dayNumber,
  isCompleted: initialCompleted,
  journalEntry,
  initialMedia = [],
  dogName,
  pillDoodle,
  pillWatermark,
}: DayContentProps) {
  const isStandalone = useIsStandalone();
  const router = useRouter();
  const reducedMotion = usePrefersReducedMotion();

  const [completed, setCompleted]         = useState(initialCompleted);
  const [justCompleted, setJustCompleted] = useState(false);
  const [completing, setCompleting]       = useState(false);
  const [media, setMedia]                 = useState<MediaItem[]>(initialMedia);
  const [shareOpen, setShareOpen]         = useState(false);
  const [exiting, setExiting]             = useState(false);

  // Staggered completion reveal: steps 0-4
  const [completionStep, setCompletionStep] = useState(0);

  const completionRef = useRef<HTMLDivElement>(null);

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

        if (reducedMotion) {
          setCompletionStep(4);
        } else {
          // Staggered reveal
          setCompletionStep(1);
          setTimeout(() => setCompletionStep(2), 400);
          setTimeout(() => setCompletionStep(3), 800);
          setTimeout(() => setCompletionStep(4), 1200);
        }

        // Scroll into view after a beat
        if (!reducedMotion) {
          setTimeout(() => {
            completionRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "center",
            });
          }, 300);
        }
      }
    } catch (err) {
      console.error("Failed to mark complete:", err);
    } finally {
      setCompleting(false);
    }
  }, [dayNumber, reducedMotion]);

  const handleContinue = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      const href = `/days/${dayNumber + 1}`;
      if (reducedMotion) {
        router.push(href);
        return;
      }
      setExiting(true);
      setTimeout(() => router.push(href), 300);
    },
    [dayNumber, reducedMotion, router]
  );

  const isMilestone           = [7, 14, 21, 30].includes(dayNumber);
  const isDay30               = dayNumber === 30;
  const completionMessage     = getCompletionMessage(dayNumber);
  const progressPct           = Math.round((dayNumber / 30) * 100);
  const headerIllustration    = DAY_HEADER_ILLUSTRATIONS[dayNumber] ?? null;
  const activityIllustration  = DAY_ACTIVITY_ILLUSTRATIONS[dayNumber] ?? null;

  // Return visit: completed but not just now
  const isReturnVisit = completed && !justCompleted;

  return (
    <div
      className={`min-h-screen ${exiting ? "animate-page-exit" : ""}`}
      style={{ background: "var(--warm-white)" }}
    >

      {/* ── Sticky top bar ───────────────────────────────── */}
      <div
        className={`sticky ${isStandalone ? "top-0 pt-[env(safe-area-inset-top)]" : "top-16"} z-10 flex items-center gap-4 px-5 py-2.5`}
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
              background: "linear-gradient(to right, var(--sage), var(--sage-light))",
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

        {/* Return visit note */}
        {isReturnVisit && (
          <div className="mb-8 text-center animate-fade-in">
            <div className="chapter-ornament mb-3">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5" style={{ color: "var(--terracotta)", opacity: 0.6 }}>
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <p
              className="text-[0.85rem] italic leading-relaxed"
              style={{ color: "var(--text-muted)", opacity: 0.7 }}
            >
              You completed this day. Your words are still here.
            </p>
          </div>
        )}

        {/* Quote */}
        {day.quote && (
          <DaySection className="animate-scale-in delay-1">
            <QuoteCard quote={day.quote} author={day.quote_author} />
          </DaySection>
        )}

        {/* Reflection */}
        {(day.reflection_intro || day.reflection_body) && (
          <DaySection className="animate-fade-in-up delay-2">
            <div className="relative overflow-hidden">
              {/* Personalized pill watermark */}
              {pillWatermark && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden="true">
                  <Image src={pillWatermark} alt="" width={280} height={280}
                    className="object-contain" style={{ opacity: 0.06, mixBlendMode: "multiply" }} />
                </div>
              )}
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
              className="relative rounded-xl px-6 py-5"
              style={{
                background: "rgba(91,123,94,0.05)",
                border: "1px solid rgba(91,123,94,0.12)",
              }}
            >
              {/* Personalized pill doodle */}
              {pillDoodle && (
                <div className="absolute -right-2 -top-4 pointer-events-none hidden md:block" style={{ width: "80px" }}>
                  <Image src={pillDoodle} alt="" width={80} height={80}
                    className="object-contain" style={{ opacity: 0.6, mixBlendMode: "multiply" }} />
                </div>
              )}
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

        {/* ── Completion Zone ────────────────────────────── */}
        <div
          ref={completionRef}
          className={`flex flex-col items-center justify-center text-center ${
            completed ? "min-h-[40vh] py-12" : "pt-8 pb-4"
          }`}
        >
          {/* Chapter ornament divider */}
          <div className="chapter-ornament w-full mb-8">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3" style={{ color: "var(--border-strong)", opacity: 0.5 }}>
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>

          {completed ? (
            <div>
              {/* ── Return visit: softer treatment ── */}
              {isReturnVisit ? (
                <div>
                  {/* Simple completed line */}
                  <div
                    className="inline-flex items-center gap-2 text-[0.82rem]"
                    style={{ color: "var(--sage)" }}
                  >
                    <span
                      className="w-5 h-5 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(91,123,94,0.1)" }}
                    >
                      <Image
                        src="/illustrations/icons/icon-checkmark.png"
                        alt=""
                        width={10}
                        height={10}
                        style={{ objectFit: "contain" }}
                      />
                    </span>
                    Completed
                  </div>

                  {/* Always show completion message on return */}
                  <p
                    className={`mt-4 text-[0.92rem] italic leading-relaxed ${
                      isMilestone ? "font-serif font-semibold" : ""
                    }`}
                    style={{
                      color: isMilestone ? "var(--gold)" : "var(--text-muted)",
                      opacity: 0.8,
                    }}
                  >
                    {completionMessage}
                  </p>

                  {/* Share button — quiet variant */}
                  <div className="mt-5">
                    <ShareButton
                      onClick={() => setShareOpen(true)}
                      variant="quiet"
                    />
                  </div>

                  {dayNumber < 30 && (
                    <div className="mt-6">
                      <a
                        href={`/days/${dayNumber + 1}`}
                        onClick={handleContinue}
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
                      </a>
                    </div>
                  )}
                </div>
              ) : (
                /* ── Just completed: full ceremony ── */
                <div>
                  {/* Step 1: Badge */}
                  <div
                    className={`inline-flex items-center gap-3 px-7 py-3.5 rounded-2xl font-semibold text-[0.95rem] animate-gentle-pulse`}
                    style={{
                      background: isDay30
                        ? "linear-gradient(135deg, rgba(91,123,94,0.1) 0%, rgba(196,162,101,0.12) 100%)"
                        : isMilestone
                          ? "rgba(196,162,101,0.1)"
                          : "rgba(91,123,94,0.08)",
                      color: isMilestone ? "var(--gold)" : "var(--sage-dark)",
                    }}
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center animate-check-in"
                      style={{
                        background: isMilestone ? "var(--gold)" : "var(--sage)",
                      }}
                    >
                      {isMilestone ? (
                        <svg viewBox="0 0 24 24" fill="white" className={`w-3.5 h-3.5 ${isMilestone ? "animate-breathe" : ""}`}>
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ) : (
                        <Image
                          src="/illustrations/icons/icon-checkmark.png"
                          alt="Complete"
                          width={14}
                          height={14}
                          style={{ objectFit: "contain" }}
                        />
                      )}
                    </span>
                    Day {dayNumber} Complete
                  </div>

                  {/* Step 2: Message */}
                  {completionStep >= 2 && (
                    <p
                      className={`mt-5 leading-relaxed animate-fade-in-up ${
                        isMilestone || isDay30
                          ? "font-serif font-semibold text-[1.1rem]"
                          : "text-[0.95rem] italic"
                      } ${isDay30 ? "text-[1.3rem]" : ""}`}
                      style={{
                        color: isMilestone ? "var(--gold)" : "var(--text-muted)",
                      }}
                    >
                      {completionMessage}
                    </p>
                  )}

                  {/* Step 3: Decorative gold divider with paw icon */}
                  {completionStep >= 3 && (
                    <div className="flex items-center gap-3 mt-6 mb-2 max-w-[200px] mx-auto">
                      <div
                        className="flex-1 h-px animate-divider-draw"
                        style={{ background: "var(--gold)", opacity: 0.4 }}
                      />
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 animate-scale-in" style={{ color: "var(--gold)", opacity: 0.5 }}>
                        <circle cx="7" cy="7" r="2.5" />
                        <circle cx="17" cy="7" r="2.5" />
                        <circle cx="4" cy="13" r="2.5" />
                        <circle cx="20" cy="13" r="2.5" />
                        <path d="M12 20c-3 0-5-2.5-5-5 0-1.5 1.5-3 5-5 3.5 2 5 3.5 5 5 0 2.5-2 5-5 5z" />
                      </svg>
                      <div
                        className="flex-1 h-px animate-divider-draw"
                        style={{ background: "var(--gold)", opacity: 0.4 }}
                      />
                    </div>
                  )}

                  {/* Day 30 special: Journey dots + personal reflection */}
                  {isDay30 && completionStep >= 3 && (
                    <div className="mt-8 mb-4">
                      {/* Journey dots — 30 small dots animating in */}
                      <div className="flex items-center justify-center gap-[5px] flex-wrap max-w-[320px] mx-auto mb-4">
                        {Array.from({ length: 30 }, (_, i) => (
                          <div
                            key={i}
                            className="w-[7px] h-[7px] rounded-full animate-dot-fill"
                            style={{
                              background: i === 29 ? "var(--gold)" : "var(--sage)",
                              animationDelay: `${i * 30}ms`,
                            }}
                          />
                        ))}
                      </div>
                      <p
                        className="text-[0.88rem] font-medium"
                        style={{ color: "var(--sage)", opacity: 0.8 }}
                      >
                        Thirty days complete
                      </p>
                    </div>
                  )}

                  {/* Day 30 personal reflection — appears after dots */}
                  {isDay30 && completionStep >= 4 && (
                    <div className="mt-6 mb-4 animate-fade-in-up">
                      <p
                        className="font-serif text-[1.05rem] italic leading-relaxed max-w-[400px] mx-auto"
                        style={{ color: "var(--text-muted)" }}
                      >
                        You showed up every day for {dogName || "your dog"}.
                        That&apos;s not small. That&apos;s everything.
                      </p>
                    </div>
                  )}

                  {/* Step 4: Share + Continue */}
                  {completionStep >= 4 && (
                    <div className="animate-fade-in-up">
                      {/* Share button */}
                      <div className="mt-5">
                        <ShareButton
                          onClick={() => setShareOpen(true)}
                          variant="primary"
                          label={isDay30 ? "Share Your Journey" : undefined}
                        />
                      </div>

                      {/* Continue to next day — transition card */}
                      {dayNumber < 30 && (
                        <div className="mt-8">
                          <a
                            href={`/days/${dayNumber + 1}`}
                            onClick={handleContinue}
                            className="group block no-underline max-w-[240px] mx-auto"
                          >
                            <div
                              className="rounded-xl px-6 py-5 text-center transition-all duration-300 group-hover:-translate-y-[2px]"
                              style={{
                                background: "white",
                                border: "1px solid var(--border)",
                                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                              }}
                            >
                              <div
                                className="text-[0.62rem] font-semibold uppercase tracking-[0.14em] mb-1"
                                style={{ color: "var(--text-muted)", opacity: 0.5 }}
                              >
                                Tomorrow
                              </div>
                              <div
                                className="font-serif text-[1.05rem] font-semibold mb-1"
                                style={{ color: "var(--text)" }}
                              >
                                Day {dayNumber + 1}
                              </div>
                              <div
                                className="text-[0.82rem] flex items-center justify-center gap-1.5 transition-colors group-hover:text-sage"
                                style={{ color: "var(--text-muted)" }}
                              >
                                Continue your journey
                                <Image
                                  src="/illustrations/icons/icon-arrow-right.png"
                                  alt=""
                                  width={12}
                                  height={12}
                                  style={{ objectFit: "contain", opacity: 0.6 }}
                                />
                              </div>
                            </div>
                          </a>

                          {/* Chapter transition note */}
                          {isChapterEnd(dayNumber) && (
                            <p
                              className="mt-4 text-[0.82rem] italic animate-fade-in"
                              style={{ color: "var(--gold-text)", opacity: 0.7 }}
                            >
                              A new chapter begins
                            </p>
                          )}
                        </div>
                      )}

                      {/* Day 30 journey endpoint */}
                      {isDay30 && (
                        <div className="mt-10">
                          <div className="chapter-ornament mb-3">
                            <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3" style={{ color: "var(--gold)", opacity: 0.6 }}>
                              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                          </div>
                          <p
                            className="text-[0.88rem] italic leading-relaxed"
                            style={{ color: "var(--text-muted)", opacity: 0.7 }}
                          >
                            The end of this chapter. Not the end of the story.
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          ) : (
            /* ── Not yet completed ── */
            <div>
              {/* Gentle pre-button invitation */}
              <p
                className="font-serif italic text-[0.82rem] mb-5"
                style={{ color: "var(--text-muted)", opacity: 0.6 }}
              >
                When you&apos;re ready
              </p>
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
      <DayNav currentDay={dayNumber} isStandalone={isStandalone} />

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
