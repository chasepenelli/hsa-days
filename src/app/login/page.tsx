"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Step = "email" | "code";

const RESEND_COOLDOWN = 60;

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Resend cooldown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  const sendCode = useCallback(async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({ email });

    if (error) {
      setError(error.message);
    } else {
      setStep("code");
      setResendTimer(RESEND_COOLDOWN);
      // Focus first code input after render
      setTimeout(() => inputRefs.current[0]?.focus(), 50);
    }
    setLoading(false);
  }, [email]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendCode();
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setCode(["", "", "", "", "", ""]);
    setError("");
    await sendCode();
  };

  const handleVerify = useCallback(async (digits: string[]) => {
    const token = digits.join("");
    if (token.length !== 6) return;

    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error: verifyError } = await supabase.auth.verifyOtp({
      email,
      token,
      type: "email",
    });

    if (verifyError) {
      setError(verifyError.message);
      setLoading(false);
      return;
    }

    // Post-auth: ensure subscriber record exists and route appropriately
    try {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const { data: existing } = await supabase
          .from("subscribers")
          .select("id, onboarding_completed")
          .eq("id", user.id)
          .single();

        if (!existing) {
          await supabase.from("subscribers").upsert(
            {
              id: user.id,
              email: user.email!,
              signup_source: "otp",
              has_digital_access: true,
            },
            { onConflict: "id" }
          );
          router.push("/welcome");
          return;
        }

        if (!existing.onboarding_completed) {
          router.push("/welcome");
          return;
        }
      }
    } catch {
      // If subscriber check fails, just go to /days
    }

    router.push("/days");
  }, [email, router]);

  const handleCodeChange = (index: number, value: string) => {
    // Only allow digits
    const digit = value.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[index] = digit;
    setCode(next);

    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all 6 digits filled
    if (digit && index === 5 && next.every((d) => d)) {
      handleVerify(next);
    }
  };

  const handleCodeKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
    if (e.key === "Enter" && code.every((d) => d)) {
      handleVerify(code);
    }
  };

  const handleCodePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    const next = [...code];
    for (let i = 0; i < 6; i++) {
      next[i] = pasted[i] || "";
    }
    setCode(next);
    // Focus last filled or the next empty
    const lastIdx = Math.min(pasted.length, 5);
    inputRefs.current[lastIdx]?.focus();

    if (pasted.length === 6) {
      handleVerify(next);
    }
  };

  const inputStyle = {
    padding: "14px 18px",
    border: "1.5px solid var(--border)",
    borderRadius: "14px",
    fontSize: "1rem",
    fontFamily: "var(--font-sans)",
    background: "white",
    color: "var(--text)",
    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "rgba(91,123,94,0.5)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,123,94,0.08)";
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    e.currentTarget.style.borderColor = "var(--border)";
    e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-6"
      style={{
        background: "linear-gradient(160deg, var(--cream) 0%, var(--warm-white) 50%, var(--warm-white) 100%)",
        paddingTop: "calc(80px + env(safe-area-inset-top))",
        paddingBottom: "40px",
      }}
    >
      <div className="max-w-[400px] w-full">

        {/* Brand mark */}
        <div className="text-center mb-10">
          <Link
            href="/"
            className="inline-block font-serif text-[1.35rem] font-semibold no-underline tracking-tight mb-8"
            style={{ color: "var(--sage-dark)" }}
          >
            HSA <span style={{ color: "var(--gold)" }}>Days</span>
          </Link>

          {step === "code" ? (
            <div className="animate-fade-in-up">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(91,123,94,0.1)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" style={{ color: "var(--sage)" }}>
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h1 className="font-serif text-[1.7rem] font-semibold text-text mb-3 leading-snug">
                Enter your code
              </h1>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We sent a 6-digit code to{" "}
                <strong style={{ color: "var(--text)" }}>{email}</strong>.
                <br />
                Check your inbox (and spam folder).
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-[1.9rem] font-semibold text-text mb-2.5 leading-snug">
                Welcome back
              </h1>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Enter your email and we&apos;ll send you a code to sign in.
                No passwords needed.
              </p>
            </>
          )}
        </div>

        {/* Step 1: Email */}
        {step === "email" && (
          <div className="animate-fade-in-up">
            <form onSubmit={handleEmailSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none transition-all"
                  style={inputStyle}
                  onFocus={handleInputFocus}
                  onBlur={handleInputBlur}
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2.5 font-semibold font-sans border-none cursor-pointer transition-all active:scale-[0.98] disabled:opacity-70"
                style={{
                  padding: "14px 24px",
                  background: loading ? "var(--sage-light)" : "var(--sage)",
                  color: "white",
                  borderRadius: "14px",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 14px rgba(91,123,94,0.25)",
                  minHeight: "52px",
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "var(--sage-dark)";
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "var(--sage)";
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Code
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-[0.88rem] text-center animate-fade-in"
                  style={{
                    background: "rgba(212,133,106,0.08)",
                    color: "var(--terracotta)",
                    border: "1px solid rgba(212,133,106,0.2)",
                  }}
                >
                  {error}
                </div>
              )}
            </form>

            {/* Separator */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
              <span className="text-[0.75rem]" style={{ color: "var(--text-muted)", opacity: 0.5 }}>or</span>
              <div className="flex-1 h-px" style={{ background: "var(--border)" }} />
            </div>

            <p className="text-center text-[0.88rem]" style={{ color: "var(--text-muted)" }}>
              Don&apos;t have an account?{" "}
              <a
                href="/#signup"
                className="font-medium no-underline transition-colors hover:opacity-80"
                style={{ color: "var(--sage)" }}
              >
                Start free
              </a>
            </p>
          </div>
        )}

        {/* Step 2: Code */}
        {step === "code" && (
          <div className="animate-fade-in-up">
            <div className="space-y-4">
              {/* 6-digit code inputs */}
              <div className="flex justify-center gap-2.5" onPaste={handleCodePaste}>
                {code.map((digit, i) => (
                  <input
                    key={i}
                    ref={(el) => { inputRefs.current[i] = el; }}
                    type="text"
                    inputMode="numeric"
                    autoComplete={i === 0 ? "one-time-code" : "off"}
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleCodeChange(i, e.target.value)}
                    onKeyDown={(e) => handleCodeKeyDown(i, e)}
                    onFocus={(e) => {
                      e.currentTarget.select();
                      handleInputFocus(e);
                    }}
                    onBlur={handleInputBlur}
                    className="outline-none transition-all text-center font-semibold"
                    style={{
                      width: "48px",
                      height: "56px",
                      border: "1.5px solid var(--border)",
                      borderRadius: "12px",
                      fontSize: "1.4rem",
                      fontFamily: "var(--font-sans)",
                      background: "white",
                      color: "var(--text)",
                      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                    }}
                  />
                ))}
              </div>

              <button
                onClick={() => handleVerify(code)}
                disabled={loading || !code.every((d) => d)}
                className="w-full flex items-center justify-center gap-2.5 font-semibold font-sans border-none cursor-pointer transition-all active:scale-[0.98] disabled:opacity-70"
                style={{
                  padding: "14px 24px",
                  background: loading || !code.every((d) => d) ? "var(--sage-light)" : "var(--sage)",
                  color: "white",
                  borderRadius: "14px",
                  fontSize: "0.95rem",
                  boxShadow: "0 4px 14px rgba(91,123,94,0.25)",
                  minHeight: "52px",
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.background = "var(--sage-dark)";
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget as HTMLButtonElement).style.background =
                    code.every((d) => d) ? "var(--sage)" : "var(--sage-light)";
                }}
              >
                {loading ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Verify & Sign In
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {error && (
                <div
                  className="rounded-xl px-4 py-3 text-[0.88rem] text-center animate-fade-in"
                  style={{
                    background: "rgba(212,133,106,0.08)",
                    color: "var(--terracotta)",
                    border: "1px solid rgba(212,133,106,0.2)",
                  }}
                >
                  {error}
                </div>
              )}

              {/* Resend + back */}
              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => { setStep("email"); setCode(["", "", "", "", "", ""]); setError(""); }}
                  className="text-[0.85rem] font-medium bg-transparent border-none cursor-pointer transition-colors"
                  style={{ color: "var(--text-muted)" }}
                >
                  &larr; Different email
                </button>
                <button
                  onClick={handleResend}
                  disabled={resendTimer > 0}
                  className="text-[0.85rem] font-medium bg-transparent border-none cursor-pointer transition-colors disabled:opacity-50"
                  style={{ color: resendTimer > 0 ? "var(--text-muted)" : "var(--sage)" }}
                >
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend code"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom reassurance */}
        {step === "email" && (
          <p
            className="text-center text-[0.78rem] mt-8 italic"
            style={{ color: "var(--text-muted)", opacity: 0.45 }}
          >
            Free forever &middot; No passwords &middot; Just you and your dog
          </p>
        )}
      </div>
    </div>
  );
}
