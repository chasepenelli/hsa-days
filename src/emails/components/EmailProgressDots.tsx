import * as React from "react";
import { CHAPTERS, getChapter } from "../lib/phases";

interface EmailProgressDotsProps {
  day: number;
}

export function EmailProgressDots({ day }: EmailProgressDotsProps) {
  const currentChapter = getChapter(day);

  return (
    <tr>
      <td style={{ padding: "24px 32px 0 32px", textAlign: "center" }}>
        <table
          role="presentation"
          cellPadding="0"
          cellSpacing="0"
          border={0}
          style={{ margin: "0 auto" }}
        >
          <tr>
            {CHAPTERS.map((ch) => {
              const isCompleted = day > ch.days[1];
              const isCurrent =
                day >= ch.days[0] && day <= ch.days[1];

              return (
                <td key={ch.number} style={{ padding: "0 5px" }}>
                  <div
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: isCompleted || isCurrent
                        ? ch.dotColor
                        : "transparent",
                      border: isCurrent
                        ? `2px solid ${ch.dotColor}`
                        : isCompleted
                        ? "none"
                        : "2px solid #E8E4DF",
                      boxSizing: "border-box" as const,
                    }}
                  />
                </td>
              );
            })}
          </tr>
        </table>
        <div
          style={{
            fontFamily:
              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
            fontSize: "11px",
            fontWeight: 600,
            color: "#9A9490",
            marginTop: "8px",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
          }}
          className="muted-text"
        >
          Day {day} &mdash; {currentChapter.label}
        </div>
      </td>
    </tr>
  );
}
