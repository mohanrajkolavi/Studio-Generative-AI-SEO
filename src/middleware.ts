import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { isAuthenticated } from "@/lib/auth";
import { updateSupabaseSession } from "@/lib/supabase/middleware";
import {
  PARTNER_COOKIE_NAME,
  PARTNER_COOKIE_MAX_AGE,
  PARTNER_CODE_REGEX,
  hasPartnerRefCookie,
} from "@/lib/partner/cookie-server";

/**
 * Nonce-based CSP. Scripts are strict ('nonce-…' + 'strict-dynamic'): parser-
 * inserted inline scripts (JSON-LD, next-themes) carry the x-nonce value, and
 * GA (next/script, injected by the nonce'd Next runtime) is trusted via
 * 'strict-dynamic', so no hash is needed. style-src allows 'unsafe-inline' (no nonce,
 * since a nonce would disable 'unsafe-inline') so server-rendered style=""
 * attributes (React style props, next/image fill) apply in production.
 */
function getCspWithNonce(nonce: string): string {
  const isDev = process.env.NODE_ENV === "development";
  const scriptSrc = [
    "'self'",
    "'nonce-" + nonce + "'",
    "'strict-dynamic'",
    "https://www.googletagmanager.com",
    "https://www.google-analytics.com",
    "https://embed.typeform.com",
    "https://tally.so",
    ...(isDev ? ["'unsafe-eval'"] : []),
  ].join(" ");
  const styleSrc = ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"].join(" ");
  return [
    "default-src 'self'",
    "script-src " + scriptSrc,
    "style-src " + styleSrc,
    "img-src 'self' data: blob: https:",
    "font-src 'self' https://fonts.gstatic.com data:",
    "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com https://*.googletagmanager.com https://form.typeform.com https://embed.typeform.com https://www.typeform.com https://tally.so https://*.supabase.co wss://*.supabase.co",
    "frame-src https://embed.typeform.com https://form.typeform.com https://www.typeform.com https://tally.so https://docs.google.com",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

function base64UrlEncode(bytes: Uint8Array): string {
  let binary = "";
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const base64 = btoa(binary);
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function generateNonce(): string {
  const bytes = new Uint8Array(16);
  globalThis.crypto.getRandomValues(bytes);
  return base64UrlEncode(bytes);
}

const SECURITY_HEADERS_STATIC: Record<string, string> = {
  "X-Frame-Options": "DENY",
  "X-Content-Type-Options": "nosniff",
  "X-Permitted-Cross-Domain-Policies": "none",
  "Referrer-Policy": "strict-origin-when-cross-origin",
  "Permissions-Policy":
    "camera=(), microphone=(), geolocation=(), interest-cohort=()",
};

export async function middleware(request: NextRequest) {
  const nonce = generateNonce();
  const cspHeader = getCspWithNonce(nonce);

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("x-pathname", request.nextUrl.pathname);
  requestHeaders.set("Content-Security-Policy", cspHeader);
  // Never trust client-supplied x-authenticated; strip it then set from server-side check only
  requestHeaders.delete("x-authenticated");
  if (await isAuthenticated(request)) {
    requestHeaders.set("x-authenticated", "1");
  } else {
    requestHeaders.set("x-authenticated", "0");
  }

  let response = NextResponse.next({
    request: { headers: requestHeaders },
  });

  response = await updateSupabaseSession(request, response);

  // Partner referral: set partner_ref cookie when ?ref=CODE (first-touch, server-side)
  const ref = request.nextUrl.searchParams.get("ref");
  if (
    ref &&
    PARTNER_CODE_REGEX.test(ref.trim()) &&
    !hasPartnerRefCookie(request.headers.get("cookie"))
  ) {
    const code = ref.trim().slice(0, 50);
    const secure = request.nextUrl.protocol === "https:";
    response.cookies.set(PARTNER_COOKIE_NAME, code, {
      path: "/",
      maxAge: PARTNER_COOKIE_MAX_AGE,
      sameSite: "lax",
      secure,
      httpOnly: false, // client reads it for form submission and sessionStorage fallback; contains only referral code, not credentials
    });
  }

  response.headers.set("Content-Security-Policy", cspHeader);
  for (const [key, value] of Object.entries(SECURITY_HEADERS_STATIC)) {
    response.headers.set(key, value);
  }

  // No public Cache-Control on HTML here: every page embeds this request's CSP
  // nonce, so a shared/CDN cache would serve a nonce that no longer matches the
  // CSP header and all scripts would be blocked. Next's default for these
  // dynamic pages (private, no-store) applies.

  if (process.env.NODE_ENV === "production") {
    response.headers.set(
      "Strict-Transport-Security",
      "max-age=31536000; includeSubDomains; preload"
    );
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all pathnames except _next/static, _next/image and static files
     * (images, fonts, robots.txt, sitemap.xml, rss.xml, manifest). Those need
     * neither auth/Supabase refresh nor the HTML CSP nonce.
     */
    "/((?!_next/static|_next/image|.*\\.(?:png|jpg|jpeg|gif|svg|webp|avif|ico|txt|xml|webmanifest|woff2?)$).*)",
  ],
};
