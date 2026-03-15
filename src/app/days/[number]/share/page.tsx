import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";

interface PageProps {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { number } = await params;
  const dayNum = parseInt(number);

  if (isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
    return { title: "Not Found" };
  }

  const supabase = await createClient();
  const { data: day } = await supabase
    .from("daily_content")
    .select("title")
    .eq("day_number", dayNum)
    .single();

  const title = day
    ? `Day ${dayNum}: ${day.title} — HSA Days`
    : `Day ${dayNum} — HSA Days`;

  const ogImageUrl = `/api/og/day/${dayNum}`;

  return {
    title,
    description:
      "A 30-day companion for dog owners navigating a hemangiosarcoma diagnosis.",
    openGraph: {
      title,
      description:
        "A 30-day companion for dog owners navigating a hemangiosarcoma diagnosis.",
      images: [{ url: ogImageUrl, width: 1200, height: 630 }],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      images: [ogImageUrl],
    },
  };
}

export default async function SharePage({ params }: PageProps) {
  const { number } = await params;
  const dayNum = parseInt(number);

  if (isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
    notFound();
  }

  const supabase = await createClient();
  const { data: day } = await supabase
    .from("daily_content")
    .select("title, category, quote, quote_author")
    .eq("day_number", dayNum)
    .single();

  if (!day) notFound();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  const isLoggedIn = !!user;

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-20"
      style={{ background: "var(--warm-white)" }}
    >
      <div className="max-w-md w-full text-center">
        {/* Day badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
          style={{
            background: "rgba(91,123,94,0.08)",
            color: "var(--sage-dark)",
            fontSize: "0.82rem",
            fontWeight: 600,
          }}
        >
          <span
            className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs"
            style={{ background: "var(--sage)" }}
          >
            &#x2713;
          </span>
          Day {dayNum} of 30
          {day.category && (
            <>
              <span style={{ opacity: 0.3 }}>&middot;</span>
              {day.category}
            </>
          )}
        </div>

        <h1
          className="font-serif text-[clamp(1.5rem,4vw,2rem)] font-semibold leading-tight mb-4"
          style={{ color: "var(--text)" }}
        >
          {day.title}
        </h1>

        {day.quote && (
          <div
            className="rounded-xl px-6 py-5 mb-6 text-left"
            style={{
              background: "var(--cream)",
              borderLeft: "3px solid var(--gold)",
            }}
          >
            <p
              className="font-serif italic text-[0.95rem] leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              &ldquo;{day.quote}&rdquo;
            </p>
            {day.quote_author && (
              <p
                className="mt-3 text-[0.78rem]"
                style={{ color: "var(--text-muted)" }}
              >
                <span style={{ color: "var(--gold)", marginRight: 4 }}>
                  &mdash;
                </span>
                {day.quote_author}
              </p>
            )}
          </div>
        )}

        <p
          className="text-[0.92rem] leading-relaxed mb-8"
          style={{ color: "var(--text-muted)" }}
        >
          HSA Days is a free 30-day companion for dog owners navigating a
          hemangiosarcoma diagnosis. Reflections, journaling, and a community
          that understands.
        </p>

        <Link
          href={isLoggedIn ? `/days/${dayNum}` : "/"}
          className="inline-flex items-center gap-2 px-6 py-3.5 text-white no-underline rounded-2xl text-[0.92rem] font-semibold transition-all"
          style={{
            background: "var(--sage)",
            boxShadow: "0 4px 16px rgba(91,123,94,0.25)",
          }}
        >
          {isLoggedIn ? `Back to Day ${dayNum}` : "Start Your Journey"}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            className="w-4 h-4"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </div>
  );
}
