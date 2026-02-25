import * as React from "react";

interface EmailDividerProps {
  ornament?: boolean;
}

export function EmailDivider({ ornament }: EmailDividerProps) {
  if (ornament) {
    return (
      <tr>
        <td style={{ padding: "32px 28px 0 28px", textAlign: "center" }}>
          <table
            role="presentation"
            cellPadding="0"
            cellSpacing="0"
            border={0}
            style={{ margin: "0 auto" }}
          >
            <tr>
              <td
                style={{
                  width: "60px",
                  height: "1px",
                  backgroundColor: "#C4A265",
                  opacity: 0.4,
                }}
              />
              <td
                style={{
                  padding: "0 10px",
                  fontFamily: "serif",
                  fontSize: "10px",
                  color: "#C4A265",
                  opacity: 0.6,
                  lineHeight: "1",
                }}
              >
                &#9830;
              </td>
              <td
                style={{
                  width: "60px",
                  height: "1px",
                  backgroundColor: "#C4A265",
                  opacity: 0.4,
                }}
              />
            </tr>
          </table>
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td style={{ padding: "32px 0 0 0", textAlign: "center" }}>
        <div
          style={{
            width: "60px",
            height: "1px",
            backgroundColor: "#C4A265",
            opacity: 0.4,
            margin: "0 auto",
          }}
        />
      </td>
    </tr>
  );
}
