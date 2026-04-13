"use client";

import { useState, useCallback, useEffect } from "react";

const TEMPLATES = [
  { id: "welcome", label: "Welcome" },
  { id: "launch", label: "Launch" },
] as const;

type TemplateId = (typeof TEMPLATES)[number]["id"];

export default function EmailsPage() {
  const [template, setTemplate] = useState<TemplateId>("welcome");
  const [name, setName] = useState("Alex");
  const [copied, setCopied] = useState(false);
  const [iframeKey, setIframeKey] = useState(0);

  const previewUrl = buildUrl(template, name);

  useEffect(() => {
    const t = setTimeout(() => setIframeKey((k) => k + 1), 300);
    return () => clearTimeout(t);
  }, [template, name]);

  const copyHtml = useCallback(async () => {
    const url = buildUrl(template, name).replace(
      "/api/email-preview/",
      "/api/email-html/"
    );
    const res = await fetch(url);
    const html = await res.text();
    await navigator.clipboard.writeText(html);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [template, name]);

  return (
    <div className="min-h-[100dvh] bg-cream pt-20 pb-12 px-4">
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
          <div className="flex flex-wrap gap-2 mb-5">
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
            <label className="flex flex-col gap-1.5 text-sm text-text-muted font-medium">
              First name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-border rounded-lg px-3 py-1.5 text-text text-sm w-36 bg-warm-white focus:outline-sage"
              />
            </label>

            <button
              onClick={copyHtml}
              className="ml-auto px-5 py-2 rounded-lg text-sm font-medium border border-gold text-gold-text hover:bg-gold hover:text-white transition-colors cursor-pointer"
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

function buildUrl(template: string, name: string) {
  const p = new URLSearchParams();
  if (name) p.set("name", name);
  const qs = p.toString();
  return `/api/email-preview/${template}${qs ? `?${qs}` : ""}`;
}
