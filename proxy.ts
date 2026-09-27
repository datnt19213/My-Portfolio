// proxy.ts

import { NextResponse } from 'next/server';

import { auth } from '@/auth';

export default auth((request) => {
  const { pathname } = request.nextUrl;

  // /dashboard/login is the only public dashboard route.
  if (pathname === "/dashboard/login") {
    return NextResponse.next();
  }

  // Protect every other /dashboard/** route.
  if (pathname.startsWith("/dashboard")) {
    if (!request.auth) {
      const loginUrl = new URL("/dashboard/login", request.url);

      loginUrl.searchParams.set(
        "callbackUrl",
        `${pathname}${request.nextUrl.search}`,
      );

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/dashboard/:path*"],
};