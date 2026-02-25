import * as React from "react";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailQuoteBlock } from "../components/EmailQuoteBlock";
import { EmailDivider } from "../components/EmailDivider";
import { EmailCTA } from "../components/EmailCTA";
import { EmailFooter } from "../components/EmailFooter";
import { EmailProgressDots } from "../components/EmailProgressDots";
import { getPhase } from "../lib/phases";

interface CompletionEmailProps {
  firstName?: string;
  dogName?: string;
}

export function CompletionEmail({
  firstName = "{{ subscriber.first_name }}",
  dogName = "{{ subscriber.dog_name }}",
}: CompletionEmailProps) {
  const phase = getPhase(30);

  return (
    <EmailLayout preview="Thirty days. You did this.">
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        width="100%"
      >
        {/* Header with milestone gold top border + day 30 illustration */}
        <EmailHeader
          illustrationUrl="https://hsadays.com/illustrations/journal/day30-illust.png"
          variant="milestone"
        />

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
                marginBottom: "6px",
              }}
              className="body-text"
            >
              Thirty days.
            </div>
            <div
              style={{
                fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                fontSize: "18px",
                fontStyle: "italic",
                color: "#5B7B5E",
                lineHeight: "1.35",
              }}
            >
              You did this.
            </div>
          </td>
        </tr>

        {/* Ornament */}
        <EmailDivider ornament />

        {/* Letter body */}
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
                {firstName},
              </p>
              <p style={{ margin: "0 0 14px 0" }}>
                Thirty days ago, you started something most people never do. You
                looked at the hardest thing you&rsquo;ve been carrying and said:{" "}
                <em>I&rsquo;m going to sit with this.</em>
              </p>
              <p style={{ margin: "0 0 14px 0" }}>
                This wasn&rsquo;t easy. None of it was. Some days probably felt
                impossible. Some days you might have wondered what the point was.
                But you kept showing up &mdash; and that matters more than you
                know.
              </p>
              <p
                style={{
                  margin: "0 0 14px 0",
                  fontWeight: "bold",
                  color: "#5B7B5E",
                }}
              >
                {dogName} would be proud of you.
              </p>
              <p style={{ margin: "0 0 14px 0" }}>
                The journal is yours forever. So is everything you wrote. You can
                go back to any day, any time. These reflections don&rsquo;t
                expire &mdash; and neither does what you built by showing up for
                them.
              </p>
            </div>
          </td>
        </tr>

        {/* Quote block */}
        <EmailQuoteBlock
          quote="What we once enjoyed and deeply loved we can never lose, for all that we love deeply becomes part of us."
          author="Helen Keller"
          borderColor={phase.quoteBorder}
        />

        {/* Share card */}
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
                <td style={{ padding: "20px 24px", textAlign: "center" }}>
                  <img
                    src="https://hsadays.com/illustrations/icons/icon-share.png"
                    alt="Share your story"
                    width="36"
                    height="36"
                    style={{
                      display: "block",
                      margin: "0 auto 10px auto",
                      opacity: 0.8,
                      border: "0",
                    }}
                  />
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
                    Share your story
                  </div>
                  <div
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                      fontSize: "14px",
                      color: "#5B5550",
                      lineHeight: "1.5",
                      marginBottom: "10px",
                    }}
                  >
                    If you&rsquo;d like, your story could help someone
                    who&rsquo;s just starting.
                  </div>
                  <a
                    href="https://hsadays.com/community?utm_source=kit&utm_medium=email&utm_campaign=completion"
                    style={{
                      fontFamily:
                        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
                      fontSize: "13px",
                      color: "#5B7B5E",
                      textDecoration: "underline",
                    }}
                  >
                    Share with the community
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Ornament divider */}
        <EmailDivider ornament />

        {/* Progress dots — all 30 filled */}
        <EmailProgressDots day={30} />

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
              With love,
              <br />
              &mdash; Chase
            </div>
          </td>
        </tr>

        {/* Footer */}
        <EmailFooter closure="What a journey this has been." />
      </table>
    </EmailLayout>
  );
}

export default CompletionEmail;
