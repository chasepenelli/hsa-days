"use client";

import { useState, useCallback, useEffect } from "react";

const TEMPLATES = [
  { id: "welcome", label: "Welcome" },
  { id: "daily-drip", label: "Daily Drip" },
  { id: "milestone", label: "Milestone" },
] as const;

type TemplateId = (typeof TEMPLATES)[number]["id"];

export default function EmailsPage() {
  const [template, setTemplate] = useState<TemplateId>("welcome");
  const [day, setDay] = useState(1);
  const [name, setName] = useState("Alex");
  const [dog, setDog] = useState("Sage");
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const previewUrl = buildUrl(template, day, name, dog);

  // Debounce iframe reloads when inputs change
  useEffect(() => {
    const t = setTimeout(() => setIframeKey((k) => k + 1), 300);
    return () => clearTimeout(t);
  }, [template, day, name, dog]);

  const copyHtml = useCallback(async () => {
    const url = `/api/email-html/${template}?day=${day}&name=${encodeURIComponent(name)}&dog=${encodeURIComponent(dog)}`;
    const res = await fetch(url);
    const html = await res.text();
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [template, day, name, dog]);

  return (
    <div className="min-h-screen bg-cream pt-20 pb-12 px-4">
      <div className="max-w-[1100px] mx-auto">
        <h1 className="font-serif text-2xl text-sage-dark mb-1">
          Email Templates
        </h1>
        <p className="text-sm text-text-muted mb-6">
          Preview and tweak email templates before sending.
        </p>

        {/* Controls */}
        <div className="bg-warm-white border border-border rounded-xl p-5 mb-6">
          {/* Template tabs */}
          <div className="flex gap-2 mb-5">
            {TEMPLATES.map((t) => (
              <button
                key={t.id}
                onClick={() => setTemplate(t.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  template === t.id
                    ? "bg-sage text-white"
                    : "bg-cream text-text-muted hover:text-sage border border-border"
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {/* Inputs row */}
          <div className="flex flex-wrap gap-5 items-end">
            {/* Day slider — hidden for welcome */}
            {template !== "welcome" && (
              <label className="flex flex-col gap-1.5 text-sm text-text-muted font-medium">
                Day {day}
                <input
                  type="range"
                  min={1}
                  max={30}
                  value={day}
                  onChange={(e) => setDay(Number(e.target.value))}
                  className="w-40 accent-sage"
                />
              </label>
            )}

            <label className="flex flex-col gap-1.5 text-sm text-text-muted font-medium">
              First name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-border rounded-lg px-3 py-1.5 text-text text-sm w-36 bg-warm-white focus:outline-sage"
              />
            </label>

            {template === "milestone" && (
              <label className="flex flex-col gap-1.5 text-sm text-text-muted font-medium">
                Dog name
                <input
                  type="text"
                  value={dog}
                  onChange={(e) => setDog(e.target.value)}
                  className="border border-border rounded-lg px-3 py-1.5 text-text text-sm w-36 bg-warm-white focus:outline-sage"
                />
              </label>
            )}

            <button
              onClick={copyHtml}
              className="ml-auto px-5 py-2 rounded-lg text-sm font-medium border border-gold text-gold hover:bg-gold hover:text-white transition-colors cursor-pointer"
            >
              {copied ? "Copied!" : "Copy HTML"}
            </button>
          </div>
        </div>

        {/* Preview iframe */}
        <div className="bg-white border border-border rounded-xl overflow-hidden">
          <div className="px-4 py-2 border-b border-border bg-cream/50 text-xs text-text-muted font-mono truncate">
            {previewUrl}
          </div>
          <iframe
            key={iframeKey}
            src={previewUrl}
            className="w-full border-0"
            style={{ height: "80vh" }}
            title="Email preview"
          />
        </div>
      </div>
    </div>
  );
}

function buildUrl(template: string, day: number, name: string, dog: string) {
  const p = new URLSearchParams();
  if (template !== "welcome") p.set("day", String(day));
  if (name) p.set("name", name);
  if (template === "milestone" && dog) p.set("dog", dog);
  const qs = p.toString();
  return `/api/email-preview/${template}${qs ? `?${qs}` : ""}`;
}
