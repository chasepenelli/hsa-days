import * as React from "react";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailQuoteBlock } from "../components/EmailQuoteBlock";
import { EmailDivider } from "../components/EmailDivider";
import { EmailCTA } from "../components/EmailCTA";
import { EmailFooter } from "../components/EmailFooter";
import { EmailProgressDots } from "../components/EmailProgressDots";
import { getPhase } from "../lib/phases";

type TeaserType = "reflection" | "activity" | "journal" | "insight" | "resource";

interface TeaserItem {
  type: TeaserType;
  label: string;
}

const TEASER_ICONS: Record<TeaserType, string> = {
  reflection: "https://hsadays.com/illustrations/icons/icon-read-reflect.png",
  activity: "https://hsadays.com/illustrations/icons/icon-dog-person.png",
  journal: "https://hsadays.com/illustrations/icons/icon-journal.png",
  insight: "https://hsadays.com/illustrations/icons/icon-lightbulb.png",
  resource: "https://hsadays.com/illustrations/icons/icon-heart.png",
};

/* ---------- Teaser rotation ----------
   5 combos so the "Today includes" card feels different each day.
   Cycles through all 5 types: reflection, activity, journal, insight, resource. */
const TEASER_COMBOS: TeaserItem[][] = [
  [
    { type: "reflection", label: "A short reflection" },
    { type: "activity", label: "A grounding activity" },
    { type: "journal", label: "A journal prompt" },
  ],
  [
    { type: "reflection", label: "Today\u2019s reflection" },
    { type: "journal", label: "A journal prompt" },
    { type: "insight", label: "A practical insight" },
  ],
  [
    { type: "activity", label: "A gentle activity" },
    { type: "journal", label: "A journal prompt" },
    { type: "insight", label: "A helpful tip" },
  ],
  [
    { type: "reflection", label: "A quiet reflection" },
    { type: "activity", label: "Something to try" },
    { type: "insight", label: "A practical tip" },
  ],
  [
    { type: "reflection", label: "Today\u2019s reflection" },
    { type: "insight", label: "A practical insight" },
    { type: "resource", label: "A helpful resource" },
  ],
];

function getDefaultTeaserItems(day: number): TeaserItem[] {
  return TEASER_COMBOS[(day - 1) % TEASER_COMBOS.length];
}

interface DailyDripEmailProps {
  day?: number;
  firstName?: string;
  title?: string;
  quote?: string;
  quoteAuthor?: string;
  preheader?: string;
  bodyParagraphs?: string[];
  teaserItems?: TeaserItem[];
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
  teaserItems,
}: DailyDripEmailProps) {
  const resolvedTeaserItems = teaserItems ?? getDefaultTeaserItems(day);
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
          <td style={{ padding: "24px 32px 0 32px" }}>
            <div
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: "11px",
                fontWeight: 600,
                color: "#C4A265",
                letterSpacing: "0.1em",
                textTransform: "uppercase" as const,
                marginBottom: "8px",
              }}
            >
              Day {day} of 30
            </div>
            <div
              style={{
                fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                fontSize: "26px",
                fontWeight: 400,
                color: "#2D2D2D",
                lineHeight: "1.25",
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
          <td style={{ padding: "24px 32px 0 32px" }}>
            <div
              style={{
                fontFamily:
                  "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                fontSize: "16px",
                color: "#2D2D2D",
                lineHeight: "1.6",
              }}
              className="body-text"
            >
              <p style={{ margin: "0 0 14px 0" }}>
                Hey {firstName},
              </p>
              {bodyParagraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 14px 0" }}>
                  {p}
                </p>
              ))}
            </div>
          </td>
        </tr>

        {/* "Today includes" teaser card */}
        <tr>
          <td style={{ padding: "20px 32px 0 32px" }}>
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
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "#C4A265",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase" as const,
                      marginBottom: "12px",
                    }}
                  >
                    Today includes
                  </div>
                  <table
                    role="presentation"
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    width="100%"
                  >
                    <tr>
                      {resolvedTeaserItems.map((item, i) => (
                        <td
                          key={i}
                          align="center"
                          valign="top"
                          width={`${Math.floor(100 / resolvedTeaserItems.length)}%`}
                          style={{ padding: "0 4px" }}
                        >
                          <img
                            src={TEASER_ICONS[item.type]}
                            alt={item.label}
                            width="36"
                            height="36"
                            style={{
                              display: "block",
                              margin: "0 auto",
                              opacity: 0.8,
                              border: "0",
                            }}
                          />
                          <div
                            style={{
                              fontFamily:
                                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                              fontSize: "13px",
                              color: "#5B5550",
                              marginTop: "8px",
                              lineHeight: "1.4",
                            }}
                          >
                            {item.label}
                          </div>
                        </td>
                      ))}
                    </tr>
                  </table>
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
