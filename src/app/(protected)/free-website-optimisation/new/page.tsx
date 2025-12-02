"use client";

import { ArrowLeft, Globe, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function NewWebsitePage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
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
            <Globe className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Get Started On Your Free Website
          </h1>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Free Website Build</CardTitle>
          <CardDescription>
            Arcus Automations provides free website enhancements and modern 5-page website builds designed to help your business stay ahead; without extra effort on your end. In just a few minutes, you&apos;ll generate a professionally structured website that&apos;s ready to launch.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              What happens next:
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    We create your 5-page, upgraded website for free
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    You can self-host and take full ownership at no cost
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                    (we provide the step-by-step)
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Or choose affordable hosting + maintenance handled entirely by Arcus Automations
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            >
              <a
                href="https://zfrmz.com.au/Y7x4mO7reWZoRrzbLQnA"
                target="_blank"
                rel="noopener noreferrer"
              >
                Start My Free Website Build
              </a>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

