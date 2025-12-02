"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, Eye, EyeOff, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  resetPasswordSchema,
  type ResetPasswordFormData,
} from "@/lib/validation/auth";

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState<ResetPasswordFormData>({
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);
  const [isVerifyingToken, setIsVerifyingToken] = useState(true);

  // Handle password reset token from URL hash (Supabase OAuth-style redirect)
  useEffect(() => {
    const handleTokenVerification = async () => {
      try {
        // Check for errors in URL hash first
        const hash = window.location.hash;
        if (hash) {
          const params = new URLSearchParams(hash.substring(1)); // Remove #
          const error = params.get("error");
          const errorDescription = params.get("error_description");
          const type = params.get("type");
          
          // Handle errors in hash
          if (error) {
            let errorMessage = "Password reset link is invalid or has expired.";
            if (error === "access_denied" && errorDescription?.includes("expired")) {
              errorMessage = "Password reset link has expired. Please request a new one.";
            } else if (errorDescription) {
              errorMessage = decodeURIComponent(errorDescription.replace(/\+/g, " "));
            }
            setError(errorMessage);
            setIsVerifyingToken(false);
            // Clear the hash from URL
            window.history.replaceState(null, "", window.location.pathname);
            return;
          }

          // Check for token in URL hash
          const accessToken = params.get("access_token");
          
          if (accessToken && type === "recovery") {
            // Exchange the token for a session via API route (sets HTTP-only cookies)
            try {
              const response = await fetch("/api/auth/reset-password/session", {
                method: "PUT",
                headers: {
                  "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                  access_token: accessToken,
                  refresh_token: params.get("refresh_token") || "",
                }),
              });

              const result = await response.json();

              if (!response.ok || !result.success) {
                setError(result.error || "Token verification failed. Please request a new password reset.");
                setIsVerifyingToken(false);
                window.history.replaceState(null, "", window.location.pathname);
                return;
              }

              // Token is valid, session is now in cookies, user can reset password
              setIsVerifyingToken(false);
              window.history.replaceState(null, "", window.location.pathname);
              return;
            } catch (err) {
              console.error("Token exchange error:", err);
              setError("Failed to verify reset token. Please request a new password reset.");
              setIsVerifyingToken(false);
              window.history.replaceState(null, "", window.location.pathname);
              return;
            }
          }
        }

        // Check for error in query params
        const urlError = searchParams.get("error");
        if (urlError) {
          setError(decodeURIComponent(urlError));
          setIsVerifyingToken(false);
          return;
        }

        // Check for token in query params (alternative format)
        const token = searchParams.get("token");
        const type = searchParams.get("type");
        
        if (token && type === "recovery") {
          // This is the old format - we need to exchange it
          const supabase = getSupabaseBrowserClient();
          // For token-based reset, we'll handle it in the form submission
          setIsVerifyingToken(false);
          return;
        }

        // No token found in hash - check if we have a session in cookies
        // This could happen if the user refreshed the page after token was processed
        try {
          const response = await fetch("/api/auth/reset-password/check", {
            method: "GET",
            credentials: "include",
          });

          if (response.ok) {
            // Session exists in cookies, allow password reset
            setIsVerifyingToken(false);
            return;
          }
        } catch (err) {
          // Ignore check errors
        }

        // No valid session found
        setError("Invalid or expired reset link. Please request a new password reset.");
        setIsVerifyingToken(false);
      } catch (err) {
        console.error("Token verification error:", err);
        setError("Failed to verify reset token. Please request a new password reset.");
        setIsVerifyingToken(false);
      }
    };

    handleTokenVerification();
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => ({ ...prev, [name]: "" }));
    }
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    // Client-side validation
    const validation = resetPasswordSchema.safeParse(formData);
    if (!validation.success) {
      const errors: Record<string, string> = {};
      validation.error.errors.forEach((err) => {
        if (err.path[0]) {
          errors[err.path[0].toString()] = err.message;
        }
      });
      setFieldErrors(errors);
      setIsLoading(false);
      return;
    }

    try {
      // Call API route to reset password (uses server-side session from cookies)
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error ?? "Failed to reset password");
        setIsLoading(false);
        return;
      }

      setSuccess(true);
      toast.success("Password reset successfully!", {
        description: "You can now sign in with your new password.",
      });

      // Redirect to login after a short delay
      setTimeout(() => {
        router.push("/login?message=password-reset-success");
      }, 2000);
    } catch (err) {
      console.error("Reset password error:", err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  // Password strength indicator
  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(formData.password);

  // Show loading state while verifying token
  if (isVerifyingToken) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400">Verifying reset link...</p>
        </div>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center dark:bg-emerald-900/50">
            <Check className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Password reset successful
            </h1>
            <p className="mt-2 text-slate-600 dark:text-slate-400">
              Your password has been updated. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Reset your password
          </h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            Enter your new password below
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Password */}
          <div className="space-y-2">
            <Label htmlFor="password">New Password</Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                error={!!fieldErrors.password}
                icon={<Lock className="h-5 w-5" />}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {fieldErrors.password && (
              <p className="text-sm text-red-600">{fieldErrors.password}</p>
            )}

            {/* Password strength indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((level) => (
                    <div
                      key={level}
                      className={`h-1 flex-1 rounded-full transition-colors ${
                        passwordStrength >= level
                          ? level <= 2
                            ? "bg-red-500"
                            : level <= 3
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                          : "bg-slate-200 dark:bg-slate-700"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-xs text-slate-500">
                  {passwordStrength <= 2 && "Weak password"}
                  {passwordStrength === 3 && "Fair password"}
                  {passwordStrength >= 4 && "Strong password"}
                </p>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm New Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!fieldErrors.confirmPassword}
                icon={<Lock className="h-5 w-5" />}
                autoComplete="new-password"
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {fieldErrors.confirmPassword && (
              <p className="text-sm text-red-600">
                {fieldErrors.confirmPassword}
              </p>
            )}
          </div>

          {/* Submit */}
          <Button
            type="submit"
            className="w-full"
            size="lg"
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md space-y-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="text-slate-600 dark:text-slate-400">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  );
}

