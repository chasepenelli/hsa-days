import { CardFrame } from "./CardFrame";
import {
  CARD_COLORS,
  CARD_FONTS,
  CARD_SIZES,
  type CardSize,
  type ShareCardData,
} from "../card-styles";

interface DailyCompletionCardProps {
  data: ShareCardData;
  size: CardSize;
  showJournal?: boolean;
}

export function DailyCompletionCard({
  data,
  size,
  showJournal = false,
}: DailyCompletionCardProps) {
  const { width } = CARD_SIZES[size];
  const isSquare = size === "instagram";
  const scale = isSquare ? 1 : 0.7;

  const heading = data.dogName
    ? `${data.dogName}\u2019s Day ${data.dayNumber}`
    : `Day ${data.dayNumber} Complete`;

  return (
    <CardFrame size={size}>
      {/* Header gradient */}
      <div
        style={{
          background: `linear-gradient(155deg, ${CARD_COLORS.sageDark} 0%, ${CARD_COLORS.sage} 100%)`,
          padding: isSquare ? "60px 60px 44px" : "32px 40px 28px",
          display: "flex",
          flexDirection: "column",
          gap: isSquare ? 12 : 8,
        }}
      >
        {/* Category badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span
            style={{
              fontFamily: CARD_FONTS.sans,
              fontSize: 13 * scale,
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.14em",
              color: "rgba(255,255,255,0.6)",
            }}
          >
            Day {data.dayNumber} of 30
          </span>
          {data.category && (
            <>
              <span style={{ color: "rgba(255,255,255,0.3)" }}>&middot;</span>
              <span
                style={{
                  fontFamily: CARD_FONTS.sans,
                  fontSize: 12 * scale,
                  fontWeight: 500,
                  color: "rgba(255,255,255,0.55)",
                  textTransform: "uppercase" as const,
                  letterSpacing: "0.1em",
                }}
              >
                {data.category}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily: CARD_FONTS.serif,
            fontSize: isSquare ? 38 : 26,
            fontWeight: 600,
            color: CARD_COLORS.white,
            lineHeight: 1.2,
            margin: 0,
          }}
        >
          {data.title}
        </h2>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: isSquare ? "44px 60px" : "24px 40px",
          gap: isSquare ? 36 : 20,
        }}
      >
        {/* Personalized heading */}
        <p
          style={{
            fontFamily: CARD_FONTS.serif,
            fontSize: isSquare ? 28 : 20,
            fontWeight: 600,
            color: CARD_COLORS.sageDark,
            textAlign: "center" as const,
            margin: 0,
          }}
        >
          {heading}
        </p>

        {/* Quote block */}
        {data.quote && (
          <div
            style={{
              background: CARD_COLORS.cream,
              borderLeft: `4px solid ${CARD_COLORS.gold}`,
              borderRadius: 12,
              padding: isSquare ? "28px 32px" : "18px 24px",
            }}
          >
            <p
              style={{
                fontFamily: CARD_FONTS.serif,
                fontStyle: "italic",
                fontSize: isSquare ? 20 : 15,
                lineHeight: 1.7,
                color: CARD_COLORS.text,
                margin: 0,
              }}
            >
              &ldquo;{data.quote}&rdquo;
            </p>
            {data.quoteAuthor && (
              <p
                style={{
                  fontFamily: CARD_FONTS.sans,
                  fontSize: isSquare ? 14 : 11,
                  color: CARD_COLORS.textMuted,
                  marginTop: isSquare ? 14 : 8,
                  marginBottom: 0,
                }}
              >
                <span style={{ color: CARD_COLORS.gold, marginRight: 4 }}>
                  &mdash;
                </span>
                {data.quoteAuthor}
              </p>
            )}
          </div>
        )}

        {/* Optional journal excerpt */}
        {showJournal && data.journalExcerpt && (
          <div
            style={{
              borderTop: `1px solid ${CARD_COLORS.border}`,
              paddingTop: isSquare ? 24 : 16,
            }}
          >
            <p
              style={{
                fontFamily: CARD_FONTS.serif,
                fontStyle: "italic",
                fontSize: isSquare ? 17 : 13,
                lineHeight: 1.7,
                color: CARD_COLORS.textMuted,
                margin: 0,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as const,
                overflow: "hidden",
              }}
            >
              {data.journalExcerpt}
            </p>
          </div>
        )}
      </div>

      {/* Completion checkmark */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          paddingBottom: isSquare ? 24 : 12,
        }}
      >
        <div
          style={{
            width: isSquare ? 44 : 32,
            height: isSquare ? 44 : 32,
            borderRadius: "50%",
            background: CARD_COLORS.sage,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: CARD_COLORS.white,
            fontSize: isSquare ? 22 : 16,
          }}
        >
          &#x2713;
        </div>
      </div>
    </CardFrame>
  );
}
