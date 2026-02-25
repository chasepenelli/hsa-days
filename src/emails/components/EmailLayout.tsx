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
        <meta name="color-scheme" content="light only" />
        <meta name="supported-color-schemes" content="light" />
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
