"use client";

import { useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const STAGES = ["I", "II", "III", "IV", "I'm not sure"] as const;

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function currentYear() {
  return new Date().getFullYear();
}

function yearOptions() {
  const now = currentYear();
  const years: number[] = [];
  for (let y = now; y >= now - 10; y--) years.push(y);
  return years;
}

export default function OnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState<"forward" | "back">("forward");

  // Step 1
  const [petName, setPetName] = useState("");

  // Step 2
  const [diagMonth, setDiagMonth] = useState("");
  const [diagYear, setDiagYear] = useState("");
  const [cancerStage, setCancerStage] = useState("");

  // Step 3
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const goForward = useCallback(() => {
    setDirection("forward");
    setStep((s) => s + 1);
  }, []);

  const goBack = useCallback(() => {
    setDirection("back");
    setStep((s) => s - 1);
  }, []);

  const handlePhotoSelect = useCallback((file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setError("Photo must be under 5MB");
      return;
    }
    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      setError("Please upload a JPG, PNG, or WebP image");
      return;
    }
    setError("");
    setPhoto(file);
    const reader = new FileReader();
    reader.onload = (e) => setPhotoPreview(e.target?.result as string);
    reader.readAsDataURL(file);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer.files[0];
      if (file) handlePhotoSelect(file);
    },
    [handlePhotoSelect]
  );

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError("");

    const formData = new FormData();
    formData.append("pet_name", petName.trim());

    if (diagMonth && diagYear) {
      const monthIdx = MONTHS.indexOf(diagMonth) + 1;
      formData.append(
        "diagnosis_date",
        `${diagYear}-${String(monthIdx).padStart(2, "0")}-01`
      );
    }

    if (cancerStage) {
      formData.append("cancer_stage", cancerStage);
    }

    if (photo) {
      formData.append("photo", photo);
    }

    try {
      const res = await fetch("/api/onboarding", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong");
        setIsSubmitting(false);
        return;
      }

      // Brief welcome moment, then redirect
      setStep(4);
      setTimeout(() => router.push("/days"), 2000);
    } catch {
      setError("Something went wrong. Please try again.");
      setIsSubmitting(false);
    }
  };

  const animClass =
    direction === "forward" ? "animate-fade-in-up" : "animate-fade-in";

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 py-12"
      style={{
        background: "linear-gradient(to bottom, #F5F0EA 0%, #FAF8F5 100%)",
      }}
    >
      {/* Progress dots */}
      {step <= 3 && (
        <div className="flex items-center gap-3 mb-12">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="w-2.5 h-2.5 rounded-full transition-all duration-300"
              style={{
                background:
                  s <= step ? "var(--sage)" : "transparent",
                border:
                  s <= step
                    ? "none"
                    : "1.5px solid var(--border-strong)",
                transform: s === step ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-[420px]">
        {/* ── Step 1: Pet Name ── */}
        {step === 1 && (
          <div key="step-1" className={animClass}>
            <h1
              className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold text-center mb-3 leading-tight"
              style={{ color: "var(--text)" }}
            >
              Who&rsquo;s this journey for?
            </h1>
            <p
              className="text-center text-[0.95rem] mb-10 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Every day of this program was made with love.
              <br />
              Let&rsquo;s make it personal.
            </p>

            <div className="mb-8">
              <label
                htmlFor="pet-name"
                className="block text-[0.8rem] font-medium mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Your pet&rsquo;s name
              </label>
              <input
                id="pet-name"
                type="text"
                autoFocus
                value={petName}
                onChange={(e) => setPetName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && petName.trim()) goForward();
                }}
                placeholder="e.g. Bella, Max, Luna..."
                className="w-full px-4 py-3.5 rounded-xl text-[1rem] transition-all duration-200"
                style={{
                  background: "white",
                  border: "1.5px solid var(--border-strong)",
                  color: "var(--text)",
                  outline: "none",
                }}
                onFocus={(e) =>
                  (e.target.style.borderColor = "var(--sage)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "var(--border-strong)")
                }
              />
            </div>

            <button
              onClick={goForward}
              disabled={!petName.trim()}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-[0.95rem] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
              style={{
                background: "var(--sage)",
                boxShadow: petName.trim()
                  ? "0 4px 14px rgba(91,123,94,0.3)"
                  : "none",
              }}
            >
              Next
            </button>
          </div>
        )}

        {/* ── Step 2: Diagnosis Info ── */}
        {step === 2 && (
          <div key="step-2" className={animClass}>
            <h1
              className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold text-center mb-3 leading-tight"
              style={{ color: "var(--text)" }}
            >
              Tell us about {petName}&rsquo;s journey
            </h1>
            <p
              className="text-center text-[0.95rem] mb-10 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              This helps us understand where you are.
              <br />
              Both fields are completely optional.
            </p>

            {/* Diagnosis date */}
            <div className="mb-6">
              <label
                className="block text-[0.8rem] font-medium mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                When was {petName} diagnosed?
              </label>
              <div className="flex gap-3">
                <select
                  value={diagMonth}
                  onChange={(e) => setDiagMonth(e.target.value)}
                  className="flex-1 px-3 py-3 rounded-xl text-[0.95rem] appearance-none cursor-pointer"
                  style={{
                    background: "white",
                    border: "1.5px solid var(--border-strong)",
                    color: diagMonth ? "var(--text)" : "var(--text-muted)",
                  }}
                >
                  <option value="">Month</option>
                  {MONTHS.map((m) => (
                    <option key={m} value={m}>
                      {m}
                    </option>
                  ))}
                </select>
                <select
                  value={diagYear}
                  onChange={(e) => setDiagYear(e.target.value)}
                  className="w-[110px] px-3 py-3 rounded-xl text-[0.95rem] appearance-none cursor-pointer"
                  style={{
                    background: "white",
                    border: "1.5px solid var(--border-strong)",
                    color: diagYear ? "var(--text)" : "var(--text-muted)",
                  }}
                >
                  <option value="">Year</option>
                  {yearOptions().map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Cancer stage */}
            <div className="mb-8">
              <label
                className="block text-[0.8rem] font-medium mb-2"
                style={{ color: "var(--text-muted)" }}
              >
                Cancer stage
              </label>
              <div className="flex flex-wrap gap-2">
                {STAGES.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() =>
                      setCancerStage((prev) => (prev === s ? "" : s))
                    }
                    className="px-4 py-2 rounded-lg text-[0.88rem] font-medium transition-all duration-200 cursor-pointer"
                    style={{
                      background:
                        cancerStage === s
                          ? "var(--sage)"
                          : "white",
                      color:
                        cancerStage === s
                          ? "white"
                          : "var(--text)",
                      border:
                        cancerStage === s
                          ? "1.5px solid var(--sage)"
                          : "1.5px solid var(--border-strong)",
                      boxShadow:
                        cancerStage === s
                          ? "0 2px 8px rgba(91,123,94,0.2)"
                          : "none",
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={goBack}
                className="px-6 py-3.5 rounded-xl font-medium text-[0.95rem] transition-all duration-200 cursor-pointer"
                style={{
                  background: "transparent",
                  border: "1.5px solid var(--border-strong)",
                  color: "var(--text-muted)",
                }}
              >
                Back
              </button>
              <button
                onClick={goForward}
                className="flex-1 py-3.5 rounded-xl text-white font-semibold text-[0.95rem] transition-all duration-200 cursor-pointer"
                style={{
                  background: "var(--sage)",
                  boxShadow: "0 4px 14px rgba(91,123,94,0.3)",
                }}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* ── Step 3: Photo Upload ── */}
        {step === 3 && (
          <div key="step-3" className={animClass}>
            <h1
              className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold text-center mb-3 leading-tight"
              style={{ color: "var(--text)" }}
            >
              Got a favorite photo of {petName}?
            </h1>
            <p
              className="text-center text-[0.95rem] mb-10 leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              It&rsquo;ll appear on your share cards and dashboard.
              <br />
              You can always add one later.
            </p>

            {/* Upload area */}
            {!photoPreview ? (
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                className="mb-6 rounded-2xl p-10 text-center cursor-pointer transition-all duration-200 hover:border-sage"
                style={{
                  border: "2px dashed var(--border-strong)",
                  background: "rgba(255,255,255,0.6)",
                }}
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
                  style={{ background: "rgba(91,123,94,0.08)" }}
                >
                  <Image
                    src="/illustrations/icons/icon-upload-cloud.png"
                    alt=""
                    width={28}
                    height={28}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p
                  className="text-[0.95rem] font-medium mb-1"
                  style={{ color: "var(--text)" }}
                >
                  Click to upload or drag & drop
                </p>
                <p
                  className="text-[0.8rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  JPG, PNG, or WebP &middot; Max 5MB
                </p>
              </div>
            ) : (
              <div className="mb-6 text-center">
                <div
                  className="w-40 h-40 rounded-2xl mx-auto mb-4 overflow-hidden"
                  style={{
                    border: "3px solid var(--sage)",
                    boxShadow: "0 4px 20px rgba(91,123,94,0.15)",
                  }}
                >
                  <img
                    src={photoPreview}
                    alt={`${petName}'s photo`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  onClick={() => {
                    setPhoto(null);
                    setPhotoPreview(null);
                  }}
                  className="text-[0.85rem] font-medium cursor-pointer"
                  style={{
                    color: "var(--text-muted)",
                    background: "none",
                    border: "none",
                  }}
                >
                  Remove photo
                </button>
              </div>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) handlePhotoSelect(file);
              }}
            />

            {error && (
              <p
                className="text-[0.85rem] text-center mb-4"
                style={{ color: "var(--terracotta)" }}
              >
                {error}
              </p>
            )}

            <div className="flex gap-3">
              <button
                onClick={goBack}
                disabled={isSubmitting}
                className="px-6 py-3.5 rounded-xl font-medium text-[0.95rem] transition-all duration-200 cursor-pointer disabled:opacity-50"
                style={{
                  background: "transparent",
                  border: "1.5px solid var(--border-strong)",
                  color: "var(--text-muted)",
                }}
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="flex-1 py-3.5 rounded-xl text-white font-semibold text-[0.95rem] transition-all duration-200 cursor-pointer disabled:opacity-70"
                style={{
                  background: "var(--sage)",
                  boxShadow: "0 4px 14px rgba(91,123,94,0.3)",
                }}
              >
                {isSubmitting ? "Saving..." : photo ? "Complete" : "Skip & Finish"}
              </button>
            </div>
          </div>
        )}

        {/* ── Step 4: Welcome ── */}
        {step === 4 && (
          <div key="step-4" className="animate-fade-in-up text-center">
            <div
              className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center"
              style={{
                background:
                  "linear-gradient(135deg, rgba(91,123,94,0.12) 0%, rgba(196,162,101,0.12) 100%)",
              }}
            >
              <Image
                src="/illustrations/icons/icon-heart.png"
                alt=""
                width={36}
                height={36}
                style={{ objectFit: "contain" }}
              />
            </div>
            <h1
              className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold mb-3 leading-tight"
              style={{ color: "var(--text)" }}
            >
              Welcome, {petName}&rsquo;s person.
            </h1>
            <p
              className="text-[0.95rem] leading-relaxed"
              style={{ color: "var(--text-muted)" }}
            >
              Thirty days of love, understanding, and support
              <br />
              are waiting for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
