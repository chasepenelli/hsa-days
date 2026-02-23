"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { TaskModal } from "./TaskModal";

// ── Types ──────────────────────────────────────────────

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: string;
  category: string;
  priority: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
}

// ── Constants ──────────────────────────────────────────

const COLUMNS = [
  { id: "backlog", label: "Backlog", accent: "border-l-[var(--border-strong)]" },
  { id: "todo", label: "To Do", accent: "border-l-[var(--gold)]" },
  { id: "in_progress", label: "In Progress", accent: "border-l-[var(--sage)]" },
  { id: "review", label: "Review", accent: "border-l-[var(--terracotta)]" },
  { id: "done", label: "Done", accent: "border-l-[var(--sage-dark)]" },
] as const;

const CATEGORIES = [
  { id: "website", label: "Website", bg: "bg-sage/10", text: "text-sage-dark" },
  { id: "remotion", label: "Remotion", bg: "bg-gold/10", text: "text-[#8B7640]" },
  { id: "content", label: "Content", bg: "bg-terracotta/10", text: "text-[#A05A40]" },
  { id: "infrastructure", label: "Infra", bg: "bg-cream-deep", text: "text-text-muted" },
  { id: "security", label: "Security", bg: "bg-red-50", text: "text-red-700" },
] as const;

const PRIORITY_STYLES: Record<string, string> = {
  critical: "bg-red-500 animate-pulse",
  high: "bg-orange-400",
  medium: "bg-[var(--gold)]",
  low: "bg-[var(--border-strong)]",
};

// ── Main Component ─────────────────────────────────────

