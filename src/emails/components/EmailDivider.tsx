import * as React from "react";

interface EmailDividerProps {
  ornament?: boolean;
}

export function EmailDivider({ ornament }: EmailDividerProps) {
  if (ornament) {
    return (
      <tr>
        <td style={{ padding: "32px 28px 0 28px", textAlign: "center" }}>
          <div
            style={{
              fontFamily: "serif",
              fontSize: "11px",
              color: "#C4A265",
              opacity: 0.4,
              letterSpacing: "0.3em",
              lineHeight: "1",
            }}
          >
            &middot;&nbsp;&nbsp;&middot;&nbsp;&nbsp;&middot;
          </div>
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
