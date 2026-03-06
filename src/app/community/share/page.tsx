"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

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
      <div
        className="min-h-screen relative overflow-hidden flex items-center justify-center px-6"
        style={{ background: "var(--cream)" }}
      >
        {/* Ambient glow */}
        <div
          className="absolute pointer-events-none"
          aria-hidden="true"
          style={{
            top: "20%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "600px",
            height: "400px",
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(91,123,94,0.06) 0%, transparent 70%)",
          }}
        />
        <div
          className="relative max-w-md text-center rounded-2xl p-10"
          style={{
            background: "white",
            border: "1px solid var(--border)",
            boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
          }}
        >
          <div className="flex justify-center mb-5">
            <Image
              src="/illustrations/icons/icon-heart.webp"
              alt=""
              width={80}
              height={80}
              style={{ objectFit: "contain" }}
            />
          </div>
          <h1
            className="font-serif text-2xl font-semibold mb-3"
            style={{ color: "var(--text)" }}
          >
            Thank you for sharing.
          </h1>
          <p
            className="text-[0.97rem] leading-relaxed mb-6"
            style={{ color: "var(--text-muted)" }}
          >
            Your story has been submitted and will appear on the community page
            after review. Your words could help another family going through
            this right now.
          </p>
          <button
            onClick={() => router.push("/community")}
            className="px-6 py-3 border-none rounded-xl font-semibold text-sm cursor-pointer transition-all"
            style={{
              background: "var(--sage)",
              color: "white",
              boxShadow: "0 4px 14px rgba(91,123,94,0.22)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--sage-dark)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background =
                "var(--sage)";
            }}
          >
            Back to Community
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{ background: "var(--cream)" }}
    >
      {/* Ambient radial glow - centered breathing */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "16%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "600px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse, rgba(91,123,94,0.06) 0%, transparent 70%)",
          animationName: "ambientGlow",
          animationDuration: "9s",
          animationTimingFunction: "ease-in-out",
          animationIterationCount: "infinite",
          animationDelay: "1.5s",
        }}
      />
      {/* Ambient radial glow - bottom right accent */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          bottom: "-6%",
          right: "-4%",
          width: "380px",
          height: "380px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(196,162,101,0.07) 0%, transparent 68%)",
        }}
      />

      <div className="relative pt-24 pb-16 px-6">
        <div className="max-w-[600px] mx-auto">
          {/* Back link */}
          <div className="mb-8">
            <Link
              href="/community"
              className="inline-flex items-center gap-1.5 text-[0.82rem] font-medium no-underline transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--sage)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "var(--text-muted)";
              }}
            >
              <Image
                src="/illustrations/icons/icon-arrow-left.webp"
                alt=""
                width={12}
                height={12}
                style={{ objectFit: "contain", opacity: 0.6 }}
              />
              Community
            </Link>
          </div>

          {/* Header */}
          <div className="text-center mb-10">
            <div className="flex justify-center mb-5">
              <Image
                src="/illustrations/icons/icon-pencil.webp"
                alt=""
                width={128}
                height={128}
                style={{ objectFit: "contain" }}
              />
            </div>
            <div
              className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] mb-4"
              style={{ color: "var(--gold)" }}
            >
              Community
            </div>
            <h1
              className="font-serif font-semibold tracking-tight mb-4"
              style={{
                fontSize: "clamp(1.9rem, 4vw, 2.6rem)",
                lineHeight: 1.25,
                color: "var(--text)",
              }}
            >
              Share your story.
            </h1>
            <p
              className="text-[1.05rem] leading-relaxed mx-auto"
              style={{ color: "var(--text-muted)", maxWidth: "480px" }}
            >
              Your journey matters. Sharing your experience can help another
              family feel less alone. There are no right or wrong words.
            </p>
          </div>

          {/* Form card */}
          <div
            className="rounded-2xl p-8 md:p-10"
            style={{
              background: "white",
              border: "1px solid var(--border)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.04)",
            }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Your dog&apos;s name *
                </label>
                <input
                  type="text"
                  required
                  value={dogName}
                  onChange={(e) => setDogName(e.target.value)}
                  placeholder="e.g., Graffiti"
                  className="w-full outline-none transition-all"
                  style={{
                    padding: "13px 16px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "14px",
                    fontSize: "1rem",
                    fontFamily: "var(--font-sans)",
                    background: "white",
                    color: "var(--text)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(91,123,94,0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(91,123,94,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.03)";
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Breed{" "}
                  <span
                    className="font-normal text-[0.8rem]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    (optional)
                  </span>
                </label>
                <input
                  type="text"
                  value={dogBreed}
                  onChange={(e) => setDogBreed(e.target.value)}
                  placeholder="e.g., Corgi"
                  className="w-full outline-none transition-all"
                  style={{
                    padding: "13px 16px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "14px",
                    fontSize: "1rem",
                    fontFamily: "var(--font-sans)",
                    background: "white",
                    color: "var(--text)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(91,123,94,0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(91,123,94,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.03)";
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: "var(--text)" }}
                >
                  Your story *
                </label>
                <textarea
                  required
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Tell us about your dog and your journey together..."
                  rows={7}
                  className="w-full outline-none resize-none journal-lined transition-all"
                  style={{
                    padding: "13px 16px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "14px",
                    fontSize: "1rem",
                    fontFamily: "var(--font-sans)",
                    background: "white",
                    color: "var(--text)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(91,123,94,0.5)";
                    e.currentTarget.style.boxShadow =
                      "0 0 0 3px rgba(91,123,94,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow =
                      "0 1px 4px rgba(0,0,0,0.03)";
                  }}
                />
              </div>

              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-[0.88rem]"
                  style={{
                    background: "rgba(212,133,106,0.08)",
                    color: "var(--terracotta)",
                    border: "1px solid rgba(212,133,106,0.2)",
                  }}
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 border-none rounded-xl font-semibold font-sans cursor-pointer transition-all active:scale-[0.99]"
                style={{
                  padding: "15px 24px",
                  background: loading ? "var(--sage-light)" : "var(--sage)",
                  color: "white",
                  fontSize: "0.97rem",
                  boxShadow: "0 4px 14px rgba(91,123,94,0.25)",
                  minHeight: "52px",
                  opacity: loading ? 0.85 : 1,
                  cursor: loading ? "not-allowed" : "pointer",
                }}
                onMouseEnter={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--sage-dark)";
                }}
                onMouseLeave={(e) => {
                  if (!loading)
                    (e.currentTarget as HTMLButtonElement).style.background =
                      "var(--sage)";
                }}
              >
                {loading ? (
                  <>
                    <span
                      className="w-4 h-4 rounded-full border-2 animate-spin flex-shrink-0"
                      style={{
                        borderColor: "rgba(255,255,255,0.3)",
                        borderTopColor: "white",
                      }}
                    />
                    Submitting&hellip;
                  </>
                ) : (
                  "Share Your Story"
                )}
              </button>

              <p
                className="text-[0.8rem] text-center"
                style={{ color: "var(--text-muted)" }}
              >
                Stories are reviewed before appearing on the community page.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
