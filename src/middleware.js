import { NextResponse } from "next/server";
import cookie from "cookie";

export function middleware(request) {
  try {

    const cookies = cookie.parse(request.headers.get("cookie") || "");
    const token = cookies.authToken;

    if (!token) {
      throw new Error("Session is no longer valid. Log in to continue.");
    }

  } catch (error) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
    matcher: ["/api", "/reservations/:path*", "/courses/:path*", "/course/:path*", "/admin/:path*"]
};
