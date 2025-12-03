import Link from "next/link";
import { Sparkles, BookOpen, Zap, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hero } from "@/components/ui/animated-hero";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b border-slate-200/50 bg-white/80 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/80">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Arcus Online
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/about"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                About
              </Link>
              <Link
                href="/pricing"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Pricing
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Contact
              </Link>
              <Link
                href="/login"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white transition-colors"
              >
                Sign In
              </Link>
              <Button asChild size="sm">
                <Link href="/signup">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <Hero />

      {/* Value Proposition Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Everything you need to succeed
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              Comprehensive resources designed for modern professionals
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* AI Courses */}
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center mb-2">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <CardTitle>AI Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Master the latest AI technologies with hands-on training and real-world projects. Stay ahead with cutting-edge AI tools and techniques designed for 2026.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Automation Tools */}
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center mb-2">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Automation Tools</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access pre-built automation templates and custom tools to streamline your workflow. Reduce manual tasks by up to 80% with intelligent automation.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Best Practices */}
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center mb-2">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Best Practices</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Learn industry-standard security and implementation best practices. Build AI solutions that are secure, scalable, and compliant.
                </CardDescription>
              </CardContent>
            </Card>

            {/* Community */}
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <CardTitle>Community</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Join a thriving community of professionals sharing knowledge and experiences. Get support from experts and peers on your automation journey.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

