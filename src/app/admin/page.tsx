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
    { data: pendingStories },
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
      .select("id, name, email, dog_name, signup_source, created_at")
      .order("created_at", { ascending: false })
      .limit(20),
    supabase
      .from("community_stories")
      .select("id, dog_name, dog_breed, story_text, created_at")
      .eq("is_approved", false)
      .order("created_at", { ascending: true }),
  ]);

  return (
    <div>
      <h1 className="font-serif text-2xl font-semibold text-text mb-1">
        Dashboard
      </h1>
      <p className="text-sm text-text-muted mb-8">
        Overview of HSA Days activity
      </p>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
        <StatCard
          label="Total Signups"
          value={totalSignups ?? 0}
          detail={`+${recentSignups ?? 0} this week`}
        />
        <StatCard
          label="Stories Pending"
          value={pendingStories?.length ?? 0}
          detail="awaiting review"
          highlight={!!pendingStories?.length}
        />
        <StatCard
          label="Recent Signups"
          value={recentSubscribers?.length ?? 0}
          detail="last 20 shown below"
        />
      </div>

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
                  <td className="px-4 py-3 text-text-muted hidden md:table-cell">
                    {new Date(sub.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {(!recentSubscribers || recentSubscribers.length === 0) && (
                <tr>
                  <td
                    colSpan={5}
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
