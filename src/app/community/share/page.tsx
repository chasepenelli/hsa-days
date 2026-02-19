"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ShareStoryPage() {
  const [dogName, setDogName] = useState("");
  const [dogBreed, setDogBreed] = useState("");
  const [storyText, setStoryText] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/stories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          dog_name: dogName,
          dog_breed: dogBreed || null,
          story_text: storyText,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Something went wrong");
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen pt-24 pb-16 px-6 flex items-center justify-center">
        <div className="max-w-md text-center">
          <div className="text-4xl mb-4">{"\uD83E\uDDE1"}</div>
          <h1 className="font-serif text-2xl font-semibold mb-3">
            Thank you for sharing.
          </h1>
          <p className="text-text-muted leading-relaxed mb-6">
            Your story has been submitted and will appear on the community page
            after review. Your words could help another family going through
            this right now.
          </p>
          <button
            onClick={() => router.push("/community")}
            className="px-6 py-3 bg-sage text-white rounded-xl font-semibold text-sm border-none cursor-pointer hover:bg-sage-dark transition-colors"
          >
            Back to Community
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-6">
      <div className="max-w-[600px] mx-auto">
        <div className="text-[0.75rem] font-semibold uppercase tracking-[0.1em] text-gold mb-3">
          Community
        </div>
        <h1 className="font-serif text-[clamp(2rem,4vw,2.8rem)] font-semibold text-text mb-4">
          Share your story.
        </h1>
        <p className="text-[1.05rem] text-text-muted leading-relaxed mb-10">
          Your journey matters. Sharing your experience can help another family
          feel less alone. There are no right or wrong words.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Your dog&apos;s name *
            </label>
            <input
              type="text"
              required
              value={dogName}
              onChange={(e) => setDogName(e.target.value)}
              placeholder="e.g., Graffiti"
              className="w-full px-4 py-3.5 border-[1.5px] border-border rounded-xl text-base font-sans bg-white text-text outline-none focus:border-sage transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Breed (optional)
            </label>
            <input
              type="text"
              value={dogBreed}
              onChange={(e) => setDogBreed(e.target.value)}
              placeholder="e.g., Corgi"
              className="w-full px-4 py-3.5 border-[1.5px] border-border rounded-xl text-base font-sans bg-white text-text outline-none focus:border-sage transition-colors"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Your story *
            </label>
            <textarea
              required
              value={storyText}
              onChange={(e) => setStoryText(e.target.value)}
              placeholder="Tell us about your dog and your journey together..."
              rows={6}
              className="w-full px-4 py-3.5 border-[1.5px] border-border rounded-xl text-base font-sans bg-white text-text outline-none focus:border-sage transition-colors resize-none"
            />
          </div>

          {error && (
            <p className="text-terracotta text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-sage text-white border-none rounded-xl text-base font-semibold font-sans cursor-pointer hover:bg-sage-dark transition-colors disabled:opacity-70 min-h-12"
          >
            {loading ? "Submitting..." : "Share Your Story"}
          </button>

          <p className="text-[0.8rem] text-text-muted text-center">
            Stories are reviewed before appearing on the community page.
          </p>
        </form>
      </div>
    </div>
  );
}
