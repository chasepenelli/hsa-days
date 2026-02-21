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
      className="sticky top-[72px] z-10 -mx-6 px-6 py-3 mb-8 overflow-x-auto scrollbar-hide"
      style={{
        background: "rgba(250,248,245,0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="flex gap-2 min-w-max">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;
          return (
            <button
              key={cat.key}
              type="button"
              onClick={() => onCategoryClick(cat.key)}
              className="px-4 py-2 rounded-full text-[0.82rem] font-medium whitespace-nowrap transition-all duration-200 cursor-pointer"
              style={{
                background: isActive ? cat.accentColor : "white",
                color: isActive ? "white" : "var(--text-muted)",
                border: isActive
                  ? `1.5px solid ${cat.accentColor}`
                  : "1.5px solid var(--border)",
                boxShadow: isActive
                  ? "0 2px 8px rgba(0,0,0,0.08)"
                  : "none",
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
