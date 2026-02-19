"use client";

import { useState } from "react";
import { MediaLightbox } from "./MediaLightbox";
import type { MediaItem } from "./MediaUpload";

interface MediaGalleryProps {
  media: MediaItem[];
  onDelete: (id: string) => void;
}

export function MediaGallery({ media, onDelete }: MediaGalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [deleting, setDeleting] = useState<string | null>(null);

  if (media.length === 0) return null;

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setDeleting(id);

    try {
      const res = await fetch(`/api/media?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        onDelete(id);
        if (lightboxIndex !== null && media[lightboxIndex]?.id === id) {
          setLightboxIndex(null);
        }
      }
    } catch (err) {
      console.error("Failed to delete:", err);
    } finally {
      setDeleting(null);
    }
  };

  return (
    <>
      <div
        className="grid gap-2"
        style={{
          gridTemplateColumns: media.length === 1
            ? "1fr"
            : media.length === 2
              ? "1fr 1fr"
              : "1fr 1fr 1fr",
        }}
      >
        {media.map((item, index) => (
          <div
            key={item.id}
            role="button"
            tabIndex={0}
            onClick={() => setLightboxIndex(index)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setLightboxIndex(index);
              }
            }}
            className="relative overflow-hidden cursor-pointer group"
            style={{
              aspectRatio: media.length === 1 ? "16/9" : "1/1",
              borderRadius: "10px",
              background: "var(--cream)",
              border: "1px solid var(--border)",
            }}
          >
            {/* Media */}
            {item.file_type === "video" ? (
              <>
                <video
                  src={item.url || undefined}
                  className="w-full h-full object-cover"
                  muted
                  playsInline
                  preload="metadata"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                    style={{ background: "rgba(255,255,255,0.88)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 ml-0.5" style={{ color: "var(--sage)" }}>
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </>
            ) : (
              <img
                src={item.url || undefined}
                alt={item.file_name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                loading="lazy"
              />
            )}

            {/* Hover overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              style={{ background: "rgba(0,0,0,0.15)" }}
            />

            {/* Delete button */}
            <div className="absolute top-2 right-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
              <button
                onClick={(e) => handleDelete(item.id, e)}
                disabled={deleting === item.id}
                className="flex items-center justify-center cursor-pointer border-none transition-colors"
                style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(255,255,255,0.92)",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.12)",
                }}
                aria-label="Remove memory"
              >
                {deleting === item.id ? (
                  <span
                    className="w-3 h-3 border-2 border-current/30 border-t-current rounded-full animate-spin"
                    style={{ color: "var(--text-muted)" }}
                  />
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3 h-3" style={{ color: "var(--terracotta)" }}>
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {lightboxIndex !== null && (
        <MediaLightbox
          media={media}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onDelete={handleDelete}
        />
      )}
    </>
  );
}
