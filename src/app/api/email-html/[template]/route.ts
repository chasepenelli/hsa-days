import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { WelcomeEmail } from "@/emails/templates/welcome";
import { LaunchEmail } from "@/emails/templates/launch";

const TEMPLATES: Record<string, (params: Record<string, string>) => React.ReactElement> = {
  welcome: () => React.createElement(WelcomeEmail),
  launch: () => React.createElement(LaunchEmail),
};

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ template: string }> }
) {
  const { template } = await params;
  const searchParams = request.nextUrl.searchParams;
  const queryParams: Record<string, string> = {};
  searchParams.forEach((v, k) => {
    queryParams[k] = v;
  });

  const factory = TEMPLATES[template];
  if (!factory) {
    return NextResponse.json(
      { error: `Unknown template: ${template}. Available: ${Object.keys(TEMPLATES).join(", ")}` },
      { status: 404 }
    );
  }

  const element = factory(queryParams);
  const html = await render(element);

  return new NextResponse(html, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Content-Disposition": `inline; filename="${template}.html"`,
    },
  });
}
