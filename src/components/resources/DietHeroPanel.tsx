import Image from "next/image";

export default function DietHeroPanel() {
  return (
    <div
      className="relative flex-shrink-0 order-last md:order-first"
      style={{
        background: "#EDE8E0",
        borderRadius: 16,
        padding: "2rem",
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        borderLeft: "3px solid rgba(91,123,94,0.25)",
      }}
    >
      {/* Organic cluster of oval food frames */}
      <div className="relative" style={{ height: 240 }}>
        {/* Oval 1 — fish, top-left, slight tilt */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "8%",
            width: 76,
            height: 104,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(91,123,94,0.35)",
            background: "#F5F0EA",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            transform: "rotate(-6deg)",
          }}
        >
          <Image
            src="/illustrations/food/fish.png"
            alt="Fish illustration"
            fill
            style={{ objectFit: "cover", opacity: 0.72 }}
            sizes="76px"
          />
        </div>

        {/* Oval 2 — warm-bowl, center-right, larger hero oval */}
        <div
          style={{
            position: "absolute",
            top: "15%",
            right: "6%",
            width: 88,
            height: 120,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(91,123,94,0.35)",
            background: "#F5F0EA",
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            transform: "rotate(3deg)",
          }}
        >
          <Image
            src="/illustrations/food/warm-bowl.png"
            alt="Warm bowl illustration"
            fill
            style={{ objectFit: "cover", opacity: 0.72 }}
            sizes="88px"
          />
        </div>

        {/* Oval 3 — broccoli, bottom-left, slight tilt other way */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "22%",
            width: 72,
            height: 96,
            borderRadius: "50%",
            overflow: "hidden",
            border: "1.5px solid rgba(91,123,94,0.35)",
            background: "#F5F0EA",
            boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
            transform: "rotate(4deg)",
          }}
        >
          <Image
            src="/illustrations/food/broccoli.png"
            alt="Broccoli illustration"
            fill
            style={{ objectFit: "cover", opacity: 0.72 }}
            sizes="72px"
          />
        </div>
      </div>

      {/* Caption */}
      <div className="mt-4 text-center">
        <span
          style={{
            fontSize: "0.62rem",
            fontWeight: 600,
            letterSpacing: "0.14em",
            color: "var(--sage)",
            textTransform: "uppercase",
          }}
        >
          Illustrated Guide
        </span>
      </div>
    </div>
  );
}
