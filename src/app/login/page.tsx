"use client";

import { useState, useEffect, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Step = "email" | "sent";

const RESEND_COOLDOWN = 60;

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resendTimer, setResendTimer] = useState(0);

  // Resend cooldown timer
  useEffect(() => {
    if (resendTimer <= 0) return;
    const interval = setInterval(() => {
      setResendTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [resendTimer]);

  // Check if user is already authenticated (e.g. came back from magic link)
  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        supabase
          .from("subscribers")
          .select("onboarding_completed")
          .eq("id", user.id)
          .single()
          .then(({ data }) => {
            if (data?.onboarding_completed) {
              router.push("/days");
            } else {
              router.push("/welcome");
            }
          });
      }
    });
  }, [router]);

  const sendMagicLink = useCallback(async () => {
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/api/auth/callback`,
      },
    });

    if (error) {
      setError(error.message);
    } else {
      setStep("sent");
      setResendTimer(RESEND_COOLDOWN);
    }
    setLoading(false);
  }, [email]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendMagicLink();
  };

  const handleResend = async () => {
    if (resendTimer > 0) return;
    setError("");
    await sendMagicLink();
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
      className="min-h-[100dvh] flex items-center justify-center px-6"
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

          {step === "sent" ? (
            <div className="animate-fade-in-up">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(91,123,94,0.1)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" style={{ color: "var(--sage)" }}>
                  <path d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h1 className="font-serif text-[1.7rem] font-semibold text-text mb-3 leading-snug">
                Check your email
              </h1>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We sent a sign-in link to{" "}
                <strong style={{ color: "var(--text)" }}>{email}</strong>.
                <br />
                Click the link to sign in.
              </p>
            </div>
          ) : (
            <>
              <h1 className="font-serif text-[1.9rem] font-semibold text-text mb-2.5 leading-snug">
                Welcome back
              </h1>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Enter your email and we&apos;ll send you a link to sign in.
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
                  aria-label="Email address"
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
                    Send Sign-In Link
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>

              {error && (
                <div
                  role="alert"
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

        {/* Step 2: Check email */}
        {step === "sent" && (
          <div className="animate-fade-in-up">
            <div className="space-y-4">
              {/* Tip */}
              <div
                className="rounded-xl px-4 py-3 text-[0.88rem] text-center"
                style={{
                  background: "rgba(91,123,94,0.06)",
                  color: "var(--text-muted)",
                  border: "1px solid rgba(91,123,94,0.12)",
                }}
              >
                Check your spam folder if you don&apos;t see it in a minute.
              </div>

              {error && (
                <div
                  role="alert"
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
                  onClick={() => { setStep("email"); setError(""); }}
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
                  {resendTimer > 0 ? `Resend in ${resendTimer}s` : "Resend link"}
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
