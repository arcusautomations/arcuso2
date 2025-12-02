import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createServerClient as createSupabaseServerClient } from "@supabase/ssr";
import { resetPasswordSchema } from "@/lib/validation/auth";
import type { Database } from "@/types/database";

// Force dynamic rendering - this route uses cookies for authentication
export const dynamic = 'force-dynamic';

/**
 * POST /api/auth/reset-password
 * Reset user password using a valid recovery session
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password, confirmPassword } = body;

    // Validate input
    const validated = resetPasswordSchema.safeParse({ password, confirmPassword });
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

    // Create Supabase client with cookie handling
    const supabase = createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;
              cookieStore.set(name, value, {
                ...options,
                httpOnly: options?.httpOnly ?? true,
                sameSite: (options?.sameSite as "lax" | "strict" | "none") ?? "lax",
                secure: isProduction ? true : (options?.secure ?? false),
                path: options?.path ?? "/",
              });
            } catch (error) {
              console.warn(`Cookie set warning for ${name}:`, error);
            }
          });
        },
      },
    });

    // Verify we have a valid session (from the recovery token)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();

    if (sessionError || !session) {
      return NextResponse.json(
        { error: "Invalid or expired reset link. Please request a new password reset." },
        { status: 401 }
      );
    }

    // Update the password
    const { error: updateError } = await supabase.auth.updateUser({
      password: validated.data.password,
    });

    if (updateError) {
      return NextResponse.json(
        { error: updateError.message },
        { status: 400 }
      );
    }

    // Sign out the user after password reset (security best practice)
    await supabase.auth.signOut();

    return NextResponse.json({ 
      success: true,
      message: "Password reset successfully"
    });
  } catch (error) {
    console.error("Reset password route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * GET /api/auth/reset-password/check
 * Check if a valid recovery session exists
 */
export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
      return NextResponse.json(
        { error: "Server configuration error" },
        { status: 500 }
      );
    }

    const supabase = createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll() {
          // No need to set cookies for a check
        },
      },
    });

    const { data: { session }, error } = await supabase.auth.getSession();

    if (error || !session) {
      return NextResponse.json(
        { error: "No valid session" },
        { status: 401 }
      );
    }

    return NextResponse.json({ 
      success: true,
      hasSession: true
    });
  } catch (error) {
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/auth/reset-password/session
 * Exchange recovery token for a session with cookies
 */
export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { access_token, refresh_token } = body;

    if (!access_token) {
      return NextResponse.json(
        { error: "Missing access token" },
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

    // Create Supabase client
    const supabase = createSupabaseServerClient<Database>(supabaseUrl, supabaseAnonKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            try {
              const isProduction = process.env.NODE_ENV === "production" || process.env.VERCEL;
              cookieStore.set(name, value, {
                ...options,
                httpOnly: options?.httpOnly ?? true,
                sameSite: (options?.sameSite as "lax" | "strict" | "none") ?? "lax",
                secure: isProduction ? true : (options?.secure ?? false),
                path: options?.path ?? "/",
              });
            } catch (error) {
              console.warn(`Cookie set warning for ${name}:`, error);
            }
          });
        },
      },
    });

    // Set the session from the recovery token
    const { data, error: sessionError } = await supabase.auth.setSession({
      access_token,
      refresh_token: refresh_token || "",
    });

    if (sessionError || !data.session) {
      return NextResponse.json(
        { error: "Invalid or expired reset token" },
        { status: 401 }
      );
    }

    // Verify session is persisted
    await supabase.auth.getSession();

    return NextResponse.json({ 
      success: true,
      message: "Session established"
    });
  } catch (error) {
    console.error("Set session route error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 }
    );
  }
}

