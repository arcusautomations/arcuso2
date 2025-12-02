import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  createMiddlewareClient,
  isProtectedRoute,
  isAuthRoute,
} from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes that don't need auth
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/health") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  try {
    const { session, response } = await createMiddlewareClient(request);

    // Redirect authenticated users away from auth pages
    if (isAuthRoute(pathname) && session) {
      // Check if there's a redirect param and use it, otherwise go to dashboard
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      const destination = redirectParam && redirectParam.startsWith("/") 
        ? redirectParam 
        : "/dashboard";
      const dashboardUrl = new URL(destination, request.url);
      // Clear the redirect param from URL
      dashboardUrl.searchParams.delete("redirect");
      return NextResponse.redirect(dashboardUrl);
    }

    // Redirect unauthenticated users away from protected pages
    if (isProtectedRoute(pathname) && !session) {
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    return response;
  } catch (error) {
    // If there's an error with auth, allow the request to continue
    // The page can handle the error state
    console.error("Middleware auth error:", error);
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};

