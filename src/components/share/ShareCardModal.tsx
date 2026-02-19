"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useCardGenerator } from "./useCardGenerator";
import { useWebShare } from "./useWebShare";
import {
  CARD_SIZES,
  isMilestoneDay,
  type CardSize,
  type CardTemplate,
  type ShareCardData,
} from "./card-styles";
import { DailyCompletionCard } from "./cards/DailyCompletionCard";
import { MilestoneCard } from "./cards/MilestoneCard";
import { QuoteOnlyCard } from "./cards/QuoteOnlyCard";
import { MemoryCard } from "./cards/MemoryCard";

interface ShareCardModalProps {
  open: boolean;
  onClose: () => void;
  data: ShareCardData;
  hasMedia: boolean;
}

const TEMPLATES: { id: CardTemplate; label: string; description: string }[] = [
  { id: "daily", label: "Daily", description: "Completion card" },
  { id: "milestone", label: "Milestone", description: "Celebration" },
  { id: "quote", label: "Quote", description: "Minimalist" },
  { id: "memory", label: "Memory", description: "Photo card" },
];

export function ShareCardModal({
  open,
  onClose,
  data,
  hasMedia,
}: ShareCardModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const isMilestone = isMilestoneDay(data.dayNumber);

  // State
  const [template, setTemplate] = useState<CardTemplate>(
    isMilestone ? "milestone" : "daily"
  );
  const [size, setSize] = useState<CardSize>("instagram");
  const [showJournal, setShowJournal] = useState(false);
  const [dogName, setDogName] = useState(data.dogName || "");
  const [dogNameSaved, setDogNameSaved] = useState(!!data.dogName);
  const [photoUrl, setPhotoUrl] = useState(data.photoUrl || "");

  // Hooks
  const { cardRef, generating, generatePng, generateBlob } = useCardGenerator({
    size,
  });
  const { canShare, sharing, shareBlob, downloadDataUrl } = useWebShare({
    fileName: `hsa-days-day-${data.dayNumber}.png`,
    title: `HSA Days - Day ${data.dayNumber}`,
    text: `Day ${data.dayNumber}: ${data.title}`,
  });

  // Build card data with current dog name / journal toggles
  const cardData: ShareCardData = {
    ...data,
    dogName: dogName || undefined,
    journalExcerpt: showJournal ? data.journalExcerpt : undefined,
    photoUrl: template === "memory" ? photoUrl || data.photoUrl : undefined,
  };

  // Open/close the native dialog
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  // Save dog name to subscribers table
  const saveDogName = useCallback(async () => {
    if (!dogName.trim() || dogNameSaved) return;
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        await supabase
          .from("subscribers")
          .update({ dog_name: dogName.trim() })
          .eq("id", user.id);
        setDogNameSaved(true);
      }
    } catch {
      // Silently fail — dog name is cosmetic
    }
  }, [dogName, dogNameSaved]);

  // Convert user photo blob URL for CORS-safe rendering
  useEffect(() => {
    if (template !== "memory" || !data.photoUrl || photoUrl) return;
    // Pre-fetch as blob to avoid tainted canvas
    fetch(data.photoUrl)
      .then((res) => res.blob())
      .then((blob) => setPhotoUrl(URL.createObjectURL(blob)))
      .catch(() => setPhotoUrl(data.photoUrl || ""));

    return () => {
      if (photoUrl && photoUrl.startsWith("blob:")) {
        URL.revokeObjectURL(photoUrl);
      }
    };
  }, [template, data.photoUrl]);

  // Handlers
  const handleDownload = async () => {
    await saveDogName();
    const dataUrl = await generatePng();
    if (dataUrl) downloadDataUrl(dataUrl);
  };

  const handleShare = async () => {
    await saveDogName();
    const blob = await generateBlob();
    if (blob) await shareBlob(blob);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) onClose();
  };

  // Preview dimensions (scaled down)
  const dims = CARD_SIZES[size];
  const previewScale = Math.min(320 / dims.width, 320 / dims.height);

  // Available templates (filter milestone/memory if not applicable)
  const availableTemplates = TEMPLATES.filter((t) => {
    if (t.id === "milestone" && !isMilestone) return false;
    if (t.id === "memory" && !hasMedia && !data.photoUrl) return false;
    return true;
  });

  const isProcessing = generating || sharing;

  return (
    <dialog
      ref={dialogRef}
      onClick={handleBackdropClick}
      onClose={onClose}
      style={{
        padding: 0,
        border: "none",
        borderRadius: 20,
        background: "var(--warm-white)",
        maxWidth: 480,
        width: "calc(100vw - 32px)",
        maxHeight: "90vh",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.18)",
      }}
    >
      <div
        style={{
          maxHeight: "90vh",
          overflowY: "auto",
          padding: "28px 24px 24px",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <h2
            className="font-serif"
            style={{
              fontSize: "1.2rem",
              fontWeight: 600,
              color: "var(--text)",
              margin: 0,
            }}
          >
            Share This Day
          </h2>
          <button
            onClick={onClose}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: 4,
              color: "var(--text-muted)",
              fontSize: 20,
            }}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>

        {/* Template picker */}
        <div style={{ marginBottom: 20 }}>
          <label
            style={{
              display: "block",
              fontSize: "0.72rem",
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              marginBottom: 8,
            }}
          >
            Template
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {availableTemplates.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                style={{
                  flex: 1,
                  padding: "10px 6px",
                  borderRadius: 10,
                  border:
                    template === t.id
                      ? "2px solid var(--sage)"
                      : "1px solid var(--border)",
                  background:
                    template === t.id
                      ? "rgba(91,123,94,0.06)"
                      : "transparent",
                  cursor: "pointer",
                  textAlign: "center" as const,
                  fontFamily: "var(--font-sans)",
                }}
              >
                <div
                  style={{
                    fontSize: "0.82rem",
                    fontWeight: 600,
                    color:
                      template === t.id
                        ? "var(--sage-dark)"
                        : "var(--text)",
                  }}
                >
                  {t.label}
                </div>
                <div
                  style={{
                    fontSize: "0.68rem",
                    color: "var(--text-muted)",
                    marginTop: 2,
                  }}
                >
                  {t.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Live preview */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: 20,
            background: "var(--cream)",
            borderRadius: 14,
            padding: 16,
            border: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              width: dims.width * previewScale,
              height: dims.height * previewScale,
              overflow: "hidden",
              borderRadius: 8,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                transform: `scale(${previewScale})`,
                transformOrigin: "top left",
              }}
            >
              <CardRenderer
                template={template}
                data={cardData}
                size={size}
                showJournal={showJournal}
              />
            </div>
          </div>
        </div>

        {/* Dog name input */}
        <div style={{ marginBottom: 16 }}>
          <label
            htmlFor="share-dog-name"
            style={{
              display: "block",
              fontSize: "0.72rem",
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              marginBottom: 6,
            }}
          >
            Dog&apos;s Name
          </label>
          <input
            id="share-dog-name"
            type="text"
            value={dogName}
            onChange={(e) => {
              setDogName(e.target.value);
              setDogNameSaved(false);
            }}
            placeholder="Your dog's name (optional)"
            style={{
              width: "100%",
              padding: "10px 14px",
              border: "1px solid var(--border)",
              borderRadius: 10,
              background: "var(--warm-white)",
              fontFamily: "var(--font-sans)",
              fontSize: "0.9rem",
              color: "var(--text)",
              outline: "none",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Journal excerpt toggle */}
        {template === "daily" && data.journalExcerpt && (
          <div
            style={{
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <button
              onClick={() => setShowJournal(!showJournal)}
              role="switch"
              aria-checked={showJournal}
              style={{
                width: 40,
                height: 22,
                borderRadius: 11,
                border: "none",
                background: showJournal
                  ? "var(--sage)"
                  : "var(--border-strong)",
                cursor: "pointer",
                position: "relative",
                padding: 0,
                flexShrink: 0,
                transition: "background 0.2s",
              }}
            >
              <div
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  background: "white",
                  position: "absolute",
                  top: 3,
                  left: showJournal ? 21 : 3,
                  transition: "left 0.2s",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                }}
              />
            </button>
            <span
              style={{
                fontSize: "0.82rem",
                color: "var(--text-muted)",
              }}
            >
              Include journal excerpt
            </span>
          </div>
        )}

        {/* Size toggle */}
        <div style={{ marginBottom: 24 }}>
          <label
            style={{
              display: "block",
              fontSize: "0.72rem",
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.1em",
              color: "var(--text-muted)",
              marginBottom: 8,
            }}
          >
            Size
          </label>
          <div style={{ display: "flex", gap: 8 }}>
            {(Object.keys(CARD_SIZES) as CardSize[]).map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  borderRadius: 8,
                  border:
                    size === s
                      ? "2px solid var(--sage)"
                      : "1px solid var(--border)",
                  background:
                    size === s ? "rgba(91,123,94,0.06)" : "transparent",
                  cursor: "pointer",
                  fontSize: "0.82rem",
                  fontWeight: size === s ? 600 : 400,
                  fontFamily: "var(--font-sans)",
                  color: size === s ? "var(--sage-dark)" : "var(--text)",
                }}
              >
                {CARD_SIZES[s].label}
              </button>
            ))}
          </div>
        </div>

        {/* Action buttons */}
        <div style={{ display: "flex", gap: 10 }}>
          <button
            onClick={handleDownload}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: 14,
              border: "1px solid var(--border)",
              background: "var(--warm-white)",
              cursor: isProcessing ? "wait" : "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              color: "var(--text)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: isProcessing ? 0.7 : 1,
            }}
          >
            {generating ? (
              <span
                className="animate-spin"
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid var(--border-strong)",
                  borderTopColor: "var(--sage)",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: 16, height: 16 }}
              >
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
            )}
            Download
          </button>

          <button
            onClick={handleShare}
            disabled={isProcessing}
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: 14,
              border: "none",
              background: "var(--sage)",
              cursor: isProcessing ? "wait" : "pointer",
              fontSize: "0.9rem",
              fontWeight: 600,
              fontFamily: "var(--font-sans)",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              opacity: isProcessing ? 0.7 : 1,
              boxShadow: "0 4px 16px rgba(91,123,94,0.25)",
            }}
          >
            {sharing ? (
              <span
                className="animate-spin"
                style={{
                  width: 14,
                  height: 14,
                  border: "2px solid rgba(255,255,255,0.3)",
                  borderTopColor: "white",
                  borderRadius: "50%",
                  display: "inline-block",
                }}
              />
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                style={{ width: 16, height: 16 }}
              >
                <path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" />
                <polyline points="16 6 12 2 8 6" />
                <line x1="12" y1="2" x2="12" y2="15" />
              </svg>
            )}
            {canShare ? "Share" : "Download"}
          </button>
        </div>
      </div>

      {/* Hidden offscreen render container for image capture */}
      <div
        style={{
          position: "fixed",
          left: -9999,
          top: 0,
          zIndex: -1,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      >
        <div ref={cardRef}>
          <CardRenderer
            template={template}
            data={cardData}
            size={size}
            showJournal={showJournal}
          />
        </div>
      </div>
    </dialog>
  );
}

/* ── Card renderer helper ────────────────────────── */

function CardRenderer({
  template,
  data,
  size,
  showJournal,
}: {
  template: CardTemplate;
  data: ShareCardData;
  size: CardSize;
  showJournal: boolean;
}) {
  switch (template) {
    case "milestone":
      return <MilestoneCard data={data} size={size} />;
    case "quote":
      return <QuoteOnlyCard data={data} size={size} />;
    case "memory":
      return <MemoryCard data={data} size={size} />;
    case "daily":
    default:
      return (
        <DailyCompletionCard data={data} size={size} showJournal={showJournal} />
      );
  }
}
