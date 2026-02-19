import { CardFrame } from "./CardFrame";
import {
  CARD_COLORS,
  CARD_FONTS,
  CARD_SIZES,
  type CardSize,
  type ShareCardData,
} from "../card-styles";

interface QuoteOnlyCardProps {
  data: ShareCardData;
  size: CardSize;
}

export function QuoteOnlyCard({ data, size }: QuoteOnlyCardProps) {
  const isSquare = size === "instagram";

  return (
    <CardFrame size={size}>
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isSquare ? "80px 72px" : "40px 56px",
          background: CARD_COLORS.cream,
          position: "relative",
        }}
      >
        {/* Large decorative opening quote mark */}
        <div
          style={{
            fontFamily: CARD_FONTS.serif,
            fontSize: isSquare ? 140 : 90,
            lineHeight: 1,
            color: CARD_COLORS.gold,
            opacity: 0.18,
            position: "absolute",
            top: isSquare ? 50 : 20,
            left: isSquare ? 56 : 40,
            userSelect: "none",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          &ldquo;
        </div>

        {/* Quote text */}
        <p
          style={{
            fontFamily: CARD_FONTS.serif,
            fontSize: isSquare ? 30 : 21,
            fontWeight: 400,
            lineHeight: 1.65,
            color: CARD_COLORS.text,
            textAlign: "center" as const,
            margin: 0,
            position: "relative",
            zIndex: 1,
            maxWidth: isSquare ? 800 : 520,
          }}
        >
          &ldquo;{data.quote}&rdquo;
        </p>

        {/* Author */}
        {data.quoteAuthor && (
          <p
            style={{
              fontFamily: CARD_FONTS.sans,
              fontSize: isSquare ? 16 : 12,
              color: CARD_COLORS.textMuted,
              marginTop: isSquare ? 28 : 16,
              marginBottom: 0,
              position: "relative",
              zIndex: 1,
            }}
          >
            <span style={{ color: CARD_COLORS.gold, marginRight: 6 }}>
              &mdash;
            </span>
            {data.quoteAuthor}
          </p>
        )}

        {/* Footer info */}
        <div
          style={{
            position: "absolute",
            bottom: isSquare ? 28 : 16,
            display: "flex",
            alignItems: "center",
            gap: isSquare ? 16 : 10,
            fontFamily: CARD_FONTS.sans,
            fontSize: isSquare ? 13 : 10,
            color: CARD_COLORS.textMuted,
            opacity: 0.6,
          }}
        >
          <span>Day {data.dayNumber}</span>
          {data.category && (
            <>
              <span>&middot;</span>
              <span>{data.category}</span>
            </>
          )}
        </div>
      </div>
    </CardFrame>
  );
}
