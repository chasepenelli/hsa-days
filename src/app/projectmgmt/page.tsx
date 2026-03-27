import { KanbanBoard } from "./KanbanBoard";

export const metadata = {
  title: "Project Board | HSA Days",
  robots: { index: false, follow: false },
};

export default function ProjectMgmtPage() {
  return (
    <div className="min-h-[100dvh] bg-warm-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="mb-6">
          <h1 className="font-serif text-2xl font-semibold text-text">
            Project Board
          </h1>
          <p className="text-sm text-text-muted mt-1">
            HSA Days development tracker
          </p>
        </div>
        <KanbanBoard />
      </div>
    </div>
  );
}
