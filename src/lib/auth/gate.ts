import { cookies } from "next/headers";

/**
 * Verify that the request has a valid site_access cookie matching SITE_PASSWORD.
 * Returns true if gate is disabled (no SITE_PASSWORD) or cookie matches.
 */
export async function verifyGateAccess(): Promise<boolean> {
  const sitePassword = process.env.SITE_PASSWORD;
  if (!sitePassword) return true;
  const cookieStore = await cookies();
  return cookieStore.get("site_access")?.value === sitePassword;
}
