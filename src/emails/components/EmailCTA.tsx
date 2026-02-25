import * as React from "react";

interface EmailCTAProps {
  href: string;
  children: string;
}

export function EmailCTA({ href, children }: EmailCTAProps) {
  return (
    <tr>
      <td style={{ padding: "24px 32px 0 32px" }} align="center">
        {/* Outlook VML fallback */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word"
  href="${href}"
  style="height:48px;v-text-anchor:middle;width:260px;" arcsize="25%" strokecolor="#5B7B5E" fillcolor="#5B7B5E">
  <w:anchorlock/>
  <center style="color:#ffffff;font-family:Georgia,serif;font-size:16px;">
    ${children}
  </center>
</v:roundrect>
<![endif]-->`,
          }}
        />
        {/* Standard button */}
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--[if !mso]><!-->`,
          }}
        />
        <a
          href={href}
          className="cta-button"
          style={{
            display: "inline-block",
            backgroundColor: "#5B7B5E",
            color: "#FFFFFF",
            fontFamily: "Lora, Georgia, 'Times New Roman', serif",
            fontSize: "16px",
            fontWeight: 400,
            textDecoration: "none",
            textAlign: "center" as const,
            lineHeight: "48px",
            width: "260px",
            maxWidth: "100%",
            borderRadius: "12px",
          }}
        >
          {children}
        </a>
        <div
          dangerouslySetInnerHTML={{
            __html: `<!--<![endif]-->`,
          }}
        />
      </td>
    </tr>
  );
}
