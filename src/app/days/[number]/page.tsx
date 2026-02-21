import { createClient } from "@/lib/supabase/server";
import { notFound, redirect } from "next/navigation";
import { DayContent } from "@/components/days/DayContent";

interface PageProps {
  params: Promise<{ number: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { number } = await params;
  const dayNum = parseInt(number);
  const supabase = await createClient();

  const { data: day } = await supabase
    .from("daily_content")
    .select("title")
    .eq("day_number", dayNum)
    .single();

  return {
    title: day ? `Day ${dayNum}: ${day.title}` : `Day ${dayNum}`,
  };
}

export default async function DayPage({ params }: PageProps) {
  const { number } = await params;
  const dayNum = parseInt(number);

  if (isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ensure subscriber record exists (safety net)
  const { data: subscriber } = await supabase
    .from("subscribers")
    .select("id, dog_name, selected_pills")
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

  // Fetch day content
  const { data: day } = await supabase
    .from("daily_content")
    .select("*")
    .eq("day_number", dayNum)
    .single();

  if (!day) notFound();

  // Fetch user's progress and journal for this day
  const { data: progress } = await supabase
    .from("user_day_progress")
    .select("*")
    .eq("subscriber_id", user.id)
    .eq("day_number", dayNum)
    .single();

  const { data: journalEntries } = await supabase
    .from("journal_entries")
    .select("*")
    .eq("subscriber_id", user.id)
    .eq("day_number", dayNum);

  // Fetch media for this day
  const { data: dayMedia } = await supabase
    .from("day_media")
    .select("*")
    .eq("subscriber_id", user.id)
    .eq("day_number", dayNum)
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  // Generate signed URLs for media
  const mediaWithUrls = await Promise.all(
    (dayMedia || []).map(async (item) => {
      const { data } = await supabase.storage
        .from("day-memories")
        .createSignedUrl(item.file_path, 3600);
      return { ...item, url: data?.signedUrl || null };
    })
  );

  // Mark day as started if not already
  if (!progress) {
    await supabase.from("user_day_progress").insert({
      subscriber_id: user.id,
      day_number: dayNum,
    });
  }

  // Resolve personalized pill illustrations for this day
  let pillDoodle: string | null = null;
  let pillWatermark: string | null = null;

  const userPills = subscriber?.selected_pills as string[] | null;
  if (userPills && userPills.length > 0) {
    const { data: mappings } = await supabase
      .from("day_pill_mapping")
      .select("pill_slug, relevance, placement")
      .eq("day_number", dayNum)
      .in("pill_slug", userPills)
      .order("relevance", { ascending: false });

    if (mappings?.length) {
      for (const m of mappings) {
        const filePath = `/illustrations/pills/${m.pill_slug}.webp`;
        if (m.placement === "doodle" && !pillDoodle) {
          pillDoodle = filePath;
        }
        if (m.placement === "watermark" && !pillWatermark) {
          pillWatermark = filePath;
        }
        if (pillDoodle && pillWatermark) break;
      }
    }
  }

  return (
    <DayContent
      day={day}
      dayNumber={dayNum}
      isCompleted={!!progress?.completed_at}
      journalEntry={journalEntries?.[0]?.entry_text || ""}
      initialMedia={mediaWithUrls}
      dogName={subscriber?.dog_name || undefined}
      pillDoodle={pillDoodle}
      pillWatermark={pillWatermark}
    />
  );
}
