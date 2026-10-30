import { NextResponse, type NextRequest } from "next/server";

/**
 * Russian is the default language and lives at the root («/», «/directions/…»), not under «/ru»:
 * those paths are served from the `/ru` route, and «/ru…» itself redirects back, so each page
 * has one address. Uzbek (`/uz…`) is not matched and is routed as it is.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  const { pathname } = url;
  // The Russian share image is generated under `/ru` and linked from `og:image` as it is: it is not
  // a page, and a redirect would land on a path that has no image.
  if (pathname.startsWith("/ru/opengraph-image")) return NextResponse.next();
  if (pathname === "/ru" || pathname.startsWith("/ru/")) {
    url.pathname = pathname.slice("/ru".length) || "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = `/ru${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/", "/ru", "/ru/:path*", "/directions/:path*", "/doctors/:path*"],
};
