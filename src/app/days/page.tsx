import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { ScrollToCurrentDay } from "@/components/days/ScrollToCurrentDay";
import { DaysTimelineClient } from "@/components/days/DaysTimelineClient";

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

  // Build progress map as a plain object for serialization
  const progressMap: Record<number, DayProgress> = {};
  progress?.forEach((p: DayProgress) => {
    progressMap[p.day_number] = p;
  });

  // Build journal snippet map (100 chars)
  const journalMap: Record<number, string> = {};
  journalEntries?.forEach(
    (j: { day_number: number; entry_text: string }) => {
      if (j.entry_text && j.entry_text.length > 10) {
        const snippet =
          j.entry_text.length > 100
            ? j.entry_text.slice(0, 100).trim() + "\u2026"
            : j.entry_text;
        if (!journalMap[j.day_number]) {
          journalMap[j.day_number] = snippet;
        }
      }
    }
  );

  const completedCount =
    progress?.filter((p: DayProgress) => p.completed_at).length ?? 0;

  // Find the current day: first day not completed
  const currentDay =
    (days as DayContent[] | null)?.find(
      (d) => !progressMap[d.day_number]?.completed_at
    )?.day_number ?? 31;

  const currentDayContent = (days as DayContent[] | null)?.find(
    (d) => d.day_number === currentDay
  );

  // Progress percentage for arc fill
  const progressPct = Math.round((completedCount / 30) * 100);

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
                const isCompleted = !!progressMap[day]?.completed_at;
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
      <DaysTimelineClient
        days={(days as DayContent[]) ?? []}
        progressMap={progressMap}
        journalMap={journalMap}
        completedCount={completedCount}
        currentDay={currentDay}
      />

      <ScrollToCurrentDay />
    </div>
  );
}
