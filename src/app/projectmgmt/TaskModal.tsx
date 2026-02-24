"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { Task } from "./KanbanBoard";

// ── Types ──────────────────────────────────────────────

interface Attachment {
  id: string;
  kind: "attachment" | "readme";
  file_name: string;
  file_type: string | null;
  file_size: number | null;
  url: string | null;
  created_at: string;
}

interface TaskModalProps {
  task: Task | null;
  onSave: (data: Partial<Task>) => void;
  onDelete?: () => void;
  onClose: () => void;
  onAttachmentsChanged?: () => void;
}

// ── Constants ──────────────────────────────────────────

const STATUS_OPTIONS = [
  { value: "backlog", label: "Backlog" },
  { value: "todo", label: "To Do" },
  { value: "in_progress", label: "In Progress" },
  { value: "review", label: "Review" },
  { value: "done", label: "Done" },
];

const CATEGORY_OPTIONS = [
  { value: "website", label: "Website" },
  { value: "frontend", label: "Front End" },
  { value: "ux", label: "UX" },
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

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function isImage(type: string | null): boolean {
  return !!type && type.startsWith("image/");
}

// ── Component ──────────────────────────────────────────

export function TaskModal({
  task,
  onSave,
  onDelete,
  onClose,
  onAttachmentsChanged,
}: TaskModalProps) {
  const [title, setTitle] = useState(task?.title || "");
  const [description, setDescription] = useState(task?.description || "");
  const [status, setStatus] = useState(task?.status || "backlog");
  const [category, setCategory] = useState(task?.category || "website");
  const [priority, setPriority] = useState(task?.priority || "medium");
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [saving, setSaving] = useState(false);

  // Attachments state
  const [attachments, setAttachments] = useState<Attachment[]>([]);
  const [uploading, setUploading] = useState(false);
  const [readmeContent, setReadmeContent] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const readmeInputRef = useRef<HTMLInputElement>(null);

  const isEditing = !!task;

  // Fetch attachments when editing
  useEffect(() => {
    if (!task) return;
    fetchAttachments(task.id);
    if (task.has_readme) fetchReadme(task.id);
  }, [task]);

  const fetchAttachments = async (taskId: string) => {
    const res = await fetch(`/api/projectmgmt/tasks/${taskId}/attachments`);
    if (res.ok) setAttachments(await res.json());
  };

  const fetchReadme = async (taskId: string) => {
    const res = await fetch(`/api/projectmgmt/tasks/${taskId}/readme`);
    if (res.ok) {
      const data = await res.json();
      setReadmeContent(data.content);
    }
  };

  // Upload a file attachment
  const handleFileUpload = useCallback(
    async (files: FileList | null, kind: "attachment" | "readme") => {
      if (!files || files.length === 0 || !task) return;
      setUploading(true);

      for (const file of Array.from(files)) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("kind", kind);

        const res = await fetch(
          `/api/projectmgmt/tasks/${task.id}/attachments`,
          { method: "POST", body: formData }
        );

        if (res.ok) {
          const newAtt = await res.json();
          if (kind === "readme") {
            // Replace existing readme in list
            setAttachments((prev) => [
              ...prev.filter((a) => a.kind !== "readme"),
              newAtt,
            ]);
            // Fetch the content
            fetchReadme(task.id);
          } else {
            setAttachments((prev) => [...prev, newAtt]);
          }
          onAttachmentsChanged?.();
        }
      }

      setUploading(false);
      // Reset file inputs
      if (fileInputRef.current) fileInputRef.current.value = "";
      if (readmeInputRef.current) readmeInputRef.current.value = "";
    },
    [task, onAttachmentsChanged]
  );

  // Delete an attachment
  const handleDeleteAttachment = async (att: Attachment) => {
    if (!task) return;
    const res = await fetch(
      `/api/projectmgmt/tasks/${task.id}/attachments/${att.id}`,
      { method: "DELETE" }
    );
    if (res.ok) {
      setAttachments((prev) => prev.filter((a) => a.id !== att.id));
      if (att.kind === "readme") setReadmeContent(null);
      onAttachmentsChanged?.();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    setSaving(true);
    await onSave({
      title: title.trim(),
      description: description.trim() || null,
      status,
      category,
      priority,
    });
    setSaving(false);
  };

  const fileAttachments = attachments.filter((a) => a.kind === "attachment");
  const readmeAttachment = attachments.find((a) => a.kind === "readme");

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/30" />

      <div
        onClick={(e) => e.stopPropagation()}
        className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto"
      >
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
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

          {/* Status / Category / Priority */}
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
                  <option key={o.value} value={o.value}>{o.label}</option>
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
                  <option key={o.value} value={o.value}>{o.label}</option>
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
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
          </div>

          {/* ── Attachments section (edit mode only) ──────── */}
          {isEditing && (
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  Attachments
                </label>
                <label className="px-3 py-1 text-xs font-medium text-sage bg-sage/10 rounded-lg cursor-pointer hover:bg-sage/20 transition-colors">
                  {uploading ? "Uploading..." : "+ Upload"}
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="image/*,.pdf,.zip,.sketch,.fig"
                    className="hidden"
                    disabled={uploading}
                    onChange={(e) =>
                      handleFileUpload(e.target.files, "attachment")
                    }
                  />
                </label>
              </div>

              {fileAttachments.length === 0 && (
                <p className="text-xs text-text-muted/60 italic">
                  No attachments yet
                </p>
              )}

              <div className="space-y-2">
                {fileAttachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center gap-2 bg-cream/40 rounded-lg px-3 py-2"
                  >
                    {/* Thumbnail or icon */}
                    {isImage(att.file_type) && att.url ? (
                      <img
                        src={att.url}
                        alt={att.file_name}
                        className="w-10 h-10 rounded object-cover shrink-0"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded bg-border/50 flex items-center justify-center shrink-0">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          className="text-text-muted"
                        >
                          <path
                            d="M4 1h5.5L13 4.5V14a1 1 0 01-1 1H4a1 1 0 01-1-1V2a1 1 0 011-1z"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                          <path
                            d="M9 1v4h4"
                            stroke="currentColor"
                            strokeWidth="1.2"
                          />
                        </svg>
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <a
                        href={att.url || "#"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-medium text-text hover:text-sage truncate block"
                      >
                        {att.file_name}
                      </a>
                      {att.file_size && (
                        <span className="text-[0.6rem] text-text-muted/60">
                          {formatBytes(att.file_size)}
                        </span>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDeleteAttachment(att)}
                      className="text-text-muted/40 hover:text-red-500 transition-colors shrink-0 cursor-pointer bg-transparent border-none p-1"
                      title="Remove"
                    >
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path
                          d="M3.5 3.5l7 7M10.5 3.5l-7 7"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── README section (edit mode only) ──────────── */}
          {isEditing && (
            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wider">
                  README
                </label>
                <div className="flex items-center gap-2">
                  {readmeAttachment && (
                    <button
                      type="button"
                      onClick={() => handleDeleteAttachment(readmeAttachment)}
                      className="text-[0.65rem] text-terracotta hover:text-terracotta/80 cursor-pointer bg-transparent border-none"
                    >
                      Remove
                    </button>
                  )}
                  <label className="px-3 py-1 text-xs font-medium text-sage bg-sage/10 rounded-lg cursor-pointer hover:bg-sage/20 transition-colors">
                    {readmeAttachment ? "Replace .md" : "Upload .md"}
                    <input
                      ref={readmeInputRef}
                      type="file"
                      accept=".md,.markdown,text/markdown"
                      className="hidden"
                      disabled={uploading}
                      onChange={(e) =>
                        handleFileUpload(e.target.files, "readme")
                      }
                    />
                  </label>
                </div>
              </div>

              {readmeContent ? (
                <div className="bg-cream/40 rounded-lg px-4 py-3 max-h-60 overflow-y-auto">
                  <div
                    className="prose prose-sm max-w-none text-text
                      [&_h1]:font-serif [&_h1]:text-base [&_h1]:font-semibold [&_h1]:mt-3 [&_h1]:mb-1
                      [&_h2]:font-serif [&_h2]:text-sm [&_h2]:font-semibold [&_h2]:mt-2 [&_h2]:mb-1
                      [&_h3]:text-xs [&_h3]:font-semibold [&_h3]:mt-2 [&_h3]:mb-1
                      [&_p]:text-xs [&_p]:leading-relaxed [&_p]:my-1
                      [&_ul]:text-xs [&_ul]:my-1 [&_ul]:pl-4
                      [&_ol]:text-xs [&_ol]:my-1 [&_ol]:pl-4
                      [&_li]:my-0.5
                      [&_code]:text-[0.65rem] [&_code]:bg-cream-deep [&_code]:px-1 [&_code]:rounded
                      [&_pre]:text-[0.65rem] [&_pre]:bg-cream-deep [&_pre]:p-2 [&_pre]:rounded-lg [&_pre]:overflow-x-auto
                      [&_a]:text-sage [&_a]:underline
                      [&_strong]:font-semibold
                      [&_hr]:border-border [&_hr]:my-2"
                    dangerouslySetInnerHTML={{
                      __html: simpleMarkdown(readmeContent),
                    }}
                  />
                </div>
              ) : (
                <p className="text-xs text-text-muted/60 italic">
                  No README uploaded
                </p>
              )}
            </div>
          )}

          {/* Timestamps */}
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
    </div>
  );
}

// ── Simple markdown → HTML (no external deps) ──────────

function simpleMarkdown(md: string): string {
  let html = md
    // Escape HTML
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks (``` ... ```)
  html = html.replace(
    /```(\w*)\n([\s\S]*?)```/g,
    (_m, _lang, code) => `<pre><code>${code.trim()}</code></pre>`
  );

  // Inline code
  html = html.replace(/`([^`]+)`/g, "<code>$1</code>");

  // Headers
  html = html.replace(/^### (.+)$/gm, "<h3>$1</h3>");
  html = html.replace(/^## (.+)$/gm, "<h2>$1</h2>");
  html = html.replace(/^# (.+)$/gm, "<h1>$1</h1>");

  // Bold and italic
  html = html.replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>");
  html = html.replace(/\*(.+?)\*/g, "<em>$1</em>");

  // Links
  html = html.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
  );

  // Horizontal rules
  html = html.replace(/^---$/gm, "<hr>");

  // Unordered lists
  html = html.replace(/^- (.+)$/gm, "<li>$1</li>");
  html = html.replace(/(<li>.*<\/li>\n?)+/g, (match) => `<ul>${match}</ul>`);

  // Paragraphs (lines not already wrapped in tags)
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (/^<(h[1-3]|ul|ol|li|pre|hr|blockquote)/.test(trimmed)) return trimmed;
      return `<p>${trimmed.replace(/\n/g, "<br>")}</p>`;
    })
    .join("\n");

  return html;
}
