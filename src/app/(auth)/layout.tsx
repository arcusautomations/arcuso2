import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-violet-600 via-indigo-600 to-violet-700 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="auth-grid"
                width="8"
                height="8"
                patternUnits="userSpaceOnUse"
              >
                <circle cx="1" cy="1" r="1" fill="white" />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#auth-grid)" />
          </svg>
        </div>

        {/* Floating shapes */}
        <div className="absolute top-20 left-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
        <div className="absolute bottom-20 right-20 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl" />
        <div className="absolute top-1/2 left-1/4 h-48 w-48 rounded-full bg-violet-300/20 blur-2xl" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Sparkles className="h-6 w-6" />
            </div>
            <span className="text-2xl font-bold">Arcus</span>
          </Link>

          {/* Main content */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                Transform your skills
                <br />
                with AI & Automation
              </h1>
              <p className="mt-4 text-lg text-violet-100 max-w-md">
                Join thousands of professionals who are already leveraging
                cutting-edge technology to accelerate their careers.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div>
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm text-violet-200">Courses</div>
              </div>
              <div>
                <div className="text-3xl font-bold">2.5k</div>
                <div className="text-sm text-violet-200">Students</div>
              </div>
              <div>
                <div className="text-3xl font-bold">98%</div>
                <div className="text-sm text-violet-200">Satisfaction</div>
              </div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <p className="text-violet-100 italic">
              &ldquo;Arcus helped me transition into an AI role within 3 months.
              The courses are practical and the community is incredibly
              supportive.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-violet-400 to-indigo-400" />
              <div>
                <div className="font-medium">Sarah Johnson</div>
                <div className="text-sm text-violet-200">
                  AI Engineer at TechCorp
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-slate-50 dark:bg-slate-950">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden mb-8 flex justify-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-slate-900 dark:text-white">
                Arcus
              </span>
            </Link>
          </div>

          {children}
        </div>
      </div>
    </div>
  );
}


