"use client";

import { useCallback, useState } from "react";

interface UseWebShareOptions {
  fileName?: string;
  title?: string;
  text?: string;
}

export function useWebShare({
  fileName = "hsa-days-card.png",
  title = "HSA Days",
  text = "My HSA Days journey",
}: UseWebShareOptions = {}) {
  const [sharing, setSharing] = useState(false);

  const canShare =
    typeof navigator !== "undefined" && typeof navigator.share === "function";

  const shareBlob = useCallback(
    async (blob: Blob) => {
      setSharing(true);
      try {
        const file = new File([blob], fileName, { type: "image/png" });

        if (canShare && navigator.canShare?.({ files: [file] })) {
          await navigator.share({ files: [file], title, text });
          return true;
        }

        // Fallback: download
        downloadBlob(blob, fileName);
        return true;
      } catch (err) {
        // User cancelled share sheet — not an error
        if ((err as Error)?.name === "AbortError") return false;
        console.error("Share failed:", err);
        // Fallback to download
        downloadBlob(blob, fileName);
        return true;
      } finally {
        setSharing(false);
      }
    },
    [canShare, fileName, title, text]
  );

  const downloadDataUrl = useCallback(
    (dataUrl: string) => {
      const link = document.createElement("a");
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    },
    [fileName]
  );

  return { canShare, sharing, shareBlob, downloadDataUrl };
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.download = fileName;
  link.href = url;
  link.click();
  URL.revokeObjectURL(url);
}
