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
    pathname.startsWith("/api/") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  try {
    const { session, response } = await createMiddlewareClient(request);

    // Debug logging (remove in production if needed)
    if (process.env.NODE_ENV === "development") {
      console.log(`[Middleware] ${pathname} - Session: ${session ? "exists" : "none"}`);
    }

    // Redirect authenticated users away from auth pages
    if (isAuthRoute(pathname) && session) {
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      const destination = redirectParam && redirectParam.startsWith("/") 
        ? redirectParam 
        : "/dashboard";
      
      // Don't redirect if we're already going to the destination
      if (pathname !== destination && pathname !== "/dashboard") {
        const dashboardUrl = new URL(destination, request.url);
        dashboardUrl.searchParams.delete("redirect");
        if (process.env.NODE_ENV === "development") {
          console.log(`[Middleware] Redirecting authenticated user from ${pathname} to ${destination}`);
        }
        return NextResponse.redirect(dashboardUrl);
      }
    }

    // Redirect unauthenticated users away from protected pages
    if (isProtectedRoute(pathname) && !session) {
      // Only redirect if not already on login page
      if (pathname !== "/login") {
        const loginUrl = new URL("/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        if (process.env.NODE_ENV === "development") {
          console.log(`[Middleware] Redirecting unauthenticated user from ${pathname} to /login`);
        }
        return NextResponse.redirect(loginUrl);
      }
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

