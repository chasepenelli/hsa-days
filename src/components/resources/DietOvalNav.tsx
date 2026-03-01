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
      className="sticky top-[64px] z-10"
      style={{
        background: "#EDE8E0",
        borderTop: "1px solid var(--border-strong)",
        borderBottom: "1px solid var(--border-strong)",
      }}
    >
      <style>{`.diet-oval-scroll::-webkit-scrollbar { display: none; }`}</style>

      <div className="py-5 px-6">
        {/* "JUMP TO SECTION" header */}
        <div className="flex items-center gap-3 justify-center mb-4">
          <div style={{ flex: 1, height: 1, background: "var(--border-strong)", maxWidth: 60 }} />
          <span
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.14em",
              color: "var(--text-muted)",
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            JUMP TO SECTION
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border-strong)", maxWidth: 60 }} />
        </div>

        {/* Scrollable pill row */}
        <div
          className="diet-oval-scroll overflow-x-auto"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="flex items-start gap-4 min-w-max mx-auto px-2 justify-center">
            {categories.map((item) => {
              const isActive = activeCategory === item.key;
              const rgb = accentRGB(item.accentColor);

              return (
                <button
                  key={item.key}
                  onClick={() => onCategoryClick(item.key)}
                  aria-label={item.label}
                  className="group flex flex-col items-center gap-1.5 flex-shrink-0"
                  style={{
                    cursor: "pointer",
                    background: "none",
                    border: "none",
                    padding: 0,
                  }}
                >
                  {/* Oval frame */}
                  <div
                    style={{
                      width: 56,
                      height: 76,
                      borderRadius: "50%",
                      overflow: "hidden",
                      border: isActive
                        ? `2px solid ${item.accentColor}`
                        : "1.5px solid rgba(0,0,0,0.12)",
                      background: isActive
                        ? `rgba(${rgb},0.1)`
                        : "rgba(250,248,245,0.9)",
                      transition: "all 0.2s",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={`/illustrations/food/${item.icon}`}
                      alt=""
                      fill
                      style={{
                        objectFit: "cover",
                        opacity: isActive ? 0.65 : 0.5,
                        transition: "opacity 0.2s",
                      }}
                      sizes="56px"
                    />
                  </div>

                  {/* Label below oval */}
                  <span
                    style={{
                      fontSize: "0.58rem",
                      fontWeight: 600,
                      color: isActive ? item.accentColor : "var(--text-muted)",
                      textAlign: "center",
                      lineHeight: 1.3,
                      maxWidth: 64,
                      transition: "color 0.2s",
                    }}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
