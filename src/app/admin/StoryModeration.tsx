"use client";

import { useState } from "react";

interface Story {
  id: string;
  dog_name: string | null;
  dog_breed: string | null;
  story_text: string;
  created_at: string;
}

export function StoryModeration({ stories: initialStories }: { stories: Story[] }) {
  const [stories, setStories] = useState(initialStories);
  const [acting, setActing] = useState<string | null>(null);

  async function handleAction(storyId: string, action: "approve" | "reject") {
    setActing(storyId);
    try {
      const res = await fetch("/api/admin/stories", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ story_id: storyId, action }),
      });
      if (res.ok) {
        setStories((prev) => prev.filter((s) => s.id !== storyId));
      }
    } catch {
      // Failed silently
    } finally {
      setActing(null);
    }
  }

  if (stories.length === 0) {
    return (
      <p className="text-text-muted text-sm italic">No stories pending review.</p>
    );
  }

  return (
    <div className="space-y-4">
      {stories.map((story) => (
        <div
          key={story.id}
          className="bg-white border border-border rounded-xl p-5"
        >
          <div className="flex items-start justify-between gap-4 mb-2">
            <div>
              <span className="font-serif font-semibold text-text">
                {story.dog_name}
              </span>
              {story.dog_breed && (
                <span className="text-text-muted text-sm ml-2">
                  {story.dog_breed}
                </span>
              )}
            </div>
            <span className="text-[0.7rem] text-text-muted whitespace-nowrap">
              {new Date(story.created_at).toLocaleDateString()}
            </span>
          </div>
          <p className="text-sm text-text-muted leading-relaxed mb-4 line-clamp-4">
            {story.story_text}
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleAction(story.id, "approve")}
              disabled={acting === story.id}
              className="px-4 py-1.5 bg-sage text-white text-sm font-medium rounded-lg border-none cursor-pointer hover:bg-sage-dark transition-colors disabled:opacity-50"
            >
              Approve
            </button>
            <button
              onClick={() => handleAction(story.id, "reject")}
              disabled={acting === story.id}
              className="px-4 py-1.5 bg-white text-terracotta text-sm font-medium rounded-lg border border-terracotta/30 cursor-pointer hover:bg-terracotta/5 transition-colors disabled:opacity-50"
            >
              Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
