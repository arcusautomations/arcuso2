import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { loginSchema } from "@/lib/validation/auth";
import type { Database } from "@/types/database";

// Force dynamic rendering - this route uses cookies for authentication
export const dynamic = 'force-dynamic';

/**
 * Server-side login route handler
 * This ensures cookies are set properly using Next.js cookies() API
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, redirectTo = "/dashboard" } = body;

    // Validate input
    const validated = loginSchema.safeParse({ email, password });
    if (!validated.success) {
      return NextResponse.json(
        { error: validated.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    // Create Supabase client - cookies will be set via setAll callback
    const supabase = createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          // CRITICAL: Set cookies with explicit attributes
          // Next.js cookies() API automatically includes these in response headers
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              // Preserve Supabase's cookie options but ensure secure is set for production
              const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;
              cookieStore.set(name, value, {
                ...options, // Preserve Supabase's original options first
                httpOnly: options?.httpOnly ?? true,
                sameSite: (options?.sameSite as "lax" | "strict" | "none") ?? "lax",
                secure: isProduction ? true : (options?.secure ?? false),
                path: options?.path ?? "/",
                // Don't override maxAge if Supabase provides it
                ...(options?.maxAge ? { maxAge: options.maxAge } : {}),
              });
            } catch (error) {
              // Cookies are set via Next.js response - this is expected in some contexts
              console.warn(`Cookie set warning for ${name}:`, error);
            }
          });
        },
      },
    });

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }

    if (!data.session) {
      return NextResponse.json(
        { error: "Failed to create session" },
        { status: 500 }
      );
    }

    // CRITICAL: Force session refresh to trigger cookie setting
    // This ensures the setAll callback is called with session cookies
    const { data: { session: refreshedSession }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !refreshedSession) {
      console.error("Session refresh error:", sessionError);
      return NextResponse.json(
        { error: "Failed to persist session" },
        { status: 500 }
      );
    }

    // Return success - cookies are automatically included in response via Next.js cookies() API
    return NextResponse.json({ 
      success: true, 
      redirectTo 
    });
  } catch (error) {
    console.error("Login route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

