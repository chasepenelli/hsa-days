import {
  Html,
  Head,
  Body,
  Container,
  Preview,
  Font,
} from "@react-email/components";
import * as React from "react";

interface EmailLayoutProps {
  preview: string;
  children: React.ReactNode;
}

export function EmailLayout({ preview, children }: EmailLayoutProps) {
  return (
    <Html lang="en">
      <Head>
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <Font
          fontFamily="Lora"
          fallbackFontFamily={["Georgia", "Times New Roman", "serif"]}
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&display=swap",
            format: "woff2",
          }}
          fontWeight={400}
          fontStyle="normal"
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
@import url('https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&display=swap');

@media (prefers-color-scheme: dark) {
  .email-body { background-color: #1C1A17 !important; }
  .email-container { background-color: #242220 !important; border-color: #3A3836 !important; }
  .quote-block { background-color: #2E2B26 !important; }
  .body-text { color: #E8E4DF !important; }
  .muted-text { color: #9A9490 !important; }
  .cta-button { background-color: #7A9A7D !important; }
  .header-bg { background: linear-gradient(135deg, #2E3F30, #3E5740, #4E6A50) !important; }
  .footer-bg { background-color: #1F1D1A !important; }
  .teaser-card { background-color: #2E2B26 !important; }
}
`,
          }}
        />
      </Head>
      <Preview>{preview}</Preview>
      <Body
        className="email-body"
        style={{
          margin: 0,
          padding: 0,
          backgroundColor: "#FAF8F5",
          WebkitTextSizeAdjust: "100%",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
        }}
      >
        <table
          role="presentation"
          cellPadding="0"
          cellSpacing="0"
          border={0}
          width="100%"
          style={{ backgroundColor: "#FAF8F5" }}
          className="email-body"
        >
          <tr>
            <td align="center" style={{ padding: "24px 16px" }}>
              <Container
                className="email-container"
                style={{
                  maxWidth: "600px",
                  width: "100%",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: "1px solid #E8E4DF",
                }}
              >
                {children}
              </Container>
            </td>
          </tr>
        </table>
      </Body>
    </Html>
  );
}
