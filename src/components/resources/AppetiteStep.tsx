"use client";

import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

interface AppetiteStepProps {
  item: FoodItem;
  stepNumber: number;
  isLast: boolean;
}

export default function AppetiteStep({
  item,
  stepNumber,
  isLast,
}: AppetiteStepProps) {
  return (
    <>
      <div
        className="rounded-2xl px-5 py-5"
        style={{
          background: "white",
          borderLeft: "3px solid var(--gold)",
        }}
      >
        <div className="flex items-start gap-4">
          {/* Step number circle */}
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full font-semibold"
            style={{
              width: 36,
              height: 36,
              background: "var(--gold)",
              color: "white",
              fontSize: 16,
            }}
          >
            {stepNumber}
          </div>

          {/* Food illustration */}
          <div
            className="flex-shrink-0 relative rounded-lg overflow-hidden"
            style={{
              width: 56,
              height: 56,
              background:
                "linear-gradient(135deg, rgba(196,162,101,0.08) 0%, rgba(245,240,234,0.5) 100%)",
            }}
          >
            <Image
              src={`/illustrations/food/${item.icon}`}
              alt=""
              fill
              className="object-cover p-1"
              sizes="56px"
            />
          </div>

          {/* Text content */}
          <div className="flex-1 min-w-0">
            <h3
              className="font-serif font-semibold"
              style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
            >
              {item.name}
            </h3>
            <p
              className="mt-1 leading-relaxed"
              style={{
                fontSize: "var(--text-body)",
                color: "var(--text-muted)",
              }}
            >
              {item.description}
            </p>
          </div>
        </div>
      </div>

      {/* Dashed connector between steps */}
      {!isLast && (
        <div className="flex justify-center">
          <div
            style={{
              width: 1,
              height: 20,
              borderLeft: "2px dashed var(--gold)",
              opacity: 0.3,
            }}
          />
        </div>
      )}
    </>
  );
}
