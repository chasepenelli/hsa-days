import { createClient } from "@/lib/supabase/server";

function escapeCsvField(value: string | null | undefined): string {
  if (value == null) return "";
  const str = String(value);
  if (str.includes(",") || str.includes('"') || str.includes("\n")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

export async function GET() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("social_media_chronicle")
    .select("*")
    .order("post_date", { ascending: false });

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  const headers = [
    "Platform",
    "Date",
    "Type",
    "Title",
    "Caption",
    "URL",
    "Likes",
    "Comments",
    "Shares",
    "Hashtags",
  ];

  const rows = (data || []).map((row) => {
    const date = row.post_date
      ? new Date(row.post_date).toISOString().split("T")[0]
      : "";
    const caption = row.caption_text
      ? row.caption_text.substring(0, 300)
      : "";
    const hashtags = row.hashtags ? row.hashtags.join(", ") : "";

    return [
      row.platform,
      date,
      row.post_type || "",
      row.title || "",
      caption,
      row.post_url || "",
      String(row.likes_count || 0),
      String(row.comments_count || 0),
      String(row.shares_count || 0),
      hashtags,
    ]
      .map(escapeCsvField)
      .join(",");
  });

  const csv = [headers.join(","), ...rows].join("\n");

  return new Response(csv, {
    headers: {
      "Content-Type": "text/csv",
      "Content-Disposition":
        'attachment; filename="hsa-social-chronicle.csv"',
    },
  });
}
