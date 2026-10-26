import { NextResponse, type NextRequest } from "next/server";

/**
 * Russian is the default language and lives at the root («/», «/directions/…»), not under «/ru»:
 * those paths are served from the `/ru` route, and «/ru…» itself redirects back, so each page
 * has one address. Uzbek (`/uz…`) is not matched and is routed as it is.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    url.pathname = pathname.slice("/ru".length) || "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = `/ru${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/", "/ru", "/ru/:path*", "/directions/:path*"],
};
