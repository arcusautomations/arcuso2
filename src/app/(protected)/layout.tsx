import { redirect } from "next/navigation";
import { getCurrentUser } from "@/lib/auth";
import { Sidebar } from "@/components/layout/sidebar";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    // Middleware should have already redirected, but this is a safety check
    redirect("/login");
  }

  // Check if user needs to complete onboarding
  if (user.profile && !user.profile.onboardingCompleted) {
    // Allow access to onboarding page
    // This will be handled by individual pages if needed
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Sidebar user={user} />
      <main className="lg:pl-72">
        <div className="px-4 py-6 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

