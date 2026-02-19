import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  // ── Site-wide password gate ──────────────────────────
  // Set SITE_PASSWORD env var to enable. Remove it to disable.
  const sitePassword = process.env.SITE_PASSWORD;
  if (sitePassword) {
    const { pathname } = request.nextUrl;
    const isGatePage = pathname === "/gate";
    const isGateApi = pathname === "/api/gate";
    const hasAccess = request.cookies.get("site_access")?.value === sitePassword;

    if (!hasAccess && !isGatePage && !isGateApi) {
      const gateUrl = request.nextUrl.clone();
      gateUrl.pathname = "/gate";
      return NextResponse.redirect(gateUrl);
    }
  }

  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (icons, images, manifest, etc.)
     */
    "/((?!_next/static|_next/image|favicon.ico|icons/|images/|manifest.json|sw.js|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
