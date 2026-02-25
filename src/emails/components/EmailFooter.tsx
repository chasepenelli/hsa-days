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
        <td style={{ padding: "32px 28px 0 28px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "Lora, Georgia, 'Times New Roman', serif",
              fontSize: "15px",
              fontStyle: "italic",
              color: "#6B6B6B",
              lineHeight: "1.55",
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
            padding: "24px 28px 28px 28px",
            marginTop: "32px",
          }}
        >
          <div
            style={{
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
              fontSize: "13px",
              color: "#6B6B6B",
              lineHeight: "1.6",
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
