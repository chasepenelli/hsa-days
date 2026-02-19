import { CardFrame } from "./CardFrame";
import {
  CARD_COLORS,
  CARD_FONTS,
  CARD_SIZES,
  getMilestoneMessage,
  type CardSize,
  type ShareCardData,
} from "../card-styles";

interface MilestoneCardProps {
  data: ShareCardData;
  size: CardSize;
}

export function MilestoneCard({ data, size }: MilestoneCardProps) {
  const { width } = CARD_SIZES[size];
  const isSquare = size === "instagram";
  const milestoneMsg = getMilestoneMessage(data.dayNumber);

  return (
    <CardFrame size={size}>
      {/* Gold-to-sage gradient header */}
      <div
        style={{
          background: `linear-gradient(155deg, ${CARD_COLORS.gold} 0%, ${CARD_COLORS.sage} 100%)`,
          padding: isSquare ? "60px 60px 50px" : "32px 40px 28px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: isSquare ? 16 : 10,
        }}
      >
        {/* Star icon */}
        <svg
          viewBox="0 0 24 24"
          fill="none"
          style={{
            width: isSquare ? 40 : 28,
            height: isSquare ? 40 : 28,
          }}
        >
          <path
            d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            fill="rgba(255,255,255,0.9)"
            stroke="rgba(255,255,255,0.4)"
            strokeWidth={1}
          />
        </svg>

        <span
          style={{
            fontFamily: CARD_FONTS.sans,
            fontSize: isSquare ? 14 : 11,
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.16em",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Day {data.dayNumber} Milestone
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: isSquare ? "40px 64px" : "24px 40px",
          gap: isSquare ? 40 : 24,
          textAlign: "center" as const,
        }}
      >
        {/* Milestone message */}
        {milestoneMsg && (
          <h2
            style={{
              fontFamily: CARD_FONTS.serif,
              fontSize: isSquare ? 36 : 24,
              fontWeight: 600,
              color: CARD_COLORS.sageDark,
              lineHeight: 1.3,
              margin: 0,
            }}
          >
            {milestoneMsg}
          </h2>
        )}

        {/* Dog name personalization */}
        {data.dogName && (
          <p
            style={{
              fontFamily: CARD_FONTS.serif,
              fontStyle: "italic",
              fontSize: isSquare ? 20 : 15,
              color: CARD_COLORS.textMuted,
              margin: 0,
            }}
          >
            For {data.dogName}
          </p>
        )}

        {/* Progress stepping stones */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: isSquare ? 8 : 5,
            flexWrap: "wrap" as const,
            justifyContent: "center",
            maxWidth: isSquare ? 600 : 400,
          }}
        >
          {Array.from({ length: 30 }, (_, i) => {
            const dayNum = i + 1;
            const isFilled = dayNum <= data.dayNumber;
            const isCurrent = dayNum === data.dayNumber;
            const dotSize = isCurrent
              ? isSquare
                ? 16
                : 10
              : isSquare
                ? 10
                : 7;

            return (
              <div
                key={dayNum}
                style={{
                  width: dotSize,
                  height: dotSize,
                  borderRadius: "50%",
                  background: isCurrent
                    ? CARD_COLORS.gold
                    : isFilled
                      ? CARD_COLORS.sage
                      : CARD_COLORS.border,
                  transition: "none",
                  flexShrink: 0,
                }}
              />
            );
          })}
        </div>
      </div>
    </CardFrame>
  );
}
