import { createServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * Auth callback handler for email verification and OAuth flows
 * This route handles the redirect from Supabase after email verification
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const error = requestUrl.searchParams.get("error");
  const errorDescription = requestUrl.searchParams.get("error_description");
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  // Handle OAuth/email verification errors
  if (error) {
    let errorMessage = "Authentication failed";
    if (error === "access_denied" && errorDescription?.includes("expired")) {
      errorMessage = "Email link has expired. Please request a new verification email.";
    } else if (errorDescription) {
      errorMessage = decodeURIComponent(errorDescription.replace(/\+/g, " "));
    }
    
    return NextResponse.redirect(
      new URL(`/login?error=${encodeURIComponent(errorMessage)}`, requestUrl.origin)
    );
  }

  if (code) {
    const supabase = await createServerClient();
    
    const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!exchangeError && data.session) {
      // Ensure session is persisted
      await supabase.auth.getSession();
      revalidatePath("/", "layout");
      
      // Successful verification - redirect to the next page or dashboard
      const redirectUrl = new URL(next, requestUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
    
    // If exchange failed, redirect with error
    if (exchangeError) {
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent(exchangeError.message)}`, requestUrl.origin)
      );
    }
  }

  // If there's no code and no error, redirect to login
  return NextResponse.redirect(
    new URL("/login?error=Invalid authentication request", requestUrl.origin)
  );
}

