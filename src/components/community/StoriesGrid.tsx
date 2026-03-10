"use client";

import Image from "next/image";
import Link from "next/link";

interface Story {
  id: string;
  dog_name: string;
  dog_breed: string | null;
  story_text: string;
  created_at: string;
}

export const GRADIENTS = [
  "linear-gradient(135deg, var(--sage-light), var(--sage))",
  "linear-gradient(135deg, var(--gold-light), var(--gold))",
  "linear-gradient(135deg, var(--terracotta-light), var(--terracotta))",
];

export function StoriesGrid({ stories }: { stories: Story[] }) {
  if (!stories || stories.length === 0) {
    return (
      <div
        className="rounded-2xl p-12 text-center mb-16"
        style={{
          background: "white",
          border: "1px solid var(--border)",
          boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
        }}
      >
        <div className="flex justify-center mb-5">
          <Image
            src="/illustrations/icons/icon-heart.png"
            alt=""
            width={80}
            height={80}
            style={{ objectFit: "contain" }}
          />
        </div>
        <h2
          className="font-serif text-xl font-semibold mb-3"
          style={{ color: "var(--text)" }}
        >
          Your story could be the first.
        </h2>
        <p
          className="text-[1rem] leading-relaxed mx-auto mb-6"
          style={{ color: "var(--text-muted)", maxWidth: "420px" }}
        >
          This space is waiting for families like yours. Sharing what
          you&apos;re going through can help someone else feel less alone.
        </p>
        <Link
          href="/community/share"
          className="inline-block px-7 py-3.5 bg-sage text-white rounded-xl font-semibold text-sm no-underline hover:bg-sage-dark transition-colors"
        >
          Share Your Story
        </Link>
      </div>
    );
  }

  return (
    <div
      id="community-stories"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-16 scroll-mt-8"
    >
      {stories.map((story, i) => (
        <div
          key={story.id}
          className="group relative flex flex-col rounded-2xl p-7 transition-all duration-350 hover:-translate-y-1.5"
          style={{
            background: "white",
            border: "1px solid var(--border)",
            boxShadow: "0 2px 12px rgba(0,0,0,0.03)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 12px 40px rgba(0,0,0,0.07), 0 2px 8px rgba(0,0,0,0.04)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow =
              "0 2px 12px rgba(0,0,0,0.03)";
          }}
        >
          {/* Avatar — dog name initial */}
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold text-[0.9rem] mb-5 flex-shrink-0 font-sans"
            style={{ background: GRADIENTS[i % 3] }}
          >
            {story.dog_name.charAt(0).toUpperCase()}
          </div>

          {/* Quote mark */}
          <div
            className="font-serif text-[2.2rem] leading-none mb-2"
            style={{ color: "var(--border-strong)", lineHeight: 1 }}
            aria-hidden="true"
          >
            &ldquo;
          </div>

          <blockquote
            className="font-serif italic text-[0.97rem] leading-relaxed flex-1 mb-5"
            style={{ color: "var(--text-muted)" }}
          >
            {story.story_text}
          </blockquote>

          {/* Attribution */}
          <div
            className="pt-5"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <div
              className="font-semibold text-[0.88rem]"
              style={{ color: "var(--text)" }}
            >
              {story.dog_name}
            </div>
            {story.dog_breed && (
              <div
                className="text-[0.78rem] mt-0.5"
                style={{ color: "var(--text-muted)" }}
              >
                {story.dog_breed}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
