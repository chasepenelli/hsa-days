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
    <EmailLayout preview="Everything you need for your dog's HSA journey — all in one place.">
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        width="100%"
      >
        {/* Header */}
        <EmailHeader
          illustrationUrl="https://hsadays.com/illustrations/resources/resource-hub-hero.png"
          tagline="The most complete HSA resource for dog owners"
        />

        {/* Ornament divider */}
        <EmailDivider ornament />

        {/* Greeting */}
        <tr>
          <td style={{ padding: "28px 32px 0 32px" }}>
            <div
              style={{
                fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                fontSize: "20px",
                color: "#2D2D2D",
                lineHeight: "1.35",
                marginBottom: "18px",
              }}
              className="body-text"
            >
              Dear {firstName},
            </div>
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
                I&rsquo;m glad you&rsquo;re here &mdash; even though I know you
                wish you didn&rsquo;t have to be.
              </p>
              <p style={{ margin: "0 0 14px 0" }}>
                HSA Days has everything we&rsquo;ve gathered to help you navigate
                this &mdash; supplements, nutrition guides, emergency
                resources, treatment info, and tools to track your dog&rsquo;s
                health. All free, all in one place.
              </p>
            </div>
          </td>
        </tr>

        {/* Quote block */}
        <EmailQuoteBlock quote={quote} author={quoteAuthor} />

        {/* What's inside */}
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
                Here&rsquo;s what&rsquo;s waiting for you:
              </p>
            </div>

            {/* Resource 1 */}
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="100%"
              style={{ marginBottom: "10px" }}
            >
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingRight: "10px",
                    width: "16px",
                    fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                    fontSize: "12px",
                    color: "#C4A265",
                    lineHeight: "1.6",
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
                    lineHeight: "1.6",
                  }}
                  className="body-text"
                >
                  <strong>Supplement Guide</strong> &mdash; 17 research-backed
                  supplements with weight-adjusted doses and evidence levels.
                </td>
              </tr>
            </table>

            {/* Resource 2 */}
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="100%"
              style={{ marginBottom: "10px" }}
            >
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingRight: "10px",
                    width: "16px",
                    fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                    fontSize: "12px",
                    color: "#C4A265",
                    lineHeight: "1.6",
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
                    lineHeight: "1.6",
                  }}
                  className="body-text"
                >
                  <strong>Health Tracker</strong> &mdash; Log daily symptoms,
                  medications, and vet visits. See trends over time.
                </td>
              </tr>
            </table>

            {/* Resource 3 */}
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border={0}
              width="100%"
              style={{ marginBottom: "4px" }}
            >
              <tr>
                <td
                  style={{
                    verticalAlign: "top",
                    paddingRight: "10px",
                    width: "16px",
                    fontFamily: "Lora, Georgia, 'Times New Roman', serif",
                    fontSize: "12px",
                    color: "#C4A265",
                    lineHeight: "1.6",
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
                    lineHeight: "1.6",
                  }}
                  className="body-text"
                >
                  <strong>Vet Report Analysis</strong> &mdash; Upload bloodwork
                  or lab results and get a plain-English explanation.
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Transition */}
        <tr>
          <td style={{ padding: "20px 32px 0 32px" }}>
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
              Start with whatever feels most urgent. Everything is ready for you.
            </div>
          </td>
        </tr>

        {/* CTA */}
        <EmailCTA href="https://hsadays.com/resources?utm_source=kit&utm_medium=email&utm_campaign=welcome&utm_content=start">
          Explore Resources
        </EmailCTA>

        {/* Divider */}
        <EmailDivider />

        {/* P.S. block */}
        <tr>
          <td style={{ padding: "24px 32px 0 32px" }}>
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
                      lineHeight: "1.6",
                    }}
                    className="body-text"
                  >
                    If today is a particularly hard day &mdash; if you just got
                    the call, if you&rsquo;re sitting in the parking lot at the
                    vet &mdash; start with the{" "}
                    <a href="https://hsadays.com/resources/emergency" style={{ color: "#5B7B5E" }}>
                      emergency guide
                    </a>
                    . It&rsquo;ll tell you exactly what to watch for and what
                    to do.{" "}
                    <em style={{ color: "#5B7B5E" }}>
                      You&rsquo;re not alone in this.
                    </em>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

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

export default WelcomeEmail;
