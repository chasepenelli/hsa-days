import * as React from "react";
import { EmailLayout } from "../components/EmailLayout";
import { EmailHeader } from "../components/EmailHeader";
import { EmailDivider } from "../components/EmailDivider";
import { EmailCTA } from "../components/EmailCTA";
import { EmailFooter } from "../components/EmailFooter";

interface LaunchEmailProps {
  firstName?: string;
}

export function LaunchEmail({
  firstName = "{{ subscriber.first_name }}",
}: LaunchEmailProps) {
  return (
    <EmailLayout preview="HSA Days is live. Your 30-day companion is ready.">
      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border={0}
        width="100%"
      >
        {/* Header */}
        <EmailHeader
          tagline="The wait is over"
          illustrationUrl="https://hsadays.com/illustrations/home/home-hero-bg.png"
        />

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
                marginBottom: "6px",
              }}
              className="body-text"
            >
              It&rsquo;s here.
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
              Your 30-day companion is ready.
            </div>
          </td>
        </tr>

        {/* Ornament */}
        <EmailDivider ornament />

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
              <p style={{ margin: "0 0 14px 0" }}>
                {firstName},
              </p>
              <p style={{ margin: "0 0 14px 0" }}>
                A few months ago, I sat on the floor of my apartment the night
                after losing my dog and thought: I wish something existed for
                this. Something gentle. Something that didn&rsquo;t try to fix
                it &mdash; just walked beside me through it.
              </p>
              <p style={{ margin: "0 0 14px 0" }}>
                Nothing did. So I built it.
              </p>
              <p style={{ margin: "0 0 14px 0" }}>
                HSA Days is a free, 30-day companion for people navigating
                pet loss or a difficult diagnosis. One day at a time. One
                reflection at a time. No rush, no pressure, no homework.
                Just a quiet space that meets you where you are.
              </p>
            </div>
          </td>
        </tr>

        {/* Feature card */}
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
                    What&rsquo;s inside
                  </div>
                  <table
                    role="presentation"
                    cellPadding="0"
                    cellSpacing="0"
                    border={0}
                    width="100%"
                  >
                    <tr>
                      <td
                        align="center"
                        valign="top"
                        width="33%"
                        style={{ padding: "0 4px" }}
                      >
                        <img
                          src="https://hsadays.com/illustrations/icons/icon-read-reflect.png"
                          alt="Daily reflections"
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
                          Daily reflections
                        </div>
                      </td>
                      <td
                        align="center"
                        valign="top"
                        width="33%"
                        style={{ padding: "0 4px" }}
                      >
                        <img
                          src="https://hsadays.com/illustrations/icons/icon-journal.png"
                          alt="A private journal"
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
                          A private journal
                        </div>
                      </td>
                      <td
                        align="center"
                        valign="top"
                        width="33%"
                        style={{ padding: "0 4px" }}
                      >
                        <img
                          src="https://hsadays.com/illustrations/icons/icon-community.png"
                          alt="A gentle community"
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
                          A gentle community
                        </div>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* CTA */}
        <EmailCTA href="https://hsadays.com/days/1?utm_source=kit&utm_medium=email&utm_campaign=launch">
          Begin Day 1
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
        <EmailFooter closure="The door is open." />
      </table>
    </EmailLayout>
  );
}

export default LaunchEmail;
