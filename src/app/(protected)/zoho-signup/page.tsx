"use client";

import { ArrowLeft, Zap, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function ZohoSignupPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div>
        <Link
          href="/dashboard"
          className="inline-flex items-center text-sm text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white mb-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-3 mb-2">
          <div className="h-10 w-10 rounded-lg bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center">
            <Zap className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Get Started On Zoho
          </h1>
        </div>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Access free trials for Zoho One or Zoho CRM to streamline your business operations and customer relationships.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Choose Your Zoho Platform</CardTitle>
          <CardDescription>
            Choose the Zoho platform that best fits your business needs. Both options include free trial access.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Zoho One */}
            <Card className="border-2 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">Zoho One</CardTitle>
                  <Badge variant="secondary">Free Trial</Badge>
                </div>
                <CardDescription>
                  The all-in-one suite with 45+ integrated business applications for your entire organization.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Complete business suite
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      CRM, HR, Finance, Marketing & more
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Perfect for growing businesses
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Unified platform experience
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Best for comprehensive needs
                    </span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <a
                    href="https://store.zoho.com.au/ResellerCustomerSignUp.do?id=83b46c9fa4ccf98935a1199e4c6b4442"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Zoho One Trial
                  </a>
                </Button>
              </CardContent>
            </Card>

            {/* Zoho CRM */}
            <Card className="border-2 hover:border-violet-300 dark:hover:border-violet-700 transition-colors">
              <CardHeader>
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl">Zoho CRM</CardTitle>
                  <Badge variant="secondary">Free Trial</Badge>
                </div>
                <CardDescription>
                  Powerful customer relationship management focused on sales, marketing, and customer support.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Sales automation & pipeline
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Lead & contact management
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Analytics & reporting
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Email & social integration
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      Best for sales-focused teams
                    </span>
                  </li>
                </ul>
                <Button
                  asChild
                  className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                >
                  <a
                    href="https://store.zoho.com.au/ResellerCustomerSignUp.do?id=bbab5e2f7df84933ab11a49716ecd9ea"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Start Zoho CRM Trial
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8 p-6 bg-violet-50 dark:bg-violet-900/20 rounded-lg border border-violet-200 dark:border-violet-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
              Why Zoho?
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              As an Arcus Automations partner solution, Zoho provides enterprise-grade tools with seamless integration, helping you streamline operations and scale efficiently.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

