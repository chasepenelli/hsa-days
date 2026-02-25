import * as React from "react";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailDivider } from "../components/EmailDivider";
import { EmailCTA } from "../components/EmailCTA";
import { EmailFooter } from "../components/EmailFooter";

type NudgeVariant = "not-started" | "dropped-off";

interface NudgeEmailProps {
  firstName?: string;
  variant?: NudgeVariant;
  lastDay?: number;
}

const VARIANT_CONTENT: Record<
  NudgeVariant,
  {
    preheader: string;
    heading: string;
    body: (firstName: string, lastDay: number) => string[];
    ctaLabel: (lastDay: number) => string;
    ctaDay: (lastDay: number) => number;
  }
> = {
  "not-started": {
    preheader: "Day 1 is still waiting.",
    heading: "Still here.",
    body: (firstName) => [
      `${firstName},`,
      "No rush. No guilt. No expiration date.",
      "Day 1 is exactly where you left it. It\u2019s short, it\u2019s gentle, and it\u2019ll be there whenever you\u2019re ready.",
      "Some people start right away. Some people need a few weeks. Both are fine. There\u2019s no wrong time.",
    ],
    ctaLabel: () => "Open Day 1",
    ctaDay: () => 1,
  },
  "dropped-off": {
    preheader: "Your place has been kept.",
    heading: "Your place is kept.",
    body: (firstName, lastDay) => [
      `${firstName},`,
      "Life pulled you away. That\u2019s okay \u2014 this isn\u2019t something you can fall behind on.",
      `You were on Day ${lastDay}. It\u2019s right where you left it. Your journal is still there. Everything you wrote is still yours.`,
      "Whenever you\u2019re ready, the next page is waiting.",
    ],
    ctaLabel: (lastDay) => `Pick up Day ${lastDay}`,
    ctaDay: (lastDay) => lastDay,
  },
};

export function NudgeEmail({
  firstName = "{{ subscriber.first_name }}",
  variant = "not-started",
  lastDay = 5,
}: NudgeEmailProps) {
  const content = VARIANT_CONTENT[variant];
  const paragraphs = content.body(firstName, lastDay);
  const ctaDay = content.ctaDay(lastDay);

  return (
    <EmailLayout preview={content.preheader}>
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        width="100%"
      >
        {/* Header — generic, no day-specific illustration */}
        <EmailHeader />

        {/* Ornament divider */}
        <EmailDivider ornament />

        {/* Heading */}
        <tr>
          <td
            style={{
              padding: "32px 32px 0 32px",
              textAlign: "center",
            }}
          >
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
              {content.heading}
            </div>
          </td>
        </tr>

        {/* Body */}
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
              {paragraphs.map((p, i) => (
                <p key={i} style={{ margin: "0 0 14px 0" }}>
                  {p}
                </p>
              ))}
            </div>
          </td>
        </tr>

        {/* CTA */}
        <EmailCTA
          href={`https://hsadays.com/days/${ctaDay}?utm_source=kit&utm_medium=email&utm_campaign=nudge`}
        >
          {content.ctaLabel(lastDay)}
        </EmailCTA>

        {/* Signature */}
        <tr>
          <td style={{ padding: "24px 32px 0 32px" }}>
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

        {/* Footer */}
        <EmailFooter closure="There&rsquo;s no rush." />
      </table>
    </EmailLayout>
  );
}

export default NudgeEmail;
