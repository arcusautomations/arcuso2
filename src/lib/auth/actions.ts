"use server";

import { createServerClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  loginSchema,
  signupSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  type LoginFormData,
  type SignupFormData,
  type ForgotPasswordFormData,
  type ResetPasswordFormData,
} from "@/lib/validation/auth";
import type { ApiResponse } from "@/types";

/**
 * Sign in with email and password
 * This version returns a response for client-side handling
 */
export async function signIn(
  formData: LoginFormData
): Promise<ApiResponse<{ redirectTo: string }>> {
  try {
    // Validate input
    const validated = loginSchema.safeParse(formData);
    if (!validated.success) {
      return {
        data: null,
        error: validated.error.errors[0]?.message ?? "Invalid input",
        success: false,
      };
    }

    const supabase = await createServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
      email: validated.data.email,
      password: validated.data.password,
    });

    if (error) {
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    // Ensure session is properly set in cookies
    if (data.session) {
      // The SSR client automatically handles cookie setting via setAll
      // Force a refresh to ensure cookies are persisted
      await supabase.auth.getSession();
      revalidatePath("/", "layout");
      
      return {
        data: { redirectTo: "/dashboard" },
        error: null,
        success: true,
      };
    }

    return {
      data: null,
      error: "Failed to create session",
      success: false,
    };
  } catch (error) {
    console.error("Sign in error:", error);
    return {
      data: null,
      error: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}

/**
 * Sign in with email and password - Server-side redirect version
 * Use this in form actions for automatic redirect
 */
export async function signInWithRedirect(
  formData: LoginFormData,
  redirectTo: string = "/dashboard"
): Promise<never> {
  // Validate input
  const validated = loginSchema.safeParse(formData);
  if (!validated.success) {
    redirect(`/login?error=${encodeURIComponent(validated.error.errors[0]?.message ?? "Invalid input")}`);
  }

  const supabase = await createServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email: validated.data.email,
    password: validated.data.password,
  });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }

  if (!data.session) {
    redirect("/login?error=Failed to create session");
  }

  // Ensure session is persisted
  await supabase.auth.getSession();
  revalidatePath("/", "layout");
  
  // Redirect after successful login
  redirect(redirectTo);
}

/**
 * Sign up with email and password
 */
export async function signUp(
  formData: SignupFormData
): Promise<ApiResponse<{ message: string }>> {
  try {
    // Validate input
    const validated = signupSchema.safeParse(formData);
    if (!validated.success) {
      return {
        data: null,
        error: validated.error.errors[0]?.message ?? "Invalid input",
        success: false,
      };
    }

    const supabase = await createServerClient();

    const { error } = await supabase.auth.signUp({
      email: validated.data.email,
      password: validated.data.password,
      options: {
        data: {
          full_name: validated.data.fullName ?? null,
        },
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/auth/callback`,
      },
    });

    if (error) {
      // Handle specific error cases
      if (error.message.includes("already registered")) {
        return {
          data: null,
          error: "An account with this email already exists. Please sign in instead.",
          success: false,
        };
      }
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    return {
      data: {
        message: "Please check your email to verify your account.",
      },
      error: null,
      success: true,
    };
  } catch (error) {
    console.error("Sign up error:", error);
    return {
      data: null,
      error: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
  const supabase = await createServerClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login");
}

/**
 * Send password reset email
 */
export async function forgotPassword(
  formData: ForgotPasswordFormData
): Promise<ApiResponse<{ message: string }>> {
  try {
    // Validate input
    const validated = forgotPasswordSchema.safeParse(formData);
    if (!validated.success) {
      return {
        data: null,
        error: validated.error.errors[0]?.message ?? "Invalid input",
        success: false,
      };
    }

    const supabase = await createServerClient();

    const { error } = await supabase.auth.resetPasswordForEmail(
      validated.data.email,
      {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL ?? ""}/auth/reset-password`,
      }
    );

    if (error) {
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    // Always return success to prevent email enumeration
    return {
      data: {
        message: "If an account exists with this email, you will receive a password reset link.",
      },
      error: null,
      success: true,
    };
  } catch (error) {
    console.error("Forgot password error:", error);
    return {
      data: null,
      error: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}

/**
 * Reset password with token
 */
export async function resetPassword(
  formData: ResetPasswordFormData
): Promise<ApiResponse<{ redirectTo: string }>> {
  try {
    // Validate input
    const validated = resetPasswordSchema.safeParse(formData);
    if (!validated.success) {
      return {
        data: null,
        error: validated.error.errors[0]?.message ?? "Invalid input",
        success: false,
      };
    }

    const supabase = await createServerClient();

    const { error } = await supabase.auth.updateUser({
      password: validated.data.password,
    });

    if (error) {
      return {
        data: null,
        error: error.message,
        success: false,
      };
    }

    return {
      data: { redirectTo: "/login?message=password-reset-success" },
      error: null,
      success: true,
    };
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      data: null,
      error: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }
}

/**
 * Get the current user session
 */
export async function getCurrentUser() {
  const supabase = await createServerClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    return null;
  }

  // Fetch profile data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email!,
    emailVerified: !!user.email_confirmed_at,
    profile: profile
      ? {
          fullName: profile.full_name,
          avatarUrl: profile.avatar_url,
          company: profile.company,
          role: profile.role,
          onboardingCompleted: profile.onboarding_completed,
        }
      : null,
  };
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const user = await getCurrentUser();
  return !!user;
}

