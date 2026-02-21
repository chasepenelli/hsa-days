"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface SignupFormProps {
  variant?: "default" | "dark";
}

const PIN_LENGTH = 4;

export function SignupForm({ variant = "default" }: SignupFormProps) {
  const [email, setEmail] = useState("");
  const [pin, setPin] = useState(Array(PIN_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const pinRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isDark = variant === "dark";

  const handlePinChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...pin];
    next[index] = digit;
    setPin(next);

    if (digit && index < PIN_LENGTH - 1) {
      pinRefs.current[index + 1]?.focus();
    }
  };

  const handlePinKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      pinRefs.current[index - 1]?.focus();
    }
  };

  const handlePinPaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, PIN_LENGTH);
    if (!pasted) return;
    const next = [...pin];
    for (let i = 0; i < PIN_LENGTH; i++) {
      next[i] = pasted[i] || "";
    }
    setPin(next);
    const lastIdx = Math.min(pasted.length, PIN_LENGTH - 1);
    pinRefs.current[lastIdx]?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const pinValue = pin.join("");
    if (pinValue.length !== PIN_LENGTH) {
      setError("Please enter a 4-digit PIN");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, pin: pinValue }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      // Sign in with the PIN
      const supabase = createClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: "hsadays" + pinValue,
      });
      if (signInError) throw signInError;

      router.push("/welcome");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        id="signup"
        className="max-w-[480px] mx-auto mb-4"
      >
        {/* Email row */}
        <div className="flex gap-2.5 flex-col sm:flex-row mb-3">
          <input
            type="email"
            placeholder="your@email.com"
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
        </div>

        {/* PIN row */}
        <div className="flex items-center gap-3 mb-3 justify-center sm:justify-start">
          <span
            className="text-[0.82rem] font-medium whitespace-nowrap"
            style={{ color: isDark ? "rgba(255,255,255,0.7)" : "var(--text-muted)" }}
          >
            Choose a 4-digit PIN
          </span>
          <div className="flex gap-1.5" onPaste={handlePinPaste}>
            {pin.map((digit, i) => (
              <input
                key={i}
                ref={(el) => { pinRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handlePinChange(i, e.target.value)}
                onKeyDown={(e) => handlePinKeyDown(i, e)}
                onFocus={(e) => {
                  e.currentTarget.select();
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
                className="outline-none transition-all text-center font-semibold"
                style={{
                  width: "44px",
                  height: "48px",
                  border: isDark
                    ? "1.5px solid rgba(255,255,255,0.2)"
                    : "1.5px solid var(--border)",
                  borderRadius: "10px",
                  fontSize: "1.25rem",
                  fontFamily: "var(--font-sans)",
                  background: isDark ? "rgba(255,255,255,0.1)" : "white",
                  color: isDark ? "white" : "var(--text)",
                  boxShadow: isDark ? "none" : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              />
            ))}
          </div>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 font-semibold font-sans border-none cursor-pointer transition-all active:scale-[0.98] disabled:opacity-70 whitespace-nowrap"
          style={{
            padding: "13px 24px",
            borderRadius: "12px",
            fontSize: "0.95rem",
            background: isDark ? "var(--gold)" : "var(--sage)",
            color: isDark ? "var(--text)" : "white",
            boxShadow: isDark
              ? "0 4px 14px rgba(196,162,101,0.3)"
              : "0 4px 14px rgba(91,123,94,0.25)",
            minHeight: "48px",
          }}
          onMouseEnter={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.background = isDark
                ? "var(--gold-light)"
                : "var(--sage-dark)";
            }
          }}
          onMouseLeave={(e) => {
            if (!loading) {
              (e.currentTarget as HTMLButtonElement).style.background = isDark
                ? "var(--gold)"
                : "var(--sage)";
            }
          }}
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-current/30 border-t-current rounded-full animate-spin" />
              Starting...
            </>
          ) : (
            <>
              Start Day 1
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-3.5 h-3.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </>
          )}
        </button>
      </form>

      {error && (
        <div
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
