import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public admin routes
if (
  pathname === "/admin/login" ||
  pathname === "/admin/reset-password" ||
  pathname === "/admin/forgot-password" ||
  pathname === "/api/login"
) {
  return NextResponse.next();
}

  // Protect all admin routes
  if (pathname.startsWith("/admin")) {
    const token = request.cookies.get("admin-auth")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const decoded = await verifyToken(token);

    if (!decoded) {
      const response = NextResponse.redirect(
        new URL("/admin/login", request.url)
      );

      response.cookies.delete("admin-auth");

      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};