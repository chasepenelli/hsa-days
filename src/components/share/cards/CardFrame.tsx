import {
  CARD_COLORS,
  CARD_FONTS,
  CARD_SIZES,
  PAPER_TEXTURE_URI,
  type CardSize,
} from "../card-styles";

interface CardFrameProps {
  size: CardSize;
  children: React.ReactNode;
}

/**
 * Shared wrapper for all share card templates.
 * Renders at exact pixel dimensions for image capture.
 * Includes paper texture, corner ornaments, and brand bar.
 */
export function CardFrame({ size, children }: CardFrameProps) {
  const { width, height } = CARD_SIZES[size];
  const isSquare = width === height;
  const brandBarHeight = isSquare ? 80 : 52;

  return (
    <div
      style={{
        width,
        height,
        position: "relative",
        overflow: "hidden",
        background: CARD_COLORS.warmWhite,
        fontFamily: CARD_FONTS.sans,
        color: CARD_COLORS.text,
      }}
    >
      {/* Paper texture overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("${PAPER_TEXTURE_URI}")`,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Corner ornaments */}
      <CornerOrnament position="top-left" size={isSquare ? 28 : 20} />
      <CornerOrnament position="top-right" size={isSquare ? 28 : 20} />

      {/* Main content area */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: height - brandBarHeight,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {children}
      </div>

      {/* Bottom brand bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: brandBarHeight,
          background: CARD_COLORS.sageDark,
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

/* ── Corner diamond ornament ─────────────────────────── */

function CornerOrnament({
  position,
  size,
}: {
  position: "top-left" | "top-right";
  size: number;
}) {
  const isLeft = position === "top-left";
  return (
    <div
      style={{
        position: "absolute",
        top: size * 0.6,
        [isLeft ? "left" : "right"]: size * 0.6,
        zIndex: 4,
        display: "flex",
        alignItems: "center",
        gap: size * 0.4,
      }}
    >
      <div
        style={{
          width: isLeft ? size * 1.2 : 0,
          height: 1,
          background: `linear-gradient(to ${isLeft ? "right" : "left"}, transparent, ${CARD_COLORS.borderStrong})`,
        }}
      />
      <div
        style={{
          width: size * 0.3,
          height: size * 0.3,
          background: CARD_COLORS.gold,
          opacity: 0.5,
          transform: "rotate(45deg)",
          flexShrink: 0,
        }}
      />
      <div
        style={{
          width: isLeft ? 0 : size * 1.2,
          height: 1,
          background: `linear-gradient(to ${isLeft ? "right" : "left"}, ${CARD_COLORS.borderStrong}, transparent)`,
        }}
      />
    </div>
  );
}
