"use client";

import Image from "next/image";

interface OvalNavItem {
  key: string;
  label: string;
  accentColor: string;
  icon: string;
}

interface DietOvalNavProps {
  categories: OvalNavItem[];
  activeCategory: string;
  onCategoryClick: (key: string) => void;
}

function accentRGB(accentColor: string): string {
  if (accentColor.includes("sage")) return "91,123,94";
  if (accentColor.includes("gold")) return "196,162,101";
  return "212,133,106"; // terracotta
}

export default function DietOvalNav({
  categories,
  activeCategory,
  onCategoryClick,
}: DietOvalNavProps) {
  return (
    <div
      className="sticky top-[72px] z-10 -mx-6 px-4 sm:px-6 py-3 mb-8 overflow-x-auto scrollbar-hide"
      style={{
        background: "rgba(250,248,245,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        scrollbarWidth: "none",
      }}
    >
      <style>{`.diet-oval-nav::-webkit-scrollbar { display: none; }`}</style>
      <div className="diet-oval-nav flex items-center gap-3 min-w-max">
        {categories.map((item) => {
          const isActive = activeCategory === item.key;
          const rgb = accentRGB(item.accentColor);

          return (
            <button
              key={item.key}
              onClick={() => onCategoryClick(item.key)}
              aria-label={item.label}
              className="group flex-shrink-0 relative"
              style={{
                width: 72,
                height: 96,
                borderRadius: "50%",
                background: isActive
                  ? `rgba(${rgb},0.12)`
                  : "rgba(250,248,245,0.9)",
                border: isActive
                  ? `2px solid ${item.accentColor}`
                  : "1.5px solid rgba(0,0,0,0.1)",
                overflow: "hidden",
                cursor: "pointer",
                padding: 0,
                transition: "transform 0.2s, border-color 0.2s, background 0.2s",
              }}
            >
              {/* Background illustration */}
              <Image
                src={`/illustrations/food/${item.icon}`}
                alt=""
                fill
                style={{
                  objectFit: "cover",
                  opacity: isActive ? 0.38 : 0.28,
                  transition: "opacity 0.2s",
                }}
                sizes="72px"
              />

              {/* Text overlay */}
              <span
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  fontSize: "0.6rem",
                  fontWeight: 600,
                  textAlign: "center",
                  lineHeight: 1.3,
                  padding: "10px 8px",
                  color: isActive ? item.accentColor : "var(--text)",
                  position: "relative",
                  zIndex: 1,
                }}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
