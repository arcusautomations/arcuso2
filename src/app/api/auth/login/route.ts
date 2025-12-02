import { NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { loginSchema } from "@/lib/validation/auth";

/**
 * Server-side login route handler
 * This ensures cookies are set properly before redirect
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

    const supabase = await createServerClient();

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

    // Ensure session is persisted in cookies
    // The SSR client automatically sets cookies via setAll callback
    await supabase.auth.getSession();

    // Return success - cookies are already set by the SSR client
    // The client will handle the redirect
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

