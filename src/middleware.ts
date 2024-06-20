import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";

export const config = {
   matcher: [
      "/Dashboard",
      "/sign-up",
      "/sign-in",
      "/Orders/:path*",
      "/Categories/:path*",
      "/Products/:path*",
      "/Setting/:path*",
   ],
};

export async function middleware(request: NextRequest) {
   const token = request.cookies.get("next-auth.session-token");
   const url = request.nextUrl;
   if (
      token &&
      (url.pathname.startsWith("/sign-up") ||
         url.pathname.startsWith("/sign-in"))
   ) {
      return NextResponse.redirect(new URL("/Dashboard", request.url));
   }

   if (
      !token &&
      (url.pathname.startsWith("/Dashboard") ||
         url.pathname.startsWith("/Categories") ||
         url.pathname.startsWith("/Orders") ||
         url.pathname.startsWith("/Products") ||
         url.pathname.startsWith("/Setting"))
   ) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
   }

   return NextResponse.next();
}
