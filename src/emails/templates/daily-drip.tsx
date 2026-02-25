import * as React from "react";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailQuoteBlock } from "../components/EmailQuoteBlock";
import { EmailDivider } from "../components/EmailDivider";
import { EmailCTA } from "../components/EmailCTA";
import { EmailFooter } from "../components/EmailFooter";
import { EmailProgressDots } from "../components/EmailProgressDots";
import { getPhase } from "../lib/phases";

interface DailyDripEmailProps {
  day?: number;
  firstName?: string;
  title?: string;
  quote?: string;
  quoteAuthor?: string;
  preheader?: string;
  bodyParagraphs?: string[];
  teaserItems?: string[];
}

export function DailyDripEmail({
  day = 1,
  firstName = "{{ subscriber.first_name }}",
  title = "Giving Yourself Permission",
  quote = "The wound is the place where the Light enters you.",
  quoteAuthor = "Rumi",
  preheader = "Today\u2019s reflection is waiting for you.",
  bodyParagraphs = [
    "If you\u2019re reading this, you probably just heard a word you wish you never had to learn. A word that changes the shape of everything \u2014 the next vet visit, the next walk, the next time they look at you and you think how much time do we have?",
    "Today isn\u2019t about having a plan. Today is about one thing: giving yourself permission to feel whatever you\u2019re feeling right now.",
    "Shock. Anger. Nothing at all. All of it is correct.",
  ],
  teaserItems = ["A short reflection", "A grounding activity", "A journal prompt"],
}: DailyDripEmailProps) {
  const phase = getPhase(day);
  const dayPadded = String(day).padStart(2, "0");
  const illustrationUrl = `https://hsadays.com/illustrations/journal/day${dayPadded}-illust.png`;

  return (
    <EmailLayout preview={preheader}>
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        width="100%"
      >
        {/* Header with day illustration */}
        <EmailHeader illustrationUrl={illustrationUrl} />

        {/* Ornament divider */}
        <EmailDivider ornament />

        {/* Day label + title */}
        <tr>
          <td style={{ padding: "28px 28px 0 28px" }}>
            <div
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#C4A265",
                letterSpacing: "0.12em",
                textTransform: "uppercase" as const,
                marginBottom: "8px",
              }}
            >
              Day {day} of 30
            </div>
            <div
              style={{
                fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                fontSize: "30px",
                fontWeight: 400,
                color: "#2D2D2D",
                lineHeight: "1.2",
              }}
              className="body-text"
            >
              {title}
            </div>
          </td>
        </tr>

        {/* Quote block */}
        <EmailQuoteBlock
          quote={quote}
          author={quoteAuthor}
          borderColor={phase.quoteBorder}
        />

        {/* Body paragraphs */}
        <tr>
          <td style={{ padding: "24px 28px 0 28px" }}>
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
                Hey {firstName},
              </p>
              {bodyParagraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 16px 0" }}>
                  {p}
                </p>
              ))}
            </div>
          </td>
        </tr>

        {/* "Today includes" teaser card */}
        <tr>
          <td style={{ padding: "12px 28px 0 28px" }}>
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="100%"
              className="teaser-card"
              style={{
                backgroundColor: "#F5F0EA",
                borderRadius: "8px",
              }}
            >
              <tr>
                <td style={{ padding: "20px 24px" }}>
                  <div
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: "#C4A265",
                      letterSpacing: "0.12em",
                      textTransform: "uppercase" as const,
                      marginBottom: "12px",
                    }}
                  >
                    Today includes
                  </div>
                  {teaserItems.map((item, i) => (
                    <table
                      key={i}
                      role="presentation"
                      cellPadding="0"
                      cellSpacing="0"
                      border={0}
                      width="100%"
                      style={{
                        marginBottom: i < teaserItems.length - 1 ? "8px" : "0",
                      }}
                    >
                      <tr>
                        <td
                          style={{
                            verticalAlign: "top",
                            paddingRight: "10px",
                            width: "16px",
                            fontFamily: "serif",
                            fontSize: "12px",
                            color: "#C4A265",
                            lineHeight: "1.65",
                          }}
                        >
                          &#10047;
                        </td>
                        <td
                          style={{
                            verticalAlign: "top",
                            fontFamily:
                              "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                            fontSize: "15px",
                            color: "#2D2D2D",
                            lineHeight: "1.65",
                          }}
                          className="body-text"
                        >
                          {item}
                        </td>
                      </tr>
                    </table>
                  ))}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* CTA */}
        <EmailCTA
          href={`https://hsadays.com/days/${day}?utm_source=kit&utm_medium=email&utm_campaign=drip&utm_content=day${day}`}
        >
          Read today&rsquo;s reflection
        </EmailCTA>

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

export default DailyDripEmail;
