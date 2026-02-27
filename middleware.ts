import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const ADMIN_COOKIE = "admin_access";
const ADMIN_QUERY_KEY = "key";

export function middleware(request: NextRequest) {
  const { pathname, searchParams } = request.nextUrl;
  const adminKey = process.env.ADMIN_ACCESS_KEY;

  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  // If no access key is configured, keep current behavior (no blocking).
  if (!adminKey) {
    return NextResponse.next();
  }

  const hasAdminCookie = request.cookies.get(ADMIN_COOKIE)?.value === "1";
  if (hasAdminCookie) {
    return NextResponse.next();
  }

  const keyFromQuery = searchParams.get(ADMIN_QUERY_KEY);
  if (keyFromQuery && keyFromQuery === adminKey) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.searchParams.delete(ADMIN_QUERY_KEY);

    const response = NextResponse.redirect(redirectUrl);
    response.cookies.set({
      name: ADMIN_COOKIE,
      value: "1",
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 8, // 8 hours
    });
    return response;
  }

  const loginUrl = request.nextUrl.clone();
  loginUrl.pathname = "/login";
  loginUrl.searchParams.set("next", pathname);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*"],
};