export function KanbanBoard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<string | null>(null);
  const [mobileColumn, setMobileColumn] = useState("todo");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/projectmgmt/tasks");
      if (res.ok) setTasks(await res.json());
    } finally {
      setLoading(false);
    }
  };

  const filteredTasks = activeFilter
    ? tasks.filter((t) => t.category === activeFilter)
    : tasks;

  const tasksByColumn = COLUMNS.map((col) => ({
    ...col,
    tasks: filteredTasks
      .filter((t) => t.status === col.id)
      .sort((a, b) => a.sort_order - b.sort_order),
  }));

  // ── Drag and Drop ─────────────────────────────────

  const handleDragStart = useCallback((e: React.DragEvent, taskId: string) => {
    e.dataTransfer.setData("text/plain", taskId);
    e.dataTransfer.effectAllowed = "move";
    setDraggedId(taskId);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, columnId: string) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTarget(columnId);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDropTarget(null);
  }, []);

  const handleDrop = useCallback(
    async (e: React.DragEvent, newStatus: string) => {
      e.preventDefault();
      setDropTarget(null);
      setDraggedId(null);

      const taskId = e.dataTransfer.getData("text/plain");
      const task = tasks.find((t) => t.id === taskId);
      if (!task || task.status === newStatus) return;

      // Optimistic update
      const updated = tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      setTasks(updated);

      // Recompute sort_order for destination column
      const destTasks = updated
        .filter((t) => t.status === newStatus)
        .sort((a, b) => a.sort_order - b.sort_order);

      const updates = destTasks.map((t, i) => ({
        id: t.id,
        status: newStatus,
        sort_order: i,
      }));

      await fetch("/api/projectmgmt/tasks/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
    },
    [tasks]
  );

  const handleDragEnd = useCallback(() => {
    setDraggedId(null);
    setDropTarget(null);
  }, []);

  // ── Status change (mobile fallback) ───────────────

  const handleStatusChange = useCallback(
    async (taskId: string, newStatus: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task || task.status === newStatus) return;

      const updated = tasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      );
      setTasks(updated);

      const destTasks = updated
        .filter((t) => t.status === newStatus)
        .sort((a, b) => a.sort_order - b.sort_order);

      const updates = destTasks.map((t, i) => ({
        id: t.id,
        status: newStatus,
        sort_order: i,
      }));

      await fetch("/api/projectmgmt/tasks/reorder", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });
    },
    [tasks]
  );

  // ── CRUD handlers ─────────────────────────────────

  const handleSave = async (data: Partial<Task>) => {
    if (editingTask) {
      const res = await fetch(`/api/projectmgmt/tasks/${editingTask.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const saved = await res.json();
        setTasks((prev) => prev.map((t) => (t.id === saved.id ? saved : t)));
      }
    } else {
      const res = await fetch("/api/projectmgmt/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        const created = await res.json();
        setTasks((prev) => [...prev, created]);
      }
    }
    setModalOpen(false);
    setEditingTask(null);
  };

  const handleDelete = async (taskId: string) => {
    const res = await fetch(`/api/projectmgmt/tasks/${taskId}`, {
      method: "DELETE",
    });
    if (res.ok) {
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
    }
    setModalOpen(false);
    setEditingTask(null);
  };

  const openEdit = (task: Task) => {
    setEditingTask(task);
    setModalOpen(true);
  };

  const openNew = () => {
    setEditingTask(null);
    setModalOpen(true);
  };

  // ── Counts for mobile tabs ────────────────────────

  const columnCounts = Object.fromEntries(
    COLUMNS.map((col) => [
      col.id,
      filteredTasks.filter((t) => t.status === col.id).length,
    ])
  );

  // ── Render ────────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-text-muted text-sm">Loading board...</div>
      </div>
    );
  }

  return (
    <div>
      {/* Filter bar + Add button */}
      <div className="flex flex-wrap items-center gap-2 mb-5">
        <button
          onClick={() => setActiveFilter(null)}
          className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
            activeFilter === null
              ? "bg-sage text-white border-sage"
              : "bg-white text-text-muted border-border hover:border-sage"
          }`}
        >
          All ({tasks.length})
        </button>
        {CATEGORIES.map((cat) => {
          const count = tasks.filter((t) => t.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() =>
                setActiveFilter(activeFilter === cat.id ? null : cat.id)
              }
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors cursor-pointer ${
                activeFilter === cat.id
                  ? "bg-sage text-white border-sage"
                  : "bg-white text-text-muted border-border hover:border-sage"
              }`}
            >
              {cat.label} ({count})
            </button>
          );
        })}
        <div className="flex-1" />
        <button
          onClick={openNew}
          className="px-4 py-1.5 bg-sage text-white text-sm font-medium rounded-lg border-none cursor-pointer hover:bg-sage-dark transition-colors"
        >
          + Add Task
        </button>
      </div>

      {/* Mobile column tabs (visible < lg) */}
      <div className="flex gap-1 mb-4 overflow-x-auto lg:hidden">
        {COLUMNS.map((col) => (
          <button
            key={col.id}
            onClick={() => setMobileColumn(col.id)}
            className={`px-3 py-2 text-xs font-medium rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
              mobileColumn === col.id
                ? "bg-sage text-white"
                : "bg-white text-text-muted border border-border"
            }`}
          >
            {col.label}
            <span className="ml-1 opacity-70">{columnCounts[col.id]}</span>
          </button>
        ))}
      </div>

      {/* Desktop columns (hidden < lg) */}
      <div className="hidden lg:flex gap-4 items-start overflow-x-auto pb-4">
        {tasksByColumn.map((col) => (
          <KanbanColumn
            key={col.id}
            column={col}
            draggedId={draggedId}
            dropTarget={dropTarget}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onDragEnd={handleDragEnd}
            onEdit={openEdit}
            onStatusChange={handleStatusChange}
            isMobile={false}
          />
        ))}
      </div>

      {/* Mobile single column (visible < lg) */}
      <div className="lg:hidden">
        {tasksByColumn
          .filter((col) => col.id === mobileColumn)
          .map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              draggedId={draggedId}
              dropTarget={dropTarget}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onDragEnd={handleDragEnd}
              onEdit={openEdit}
              onStatusChange={handleStatusChange}
              isMobile={true}
            />
          ))}
      </div>

      {/* Task modal */}
      {modalOpen && (
        <TaskModal
          task={editingTask}
          onSave={handleSave}
          onDelete={editingTask ? () => handleDelete(editingTask.id) : undefined}
          onClose={() => {
            setModalOpen(false);
            setEditingTask(null);
          }}
        />
      )}
    </div>
  );
}

// ── KanbanColumn ───────────────────────────────────────

interface KanbanColumnProps {
  column: {
    id: string;
    label: string;
    accent: string;
    tasks: Task[];
  };
  draggedId: string | null;
  dropTarget: string | null;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent, columnId: string) => void;
  onDragLeave: () => void;
  onDrop: (e: React.DragEvent, columnId: string) => void;
  onDragEnd: () => void;
  onEdit: (task: Task) => void;
  onStatusChange: (taskId: string, newStatus: string) => void;
  isMobile: boolean;
}

function KanbanColumn({
  column,
  draggedId,
  dropTarget,
  onDragStart,
  onDragOver,
  onDragLeave,
  onDrop,
  onDragEnd,
  onEdit,
  onStatusChange,
  isMobile,
}: KanbanColumnProps) {
  const isOver = dropTarget === column.id;
  const isDoneCol = column.id === "done";
  const [collapsed, setCollapsed] = useState(isDoneCol && !isMobile);

  return (
    <div
      className={`${
        isMobile ? "w-full" : "min-w-[260px] flex-1 max-w-[320px]"
      }`}
      onDragOver={(e) => onDragOver(e, column.id)}
      onDragLeave={onDragLeave}
      onDrop={(e) => onDrop(e, column.id)}
    >
      <div
        className={`border rounded-xl ${column.accent} border-l-4 transition-colors ${
          isOver
            ? "border-sage/40 bg-sage/5 border-dashed"
            : "border-border bg-cream/30"
        }`}
      >
        {/* Column header */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-between px-4 py-3 cursor-pointer bg-transparent border-none"
        >
          <span className="font-serif font-semibold text-sm text-text">
            {column.label}
          </span>
          <span className="text-xs text-text-muted bg-white px-2 py-0.5 rounded-md border border-border">
            {column.tasks.length}
          </span>
        </button>

        {/* Cards */}
        {!collapsed && (
          <div className="px-3 pb-3 space-y-2.5 max-h-[65vh] overflow-y-auto">
            {column.tasks.length === 0 && (
              <p className="text-xs text-text-muted italic py-4 text-center">
                No tasks
              </p>
            )}
            {column.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                isDragging={draggedId === task.id}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onEdit={onEdit}
                onStatusChange={onStatusChange}
                isMobile={isMobile}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── TaskCard ───────────────────────────────────────────

interface TaskCardProps {
  task: Task;
  isDragging: boolean;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragEnd: () => void;
  onEdit: (task: Task) => void;
  onStatusChange: (taskId: string, newStatus: string) => void;
  isMobile: boolean;
}

function TaskCard({
  task,
  isDragging,
  onDragStart,
  onDragEnd,
  onEdit,
  onStatusChange,
  isMobile,
}: TaskCardProps) {
  const cat = CATEGORIES.find((c) => c.id === task.category);
  const priorityDot = PRIORITY_STYLES[task.priority] || PRIORITY_STYLES.medium;

  return (
    <div
      draggable={!isMobile}
      onDragStart={(e) => onDragStart(e, task.id)}
      onDragEnd={onDragEnd}
      onClick={() => onEdit(task)}
      className={`bg-white border border-border rounded-xl p-3.5 cursor-pointer hover:border-sage/30 hover:shadow-sm transition-all ${
        isDragging ? "opacity-40 scale-95" : ""
      }`}
    >
      {/* Priority dot + title */}
      <div className="flex items-start gap-2 mb-1.5">
        <span
          className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${priorityDot}`}
        />
        <span className="font-semibold text-sm text-text leading-snug">
          {task.title}
        </span>
      </div>

      {/* Description */}
      {task.description && (
        <p className="text-xs text-text-muted line-clamp-2 ml-4 mb-2 leading-relaxed">
          {task.description}
        </p>
      )}

      {/* Category badge + mobile status buttons */}
      <div className="flex items-center gap-2 ml-4">
        {cat && (
          <span
            className={`${cat.bg} ${cat.text} text-[0.65rem] font-medium px-2 py-0.5 rounded-md`}
          >
            {cat.label}
          </span>
        )}
        <span className="text-[0.6rem] text-text-muted/60 uppercase tracking-wider">
          {task.priority}
        </span>
      </div>

      {/* Mobile: quick status buttons */}
      {isMobile && (
        <div
          className="flex gap-1 mt-2.5 ml-4"
          onClick={(e) => e.stopPropagation()}
        >
          {COLUMNS.filter((c) => c.id !== task.status).map((col) => (
            <button
              key={col.id}
              onClick={() => onStatusChange(task.id, col.id)}
              className="px-2 py-1 text-[0.6rem] font-medium bg-cream text-text-muted rounded border border-border hover:bg-sage/10 hover:text-sage transition-colors cursor-pointer"
            >
              {col.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
