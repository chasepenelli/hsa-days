"use client";

export type CommunityTab = "forum" | "stories";

interface CommunityTabsProps {
  activeTab: CommunityTab;
  onTabChange: (tab: CommunityTab) => void;
}

const TABS: { key: CommunityTab; label: string }[] = [
  { key: "forum", label: "Forum" },
  { key: "stories", label: "Stories" },
];

export function CommunityTabs({ activeTab, onTabChange }: CommunityTabsProps) {
  return (
    <div
      className="sticky top-[72px] z-30 backdrop-blur-md"
      style={{
        background: "rgba(245, 240, 234, 0.85)",
        borderBottom: "1px solid var(--border)",
      }}
    >
      <div className="max-w-[700px] mx-auto px-6 py-2.5">
        <div
          className="flex items-center gap-1.5 rounded-full p-1"
          style={{ background: "rgba(245, 240, 234, 0.6)" }}
        >
          {TABS.map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`
                  flex-1 px-5 py-2 rounded-full text-sm font-semibold
                  transition-all duration-200 cursor-pointer
                  ${isActive ? "text-white shadow-sm" : "hover:bg-white/50"}
                `}
                style={{
                  background: isActive ? "var(--sage)" : "transparent",
                  color: isActive ? "white" : "var(--text-muted)",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
