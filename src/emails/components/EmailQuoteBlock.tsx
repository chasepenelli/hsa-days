import * as React from "react";

interface EmailQuoteBlockProps {
  quote: string;
  author: string;
  borderColor?: string;
}

export function EmailQuoteBlock({
  quote,
  author,
  borderColor = "#5B7B5E",
}: EmailQuoteBlockProps) {
  return (
    <tr>
      <td style={{ padding: "28px 28px 0 28px" }}>
        <table
          role="presentation"
          cellPadding="0"
          cellSpacing="0"
          border={0}
          width="100%"
          className="quote-block"
          style={{
            backgroundColor: "#F5F0EA",
            borderRadius: "0 6px 6px 0",
            borderLeft: `3px solid ${borderColor}`,
          }}
        >
          <tr>
            <td style={{ padding: "24px 28px" }}>
              <div
                style={{
                  fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                  fontSize: "20px",
                  fontStyle: "italic",
                  color: "#2D2D2D",
                  lineHeight: "1.55",
                  marginBottom: "12px",
                }}
                className="body-text"
              >
                &ldquo;{quote}&rdquo;
              </div>
              <div
                style={{
                  fontFamily:
                    "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#C4A265",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                }}
              >
                {author}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  );
}
