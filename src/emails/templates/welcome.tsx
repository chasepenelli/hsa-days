import * as React from "react";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailQuoteBlock } from "../components/EmailQuoteBlock";
import { EmailDivider } from "../components/EmailDivider";
import { EmailCTA } from "../components/EmailCTA";
import { EmailFooter } from "../components/EmailFooter";

interface WelcomeEmailProps {
  firstName?: string;
  quote?: string;
  quoteAuthor?: string;
}

export function WelcomeEmail({
  firstName = "{{ subscriber.first_name }}",
  quote = "Grief is the price we pay for love.",
  quoteAuthor = "Queen Elizabeth II",
}: WelcomeEmailProps) {
  return (
    <EmailLayout preview="One email a day. One day at a time. Here's what to expect.">
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        width="100%"
      >
        {/* Header */}
        <EmailHeader
          illustrationUrl="https://hsadays.com/illustrations/journal/day01-illust.png"
          tagline="A 30-day companion for what you're going through"
        />

        {/* Ornament divider */}
        <EmailDivider ornament />

        {/* Greeting */}
        <tr>
          <td style={{ padding: "32px 28px 0 28px" }}>
            <div
              style={{
                fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                fontSize: "22px",
                color: "#2D2D2D",
                lineHeight: "1.4",
                marginBottom: "20px",
              }}
              className="body-text"
            >
              Dear {firstName},
            </div>
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
                I&rsquo;m glad you&rsquo;re here &mdash; even though I know you
                wish you didn&rsquo;t have to be.
              </p>
              <p style={{ margin: "0 0 16px 0" }}>
                Starting tomorrow, you&rsquo;ll get one short email each morning.
                A quote, a few words, and a link to that day&rsquo;s reflection on
                the site. That&rsquo;s it. No overwhelm. No homework.
              </p>
            </div>
          </td>
        </tr>

        {/* Quote block */}
        <EmailQuoteBlock quote={quote} author={quoteAuthor} />

        {/* How it works */}
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
                A few things to know:
              </p>
            </div>

            {/* Expectation 1 */}
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="100%"
              style={{ marginBottom: "16px" }}
            >
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingRight: "12px",
                    width: "20px",
                    fontFamily: "serif",
                    fontSize: "14px",
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
                    fontSize: "16px",
                    color: "#2D2D2D",
                    lineHeight: "1.65",
                  }}
                  className="body-text"
                >
                  <strong>Go at your own pace.</strong> If you miss a day, it&rsquo;ll
                  be there when you&rsquo;re ready. There&rsquo;s no clock.
                </td>
              </tr>
            </table>

            {/* Expectation 2 */}
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="100%"
              style={{ marginBottom: "16px" }}
            >
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingRight: "12px",
                    width: "20px",
                    fontFamily: "serif",
                    fontSize: "14px",
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
                    fontSize: "16px",
                    color: "#2D2D2D",
                    lineHeight: "1.65",
                  }}
                  className="body-text"
                >
                  <strong>Your journal is private.</strong> Nobody else sees it.
                  It&rsquo;s yours, always.
                </td>
              </tr>
            </table>

            {/* Expectation 3 */}
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="100%"
              style={{ marginBottom: "8px" }}
            >
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingRight: "12px",
                    width: "20px",
                    fontFamily: "serif",
                    fontSize: "14px",
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
                    fontSize: "16px",
                    color: "#2D2D2D",
                    lineHeight: "1.65",
                  }}
                  className="body-text"
                >
                  <strong>Completely free.</strong> No trial, no premium tier. I
                  built this because I needed it and it didn&rsquo;t exist.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Transition */}
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
              In the meantime, Day 1 is already waiting for you.
            </div>
          </td>
        </tr>

        {/* CTA */}
        <EmailCTA href="https://hsadays.com/days/1?utm_source=kit&utm_medium=email&utm_campaign=welcome&utm_content=start">
          Begin Day 1
        </EmailCTA>

        {/* Divider */}
        <EmailDivider />

        {/* P.S. block */}
        <tr>
          <td style={{ padding: "28px 28px 0 28px" }}>
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
                      fontSize: "15px",
                      color: "#2D2D2D",
                      lineHeight: "1.65",
                    }}
                    className="body-text"
                  >
                    If today is a particularly hard day &mdash; if you just got
                    the call, if you&rsquo;re sitting in the parking lot at the
                    vet &mdash; just start Day 1. It&rsquo;s short. It won&rsquo;t
                    ask much of you. It&rsquo;ll just say:{" "}
                    <em style={{ color: "#5B7B5E" }}>
                      you&rsquo;re not alone in this.
                    </em>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

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

        {/* Footer */}
        <EmailFooter closure="There&rsquo;s no rush." />
      </table>
    </EmailLayout>
  );
}

export default WelcomeEmail;
