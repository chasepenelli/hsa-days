"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import type { DocumentAnalysis } from "@/lib/resources/types";

type Status = "idle" | "uploading" | "analyzing" | "result" | "error";

interface VetDocAnalyzerProps {
  dogName: string;
  isAuthenticated: boolean;
}

export function VetDocAnalyzer({ dogName, isAuthenticated }: VetDocAnalyzerProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [result, setResult] = useState<DocumentAnalysis["analysis_json"] | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [pastAnalyses, setPastAnalyses] = useState<DocumentAnalysis[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load past analyses on mount
  useEffect(() => {
    if (!isAuthenticated) return;
    fetch("/api/documents/analyze")
      .then((r) => r.json())
      .then((d) => setPastAnalyses(d.analyses ?? []))
      .catch(() => {});
  }, [isAuthenticated]);

  const handleFileSelect = useCallback((f: File) => {
    if (f.size > 10 * 1024 * 1024) {
      setErrorMsg("File must be under 10MB");
      return;
    }
    const validTypes = [
      "image/jpeg",
      "image/png",
      "image/webp",
      "application/pdf",
    ];
    if (!validTypes.includes(f.type)) {
      setErrorMsg("Please upload a JPG, PNG, WebP, or PDF file");
      return;
    }
    setErrorMsg("");
    setFile(f);
    setFileName(f.name);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      const f = e.dataTransfer.files[0];
      if (f) handleFileSelect(f);
    },
    [handleFileSelect]
  );

  const handleAnalyze = async () => {
    if (!file && !pastedText.trim()) return;

    setStatus(file ? "uploading" : "analyzing");
    setErrorMsg("");

    const formData = new FormData();
    if (file) {
      formData.append("file", file);
    } else {
      formData.append("text", pastedText.trim());
    }

    try {
      setStatus("analyzing");
      const res = await fetch("/api/documents/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.analysis) {
        setResult(data.analysis);
        setStatus("result");
        // Refresh past analyses
        fetch("/api/documents/analyze")
          .then((r) => r.json())
          .then((d) => setPastAnalyses(d.analyses ?? []))
          .catch(() => {});
      } else {
        setErrorMsg(data.error || "Analysis failed");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Something went wrong. Please try again.");
      setStatus("error");
    }
  };

  const reset = () => {
    setStatus("idle");
    setFile(null);
    setFileName(null);
    setPastedText("");
    setResult(null);
    setErrorMsg("");
  };

  if (!isAuthenticated) {
    return (
      <div className="text-center py-16">
        <h2
          className="font-serif text-[clamp(1.4rem,3vw,1.8rem)] font-semibold mb-4"
          style={{ color: "var(--text)" }}
        >
          Understand {dogName}&apos;s vet reports
        </h2>
        <p
          className="text-[0.95rem] leading-relaxed mb-8 max-w-[420px] mx-auto"
          style={{ color: "var(--text-muted)" }}
        >
          Upload lab results, bloodwork, or imaging reports and get a
          plain-English explanation. Sign in to get started.
        </p>
        <Link
          href="/login"
          className="bg-sage text-white px-6 py-3 rounded-xl font-semibold text-[0.95rem] no-underline"
          style={{ boxShadow: "0 4px 14px rgba(91,123,94,0.3)" }}
        >
          Sign in to analyze
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="font-serif text-[clamp(1.6rem,3.5vw,2.2rem)] font-semibold mb-3"
          style={{ color: "var(--text)" }}
        >
          Understand {dogName}&apos;s vet reports
        </h1>
        <p
          className="text-[0.95rem] leading-relaxed"
          style={{ color: "var(--text-muted)" }}
        >
          Upload lab results, bloodwork, or imaging reports — or paste
          values directly. We&apos;ll explain what they mean in plain English.
        </p>
      </div>

      {/* ── Idle: Upload + Text input ── */}
      {(status === "idle" || status === "error") && (
        <div className="space-y-5">
          {/* Drop zone */}
          <div
            onClick={() => fileInputRef.current?.click()}
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            className="rounded-2xl p-8 text-center cursor-pointer transition-all duration-200 hover:border-sage"
            style={{
              border: file
                ? "2px solid var(--sage)"
                : "2px dashed var(--border-strong)",
              background: file
                ? "rgba(91,123,94,0.04)"
                : "rgba(255,255,255,0.6)",
            }}
          >
            {file ? (
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(91,123,94,0.1)" }}
                >
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6 2h5l5 5v11a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"
                      stroke="var(--sage)"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M11 2v5h5"
                      stroke="var(--sage)"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
                <div className="text-left">
                  <p
                    className="text-[0.9rem] font-medium"
                    style={{ color: "var(--text)" }}
                  >
                    {fileName}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setFile(null);
                      setFileName(null);
                    }}
                    className="text-[0.78rem] font-medium cursor-pointer"
                    style={{
                      color: "var(--text-muted)",
                      background: "none",
                      border: "none",
                    }}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div
                  className="w-14 h-14 rounded-full mx-auto mb-3 flex items-center justify-center"
                  style={{ background: "rgba(91,123,94,0.08)" }}
                >
                  <Image
                    src="/illustrations/icons/icon-upload-cloud.png"
                    alt=""
                    width={24}
                    height={24}
                    style={{ objectFit: "contain" }}
                  />
                </div>
                <p
                  className="text-[0.9rem] font-medium mb-1"
                  style={{ color: "var(--text)" }}
                >
                  Drop a vet report or click to upload
                </p>
                <p
                  className="text-[0.78rem]"
                  style={{ color: "var(--text-muted)" }}
                >
                  JPG, PNG, WebP, or PDF &middot; Max 10MB
                </p>
              </>
            )}
          </div>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) handleFileSelect(f);
            }}
          />

          {/* Divider */}
          <div className="flex items-center gap-4">
            <div
              className="flex-1 h-px"
              style={{ background: "var(--border)" }}
            />
            <span
              className="text-[0.75rem] font-medium uppercase tracking-[0.1em]"
              style={{ color: "var(--text-muted)" }}
            >
              or paste values
            </span>
            <div
              className="flex-1 h-px"
              style={{ background: "var(--border)" }}
            />
          </div>

          {/* Text input */}
          <textarea
            value={pastedText}
            onChange={(e) => setPastedText(e.target.value)}
            rows={4}
            placeholder="Paste lab values, bloodwork results, or vet notes here..."
            className="w-full px-4 py-3.5 rounded-xl text-[0.9rem] resize-none transition-all duration-200"
            style={{
              background: "white",
              border: "1.5px solid var(--border-strong)",
              color: "var(--text)",
              outline: "none",
            }}
            onFocus={(e) => (e.target.style.borderColor = "var(--sage)")}
            onBlur={(e) =>
              (e.target.style.borderColor = "var(--border-strong)")
            }
          />

          {errorMsg && (
            <p
              className="text-[0.85rem] text-center"
              style={{ color: "var(--terracotta)" }}
            >
              {errorMsg}
            </p>
          )}

          {/* Analyze button */}
          <button
            onClick={handleAnalyze}
            disabled={!file && !pastedText.trim()}
            className="w-full py-3.5 rounded-xl font-semibold text-[0.95rem] transition-all duration-200 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            style={{
              background: "var(--sage)",
              color: "white",
              boxShadow:
                file || pastedText.trim()
                  ? "0 4px 14px rgba(91,123,94,0.3)"
                  : "none",
            }}
          >
            Analyze
          </button>
        </div>
      )}

      {/* ── Analyzing spinner ── */}
      {(status === "uploading" || status === "analyzing") && (
        <div className="text-center py-16">
          <div
            className="w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center"
            style={{
              background: "rgba(91,123,94,0.08)",
              animationName: "breathe",
              animationDuration: "2s",
              animationIterationCount: "infinite",
              animationTimingFunction: "ease-in-out",
            }}
          >
            <Image
              src="/illustrations/icons/icon-heart.png"
              alt=""
              width={22}
              height={22}
              style={{ objectFit: "contain" }}
            />
          </div>
          <p
            className="font-serif text-[1.05rem] font-medium mb-1"
            style={{ color: "var(--text)" }}
          >
            {status === "uploading"
              ? "Uploading..."
              : "Analyzing your document..."}
          </p>
          <p className="text-[0.82rem]" style={{ color: "var(--text-muted)" }}>
            This usually takes 10-20 seconds
          </p>
        </div>
      )}

      {/* ── Result ── */}
      {status === "result" && result && (
        <div className="space-y-5">
          {/* Summary */}
          <div
            className="rounded-2xl p-6"
            style={{
              background: "white",
              border: "1px solid var(--border)",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <h3
              className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] mb-3"
              style={{ color: "var(--gold-text)" }}
            >
              Summary
            </h3>
            <p
              className="text-[0.95rem] leading-relaxed"
              style={{ color: "var(--text)" }}
            >
              {result.summary}
            </p>
          </div>

          {/* Key Findings */}
          {result.key_findings?.length > 0 && (
            <div
              className="rounded-2xl p-6"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] mb-3"
                style={{ color: "var(--sage)" }}
              >
                Key Findings
              </h3>
              <ul className="space-y-2">
                {result.key_findings.map((f, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[0.9rem]"
                    style={{ color: "var(--text)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: "var(--sage)" }}
                    />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Flagged Concerns */}
          <div
            className="rounded-2xl p-6"
            style={{
              background:
                result.flagged_concerns?.length > 0
                  ? "rgba(212,133,106,0.06)"
                  : "rgba(91,123,94,0.04)",
              border:
                result.flagged_concerns?.length > 0
                  ? "1px solid rgba(212,133,106,0.2)"
                  : "1px solid rgba(91,123,94,0.15)",
            }}
          >
            <h3
              className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] mb-3"
              style={{
                color:
                  result.flagged_concerns?.length > 0
                    ? "var(--terracotta)"
                    : "var(--sage)",
              }}
            >
              {result.flagged_concerns?.length > 0
                ? "Flagged Concerns"
                : "Nothing Flagged"}
            </h3>
            {result.flagged_concerns?.length > 0 ? (
              <ul className="space-y-2">
                {result.flagged_concerns.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[0.9rem]"
                    style={{ color: "var(--text)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: "var(--terracotta)" }}
                    />
                    {c}
                  </li>
                ))}
              </ul>
            ) : (
              <p
                className="text-[0.9rem]"
                style={{ color: "var(--text-muted)" }}
              >
                All values appear within expected ranges. That&apos;s
                encouraging.
              </p>
            )}
          </div>

          {/* Suggested Questions */}
          {result.suggested_questions?.length > 0 && (
            <div
              className="rounded-2xl p-6"
              style={{
                background: "white",
                border: "1px solid var(--border)",
              }}
            >
              <h3
                className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] mb-3"
                style={{ color: "var(--gold-text)" }}
              >
                Questions for Your Vet
              </h3>
              <ul className="space-y-2">
                {result.suggested_questions.map((q, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-[0.9rem]"
                    style={{ color: "var(--text)" }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: "var(--gold)" }}
                    />
                    {q}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclaimer */}
          <p
            className="text-[0.78rem] italic text-center px-4"
            style={{ color: "var(--text-muted)", opacity: 0.7 }}
          >
            {result.disclaimer}
          </p>

          {/* Reset */}
          <button
            onClick={reset}
            className="w-full py-3 rounded-xl font-medium text-[0.9rem] transition-all duration-200 cursor-pointer"
            style={{
              background: "transparent",
              color: "var(--sage)",
              border: "1.5px solid var(--sage)",
            }}
          >
            Analyze another report
          </button>
        </div>
      )}

      {/* ── Past Analyses ── */}
      {pastAnalyses.length > 0 && status === "idle" && (
        <div>
          <h3
            className="text-[0.72rem] font-semibold uppercase tracking-[0.08em] mb-4"
            style={{ color: "var(--gold-text)" }}
          >
            Previous Analyses
          </h3>
          <div className="space-y-2">
            {pastAnalyses.map((a) => (
              <button
                key={a.id}
                onClick={() => {
                  if (a.analysis_json) {
                    setResult(a.analysis_json);
                    setStatus("result");
                  }
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors duration-200 cursor-pointer hover:bg-cream/50"
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{
                    background: a.analysis_json
                      ? "var(--sage)"
                      : "var(--text-muted)",
                  }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className="text-[0.85rem] font-medium truncate"
                    style={{ color: "var(--text)" }}
                  >
                    {a.file_name || `${a.input_type} analysis`}
                  </p>
                  <p
                    className="text-[0.72rem]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    {new Date(a.created_at).toLocaleDateString()}
                  </p>
                </div>
                {a.analysis_json ? (
                  <span
                    className="text-[0.72rem] font-medium"
                    style={{ color: "var(--sage)" }}
                  >
                    View
                  </span>
                ) : (
                  <span
                    className="text-[0.72rem]"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Failed
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
