// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/dashboard") && !authToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("message", "unauthorized");
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
