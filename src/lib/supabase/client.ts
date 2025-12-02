import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database";

/**
 * Creates a Supabase client for use in the browser (Client Components)
 * Uses the anonymous key which is safe to expose to the client
 */
export function createBrowserClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error(
      "Missing Supabase environment variables. Please check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY"
    );
  }

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });
}

// Singleton instance for client-side usage
let browserClient: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Get or create a singleton Supabase client for browser usage
 * This ensures we don't create multiple clients on the client side
 */
export function getSupabaseBrowserClient() {
  if (typeof window === "undefined") {
    throw new Error(
      "getSupabaseBrowserClient should only be called on the client side"
    );
  }

  if (!browserClient) {
    browserClient = createBrowserClient();
  }

  return browserClient;
}

