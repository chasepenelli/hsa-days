"use client";

import { useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

interface MediaUploadProps {
  dayNumber: number;
  onUploadComplete: (media: MediaItem) => void;
}

export interface MediaItem {
  id: string;
  file_path: string;
  file_type: string;
  file_name: string;
  file_size: number;
  url: string | null;
  created_at: string;
}

export function MediaUpload({ dayNumber, onUploadComplete }: MediaUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setProgress(0);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setUploading(false);
      return;
    }

    const totalFiles = files.length;
    let completed = 0;

    for (const file of Array.from(files)) {
      const fileType = file.type.startsWith("video/") ? "video" : "image";
      const ext = file.name.split(".").pop() || "jpg";
      const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const filePath = `${user.id}/${dayNumber}/${uniqueName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("day-memories")
        .upload(filePath, file);

      if (uploadError) {
        console.error("Upload failed:", uploadError.message);
        completed++;
        setProgress(Math.round((completed / totalFiles) * 100));
        continue;
      }

      // Save metadata via API
      const res = await fetch("/api/media", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          day_number: dayNumber,
          file_path: filePath,
          file_type: fileType,
          file_name: file.name,
          file_size: file.size,
        }),
      });

      if (res.ok) {
        const { media } = await res.json();
        onUploadComplete(media);
      }

      completed++;
      setProgress(Math.round((completed / totalFiles) * 100));
    }

    setUploading(false);
    setProgress(0);

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/heic,image/webp,video/mp4,video/quicktime"
        multiple
        capture="environment"
        onChange={handleFileSelect}
        className="hidden"
      />

      {uploading ? (
        <div className="flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-sage rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="text-[0.75rem] text-text-muted whitespace-nowrap">
            Uploading...
          </span>
        </div>
      ) : (
        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 px-4 py-2.5 text-[0.85rem] text-text-muted border border-dashed border-border rounded-lg hover:border-sage hover:text-sage transition-colors cursor-pointer bg-transparent min-h-11"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            className="w-4.5 h-4.5"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
          Add a memory from today
        </button>
      )}
    </div>
  );
}
