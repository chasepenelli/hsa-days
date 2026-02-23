"use client";

import { useState } from "react";
import type { Task } from "./KanbanBoard";

interface TaskModalProps {
  task: Task | null;
  onSave: (data: Partial<Task>) => void;
  onDelete?: () => void;
  onClose: () => void;
}

const STATUS_OPTIONS = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
];

const CATEGORY_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "remotion", label: "Remotion" },
  { value: "content", label: "Content" },
  { value: "infrastructure", label: "Infrastructure" },
  { value: "security", label: "Security" },
];

const PRIORITY_OPTIONS = [
  { value: "critical", label: "Critical" },
  { value: "high", label: "High" },
  { value: "medium", label: "Medium" },
  { value: "low", label: "Low" },
];

export function TaskModal({ task, onSave, onDelete, onClose }: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "backlog");
  const [category, setCategory] = useState(task?.category || "website");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);

  const isEditing = !!task;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave({ title: title.trim(), description: description.trim() || null, status, category, priority });
    setSaving(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30" />

      {/* Modal */}
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6 space-y-4"
      >
        <h2 className="font-serif text-lg font-semibold text-text">
          {isEditing ? "Edit Task" : "New Task"}
        </h2>

        {/* Title */}
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
            Title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title..."
            required
            className="w-full px-3 py-2 text-sm text-text bg-cream/50 border border-border rounded-lg focus:outline-none focus:border-sage transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
            Description
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Optional details..."
            rows={3}
            className="w-full px-3 py-2 text-sm text-text bg-cream/50 border border-border rounded-lg focus:outline-none focus:border-sage transition-colors resize-none"
          />
        </div>

        {/* Status / Category / Priority row */}
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
              Status
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-2 py-2 text-sm text-text bg-cream/50 border border-border rounded-lg focus:outline-none focus:border-sage cursor-pointer"
            >
              {STATUS_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-2 py-2 text-sm text-text bg-cream/50 border border-border rounded-lg focus:outline-none focus:border-sage cursor-pointer"
            >
              {CATEGORY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-text-muted uppercase tracking-wider mb-1">
              Priority
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="w-full px-2 py-2 text-sm text-text bg-cream/50 border border-border rounded-lg focus:outline-none focus:border-sage cursor-pointer"
            >
              {PRIORITY_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Timestamps (edit mode only) */}
        {isEditing && task && (
          <div className="text-[0.65rem] text-text-muted/60 pt-1">
            Created {new Date(task.created_at).toLocaleDateString()} &middot;
            Updated {new Date(task.updated_at).toLocaleDateString()}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-2 pt-2">
          <button
            type="submit"
            disabled={saving || !title.trim()}
            className="px-5 py-2 bg-sage text-white text-sm font-medium rounded-lg border-none cursor-pointer hover:bg-sage-dark transition-colors disabled:opacity-50"
          >
            {saving ? "Saving..." : isEditing ? "Save" : "Create"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-white text-text-muted text-sm font-medium rounded-lg border border-border cursor-pointer hover:bg-cream transition-colors"
          >
            Cancel
          </button>

          {/* Delete (edit mode only) */}
          {isEditing && onDelete && (
            <div className="ml-auto">
              {confirmDelete ? (
                <div className="flex items-center gap-2">
                  <span className="text-xs text-red-600">Delete?</span>
                  <button
                    type="button"
                    onClick={onDelete}
                    className="px-3 py-1.5 bg-red-600 text-white text-xs font-medium rounded-lg border-none cursor-pointer hover:bg-red-700 transition-colors"
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setConfirmDelete(false)}
                    className="px-3 py-1.5 bg-white text-text-muted text-xs font-medium rounded-lg border border-border cursor-pointer hover:bg-cream transition-colors"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmDelete(true)}
                  className="px-3 py-1.5 text-terracotta text-xs font-medium rounded-lg border border-terracotta/30 cursor-pointer hover:bg-terracotta/5 transition-colors bg-white"
                >
                  Delete
                </button>
              )}
            </div>
          )}
        </div>
      </form>
    </div>
  );
}
