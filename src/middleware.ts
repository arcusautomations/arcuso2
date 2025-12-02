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

    // Redirect authenticated users away from auth pages
    if (isAuthRoute(pathname) && session) {
      // Prevent redirect loops - if we're already on the destination, don't redirect
      const redirectParam = request.nextUrl.searchParams.get("redirect");
      const destination = redirectParam && redirectParam.startsWith("/") 
        ? redirectParam 
        : "/dashboard";
      
      // If already on destination, don't redirect
      if (pathname === destination || pathname === "/dashboard") {
        return response;
      }
      
      const dashboardUrl = new URL(destination, request.url);
      // Clear the redirect param from URL
      dashboardUrl.searchParams.delete("redirect");
      return NextResponse.redirect(dashboardUrl);
    }

    // Redirect unauthenticated users away from protected pages
    if (isProtectedRoute(pathname) && !session) {
      // Prevent redirect loops - don't redirect if already on login
      if (pathname === "/login") {
        return response;
      }
      
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

