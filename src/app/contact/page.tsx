"use client";

import { useState } from "react";
import Link from "next/link";
import { Sparkles, Mail, Phone, Calendar, Send, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    topic: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Here you would typically send to your backend/email service
    // For now, we'll simulate a submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      toast.success("Consultation request submitted!", {
        description: "We'll contact you within 24 hours to schedule your consultation.",
      });
    }, 1000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-violet-50 dark:from-slate-950 dark:via-slate-900 dark:to-violet-950">
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
            </div>
          </div>
        </nav>

        <div className="pt-24 pb-20">
          <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
            <Card className="text-center">
              <CardContent className="pt-12 pb-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center mb-6">
                  <CheckCircle2 className="h-8 w-8 text-emerald-600 dark:text-emerald-400" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-4">
                  Thank You!
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-8">
                  We&apos;ve received your consultation request. Our team will contact you within 24 hours to schedule your free consultation.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button asChild>
                    <Link href="/">Return Home</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/dashboard">Go to Dashboard</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

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
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Let&apos;s Talk About Your Business
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Schedule a free consultation to discuss how AI and automation can transform your operations
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-violet-600" />
                  Book Your Free Consultation
                </CardTitle>
                <CardDescription>
                  Choose a time that works for you. Our team will discuss your business needs and show you how automation can help.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your company name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+61 4XX XXX XXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="topic">What would you like to discuss? *</Label>
                    <select
                      id="topic"
                      name="topic"
                      value={formData.topic}
                      onChange={handleChange}
                      required
                      className="flex h-11 w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-violet-500 focus:ring-violet-500/20 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
                    >
                      <option value="">Select a topic</option>
                      <option value="automation-strategy">Automation Strategy</option>
                      <option value="ai-implementation">AI Implementation</option>
                      <option value="process-optimization">Process Optimization</option>
                      <option value="custom-solutions">Custom Solutions</option>
                      <option value="training">Training & Onboarding</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate">Preferred Date</Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime">Preferred Time</Label>
                      <Input
                        id="preferredTime"
                        name="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      className="flex w-full rounded-lg border-2 border-slate-200 bg-white px-4 py-2 text-sm text-slate-900 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-0 focus:border-violet-500 focus:ring-violet-500/20 dark:bg-slate-900 dark:text-slate-100 dark:border-slate-700"
                      placeholder="Tell us more about your needs..."
                    />
                  </div>
                  <Button type="submit" className="w-full" isLoading={isSubmitting}>
                    <Send className="mr-2 h-4 w-4" />
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Info */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Direct Contact</CardTitle>
                  <CardDescription>
                    Prefer to reach out directly? We&apos;re here to help.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-violet-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">Email</p>
                      <a
                        href="mailto:admin@arcusautomations.com"
                        className="text-sm text-violet-600 hover:text-violet-700 dark:text-violet-400"
                      >
                        admin@arcusautomations.com
                      </a>
                      <p className="text-xs text-slate-500 mt-1">Response within 24 hours</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>What Happens Next?</CardTitle>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-4">
                    <li className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">1</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Discovery Call</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          We&apos;ll learn about your business and challenges
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">2</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Custom Proposal</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          We&apos;ll create a tailored solution for your needs
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">3</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Implementation</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Our team will implement and optimize your solution
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-3">
                      <div className="h-6 w-6 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center flex-shrink-0">
                        <span className="text-violet-600 dark:text-violet-400 text-sm font-bold">4</span>
                      </div>
                      <div>
                        <p className="font-medium text-slate-900 dark:text-white">Ongoing Support</p>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          We&apos;ll ensure your success with continuous support
                        </p>
                      </div>
                    </li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

