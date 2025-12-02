// Re-export all Supabase utilities for convenient imports
export { createBrowserClient, getSupabaseBrowserClient } from "./client";
export { createServerClient, createAdminClient } from "./server";
export {
  createMiddlewareClient,
  protectedRoutes,
  authRoutes,
  isProtectedRoute,
  isAuthRoute,
} from "./middleware";



