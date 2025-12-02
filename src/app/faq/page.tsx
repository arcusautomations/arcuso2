import Link from "next/link";
import { Sparkles, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqCategories = [
  {
    title: "General Questions",
    items: [
      {
        question: "What is Arcus Online?",
        answer: "Arcus Online is a comprehensive platform providing AI and automation training, tools, and services to help businesses transform their operations. We offer courses, guides, tools, and professional services designed to help businesses of all sizes implement AI and automation solutions.",
      },
      {
        question: "Who is Arcus Online for?",
        answer: "Arcus Online is designed for businesses of all sizes, from startups to enterprises, looking to implement AI and automation solutions. Whether you're a business owner, manager, developer, or professional looking to upskill, we have resources for you.",
      },
      {
        question: "Do I need technical knowledge to get started?",
        answer: "No! Our courses and tools are designed for both technical and non-technical users. We start with the basics and guide you through advanced topics. Many of our resources are specifically designed for business users without technical backgrounds.",
      },
      {
        question: "Is Arcus Online free?",
        answer: "We offer a free tier with access to basic resources, guides, and tools. Premium courses and advanced features require a paid subscription. We also offer free trials for all paid plans.",
      },
    ],
  },
  {
    title: "Courses & Training",
    items: [
      {
        question: "How long do I have access to courses?",
        answer: "Once enrolled, you have lifetime access to course materials and updates. This means you can revisit the content anytime and stay updated with new material as we add it.",
      },
      {
        question: "Are courses self-paced?",
        answer: "Yes, all courses are self-paced with optional live support sessions. You can learn at your own speed and schedule, making it easy to fit learning into your busy schedule.",
      },
      {
        question: "Do you offer certificates?",
        answer: "Yes, we provide certificates of completion for all premium courses. These certificates can be added to your LinkedIn profile and resume to showcase your skills.",
      },
      {
        question: "What if I need help during a course?",
        answer: "We offer multiple support channels including community forums, email support, and optional live Q&A sessions. Premium members also get priority support and direct access to instructors.",
      },
    ],
  },
  {
    title: "Tools & Services",
    items: [
      {
        question: "What tools are included?",
        answer: "Free members get access to basic tools and templates including automation templates, AI prompt libraries, and workflow builders. Premium members get advanced tools, custom templates, and priority support.",
      },
      {
        question: "Can I use these tools for my business?",
        answer: "Yes, all tools and templates are designed for commercial use. You can use them in your business operations, customize them for your needs, and integrate them into your workflows.",
      },
      {
        question: "Do you offer custom development?",
        answer: "Yes, we offer custom AI and automation solutions for enterprise clients. Our team can build tailored solutions that integrate with your existing systems and meet your specific business requirements.",
      },
      {
        question: "What services do you provide?",
        answer: "We provide comprehensive services including strategic consulting, full-service implementation, A/B testing and optimization, team onboarding and training, maintenance and enhancement, and growth and scaling support.",
      },
    ],
  },
  {
    title: "Pricing & Billing",
    items: [
      {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, Mastercard, American Express). Enterprise clients can be invoiced and may have additional payment options available.",
      },
      {
        question: "Can I cancel anytime?",
        answer: "Yes, you can cancel your subscription at any time. You'll retain access to all premium features until the end of your current billing period. There are no cancellation fees or penalties.",
      },
      {
        question: "Is there a money-back guarantee?",
        answer: "Yes, we offer a 30-day money-back guarantee on all paid plans. If you're not satisfied with your purchase, contact us within 30 days for a full refund.",
      },
      {
        question: "Do you offer discounts for annual plans?",
        answer: "Yes, we offer significant discounts for annual subscriptions. Annual plans typically save you 20% compared to monthly billing. Enterprise plans may have additional discounts available.",
      },
      {
        question: "What happens if I upgrade or downgrade my plan?",
        answer: "You can upgrade or downgrade your plan at any time. When upgrading, you'll get immediate access to new features. When downgrading, changes take effect at the end of your current billing period. We prorate charges for upgrades.",
      },
    ],
  },
  {
    title: "Technical Support",
    items: [
      {
        question: "What kind of support do you offer?",
        answer: "We offer email support for all users with a 24-hour response time. Premium members get priority support with faster response times. Enterprise clients have access to dedicated account managers and phone support.",
      },
      {
        question: "Do you provide implementation support?",
        answer: "Yes, our team provides hands-on implementation support for all our solutions. This includes setup assistance, integration help, and troubleshooting. Premium and enterprise plans include more comprehensive support.",
      },
      {
        question: "Can you help integrate with my existing systems?",
        answer: "Absolutely! We specialize in integrating AI and automation solutions with existing business systems. Our team can help with API integrations, data migrations, and system connections.",
      },
    ],
  },
];

export default function FAQPage() {
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
              Frequently Asked Questions
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Everything you need to know about Arcus Online
            </p>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <Card key={categoryIndex}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem
                        key={itemIndex}
                        value={`item-${categoryIndex}-${itemIndex}`}
                      >
                        <AccordionTrigger className="text-left">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-slate-600 dark:text-slate-400">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Still Have Questions */}
          <Card className="mt-12 bg-gradient-to-r from-violet-600 to-indigo-600 text-white border-0">
            <CardHeader>
              <CardTitle className="text-white text-2xl">Still Have Questions?</CardTitle>
              <CardDescription className="text-violet-100">
                Can&apos;t find the answer you&apos;re looking for? Our team is here to help.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="bg-white text-violet-600 hover:bg-violet-50">
                  <Link href="/contact">Contact Us</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link href="/signup">Get Started Free</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

