import { render } from "@react-email/render";
import { NextRequest, NextResponse } from "next/server";
import React from "react";
import { WelcomeEmail } from "@/emails/templates/welcome";
import { DailyDripEmail } from "@/emails/templates/daily-drip";
import { MilestoneEmail } from "@/emails/templates/milestone";
import { LaunchEmail } from "@/emails/templates/launch";
import { NudgeEmail } from "@/emails/templates/nudge";
import { CompletionEmail } from "@/emails/templates/completion";

const TEMPLATES: Record<string, (params: Record<string, string>) => React.ReactElement> = {
  welcome: (p) =>
    React.createElement(WelcomeEmail, { firstName: p.name || "Friend" }),
  "daily-drip": (p) =>
    React.createElement(DailyDripEmail, {
      day: Number(p.day) || 1,
      firstName: p.name || "Friend",
    }),
  milestone: (p) =>
    React.createElement(MilestoneEmail, {
      day: Number(p.day) || 7,
      firstName: p.name || "Friend",
      dogName: p.dog || "your companion",
    }),
  launch: (p) =>
    React.createElement(LaunchEmail, { firstName: p.name || "Friend" }),
  nudge: (p) =>
    React.createElement(NudgeEmail, {
      firstName: p.name || "Friend",
      variant: (p.variant as "not-started" | "dropped-off") || "not-started",
      lastDay: Number(p.lastDay) || 5,
    }),
  completion: (p) =>
    React.createElement(CompletionEmail, {
      firstName: p.name || "Friend",
      dogName: p.dog || "your companion",
    }),
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
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
