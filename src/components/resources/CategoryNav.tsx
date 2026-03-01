"use client";

interface CategoryNavProps {
  categories: { key: string; label: string; accentColor: string }[];
  activeCategory: string;
  onCategoryClick: (key: string) => void;
}

export default function CategoryNav({
  categories,
  activeCategory,
  onCategoryClick,
}: CategoryNavProps) {
  return (
    <nav
      className="sticky top-[72px] z-10 -mx-6 px-4 sm:px-6 py-2.5 mb-8 overflow-x-auto scrollbar-hide"
      style={{
        background: "rgba(250,248,245,0.96)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid var(--border)",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {/* gap-1.5 and smaller font keep 10 pills from overflowing on mid-size screens */}
      <div className="flex gap-1.5 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onCategoryClick(cat.key)}
              className="whitespace-nowrap transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1"
              style={{
                padding: "6px 14px",
                borderRadius: 999,
                fontSize: "0.76rem",
                fontWeight: isActive ? 600 : 500,
                background: isActive ? cat.accentColor : "white",
                color: isActive ? "white" : "var(--text-muted)",
                border: isActive
                  ? `1.5px solid ${cat.accentColor}`
                  : "1.5px solid var(--border)",
                boxShadow: isActive
                  ? "0 2px 8px rgba(0,0,0,0.08)"
                  : "none",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = cat.accentColor;
                  (e.currentTarget as HTMLButtonElement).style.borderColor = cat.accentColor;
                  (e.currentTarget as HTMLButtonElement).style.borderWidth = "1.5px";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--text-muted)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                }
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
