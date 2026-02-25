import * as React from "react";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailQuoteBlock } from "../components/EmailQuoteBlock";
import { EmailDivider } from "../components/EmailDivider";
import { EmailCTA } from "../components/EmailCTA";
import { EmailFooter } from "../components/EmailFooter";
import { EmailProgressDots } from "../components/EmailProgressDots";
import { getPhase, getChapter } from "../lib/phases";

interface MilestoneEmailProps {
  day?: number;
  firstName?: string;
  dogName?: string;
  quote?: string;
  quoteAuthor?: string;
  preheader?: string;
  heading?: string;
  subheading?: string;
  bodyParagraphs?: string[];
}

export function MilestoneEmail({
  day = 7,
  firstName = "{{ subscriber.first_name }}",
  dogName = "{{ subscriber.dog_name }}",
  quote = "Almost everything will work again if you unplug it for a few minutes \u2014 including you.",
  quoteAuthor = "Anne Lamott",
  preheader,
  heading = "One week.",
  subheading = "You\u2019re doing this.",
  bodyParagraphs = [
    `You\u2019ve been doing this for ${day} days. That\u2019s ${day} days of a reality you didn\u2019t choose. ${day} mornings of waking up and remembering.`,
    "Today isn\u2019t about the treatment plan. Today is about the person behind it all. You.",
    "You\u2019re holding more than most people ever have to. And you\u2019ve been holding it. That matters. It deserves to be acknowledged.",
  ],
}: MilestoneEmailProps) {
  const phase = getPhase(day);
  const chapter = getChapter(day);
  const resolvedPreheader =
    preheader || `${day} days. You\u2019re doing this.`;

  return (
    <EmailLayout preview={resolvedPreheader}>
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        width="100%"
      >
        {/* Header with gold left accent */}
        <tr>
          <td
            className="header-bg"
            style={{
              background: "linear-gradient(135deg, #3E5740, #5B7B5E, #7A9A7D)",
              padding: "0",
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
                    width: "4px",
                    backgroundColor: "#C4A265",
                  }}
                />
                <td style={{ padding: "28px 28px 28px 24px" }}>
                  <table
                    role="presentation"
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    width="100%"
                  >
                    <tr>
                      <td style={{ verticalAlign: "middle" }}>
                        <div
                          style={{
                            fontFamily:
                              "Lora, Georgia, 'Times New Roman', serif",
                            fontSize: "28px",
                            fontWeight: 400,
                            lineHeight: "1.2",
                          }}
                        >
                          <span style={{ color: "#FFFFFF" }}>HSA</span>
                          <span style={{ color: "#C4A265" }}> Days</span>
                        </div>
                        <div
                          style={{
                            fontFamily:
                              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                            fontSize: "13px",
                            color: "rgba(255,255,255,0.7)",
                            letterSpacing: "0.04em",
                            marginTop: "4px",
                          }}
                        >
                          Day {day} &mdash; A Milestone
                        </div>
                      </td>
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
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Milestone heading */}
        <tr>
          <td
            style={{
              padding: "36px 28px 0 28px",
              textAlign: "center",
            }}
          >
            <div
              style={{
                fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                fontSize: "30px",
                fontWeight: 400,
                color: "#2D2D2D",
                lineHeight: "1.2",
                marginBottom: "6px",
              }}
              className="body-text"
            >
              {heading}
            </div>
            <div
              style={{
                fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                fontSize: "20px",
                fontStyle: "italic",
                color: "#5B7B5E",
                lineHeight: "1.3",
              }}
            >
              {subheading}
            </div>
          </td>
        </tr>

        {/* Ornament */}
        <EmailDivider ornament />

        {/* Greeting + body */}
        <tr>
          <td style={{ padding: "28px 28px 0 28px" }}>
            <div
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: "17px",
                color: "#2D2D2D",
                lineHeight: "1.65",
              }}
              className="body-text"
            >
              <p style={{ margin: "0 0 16px 0" }}>
                {firstName},
              </p>
              {bodyParagraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 16px 0" }}>
                  {p}
                </p>
              ))}
              <p
                style={{
                  margin: "0 0 16px 0",
                  fontWeight: "bold",
                  color: "#5B7B5E",
                }}
              >
                {dogName} is lucky to have you.
              </p>
            </div>
          </td>
        </tr>

        {/* Quote block with gold/phase border */}
        <EmailQuoteBlock
          quote={quote}
          author={quoteAuthor}
          borderColor={phase.quoteBorder}
        />

        {/* Ornament divider */}
        <EmailDivider ornament />

        {/* CTA */}
        <EmailCTA
          href={`https://hsadays.com/days/${day}?utm_source=kit&utm_medium=email&utm_campaign=milestone&utm_content=day${day}`}
        >
          Open your milestone
        </EmailCTA>

        {/* Signature */}
        <tr>
          <td style={{ padding: "24px 28px 0 28px" }}>
            <div
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: "15px",
                color: "#2D2D2D",
                lineHeight: "1.5",
              }}
              className="body-text"
            >
              &mdash; Chase
            </div>
          </td>
        </tr>

        {/* Divider */}
        <EmailDivider />

        {/* Chapter dots */}
        <EmailProgressDots day={day} />

        {/* Footer */}
        <EmailFooter closure={phase.closure} />
      </table>
    </EmailLayout>
  );
}

export default MilestoneEmail;
