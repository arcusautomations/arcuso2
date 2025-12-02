import { ArrowLeft, Sparkles, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function SolutionsPage() {
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
            <Sparkles className="h-5 w-5 text-violet-600 dark:text-violet-400" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
            Arcus Solutions
          </h1>
        </div>
        <p className="mt-2 text-slate-600 dark:text-slate-400">
          Comprehensive AI & Technology Solutions
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Comprehensive AI & Technology Solutions</CardTitle>
          <CardDescription>
            Arcus Automations provides end-to-end services designed to transform your business through intelligent automation and cutting-edge technology. From initial strategy to ongoing optimization, we&apos;re your trusted partner for digital excellence.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Services */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Strategic Consulting</CardTitle>
                <CardDescription>
                  Expert guidance to identify opportunities and develop comprehensive digital transformation strategies tailored to your business goals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Business process analysis and optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Technology roadmap development</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>ROI modeling and success metrics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Change management planning</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Full-Service Implementation</CardTitle>
                <CardDescription>
                  End-to-end solution development and deployment, from initial design through to production launch and integration.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Custom AI and automation solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>System integration and migration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>API development and connections</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Quality assurance and testing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">A/B Testing & Optimization</CardTitle>
                <CardDescription>
                  Data-driven experimentation to continuously improve performance, user experience, and conversion rates.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Hypothesis development and testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Multivariate testing strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Analytics and performance tracking</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Continuous improvement cycles</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Team Onboarding & Training</CardTitle>
                <CardDescription>
                  Comprehensive training programs to ensure your team can effectively use and maintain new systems and technologies.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Customized training programs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Hands-on workshops and sessions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Documentation and resources</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Ongoing support and mentorship</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Maintenance & Enhancement</CardTitle>
                <CardDescription>
                  Ongoing support, updates, and improvements to keep your systems running optimally and evolving with your needs.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Proactive monitoring and maintenance</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Regular updates and security patches</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Feature enhancements and additions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Technical support and troubleshooting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Growth & Scaling</CardTitle>
                <CardDescription>
                  Strategic support to scale your operations, optimize costs, and maximize efficiency as your business grows.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Infrastructure scaling strategies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Performance optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Cost efficiency analysis</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="h-4 w-4 text-violet-600 dark:text-violet-400 flex-shrink-0 mt-0.5" />
                    <span>Capacity planning and forecasting</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Process */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Our Proven Process
            </h3>
            <div className="grid gap-4 md:grid-cols-4">
              {[
                { step: "1", title: "Discovery", description: "We learn about your business, challenges, and goals" },
                { step: "2", title: "Strategy", description: "We develop a customized roadmap and solution design" },
                { step: "3", title: "Implementation", description: "We build, test, and deploy your solution" },
                { step: "4", title: "Optimize", description: "We continuously improve and enhance performance" },
              ].map((item) => (
                <Card key={item.step} className="text-center">
                  <CardHeader>
                    <div className="h-12 w-12 rounded-full bg-violet-100 dark:bg-violet-900/50 flex items-center justify-center mx-auto mb-2">
                      <span className="text-xl font-bold text-violet-600 dark:text-violet-400">
                        {item.step}
                      </span>
                    </div>
                    <CardTitle className="text-base">{item.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Why Choose */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-6">
              Why Choose Arcus Automations?
            </h3>
            <div className="grid gap-4 md:grid-cols-3">
              <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border-violet-200 dark:border-violet-800">
                <CardHeader>
                  <CardTitle className="text-lg">40% Productivity Increase</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Our clients see an average 40% improvement in operational efficiency
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border-violet-200 dark:border-violet-800">
                <CardHeader>
                  <CardTitle className="text-lg">Proven ROI</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Average payback period of 6-12 months on automation investments
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-gradient-to-br from-violet-50 to-indigo-50 dark:from-violet-900/20 dark:to-indigo-900/20 border-violet-200 dark:border-violet-800">
                <CardHeader>
                  <CardTitle className="text-lg">Ongoing Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    Dedicated team available for training, maintenance, and enhancements
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-6 border-t border-slate-200 dark:border-slate-800">
            <Card className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
              <CardHeader>
                <CardTitle className="text-white text-xl">Ready to Transform Your Business?</CardTitle>
                <CardDescription className="text-violet-100">
                  Let&apos;s discuss how our comprehensive solutions can help you achieve your goals. Schedule a free consultation with our team today.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-violet-600 hover:bg-violet-50"
                >
                  <a href="mailto:admin@arcusautomations.com">
                    Schedule Consultation
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

