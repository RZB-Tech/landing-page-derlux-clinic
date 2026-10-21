import { NextResponse, type NextRequest } from "next/server";

/**
 * Russian is the default language and lives at «/», not «/ru»: «/» is served from the `/ru`
 * route, and «/ru» itself redirects back to «/», so each page has one address.
 */
export function proxy(request: NextRequest) {
  const url = request.nextUrl.clone();
  if (url.pathname === "/ru") {
    url.pathname = "/";
    return NextResponse.redirect(url, 308);
  }
  url.pathname = "/ru";
  return NextResponse.rewrite(url);
}

export const config = {
  matcher: ["/", "/ru"],
};
