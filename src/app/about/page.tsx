import Link from "next/link";
import { ArrowLeft, Sparkles, TrendingUp, Users, Award, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function AboutPage() {
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

      <div className="pt-24 pb-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              About Arcus Automations
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Empowering businesses to thrive in the age of AI and automation
            </p>
          </div>

          {/* Mission Section */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Target className="h-6 w-6 text-violet-600" />
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-slate-600 dark:text-slate-400">
              <p>
                At Arcus Automations, we believe every business deserves access to enterprise-grade AI and automation tools. Founded with the vision of democratizing intelligent automation, we help businesses of all sizes transform their operations, reduce costs, and scale efficiently.
              </p>
              <p>
                In 2026, AI isn&apos;t a luxury—it&apos;s a necessity. We&apos;re here to ensure your business doesn&apos;t just survive the digital transformation, but thrives in it.
              </p>
            </CardContent>
          </Card>

          {/* What We Do */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Sparkles className="h-6 w-6 text-violet-600" />
                What We Do
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-slate-600 dark:text-slate-400 mb-6">
                We provide comprehensive AI and automation solutions that help businesses:
              </p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Automate repetitive tasks</strong> and free up your team for strategic work</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Implement AI-powered tools</strong> that enhance decision-making and customer experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Scale operations</strong> without proportionally increasing costs</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Stay competitive</strong> in an increasingly digital marketplace</span>
                </li>
              </ul>
              <p className="mt-6 text-slate-600 dark:text-slate-400">
                Our approach combines strategic consulting, hands-on implementation, and ongoing support to ensure your success.
              </p>
            </CardContent>
          </Card>

          {/* Why Choose Us */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <Award className="h-6 w-6 text-violet-600" />
                Why Arcus Automations?
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Proven Results</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Our clients see an average 40% increase in productivity
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Expert Team</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Certified professionals with deep expertise in AI, automation, and business transformation
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Comprehensive Solutions</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    From strategy to implementation to ongoing optimization
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Partnership Approach</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We&apos;re not just vendors—we&apos;re your long-term technology partners
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Future-Focused</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We stay ahead of trends, ensuring your solutions are built for tomorrow
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <div className="grid gap-6 md:grid-cols-4 mb-12">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">40%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Average productivity increase</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">6-12</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Months ROI payback</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">2,500+</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Professionals trained</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">98%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Client satisfaction</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Ready to Transform Your Business?</CardTitle>
              <CardDescription className="text-violet-100">
                Join thousands of professionals who are already leveraging AI and automation to accelerate their careers.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-violet-50">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Schedule Consultation</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

