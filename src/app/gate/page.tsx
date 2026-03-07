"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function GatePage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [entered, setEntered] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      setEntered(true);
      setTimeout(() => {
        window.location.href = "/";
      }, 900);
    } else {
      setError(true);
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--warm-white)",
        padding: "24px",
        fontFamily: "var(--font-sans)",
        position: "relative",
        overflow: "hidden",
        opacity: entered ? 0 : 1,
        transition: "opacity 0.8s ease",
      }}
    >
      {/* Paper grain texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='400' height='400' filter='url(%23n)'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
        }}
        aria-hidden="true"
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute pointer-events-none"
        aria-hidden="true"
        style={{
          top: "20%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "500px",
          height: "500px",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(91,123,94,0.06) 0%, transparent 65%)",
        }}
      />

      <div
        style={{
          maxWidth: 380,
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Wordmark */}
        <div
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo)",
            transitionDelay: "0.15s",
          }}
        >
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "1.8rem",
              fontWeight: 600,
              color: "var(--sage-dark)",
              marginBottom: 6,
              lineHeight: 1.2,
              letterSpacing: "-0.02em",
            }}
          >
            HSA <span style={{ color: "var(--gold)" }}>Days</span>
          </h1>
        </div>

        {/* Ornamental rule */}
        <div
          className="flex items-center justify-center gap-3 mx-auto"
          style={{
            marginBottom: 28,
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.8s ease",
            transitionDelay: "0.4s",
          }}
        >
          <div
            className="h-px"
            style={{
              width: "40px",
              background: "linear-gradient(to right, transparent, var(--gold))",
              opacity: 0.5,
            }}
          />
          <Image
            src="/illustrations/icons/icon-flower-ornament.webp"
            alt=""
            width={12}
            height={12}
            style={{ objectFit: "contain", opacity: 0.5 }}
          />
          <div
            className="h-px"
            style={{
              width: "40px",
              background: "linear-gradient(to left, transparent, var(--gold))",
              opacity: 0.5,
            }}
          />
        </div>

        {/* Invitation text */}
        <p
          className="font-serif italic"
          style={{
            fontSize: "1.05rem",
            color: "var(--text)",
            opacity: mounted ? 0.75 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.7s ease, transform 0.7s var(--ease-out-expo)",
            transitionDelay: "0.55s",
            marginBottom: 32,
            lineHeight: 1.65,
            maxWidth: 320,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          You&apos;ve been invited to preview something
          we&apos;re building with love.
        </p>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          style={{
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.7s ease, transform 0.7s var(--ease-out-expo)",
            transitionDelay: "0.75s",
          }}
        >
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoFocus
            style={{
              width: "100%",
              height: 48,
              padding: "0 20px",
              border: error ? "1.5px solid var(--terracotta)" : "1.5px solid var(--border)",
              borderRadius: 14,
              fontSize: "1rem",
              fontFamily: "inherit",
              background: "white",
              color: "var(--text)",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 14,
              transition: "border-color var(--duration-normal) ease, box-shadow var(--duration-normal) ease",
            }}
            onFocus={(e) => {
              if (!error) {
                e.currentTarget.style.borderColor = "var(--sage)";
                e.currentTarget.style.boxShadow = "0 0 0 3px rgba(91,123,94,0.12)";
              }
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = error ? "var(--terracotta)" : "var(--border)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              height: 48,
              background: loading ? "var(--sage-light)" : "var(--sage)",
              color: "white",
              border: "none",
              borderRadius: 14,
              fontSize: "0.95rem",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 14px rgba(91,123,94,0.25)",
              transition: "background var(--duration-fast) ease, transform var(--duration-fast) var(--ease-out-expo), box-shadow var(--duration-fast) ease",
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.background = "var(--sage-dark)";
                e.currentTarget.style.transform = "translateY(-1px)";
                e.currentTarget.style.boxShadow = "0 6px 20px rgba(91,123,94,0.32)";
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = loading ? "var(--sage-light)" : "var(--sage)";
              e.currentTarget.style.transform = "translateY(0)";
              e.currentTarget.style.boxShadow = "0 4px 14px rgba(91,123,94,0.25)";
            }}
          >
            {loading ? "Checking..." : "Enter"}
          </button>
          {error && (
            <p
              style={{
                marginTop: 14,
                fontSize: "0.85rem",
                color: "var(--terracotta)",
                fontStyle: "italic",
              }}
            >
              That doesn&apos;t seem right. Try again?
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
