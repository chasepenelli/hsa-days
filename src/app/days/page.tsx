import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import Link from "next/link";

import { ScrollToCurrentDay } from "@/components/days/ScrollToCurrentDay";
import { AnimatedDayCard } from "@/components/days/AnimatedDayCard";

interface DayContent {
  day_number: number;
  title: string;
  subtitle: string;
  category: string;
  quote: string;
  quote_author: string;
}

interface DayProgress {
  day_number: number;
  started_at: string;
  completed_at: string | null;
}

const MILESTONES: Record<number, string> = {
  7: "One week. You\u2019re doing this.",
  14: "Two weeks of showing up. That takes real strength.",
  21: "Three weeks. Your dog is lucky to have you.",
  30: "You made it. Thirty days of love, presence, and courage.",
};

const WEEK_CONFIG: Record<
  number,
  { title: string; subtitle: string; epigraph: string }
> = {
  1: {
    title: "Chapter One",
    subtitle: "The Beginning",
    epigraph: "You start with survival.",
  },
  2: {
    title: "Chapter Two",
    subtitle: "Finding Structure",
    epigraph: "Structure becomes your anchor.",
  },
  3: {
    title: "Chapter Three",
    subtitle: "The Deep Middle",
    epigraph: "The hardest part is also the deepest.",
  },
  4: {
    title: "Chapter Four",
    subtitle: "Coming Home",
    epigraph: "You begin to see what this has taught you.",
  },
  5: {
    title: "The Final Days",
    subtitle: "What Remains",
    epigraph: "Love doesn\u2019t end. It transforms.",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  Reflection:   "bg-sage/10 text-sage-dark",
  Understanding:"bg-gold/10 text-[#8B6B3A]",
  Activity:     "bg-terracotta/10 text-terracotta",
  Practical:    "bg-sage-dark/10 text-sage-dark",
  Connection:   "bg-gold-light/10 text-[#8B6B3A]",
};

import { getWeek } from "@/lib/day-utils";

export const metadata = {
  title: "Your 30-Day Journey",
};

export default async function DaysDashboard() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ensure subscriber record exists (safety net) + fetch pet info
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("id, dog_name, pet_photo_path")
    .eq("id", user.id)
    .single();

  if (!subscriber) {
    await supabase.from("subscribers").upsert(
      {
        id: user.id,
        email: user.email!,
        signup_source: "safety_net",
        has_digital_access: true,
      },
      { onConflict: "id" }
    );
  }

  const petName = subscriber?.dog_name || null;

  // Get signed URL for pet photo if available
  let petPhotoUrl: string | null = null;
  if (subscriber?.pet_photo_path) {
    const { data: signedData } = await supabase.storage
      .from("pet-photos")
      .createSignedUrl(subscriber.pet_photo_path, 3600);
    petPhotoUrl = signedData?.signedUrl || null;
  }

  // Fetch all data in parallel
  const [
    { data: days },
    { data: progress },
    { data: journalEntries },
  ] = await Promise.all([
    supabase
      .from("daily_content")
      .select("day_number, title, subtitle, category, quote, quote_author")
      .order("day_number", { ascending: true }),
    supabase
      .from("user_day_progress")
      .select("day_number, started_at, completed_at")
      .eq("subscriber_id", user.id),
    supabase
      .from("journal_entries")
      .select("day_number, entry_text")
      .eq("subscriber_id", user.id),
  ]);

  const progressMap = new Map<number, DayProgress>();
  progress?.forEach((p: DayProgress) => progressMap.set(p.day_number, p));

  // Build journal snippet map (100 chars)
  const journalMap = new Map<number, string>();
  journalEntries?.forEach(
    (j: { day_number: number; entry_text: string }) => {
      if (j.entry_text && j.entry_text.length > 10) {
        const snippet =
          j.entry_text.length > 100
            ? j.entry_text.slice(0, 100).trim() + "\u2026"
            : j.entry_text;
        if (!journalMap.has(j.day_number)) {
          journalMap.set(j.day_number, snippet);
        }
      }
    }
  );

  const completedCount =
    progress?.filter((p: DayProgress) => p.completed_at).length ?? 0;

  // Find the current day: first day not completed
  const currentDay =
    (days as DayContent[] | null)?.find(
      (d) => !progressMap.get(d.day_number)?.completed_at
    )?.day_number ?? 31;

  const currentDayContent = (days as DayContent[] | null)?.find(
    (d) => d.day_number === currentDay
  );

  // Progress percentage for arc fill
  const progressPct = Math.round((completedCount / 30) * 100);

  let lastWeek = 0;

  return (
    <div className="min-h-screen pb-20" style={{ background: "var(--warm-white)" }}>

      {/* ─── Journey Header ─── */}
      <div className="px-6 pt-24 pb-12 text-center" style={{ background: "linear-gradient(to bottom, var(--cream) 0%, var(--warm-white) 100%)" }}>
        <div className="max-w-[560px] mx-auto">

          {/* Pet photo + name greeting */}
          {petName && (
            <div className="flex flex-col items-center mb-6">
              {petPhotoUrl ? (
                <div
                  className="w-16 h-16 rounded-full mb-3 overflow-hidden"
                  style={{
                    border: "2.5px solid var(--sage)",
                    boxShadow: "0 2px 12px rgba(91,123,94,0.15)",
                  }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={petPhotoUrl}
                    alt={petName}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div
                  className="w-16 h-16 rounded-full mb-3 flex items-center justify-center"
                  style={{
                    background: "rgba(91,123,94,0.08)",
                    border: "2px solid var(--border-strong)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" style={{ color: "var(--sage)" }}>
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
              )}
              <p
                className="text-[0.85rem] font-medium"
                style={{ color: "var(--text-muted)" }}
              >
                {petName}&rsquo;s journey
              </p>
            </div>
          )}

          {/* Current status heading */}
          {currentDay <= 30 ? (
            <>
              <div
                className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full mb-5"
                style={{ background: "rgba(91,123,94,0.1)", color: "var(--sage-dark)" }}
              >
                Day {currentDay} of 30
              </div>
              <h1 className="font-serif text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-text leading-[1.25] mb-2">
                {currentDayContent?.title ?? "Your Journey"}
              </h1>
              <p className="text-[0.95rem] text-text-muted italic">
                {currentDayContent?.subtitle}
              </p>
            </>
          ) : (
            <>
              <div
                className="inline-block text-[0.7rem] font-semibold uppercase tracking-[0.12em] px-3 py-1 rounded-full mb-5"
                style={{ background: "rgba(196,162,101,0.12)", color: "var(--gold)" }}
              >
                Journey Complete
              </div>
              <h1 className="font-serif text-[clamp(1.9rem,4vw,2.6rem)] font-semibold text-text leading-[1.25] mb-2">
                Thirty days behind you
              </h1>
              <p className="text-[0.95rem] text-text-muted italic">
                Love doesn&rsquo;t end. It transforms.
              </p>
            </>
          )}

          {/* Stepping stones progress */}
          <div className="mt-8 mb-3">
            <div className="flex items-center justify-center gap-[6px] flex-wrap max-w-[400px] mx-auto">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => {
                const isCompleted = !!progressMap.get(day)?.completed_at;
                const isCurrent   = day === currentDay;
                const isMilestone = day in MILESTONES;

                return (
                  <div key={day} className="relative flex items-center justify-center">
                    <div
                      className={`rounded-full transition-all duration-300 ${
                        isCompleted
                          ? isMilestone
                            ? "w-[10px] h-[10px]"
                            : "w-[8px] h-[8px]"
                          : isCurrent
                            ? "w-[11px] h-[11px]"
                            : "w-[6px] h-[6px]"
                      }`}
                      style={{
                        background: isCompleted
                          ? isMilestone
                            ? "var(--gold)"
                            : "var(--sage)"
                          : isCurrent
                            ? "var(--sage)"
                            : "transparent",
                        border: !isCompleted && !isCurrent
                          ? "1.5px solid var(--border-strong)"
                          : "none",
                      }}
                    />
                    {isCurrent && (
                      <div
                        className="absolute inset-0 rounded-full animate-gentle-pulse-ring"
                        style={{ background: "rgba(91,123,94,0.35)" }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-[0.8rem] text-text-muted/60 italic">
            {completedCount === 0
              ? "Your story begins here"
              : completedCount === 30
                ? "All 30 days behind you"
                : `${completedCount} ${completedCount === 1 ? "day" : "days"} complete \u00b7 ${30 - completedCount} ahead`}
          </p>

          {/* Progress bar */}
          {completedCount > 0 && completedCount < 30 && (
            <div className="mt-4 max-w-[240px] mx-auto">
              <div
                className="h-[3px] rounded-full overflow-hidden"
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
            </div>
          )}
        </div>
      </div>

      {/* Completion celebration */}
      {completedCount === 30 && (
        <div className="max-w-[580px] mx-auto px-6 mb-10">
          <div
            className="rounded-2xl px-7 py-6 text-center"
            style={{
              background: "linear-gradient(135deg, rgba(91,123,94,0.08) 0%, rgba(196,162,101,0.08) 100%)",
              border: "1px solid rgba(196,162,101,0.25)",
            }}
          >
            <div className="text-[1.4rem] mb-3" aria-hidden="true">&#x2728;</div>
            <p className="font-serif text-[1.1rem] font-semibold text-sage mb-1.5">
              You made it. All 30 days.
            </p>
            <p className="text-[0.9rem] text-text-muted leading-relaxed">
              Thirty days of love, presence, and courage. Your dog is lucky to
              have you.
            </p>
          </div>
        </div>
      )}

      {/* ─── Journal timeline ─── */}
      <div className="max-w-[600px] mx-auto px-5">
        <div className="relative">
          {(days as DayContent[] | null)?.map((day) => {
            const dayProgress  = progressMap.get(day.day_number);
            const isCompleted  = !!dayProgress?.completed_at;
            const isStarted    = !!dayProgress?.started_at;
            const isCurrent    = day.day_number === currentDay;
            const isFuture     = day.day_number > currentDay;
            const isMilestone  = day.day_number in MILESTONES;
            const week         = getWeek(day.day_number);
            const showWeekDivider = week !== lastWeek;
            lastWeek = week;

            const weekInfo = showWeekDivider ? WEEK_CONFIG[week] : null;

            const journalSnippet = journalMap.get(day.day_number);

            const categoryColor =
              CATEGORY_COLORS[day.category] || "bg-sage/10 text-sage-dark";

            // Thread line color
            const threadColor = isFuture
              ? "rgba(232,228,223,0.5)"
              : isCompleted
                ? "rgba(91,123,94,0.25)"
                : "rgba(91,123,94,0.4)";

            // Week-local index for stagger delay
            const weekStart =
              week === 1 ? 1 : week === 2 ? 8 : week === 3 ? 15 : week === 4 ? 22 : 26;
            const weekLocalIdx = day.day_number - weekStart;

            return (
              <div key={day.day_number}>

                {/* ─── Chapter break ─── */}
                {weekInfo && (
                  <div className={`text-center ${day.day_number > 1 ? "mt-16 mb-10" : "mb-10"}`}>

                    {/* Decorative chapter ornament */}
                    <div className="flex items-center justify-center gap-3 mb-5">
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: "linear-gradient(to right, transparent, var(--border-strong))",
                          maxWidth: "80px",
                        }}
                      />
                      <div
                        className="w-1.5 h-1.5 rounded-full rotate-45"
                        style={{ background: "var(--gold)", opacity: 0.7 }}
                      />
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: "linear-gradient(to left, transparent, var(--border-strong))",
                          maxWidth: "80px",
                        }}
                      />
                    </div>

                    <div
                      className="text-[0.62rem] font-semibold uppercase tracking-[0.18em] mb-1"
                      style={{ color: "var(--gold)" }}
                    >
                      {weekInfo.title}
                    </div>
                    <div className="font-serif text-[1.2rem] font-semibold text-text mb-2">
                      {weekInfo.subtitle}
                    </div>
                    <p
                      className="text-[0.88rem] italic mx-auto max-w-[260px] leading-relaxed"
                      style={{ color: "var(--text-muted)" }}
                    >
                      &ldquo;{weekInfo.epigraph}&rdquo;
                    </p>

                    {/* Bottom ornament */}
                    <div className="flex items-center justify-center gap-3 mt-5">
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: "linear-gradient(to right, transparent, var(--border))",
                          maxWidth: "40px",
                        }}
                      />
                      <div
                        className="w-1 h-1 rounded-full"
                        style={{ background: "var(--border-strong)" }}
                      />
                      <div
                        className="flex-1 h-px"
                        style={{
                          background: "linear-gradient(to left, transparent, var(--border))",
                          maxWidth: "40px",
                        }}
                      />
                    </div>
                  </div>
                )}

                {/* ─── Day entry with thread ─── */}
                <AnimatedDayCard delay={weekLocalIdx * 55}>
                  <div
                    className={`relative pl-10 pb-4 border-l-[1.5px] ml-2.5 ${day.day_number === 30 ? "border-l-transparent" : ""}`}
                    style={{ borderColor: threadColor }}
                    id={isCurrent ? "current-day" : undefined}
                  >
                    {/* Thread dot */}
                    <div
                      className={`absolute -left-[10px] top-[18px] w-[19px] h-[19px] rounded-full flex items-center justify-center transition-all ${
                        isCompleted
                          ? "shadow-sm"
                          : isCurrent
                            ? "shadow-[0_0_0_4px_rgba(91,123,94,0.12)]"
                            : ""
                      }`}
                      style={{
                        background: isCompleted
                          ? isMilestone ? "var(--gold)" : "var(--sage)"
                          : isCurrent
                            ? "white"
                            : "var(--cream)",
                        border: isCompleted
                          ? "none"
                          : isCurrent
                            ? "2px solid var(--sage)"
                            : "1.5px solid var(--border-strong)",
                      }}
                    >
                      {isCompleted && (
                        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={3} className="w-2.5 h-2.5">
                          <path d="M5 12l5 5L19 7" />
                        </svg>
                      )}
                      {isCurrent && (
                        <div className="w-[7px] h-[7px] rounded-full" style={{ background: "var(--sage)" }} />
                      )}
                    </div>

                    {/* Card content */}
                    {isCurrent ? (
                      /* ═══ CURRENT DAY — primary action card ═══ */
                      <Link href={`/days/${day.day_number}`} className="block no-underline">
                        <div
                          className="card-shimmer rounded-2xl p-6 transition-all duration-300 hover:-translate-y-[2px]"
                          style={{
                            background: "white",
                            border: "2px solid rgba(91,123,94,0.22)",
                            boxShadow: "0 4px 28px rgba(91,123,94,0.10), 0 1px 4px rgba(0,0,0,0.04)",
                          }}
                        >
                          {/* Top meta row */}
                          <div className="flex items-center gap-2 mb-4">
                            <span
                              className={`text-[0.62rem] font-semibold uppercase tracking-[0.1em] px-2 py-0.5 rounded-full ${categoryColor}`}
                            >
                              {day.category}
                            </span>
                            <span
                              className="text-[0.62rem] font-medium"
                              style={{ color: "var(--text-muted)", opacity: 0.5 }}
                            >
                              Day {day.day_number}
                            </span>
                          </div>

                          <h3 className="font-serif text-[1.15rem] font-semibold text-text mb-1.5 leading-snug">
                            {day.title}
                          </h3>
                          <p
                            className="text-[0.9rem] leading-relaxed mb-3"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {day.subtitle}
                          </p>

                          {day.quote && (
                            <p
                              className="font-serif text-[0.82rem] italic line-clamp-1 mb-5"
                              style={{ color: "var(--text-muted)", opacity: 0.65 }}
                            >
                              &ldquo;{day.quote}&rdquo;
                            </p>
                          )}

                          {/* CTA button */}
                          <span
                            className="inline-flex items-center gap-2 px-5 py-2.5 text-white text-[0.85rem] font-semibold rounded-xl transition-all"
                            style={{ background: "var(--sage)" }}
                          >
                            {isStarted ? `Continue Day ${day.day_number}` : `Begin Day ${day.day_number}`}
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                              <path d="M5 12h14M12 5l7 7-7 7" />
                            </svg>
                          </span>
                        </div>
                      </Link>

                    ) : isCompleted ? (
                      /* ═══ COMPLETED DAY ═══ */
                      <Link href={`/days/${day.day_number}`} className="group block no-underline">
                        <div
                          className="rounded-xl px-5 py-4 transition-all duration-250 group-hover:-translate-y-[1px]"
                          style={{
                            background: "white",
                            borderLeft: `3px solid ${isMilestone ? "var(--gold)" : "rgba(91,123,94,0.35)"}`,
                            border: "1px solid var(--border)",
                            borderLeftWidth: "3px",
                            borderLeftColor: isMilestone ? "var(--gold)" : "rgba(91,123,94,0.35)",
                            boxShadow: "0 1px 6px rgba(0,0,0,0.03)",
                          }}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-1 min-w-0">
                              {/* Meta */}
                              <div className="flex items-center gap-2 mb-1">
                                <span className={`text-[0.6rem] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full ${categoryColor}`}>
                                  {day.category}
                                </span>
                                <span
                                  className="text-[0.6rem] font-medium"
                                  style={{ color: "var(--text-muted)", opacity: 0.4 }}
                                >
                                  Day {day.day_number}
                                </span>
                              </div>

                              <h3
                                className="font-serif text-[0.98rem] font-semibold text-text transition-colors group-hover:text-sage"
                              >
                                {day.title}
                              </h3>

                              {/* Quote peek */}
                              {day.quote && !journalSnippet && (
                                <p
                                  className="font-serif text-[0.76rem] italic line-clamp-1 mt-1"
                                  style={{ color: "var(--text-muted)", opacity: 0.55 }}
                                >
                                  &ldquo;{day.quote}&rdquo;
                                </p>
                              )}

                              {/* Journal snippet */}
                              {journalSnippet && (
                                <div
                                  className="mt-2 pt-2"
                                  style={{ borderTop: "1px solid var(--border)" }}
                                >
                                  <p
                                    className="font-serif text-[0.78rem] italic line-clamp-2 leading-relaxed"
                                    style={{ color: "var(--text-muted)", opacity: 0.8 }}
                                  >
                                    {journalSnippet}
                                  </p>
                                </div>
                              )}

                            </div>

                            {/* Checkmark badge */}
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                              style={{ background: "rgba(91,123,94,0.1)" }}
                            >
                              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3 text-sage">
                                <path d="M5 12l5 5L19 7" />
                              </svg>
                            </div>
                          </div>

                          {/* Milestone message */}
                          {isMilestone && (
                            <div
                              className="mt-3 pt-3 flex items-center gap-2 text-[0.78rem] italic"
                              style={{
                                color: "var(--gold)",
                                borderTop: "1px solid rgba(196,162,101,0.2)",
                              }}
                            >
                              <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 shrink-0">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              {MILESTONES[day.day_number]}
                            </div>
                          )}
                        </div>
                      </Link>

                    ) : (
                      /* ═══ FUTURE DAY — unwritten pages ═══ */
                      <Link href={`/days/${day.day_number}`} className="group block no-underline">
                        <div
                          className="rounded-xl px-5 py-3.5 transition-all duration-250 group-hover:opacity-60"
                          style={{
                            background: "rgba(245,240,234,0.5)",
                            border: "1px dashed var(--border)",
                            opacity: 0.4,
                          }}
                        >
                          <div className="flex items-center gap-2 mb-0.5">
                            <span
                              className={`text-[0.58rem] font-semibold uppercase tracking-[0.08em] px-1.5 py-0.5 rounded-full opacity-70 ${categoryColor}`}
                            >
                              {day.category}
                            </span>
                            <span
                              className="text-[0.58rem]"
                              style={{ color: "var(--text-muted)", opacity: 0.35 }}
                            >
                              Day {day.day_number}
                            </span>
                          </div>
                          <h3
                            className="font-serif text-[0.95rem] leading-snug"
                            style={{ color: "var(--text-muted)" }}
                          >
                            {day.title}
                          </h3>
                        </div>
                      </Link>
                    )}
                  </div>
                </AnimatedDayCard>
              </div>
            );
          })}
        </div>

        {/* End of journal mark */}
        <div className="text-center mt-12 mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px flex-1" style={{ background: "var(--border)", maxWidth: "60px" }} />
            <div className="w-1 h-1 rounded-full" style={{ background: "var(--border-strong)" }} />
            <div className="h-px flex-1" style={{ background: "var(--border)", maxWidth: "60px" }} />
          </div>
          <p className="text-[0.8rem] italic" style={{ color: "var(--text-muted)", opacity: 0.5 }}>
            {completedCount === 30
              ? "The end of this chapter. Not the end of the story."
              : "Your story continues, one day at a time."}
          </p>
        </div>
      </div>

      <ScrollToCurrentDay />
    </div>
  );
}
