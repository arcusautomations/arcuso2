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
              Built by business owners who got sick of decyphering hype from actual value.
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
               By 2025, everyone was talking about AI and automation but no one was actually doing anything. Most of it was, and still is, hype and marketing without actual value unless you spent the time to decypher it. We knew there had to be a better way. So Arcus Online was founded with the vision of providing a platform that is easy to use, affordable and provides real value to businesses without over-promising and under-delivering.
              </p>
              <p>
                In 2026, AI and automation isn't a luxury, it's a necessity. So is educating yourself and your team on how to really utilise it. We're here to ensure your business doesn't just survive digital transformation; it thrives in it.
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
                We provide comprehensive AI and automation solutions:
              </p>
              <ul className="space-y-3 text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Automation solutions</strong> free up your team for strategic work</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Implement AI-powered tools</strong> that enhance and speed up decision-making and customer experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Grow</strong> sustainably and efficiently</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">✓</span>
                  </div>
                  <span><strong className="text-slate-900 dark:text-white">Stay competitive</strong> in an increasingly digital marketplace</span>
                </li>
              </ul>
              <p className="mt-6 text-slate-600 dark:text-slate-400">
                Our approach combines strategic consulting, hands-on implementation and ongoing support to ensure your success.
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
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Expert Knowledge</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We keep up to date with the latest in AI and technology to ensure you are getting the best possible solution for your business.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Dedicated Team</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We get obsessed with your success and will provide solutions that are tailored to your business.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Comprehensive Solutions</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    From strategy, development, implementation to ongoing optimization, maintenance and support.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Partnership Approach</h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    We're leading the next generation of full-service tech-solution providers; not just vendors.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Future-Obsessed</h3>
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
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">46%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Average productivity increase</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">5-12</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Average months for ROI payback</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">1,500+</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Businesses trained</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="text-4xl font-bold text-violet-600 dark:text-violet-400 mb-2">98.5%</div>
                <p className="text-sm text-slate-600 dark:text-slate-400">Client satisfaction</p>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white text-2xl">What are you waiting for?</CardTitle>
              <CardDescription className="text-violet-100">
                Getting started is usually the hardest part. With us, it doesn't have to be.
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

