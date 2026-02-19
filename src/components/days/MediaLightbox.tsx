"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { MediaItem } from "./MediaUpload";

interface MediaLightboxProps {
  media: MediaItem[];
  initialIndex: number;
  onClose: () => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
}

export function MediaLightbox({
  media,
  initialIndex,
  onClose,
  onDelete,
}: MediaLightboxProps) {
  const [index, setIndex]   = useState(initialIndex);
  const dialogRef           = useRef<HTMLDialogElement>(null);
  const touchStartX         = useRef<number | null>(null);

  const item = media[index];

  const goNext = useCallback(() => {
    if (index < media.length - 1) setIndex(index + 1);
  }, [index, media.length]);

  const goPrev = useCallback(() => {
    if (index > 0) setIndex(index - 1);
  }, [index]);

  // Open dialog on mount
  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
    }
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape")      onClose();
      if (e.key === "ArrowRight")  goNext();
      if (e.key === "ArrowLeft")   goPrev();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goNext, goPrev]);

  // Prevent body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(diff) > 60) {
      if (diff > 0) goPrev();
      else goNext();
    }
    touchStartX.current = null;
  };

  if (!item) return null;

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose}
      className="fixed inset-0 w-full h-full max-w-none max-h-none m-0 p-0 border-none z-50 backdrop:bg-transparent"
      style={{ background: "rgba(20,18,15,0.97)" }}
    >
      <div
        className="w-full h-full flex flex-col"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top bar */}
        <div
          className="flex items-center justify-between px-5 py-4 shrink-0"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}
        >
          {/* Counter */}
          <div className="flex items-center gap-2">
            {media.length > 1 && (
              <div className="flex gap-1">
                {media.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className="border-none cursor-pointer transition-all rounded-full p-0"
                    style={{
                      width: i === index ? "18px" : "6px",
                      height: "6px",
                      background: i === index
                        ? "rgba(196,162,101,0.9)"
                        : "rgba(255,255,255,0.25)",
                    }}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            )}
            <span
              className="text-[0.75rem] font-medium"
              style={{ color: "rgba(255,255,255,0.4)" }}
            >
              {index + 1} / {media.length}
            </span>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button
              onClick={(e) => onDelete(item.id, e)}
              className="flex items-center justify-center border-none cursor-pointer transition-colors rounded-lg"
              style={{
                padding: "8px",
                background: "transparent",
                color: "rgba(255,255,255,0.35)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(212,133,106,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.35)";
              }}
              aria-label="Delete this memory"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-5 h-5">
                <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
              </svg>
            </button>
            <button
              onClick={onClose}
              className="flex items-center justify-center border-none cursor-pointer transition-colors rounded-lg"
              style={{
                padding: "8px",
                background: "transparent",
                color: "rgba(255,255,255,0.5)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,0.5)";
              }}
              aria-label="Close"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-5 h-5">
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Media content */}
        <div className="flex-1 flex items-center justify-center px-4 min-h-0 relative">
          {item.file_type === "video" ? (
            <video
              src={item.url || undefined}
              controls
              playsInline
              autoPlay
              className="max-w-full max-h-full rounded-xl"
            />
          ) : (
            <img
              src={item.url || undefined}
              alt={item.file_name}
              className="max-w-full max-h-full object-contain rounded-xl"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.4)" }}
            />
          )}

          {/* Side navigation — desktop */}
          {media.length > 1 && (
            <>
              <button
                onClick={goPrev}
                disabled={index === 0}
                className="absolute left-4 flex items-center justify-center border-none cursor-pointer transition-all disabled:opacity-0 disabled:cursor-default rounded-full hidden md:flex"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                }}
                aria-label="Previous"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={goNext}
                disabled={index === media.length - 1}
                className="absolute right-4 flex items-center justify-center border-none cursor-pointer transition-all disabled:opacity-0 disabled:cursor-default rounded-full hidden md:flex"
                style={{
                  width: "44px",
                  height: "44px",
                  background: "rgba(255,255,255,0.08)",
                  color: "white",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.15)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.08)";
                }}
                aria-label="Next"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {/* Bottom navigation — mobile */}
        {media.length > 1 && (
          <div
            className="flex items-center justify-center gap-4 px-5 py-4 shrink-0 md:hidden"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <button
              onClick={goPrev}
              disabled={index === 0}
              className="flex items-center justify-center border-none cursor-pointer transition-all disabled:opacity-20 rounded-full"
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(255,255,255,0.08)",
                color: "white",
              }}
              aria-label="Previous"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              onClick={goNext}
              disabled={index === media.length - 1}
              className="flex items-center justify-center border-none cursor-pointer transition-all disabled:opacity-20 rounded-full"
              style={{
                width: "44px",
                height: "44px",
                background: "rgba(255,255,255,0.08)",
                color: "white",
              }}
              aria-label="Next"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} className="w-5 h-5">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
