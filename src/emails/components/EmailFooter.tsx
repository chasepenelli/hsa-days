import * as React from "react";

interface EmailFooterProps {
  closure: string;
  pauseUrl?: string;
  unsubscribeUrl?: string;
}

export function EmailFooter({
  closure,
  pauseUrl = "{{ unsubscribe_url }}",
  unsubscribeUrl = "{{ unsubscribe_url }}",
}: EmailFooterProps) {
  return (
    <>
      {/* Layer 1: Emotional closure */}
      <tr>
        <td style={{ padding: "32px 32px 0 32px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Lora, Georgia, 'Times New Roman', serif",
              fontSize: "15px",
              fontStyle: "italic",
              color: "#6B6B6B",
              lineHeight: "1.5",
            }}
            className="muted-text"
          >
            {closure}
          </div>
        </td>
      </tr>

      {/* Layer 2: Functional footer */}
      <tr>
        <td
          className="footer-bg"
          style={{
            padding: "20px 32px 32px 32px",
          }}
        >
          <div
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
              fontSize: "13px",
              color: "#6B6B6B",
              lineHeight: "1.5",
              textAlign: "center" as const,
            }}
            className="muted-text"
          >
            Need a break?{" "}
            <a
              href={pauseUrl}
              style={{
                color: "#5B7B5E",
                textDecoration: "underline",
              }}
            >
              Take a few days off
            </a>
            {" "}&mdash; your place will be kept.
            <br />
            Or{" "}
            <a
              href={unsubscribeUrl}
              style={{
                color: "#9A9490",
                textDecoration: "underline",
              }}
            >
              stop receiving these emails
            </a>
            .
          </div>
        </td>
      </tr>
    </>
  );
}
