"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail]   = useState("");
  const [sent, setSent]     = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]   = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
      setSent(true);
    }
    setLoading(false);
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

          {sent ? (
            <div className="animate-fade-in-up">
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-5"
                style={{ background: "rgba(91,123,94,0.1)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="w-7 h-7" style={{ color: "var(--sage)" }}>
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h1 className="font-serif text-[1.7rem] font-semibold text-text mb-3 leading-snug">
                Check your email
              </h1>
              <p className="text-[0.95rem] leading-relaxed" style={{ color: "var(--text-muted)" }}>
                We sent a magic link to{" "}
                <strong style={{ color: "var(--text)" }}>{email}</strong>.
                <br />
                Click it to continue your journey.
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

        {!sent && (
          <div className="animate-fade-in-up">
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full outline-none transition-all"
                  style={{
                    padding: "14px 18px",
                    border: "1.5px solid var(--border)",
                    borderRadius: "14px",
                    fontSize: "1rem",
                    fontFamily: "var(--font-sans)",
                    background: "white",
                    color: "var(--text)",
                    boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.borderColor = "rgba(91,123,94,0.5)";
                    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,123,94,0.08)";
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "0 1px 4px rgba(0,0,0,0.04)";
                  }}
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
                    Send Magic Link
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

        {/* Bottom reassurance */}
        {!sent && (
          <p
            className="text-center text-[0.78rem] mt-8 italic"
            style={{ color: "var(--text-muted)", opacity: 0.45 }}
          >
            Free forever &middot; No passwords &middot; Just you and your dog
          </p>
        )}

        {sent && (
          <div className="text-center mt-6 animate-fade-in">
            <button
              onClick={() => { setSent(false); setEmail(""); }}
              className="text-[0.85rem] no-underline font-medium transition-colors bg-transparent border-none cursor-pointer"
              style={{ color: "var(--text-muted)", opacity: 0.6 }}
            >
              Use a different email
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
