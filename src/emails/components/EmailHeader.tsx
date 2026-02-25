import * as React from "react";

interface EmailHeaderProps {
  day?: number;
  centered?: boolean;
  tagline?: string;
}

export function EmailHeader({ day, centered, tagline }: EmailHeaderProps) {
  return (
    <tr>
      <td
        className="header-bg"
        style={{
          background: "linear-gradient(135deg, #3E5740, #5B7B5E, #7A9A7D)",
          padding: centered ? "32px 28px" : "24px 28px",
        }}
      >
        <table
          role="presentation"
          cellPadding="0"
          cellSpacing="0"
          border={0}
          width="100%"
        >
          <tr>
            <td
              style={{
                verticalAlign: "middle",
                textAlign: centered ? "center" : "left",
              }}
            >
              <div
                style={{
                  fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                  fontSize: "28px",
                  fontWeight: 400,
                  lineHeight: "1.2",
                }}
              >
                <span style={{ color: "#FFFFFF" }}>HSA</span>
                <span style={{ color: "#C4A265" }}> Days</span>
              </div>
              {tagline && (
                <div
                  style={{
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                    fontSize: "13px",
                    color: "rgba(255,255,255,0.7)",
                    letterSpacing: "0.06em",
                    marginTop: "6px",
                  }}
                >
                  {tagline}
                </div>
              )}
            </td>
            {day !== undefined && !centered && (
              <td
                style={{
                  verticalAlign: "middle",
                  textAlign: "right",
                }}
              >
                <div
                  style={{
                    fontFamily:
                      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "#C4A265",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase" as const,
                  }}
                >
                  DAY {day}
                </div>
              </td>
            )}
          </tr>
        </table>
      </td>
    </tr>
  );
}
