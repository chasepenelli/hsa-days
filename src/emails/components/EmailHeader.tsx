import * as React from "react";

interface EmailHeaderProps {
  illustrationUrl?: string;
  variant?: "default" | "milestone";
  tagline?: string;
}

export function EmailHeader({
  illustrationUrl,
  variant = "default",
  tagline,
}: EmailHeaderProps) {
  const isMilestone = variant === "milestone";

  return (
    <tr>
      <td
        style={{
          backgroundColor: "#F5F0EA",
          padding: "32px 28px 28px 28px",
          textAlign: "center",
          ...(isMilestone
            ? { borderTop: "2px solid #C4A265" }
            : {}),
        }}
      >
        {/* Paw print brand mark */}
        <img
          src="https://hsadays.com/illustrations/icons/icon-paw-print.png"
          alt=""
          width="24"
          height="24"
          style={{
            display: "block",
            margin: "0 auto 12px auto",
            width: "24px",
            height: "24px",
            opacity: 0.6,
          }}
        />

        {/* HSA Days wordmark */}
        <div
          style={{
            fontFamily: "Lora, Georgia, 'Times New Roman', serif",
            fontSize: "28px",
            fontWeight: 400,
            lineHeight: "1.2",
          }}
        >
          <span style={{ color: "#5B7B5E" }}>HSA</span>
          <span style={{ color: "#C4A265" }}> Days</span>
        </div>

        {tagline && (
          <div
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
              fontSize: "13px",
              color: "#8A8580",
              letterSpacing: "0.04em",
              marginTop: "6px",
            }}
          >
            {tagline}
          </div>
        )}

        {/* Gold hairline separator */}
        <div
          style={{
            width: "60px",
            height: "1px",
            backgroundColor: "#C4A265",
            opacity: 0.3,
            margin: "20px auto",
          }}
        />

        {/* Day illustration */}
        {illustrationUrl && (
          <img
            src={illustrationUrl}
            alt=""
            width="180"
            style={{
              display: "block",
              margin: "0 auto",
              width: "180px",
              height: "auto",
              maxWidth: "100%",
            }}
          />
        )}
      </td>
    </tr>
  );
}
