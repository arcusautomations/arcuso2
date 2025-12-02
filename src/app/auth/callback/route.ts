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
  const next = requestUrl.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createServerClient();
    
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error && data.session) {
      // Ensure session is persisted
      await supabase.auth.getSession();
      revalidatePath("/", "layout");
      
      // Successful verification - redirect to the next page or dashboard
      const redirectUrl = new URL(next, requestUrl.origin);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If there's an error or no code, redirect to login with error
  return NextResponse.redirect(
    new URL("/login?error=auth-callback-error", requestUrl.origin)
  );
}

