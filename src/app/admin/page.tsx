import { createClient } from "@/lib/supabase/server";
import { StoryModeration } from "./StoryModeration";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const oneWeekAgo = new Date(
    Date.now() - 7 * 24 * 60 * 60 * 1000
  ).toISOString();

  // Fetch all stats in parallel
  const [
    { count: totalSignups },
    { count: recentSignups },
    { data: recentSubscribers },
    { count: totalJournalEntries },
    { count: recentJournalEntries },
    { data: allProgress },
    { data: pendingStories },
    { data: recentActiveRows },
  ] = await Promise.all([
    supabase
      .from("subscribers")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("subscribers")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneWeekAgo),
    supabase
      .from("subscribers")
      .select("id, name, email, dog_name, signup_source, current_day, created_at")
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("journal_entries")
      .select("*", { count: "exact", head: true }),
    supabase
      .from("journal_entries")
      .select("*", { count: "exact", head: true })
      .gte("created_at", oneWeekAgo),
    supabase
      .from("user_day_progress")
      .select("subscriber_id, day_number, completed_at"),
    supabase
      .from("community_stories")
      .select("id, dog_name, dog_breed, story_text, created_at")
      .eq("is_approved", false)
      .order("created_at", { ascending: true }),
    supabase
      .from("user_day_progress")
      .select("subscriber_id")
      .gte("started_at", oneWeekAgo),
  ]);

  // Calculate active users (distinct subscribers with progress in last 7 days)
  const activeUsers = new Set(
    (recentActiveRows || []).map((r) => r.subscriber_id)
  ).size;

  // Calculate completion stats
  const completedByUser = new Map<string, number>();
  (allProgress || []).forEach((p) => {
    if (p.completed_at) {
      completedByUser.set(
        p.subscriber_id,
        (completedByUser.get(p.subscriber_id) || 0) + 1
      );
    }
  });
  const usersWithAnyProgress = new Set(
    (allProgress || []).map((p) => p.subscriber_id)
  ).size;
  const usersCompleted30 = Array.from(completedByUser.values()).filter(
    (c) => c >= 30
  ).length;

  // Progress distribution — group by day ranges
  const dayBuckets = [
    { label: "Day 1–5", min: 1, max: 5, count: 0 },
    { label: "Day 6–10", min: 6, max: 10, count: 0 },
    { label: "Day 11–15", min: 11, max: 15, count: 0 },
    { label: "Day 16–20", min: 16, max: 20, count: 0 },
    { label: "Day 21–25", min: 21, max: 25, count: 0 },
    { label: "Day 26–30", min: 26, max: 30, count: 0 },
  ];

  // Find each user's max completed day
  const maxDayByUser = new Map<string, number>();
  (allProgress || []).forEach((p) => {
    if (p.completed_at) {
      const current = maxDayByUser.get(p.subscriber_id) || 0;
      if (p.day_number > current) {
        maxDayByUser.set(p.subscriber_id, p.day_number);
      }
    }
  });
  maxDayByUser.forEach((maxDay) => {
    const bucket = dayBuckets.find((b) => maxDay >= b.min && maxDay <= b.max);
    if (bucket) bucket.count++;
  });
  const maxBucketCount = Math.max(...dayBuckets.map((b) => b.count), 1);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-text mb-1">
        Dashboard
      </h1>
      <p className="text-sm text-text-muted mb-8">
        Overview of HSA Days activity
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        <StatCard
          label="Total Signups"
          value={totalSignups ?? 0}
          detail={`+${recentSignups ?? 0} this week`}
        />
        <StatCard
          label="Active This Week"
          value={activeUsers}
          detail={`of ${usersWithAnyProgress} total`}
        />
        <StatCard
          label="Completed Journey"
          value={usersCompleted30}
          detail={
            usersWithAnyProgress > 0
              ? `${Math.round((usersCompleted30 / usersWithAnyProgress) * 100)}% of active`
              : "—"
          }
        />
        <StatCard
          label="Stories Pending"
          value={pendingStories?.length ?? 0}
          detail="awaiting review"
          highlight={!!pendingStories?.length}
        />
      </div>

      {/* Progress distribution */}
      <section className="mb-10">
        <h2 className="font-serif text-lg font-semibold text-text mb-4">
          User Progress
        </h2>
        <div className="bg-white border border-border rounded-xl p-5 space-y-3">
          {dayBuckets.map((bucket) => (
            <div key={bucket.label} className="flex items-center gap-3">
              <span className="text-sm text-text-muted w-24 shrink-0">
                {bucket.label}
              </span>
              <div className="flex-1 h-6 bg-cream rounded-md overflow-hidden">
                <div
                  className="h-full bg-sage/70 rounded-md transition-all"
                  style={{
                    width: `${(bucket.count / maxBucketCount) * 100}%`,
                    minWidth: bucket.count > 0 ? "2rem" : "0",
                  }}
                />
              </div>
              <span className="text-sm font-medium text-text w-8 text-right">
                {bucket.count}
              </span>
            </div>
          ))}
          {usersWithAnyProgress === 0 && (
            <p className="text-sm text-text-muted italic">
              No user progress yet.
            </p>
          )}
        </div>
      </section>

      {/* Journal activity */}
      <section className="mb-10">
        <h2 className="font-serif text-lg font-semibold text-text mb-4">
          Journal Activity
        </h2>
        <div className="bg-white border border-border rounded-xl p-5 flex gap-8">
          <div>
            <div className="text-2xl font-semibold text-text">
              {totalJournalEntries ?? 0}
            </div>
            <div className="text-sm text-text-muted">total entries</div>
          </div>
          <div>
            <div className="text-2xl font-semibold text-sage">
              {recentJournalEntries ?? 0}
            </div>
            <div className="text-sm text-text-muted">this week</div>
          </div>
        </div>
      </section>

      {/* Story moderation */}
      <section className="mb-10">
        <h2 className="font-serif text-lg font-semibold text-text mb-4">
          Community Stories{" "}
          {(pendingStories?.length ?? 0) > 0 && (
            <span className="text-sm font-normal text-gold-text">
              ({pendingStories?.length} pending)
            </span>
          )}
        </h2>
        <StoryModeration stories={pendingStories || []} />
      </section>

      {/* Recent signups table */}
      <section>
        <h2 className="font-serif text-lg font-semibold text-text mb-4">
          Recent Signups
        </h2>
        <div className="bg-white border border-border rounded-xl overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-semibold text-text-muted">
                  Name
                </th>
                <th className="px-4 py-3 font-semibold text-text-muted">
                  Email
                </th>
                <th className="px-4 py-3 font-semibold text-text-muted hidden md:table-cell">
                  Dog
                </th>
                <th className="px-4 py-3 font-semibold text-text-muted hidden lg:table-cell">
                  Source
                </th>
                <th className="px-4 py-3 font-semibold text-text-muted text-center">
                  Day
                </th>
                <th className="px-4 py-3 font-semibold text-text-muted hidden md:table-cell">
                  Joined
                </th>
              </tr>
            </thead>
            <tbody>
              {(recentSubscribers || []).map((sub) => (
                <tr
                  key={sub.id}
                  className="border-b border-border/50 last:border-0"
                >
                  <td className="px-4 py-3 text-text">
                    {sub.name || "—"}
                  </td>
                  <td className="px-4 py-3 text-text-muted">{sub.email}</td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    {sub.dog_name || "—"}
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden lg:table-cell">
                    {sub.signup_source}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-md text-xs font-medium ${
                        sub.current_day >= 30
                          ? "bg-sage/10 text-sage"
                          : sub.current_day > 0
                            ? "bg-gold/10 text-gold-text"
                            : "bg-border text-text-muted"
                      }`}
                    >
                      {sub.current_day || 0}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {(!recentSubscribers || recentSubscribers.length === 0) && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-text-muted italic"
                  >
                    No subscribers yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  detail,
  highlight,
}: {
  label: string;
  value: number;
  detail: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`bg-white border rounded-xl p-5 ${
        highlight ? "border-gold/40" : "border-border"
      }`}
    >
      <div className="text-[0.7rem] uppercase tracking-[0.08em] text-text-muted font-semibold mb-1">
        {label}
      </div>
      <div className="text-3xl font-semibold text-text">{value}</div>
      <div className="text-[0.8rem] text-text-muted mt-1">{detail}</div>
    </div>
  );
}
