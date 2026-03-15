"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface SignupFormProps {
  variant?: "default" | "dark";
}

export function SignupForm({ variant = "default" }: SignupFormProps) {
  const [email, setEmail]   = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]   = useState("");
  const router = useRouter();

  const isDark = variant === "dark";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Auto-authenticate using the token from the subscribe route
      if (data.token_hash) {
        const supabase = createClient();
        const { error: verifyError } = await supabase.auth.verifyOtp({
          token_hash: data.token_hash,
          type: "email",
        });
        if (verifyError) throw verifyError;
      }

      // Show success state briefly before redirect
      setLoading(false);
      setSuccess(true);
      setTimeout(() => router.push("/welcome"), 800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="signup"
        className="flex gap-2.5 max-w-[480px] mx-auto mb-4 flex-col sm:flex-row"
      >
        <input
          type="email"
          placeholder="your@email.com"
          aria-label="Email address"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 outline-none transition-all"
          style={{
            padding: "13px 18px",
            borderRadius: "12px",
            fontSize: "1rem",
            fontFamily: "var(--font-sans)",
            border: isDark
              ? "1.5px solid rgba(255,255,255,0.2)"
              : "1.5px solid var(--border)",
            background: isDark ? "rgba(255,255,255,0.1)" : "white",
            color: isDark ? "white" : "var(--text)",
            boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
          }}
          onFocus={(e) => {
            if (!isDark) {
              e.currentTarget.style.borderColor = "rgba(91,123,94,0.5)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,123,94,0.08)";
            }
          }}
          onBlur={(e) => {
            if (!isDark) {
              e.currentTarget.style.borderColor = "var(--border)";
              e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
            }
          }}
        />
        <button
          type="submit"
          disabled={loading || success}
          className="flex items-center justify-center gap-2 font-semibold font-sans border-none cursor-pointer transition-all active:scale-[0.98] disabled:opacity-70 whitespace-nowrap"
          style={{
            padding: "13px 24px",
            borderRadius: "12px",
            fontSize: "0.95rem",
            background: success
              ? "var(--sage-dark)"
              : isDark ? "var(--gold)" : "var(--sage)",
            color: isDark && !success ? "var(--text)" : "white",
            boxShadow: isDark
              ? "0 4px 14px rgba(196,162,101,0.3)"
              : "0 4px 14px rgba(91,123,94,0.25)",
            minHeight: "48px",
            transition: "background var(--duration-normal) ease, color var(--duration-normal) ease",
          }}
          onMouseEnter={(e) => {
            if (!loading && !success) {
              (e.currentTarget as HTMLButtonElement).style.background = isDark
                ? "var(--gold-light)"
                : "var(--sage-dark)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading && !success) {
              (e.currentTarget as HTMLButtonElement).style.background = isDark
                ? "var(--gold)"
                : "var(--sage)";
            }
          }}
        >
          {success ? (
            <>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                <path d="M5 13l4 4L19 7" />
              </svg>
              Welcome
            </>
          ) : loading ? (
            <>
              <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              Starting...
            </>
          ) : (
            <>
              Begin Day 1
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>

      {error && (
        <div
          role="alert"
          className="max-w-[480px] mx-auto rounded-xl px-4 py-3 text-sm text-center animate-fade-in"
          style={{
            background: "rgba(212,133,106,0.08)",
            color: "var(--terracotta)",
            border: "1px solid rgba(212,133,106,0.2)",
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
}
