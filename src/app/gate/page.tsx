"use client";

import { useState } from "react";

export default function GatePage() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

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
      window.location.href = "/";
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
        background: "linear-gradient(160deg, #F5F0EA 0%, #FAF8F5 50%, #FAF8F5 100%)",
        padding: "20px",
        fontFamily: "var(--font-sans)",
      }}
    >
      <div style={{ maxWidth: 360, width: "100%", textAlign: "center" }}>
        <h1
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "1.5rem",
            fontWeight: 600,
            color: "#3E5740",
            marginBottom: 8,
          }}
        >
          HSA <span style={{ color: "#C4A265" }}>Days</span>
        </h1>
        <p
          style={{
            fontSize: "0.88rem",
            color: "#6B6B6B",
            marginBottom: 28,
          }}
        >
          This site is under development.
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "14px 18px",
              border: error ? "1.5px solid #D4856A" : "1.5px solid #E8E4DF",
              borderRadius: 14,
              fontSize: "1rem",
              fontFamily: "inherit",
              background: "white",
              color: "#2D2D2D",
              outline: "none",
              boxSizing: "border-box",
              marginBottom: 12,
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "14px 24px",
              background: loading ? "#7A9A7D" : "#5B7B5E",
              color: "white",
              border: "none",
              borderRadius: 14,
              fontSize: "0.95rem",
              fontWeight: 600,
              fontFamily: "inherit",
              cursor: loading ? "wait" : "pointer",
              boxShadow: "0 4px 14px rgba(91,123,94,0.25)",
            }}
          >
            {loading ? "Checking..." : "Enter"}
          </button>
          {error && (
            <p
              style={{
                marginTop: 12,
                fontSize: "0.85rem",
                color: "#D4856A",
              }}
            >
              Incorrect password.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
