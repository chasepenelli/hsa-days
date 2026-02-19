import { CardFrame } from "./CardFrame";
import {
  CARD_COLORS,
  CARD_FONTS,
  CARD_SIZES,
  type CardSize,
  type ShareCardData,
} from "../card-styles";

interface MemoryCardProps {
  data: ShareCardData;
  size: CardSize;
}

/**
 * Full-bleed photo background card with text overlay.
 * If no photo is available, falls back to a gradient.
 */
export function MemoryCard({ data, size }: MemoryCardProps) {
  const { width, height } = CARD_SIZES[size];
  const isSquare = size === "instagram";
  const brandBarHeight = isSquare ? 80 : 52;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        fontFamily: CARD_FONTS.sans,
        color: CARD_COLORS.white,
      }}
    >
      {/* Photo background or gradient fallback */}
      {data.photoUrl ? (
        <img
          src={data.photoUrl}
          alt=""
          crossOrigin="anonymous"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: `linear-gradient(155deg, ${CARD_COLORS.sageDark} 0%, ${CARD_COLORS.sage} 60%, ${CARD_COLORS.gold} 100%)`,
          }}
        />
      )}

      {/* Dark gradient overlay from bottom */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.25) 55%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* Text overlay */}
      <div
        style={{
          position: "absolute",
          bottom: brandBarHeight + (isSquare ? 36 : 20),
          left: isSquare ? 48 : 32,
          right: isSquare ? 48 : 32,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: CARD_FONTS.sans,
            fontSize: isSquare ? 14 : 11,
            fontWeight: 600,
            textTransform: "uppercase" as const,
            letterSpacing: "0.14em",
            color: "rgba(255,255,255,0.7)",
          }}
        >
          Day {data.dayNumber} of 30
        </span>

        <h2
          style={{
            fontFamily: CARD_FONTS.serif,
            fontSize: isSquare ? 36 : 24,
            fontWeight: 600,
            lineHeight: 1.25,
            margin: "8px 0 0 0",
            color: CARD_COLORS.white,
            textShadow: "0 2px 12px rgba(0,0,0,0.3)",
          }}
        >
          {data.title}
        </h2>

        {data.dogName && (
          <p
            style={{
              fontFamily: CARD_FONTS.serif,
              fontStyle: "italic",
              fontSize: isSquare ? 20 : 15,
              color: "rgba(255,255,255,0.85)",
              margin: "8px 0 0 0",
              textShadow: "0 1px 8px rgba(0,0,0,0.3)",
            }}
          >
            For {data.dogName}
          </p>
        )}
      </div>

      {/* HSA Days watermark bottom-right */}
      <div
        style={{
          position: "absolute",
          bottom: brandBarHeight + (isSquare ? 44 : 24),
          right: isSquare ? 48 : 32,
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontFamily: CARD_FONTS.serif,
            fontSize: isSquare ? 16 : 12,
            color: "rgba(255,255,255,0.45)",
            fontWeight: 600,
          }}
        >
          HSA Days
        </span>
      </div>

      {/* Brand bar (inline instead of CardFrame since we have a full-bleed photo) */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: brandBarHeight,
          background: "rgba(62,87,64,0.92)",
          backdropFilter: "blur(8px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: isSquare ? "0 40px" : "0 28px",
          zIndex: 3,
        }}
      >
        <span
          style={{
            fontFamily: CARD_FONTS.serif,
            fontSize: isSquare ? 22 : 16,
            fontWeight: 600,
            color: CARD_COLORS.white,
            letterSpacing: "0.02em",
          }}
        >
          HSA Days
        </span>
        <span
          style={{
            fontFamily: CARD_FONTS.sans,
            fontSize: isSquare ? 15 : 12,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: "0.03em",
          }}
        >
          hsadays.com
        </span>
      </div>
    </div>
  );
}
