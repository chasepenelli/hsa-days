"use client";

import { useCallback, useRef, useState } from "react";
import { toPng, toBlob } from "html-to-image";
import type { CardSize } from "./card-styles";
import { CARD_SIZES } from "./card-styles";

interface UseCardGeneratorOptions {
  size: CardSize;
}

export function useCardGenerator({ size }: UseCardGeneratorOptions) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [generating, setGenerating] = useState(false);

  const getPixelRatio = useCallback(() => {
    if (typeof window === "undefined") return 2;
    return window.screen.width < 768 ? 1 : 2;
  }, []);

  const waitForFonts = useCallback(async () => {
    if (typeof document !== "undefined") {
      await document.fonts.ready;
    }
  }, []);

  const generatePng = useCallback(async (): Promise<string | null> => {
    if (!cardRef.current) return null;
    setGenerating(true);
    try {
      await waitForFonts();
      const { width, height } = CARD_SIZES[size];
      const ratio = getPixelRatio();
      const dataUrl = await toPng(cardRef.current, {
        width,
        height,
        pixelRatio: ratio,
        cacheBust: true,
      });
      return dataUrl;
    } catch (err) {
      console.error("Card generation failed:", err);
      return null;
    } finally {
      setGenerating(false);
    }
  }, [size, getPixelRatio, waitForFonts]);

  const generateBlob = useCallback(async (): Promise<Blob | null> => {
    if (!cardRef.current) return null;
    setGenerating(true);
    try {
      await waitForFonts();
      const { width, height } = CARD_SIZES[size];
      const ratio = getPixelRatio();
      const blob = await toBlob(cardRef.current, {
        width,
        height,
        pixelRatio: ratio,
        cacheBust: true,
      });
      return blob;
    } catch (err) {
      console.error("Card generation failed:", err);
      return null;
    } finally {
      setGenerating(false);
    }
  }, [size, getPixelRatio, waitForFonts]);

  return { cardRef, generating, generatePng, generateBlob };
}
