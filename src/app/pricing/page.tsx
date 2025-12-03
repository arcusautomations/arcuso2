import Link from "next/link";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const pricingPlans = [
  {
    name: "Free User",
    price: "Free",
    description: "Perfect for getting started with AI and automation",
    features: [
      "Access to free courses and guides",
      "Free website optimization audit",
      "Email support",
      "Basic tool access",
      "Zoho platform free trials and a call with a Zoho Consulting Partner",
      "Basic automation templates and AI prompt libraries",
    ],
    cta: "Get Started Free",
    href: "/signup",
    popular: false,
  },
  {
    name: "Professional",
    price: "$99",
    period: "/month",
    annualPrice: "$990",
    annualPeriod: "/year",
    description: "For professionals and growing businesses looking to implement AI and automation solutions",
    features: [
      "Everything in Free",
      "Premium course access (all courses)",
      "Priority support (generally 24-hour response)",
      "Advanced tools and templates",
      "Monthly consultation calls (1 hour)",
      "Custom automation templates and AI prompt libraries",
      "Early access to new features and resources",
    ],
    cta: "Start Professional Plan",
    href: "/signup?plan=professional",
    popular: true,
    savings: "Save 17% with annual billing",
  },
  {
    name: "Premium",
    price: "$299",
    description: "For organizations needing comprehensive solutions and dedicated support",
    features: [
      "Everything in Professional",
      "Custom AI and automation implementation guides and templates",
      "Dedicated account manager and access to our team",
      "Weekly consultation calls (1 hour)",
      "Custom integration recommendations",
      "Monthly training material and updates for your team",
      "Priority feature requests",
    ],
    cta: "Contact Sales",
    href: "/contact",
    popular: false,
  },
];

export default function PricingPage() {
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Simple, Transparent Pricing
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Choose the plan that fits your needs
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid gap-8 md:grid-cols-3 mb-16">
            {pricingPlans.map((plan) => (
              <Card
                key={plan.name}
                className={`relative flex flex-col ${
                  plan.popular
                    ? "border-2 border-violet-500 shadow-xl scale-105"
                    : ""
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-violet-600 text-white">
                    Most Popular
                  </Badge>
                )}
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    {plan.price === "Custom" ? (
                      <div className="text-3xl font-bold text-slate-900 dark:text-white">
                        Custom
                      </div>
                    ) : (
                      <>
                        <div className="flex items-baseline">
                          <span className="text-4xl font-bold text-slate-900 dark:text-white">
                            {plan.price}
                          </span>
                          {plan.period && (
                            <span className="ml-2 text-lg text-slate-600 dark:text-slate-400">
                              {plan.period}
                            </span>
                          )}
                        </div>
                        {plan.annualPrice && (
                          <div className="mt-2">
                            <div className="text-2xl font-semibold text-slate-700 dark:text-slate-300">
                              {plan.annualPrice}
                              <span className="text-base font-normal text-slate-600 dark:text-slate-400">
                                {plan.annualPeriod}
                              </span>
                            </div>
                            {plan.savings && (
                              <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                                {plan.savings}
                              </p>
                            )}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                  <CardDescription className="mt-2">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <Button
                    asChild
                    size="lg"
                    className={`w-full ${
                      plan.popular
                        ? "bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                        : ""
                    }`}
                    variant={plan.popular ? "default" : "outline"}
                  >
                    <Link href={plan.href}>
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Can I change plans later?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Yes, you can upgrade or downgrade your plan at any time. When upgrading, you&apos;ll get immediate access to new features. When downgrading, changes take effect at the end of your current billing period.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Do you offer refunds?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No we do not, however if you&apos;re not satisfied with your purchase, contact us and we will work with you to find a solution.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  Is there a free trial?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  No, we offer a free user tier with access to our basic resources, guides and tools.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
                  What payment methods do you accept?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  We accept all major credit cards (Visa, Mastercard, American Express) via Stripe and can invoice for Professional and Premium plans.All credit cardpayments are processed securely through Stripe.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="mt-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Ready to Get Started?</CardTitle>
              <CardDescription className="text-violet-100">
                Join thousands of professionals growing their businesses with AI and automation.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-violet-50">
                  <Link href="/signup">Start Free User</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/contact">Contact Sales</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

