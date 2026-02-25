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
          backgroundColor: "#5B7B5E",
          textAlign: "center",
          ...(isMilestone
            ? { borderTop: "3px solid #C4A265" }
            : {}),
          ...(illustrationUrl
            ? {
                backgroundImage: `url(${illustrationUrl})`,
                backgroundSize: "420px auto",
                backgroundPosition: "center center",
                backgroundRepeat: "no-repeat",
              }
            : {}),
        }}
      >
        {/* Green gradient wash — ghosts illustration + adds soft gradient */}
        <div
          style={{
            background:
              "linear-gradient(180deg, rgba(74, 107, 77, 0.93) 0%, rgba(91, 123, 94, 0.86) 100%)",
            padding: "28px 32px 24px 32px",
          }}
        >
          {/* Paw print brand mark */}
          <img
            src="https://hsadays.com/illustrations/icons/icon-paw-print.png"
            alt=""
            width="22"
            height="22"
            style={{
              display: "block",
              margin: "0 auto 10px auto",
              width: "22px",
              height: "22px",
              opacity: 0.7,
              filter: "brightness(10)",
            }}
          />

          {/* HSA Days wordmark */}
          <div
            style={{
              fontFamily: "Lora, Georgia, 'Times New Roman', serif",
              fontSize: "26px",
              fontWeight: 400,
              lineHeight: "1.2",
              letterSpacing: "0.01em",
            }}
          >
            <span style={{ color: "#FFFFFF" }}>HSA</span>
            <span style={{ color: "#E2C882" }}> Days</span>
          </div>

          {tagline && (
            <div
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: "13px",
                color: "rgba(255, 255, 255, 0.7)",
                letterSpacing: "0.03em",
                marginTop: "6px",
              }}
            >
              {tagline}
            </div>
          )}

          {/* Gold hairline separator */}
          <div
            style={{
              width: "48px",
              height: "1px",
              backgroundColor: "#C4A265",
              opacity: 0.5,
              margin: "16px auto 0 auto",
            }}
          />
        </div>
      </td>
    </tr>
  );
}
