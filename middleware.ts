import { NextRequest, NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/app/lib/auth";
import is_admin from "@/app/api/actions/is_admin";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const origin = request.nextUrl.origin;

  // 🔹 Obține sesiunea curentă
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // 🔹 RUTE ADMIN — acces doar pentru admini
  if (path.startsWith("/admin")) {
    if (!session) {
      // Nelogat → 404
      return NextResponse.rewrite(`${origin}/404`);
    }

    const admin = await is_admin(session.user.id);
    if (!admin) {
      // Nu e admin → 404
      return NextResponse.rewrite(`${origin}/404`);
    }

    return NextResponse.next();
  }

  // 🔹 RUTE PUBLICE USER (accesibile doar pentru nelogați)
  const publicUserPaths = [
    "/user/login",
    "/user/register",
    "/user/forgot-password",
    "/user/resend-email",
    "/user/reset",
    "/user/tnc",
    "/user/verifyemail",
  ];

  if (publicUserPaths.some((p) => path.startsWith(p))) {
    if (session) {
      // E deja logat → redirect sigur către zona user
      return NextResponse.redirect(`${origin}/user`);
    }
    return NextResponse.next(); // Nelogat → poate accesa
  }

  // 🔹 RUTE PRIVATE USER (acces doar pentru logați)
  if (path.startsWith("/user")) {
    if (!session) {
      // Nelogat → redirect către home (absolut)
      return NextResponse.redirect(`${origin}/`);
    }
    return NextResponse.next();
  }

  // 🔹 Toate celelalte rute → continuă normal
  return NextResponse.next();
}

export const config = {
  runtime: "nodejs", // 🔸 important pentru a evita eroarea "stream not supported"
  matcher: [
    "/admin/:path*",
    "/user/login",
    "/user/register",
    "/user/forgot-password",
    "/user/resend-email",
    "/user/reset",
    "/user/tnc",
    "/user/verifyemail",
    "/user/:path*", // acoperă restul rutelor user
  ],
};
