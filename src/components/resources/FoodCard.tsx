"use client";

import Image from "next/image";
import type { FoodItem } from "@/lib/resources/types";

interface FoodCardProps {
  item: FoodItem;
  onTap: (item: FoodItem) => void;
}

export default function FoodCard({ item, onTap }: FoodCardProps) {
  return (
    <button
      type="button"
      onClick={() => onTap(item)}
      className="food-card-interactive w-full text-left rounded-2xl overflow-hidden"
      style={{
        background: "white",
        border: "1px solid var(--border)",
        transition: "transform 0.15s ease",
      }}
      onPointerDown={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(0.97)";
      }}
      onPointerUp={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
      onPointerLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "scale(1)";
      }}
    >
      {/* Image area */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "1 / 1" }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(91,123,94,0.04) 0%, rgba(245,240,234,0.4) 100%)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            transition: "transform 0.35s var(--ease-out-expo)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1.06)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.transform = "scale(1)";
          }}
        >
          <Image
            src={`/illustrations/food/${item.icon}`}
            alt={item.name}
            fill
            className="object-cover p-3"
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        </div>
        {/* Sage checkmark badge */}
        <div
          className="absolute flex items-center justify-center"
          style={{
            top: 8,
            right: 8,
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--sage)",
          }}
        >
          <svg
            width="12"
            height="12"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M3.5 8.5L6.5 11.5L12.5 4.5"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* Text area */}
      <div className="px-3 pt-2.5 pb-3">
        <div
          className="font-serif font-semibold"
          style={{ fontSize: "var(--text-h3)", color: "var(--text)" }}
        >
          {item.name}
        </div>
        {item.tip && (
          <div
            className="mt-0.5 line-clamp-2 leading-snug"
            style={{
              fontSize: "var(--text-body-sm)",
              color: "var(--text-muted)",
            }}
          >
            {item.tip}
          </div>
        )}
      </div>
    </button>
  );
}
