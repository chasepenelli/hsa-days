import { ImageResponse } from "@vercel/og";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

// Cache for 1 hour, revalidate in background
export const revalidate = 3600;

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ number: string }> }
) {
  const { number } = await params;
  const dayNum = parseInt(number);

  if (isNaN(dayNum) || dayNum < 1 || dayNum > 30) {
    return new Response("Invalid day number", { status: 400 });
  }

  // Load fonts
  const [loraSemiBold, interRegular] = await Promise.all([
    fetch(new URL("/fonts/Lora-SemiBold.ttf", getBaseUrl())).then((r) =>
      r.arrayBuffer()
    ),
    fetch(new URL("/fonts/Inter-Regular.ttf", getBaseUrl())).then((r) =>
      r.arrayBuffer()
    ),
  ]);

  // Fetch day content — use service role or anon key for public data
  let title = `Day ${dayNum}`;
  let category = "";
  let quote = "";
  let quoteAuthor = "";

  try {
    const supabase = await createClient();
    const { data: day } = await supabase
      .from("daily_content")
      .select("title, category, quote, quote_author")
      .eq("day_number", dayNum)
      .single();

    if (day) {
      title = day.title;
      category = day.category || "";
      quote = day.quote || "";
      quoteAuthor = day.quote_author || "";
    }
  } catch {
    // Fall back to generic data
  }

  // Truncate quote for OG image
  const shortQuote =
    quote.length > 120 ? quote.slice(0, 117) + "..." : quote;

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          fontFamily: "Inter",
          background: "#FAF8F5",
          position: "relative",
        }}
      >
        {/* Header gradient */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            padding: "36px 48px 28px",
            background: "linear-gradient(155deg, #3E5740 0%, #5B7B5E 100%)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              fontSize: 14,
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Day {dayNum} of 30
            {category && (
              <>
                <span style={{ opacity: 0.4 }}>&middot;</span>
                {category}
              </>
            )}
          </div>
          <div
            style={{
              fontFamily: "Lora",
              fontSize: 32,
              fontWeight: 600,
              color: "white",
              lineHeight: 1.2,
              marginTop: 8,
            }}
          >
            {title}
          </div>
        </div>

        {/* Body */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "28px 48px",
          }}
        >
          {shortQuote && (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#F5F0EA",
                borderLeft: "4px solid #C4A265",
                borderRadius: 10,
                padding: "22px 28px",
              }}
            >
              <div
                style={{
                  fontFamily: "Lora",
                  fontStyle: "italic",
                  fontSize: 18,
                  lineHeight: 1.7,
                  color: "#2D2D2D",
                }}
              >
                &ldquo;{shortQuote}&rdquo;
              </div>
              {quoteAuthor && (
                <div
                  style={{
                    fontSize: 13,
                    color: "#6B6B6B",
                    marginTop: 10,
                  }}
                >
                  &mdash; {quoteAuthor}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Brand bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 48px",
            height: 56,
            background: "#3E5740",
          }}
        >
          <div
            style={{
              fontFamily: "Lora",
              fontSize: 18,
              fontWeight: 600,
              color: "white",
            }}
          >
            HSA Days
          </div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            hsadays.com
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Lora", data: loraSemiBold, weight: 600, style: "normal" },
        { name: "Inter", data: interRegular, weight: 400, style: "normal" },
      ],
    }
  );
}

function getBaseUrl(): string {
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  return "http://localhost:3000";
}
