import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import is_admin from "@/app/api/actions/is_admin";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  // Obține sesiunea curentă
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // --- RUTE ADMIN ---
  if (path.startsWith("/admin")) {
    if (!session) {
      // Nelogat -> 404 Not Found
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    const admin = await is_admin(session.user.id);
    if (!admin) {
      // Nu e admin -> 404 Not Found
      return NextResponse.rewrite(new URL("/404", request.url));
    }

    return NextResponse.next(); // E admin, continuă
  }

  // --- RUTE LOGIN / REGISTER ---
  if (path.startsWith("/login") || path.startsWith("/register")) {
    if (session) {
      // E deja logat -> redirect pe home
      return NextResponse.redirect(new URL("/", request.url));
    }

    return NextResponse.next(); // Nu e logat, poate accesa login/register
  }

  // Alte rute -> continuă normal
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs",
  matcher: ["/admin/:path*", "/user/login", "/user/register"], // se aplică doar pe rutele vizate
};
