import { createClient } from "@supabase/supabase-js";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

/**
 * Creates a Supabase client for use in middleware
 * Handles cookie-based session management for authentication
 */
export async function createMiddlewareClient(request: NextRequest) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Missing Supabase environment variables");
  }

  // Create a response that we can modify
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
    global: {
      headers: {
        cookie: request.headers.get("cookie") ?? "",
      },
    },
  });

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  return { supabase, response, session };
}

/**
 * Protected route paths that require authentication
 */
export const protectedRoutes = [
  "/dashboard",
  "/profile",
  "/settings",
  "/courses",
  "/resources",
];

/**
 * Auth routes that should redirect to dashboard if already logged in
 */
export const authRoutes = ["/login", "/signup", "/forgot-password"];

/**
 * Check if a path matches any of the protected routes
 */
export function isProtectedRoute(pathname: string): boolean {
  return protectedRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

/**
 * Check if a path is an auth route
 */
export function isAuthRoute(pathname: string): boolean {
  return authRoutes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

