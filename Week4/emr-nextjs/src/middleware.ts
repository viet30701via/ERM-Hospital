// src/middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("auth-token")?.value;
  const { pathname } = request.nextUrl;

  // 1. Danh sách các vùng cần bảo vệ
  const protectedPrefixes = [
    "/dashboard",
    "/patients",
    "/doctors",
    "/medical-records",
    "/appointments",
  ];

  const isProtectedRoute = protectedPrefixes.some((prefix) =>
    pathname.startsWith(prefix)
  );

  if (isProtectedRoute && !authToken) {
    const url = new URL("/login", request.url);
    url.searchParams.set("message", "unauthorized");
    return NextResponse.redirect(url);
  }

  if (pathname === "/login" && authToken) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|logo.png|.*\\..*).*)",
  ],
};
