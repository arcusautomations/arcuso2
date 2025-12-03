"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Globe,
  Zap,
  Sparkles,
  FileText,
  BookOpen,
  TrendingUp,
  ArrowRight,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FreeWebsiteOptimisationModal } from "./FreeWebsiteOptimisationModal";

function ResourceCard({
  title,
  description,
  icon: Icon,
  badge,
  onClick,
  href,
  external,
  isPremium = false,
}: {
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
  onClick?: () => void;
  href?: string;
  external?: boolean;
  isPremium?: boolean;
}) {
  const content = (
    <Card className="group card-hover overflow-hidden h-full flex flex-col">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between mb-2">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center">
            <Icon className="h-6 w-6 text-white" />
          </div>
          {badge && (
            <Badge variant="secondary" className="bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300">
              {badge}
            </Badge>
          )}
          {isPremium && (
            <Badge className="bg-amber-500 text-white">Premium</Badge>
          )}
        </div>
        <CardTitle className="text-lg">{title}</CardTitle>
        <CardDescription className="line-clamp-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0 mt-auto">
        <div className="flex items-center text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300">
          {external ? "Open" : "Learn more"}
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </CardContent>
    </Card>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className="text-left w-full">
        {content}
      </button>
    );
  }

  if (href) {
    if (external) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className="block">
          {content}
        </a>
      );
    }
    return <Link href={href}>{content}</Link>;
  }

  return content;
}

export function DashboardResources() {
  const [websiteModalOpen, setWebsiteModalOpen] = useState(false);

  return (
    <>
      {/* Free Resources Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Free Resources
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            title="Free Website Optimisation"
            description="Get a free audit for your existing website or a free 5-page website build for your business."
            icon={Globe}
            badge="Free"
            onClick={() => setWebsiteModalOpen(true)}
          />
          <ResourceCard
            title="Get Started On Zoho"
            description="Access trials for Zoho One or Zoho CRM with Arcus Automations as your Zoho Consulting Partner. Streamline your business operations and customer relationships."
            icon={Zap}
            badge="Free Trial"
            href="/zoho-signup"
          />
          <ResourceCard
            title="AI and Tech Self-Help Tools"
            description="Access free tools and resources to help you with AI and technology implementation."
            icon={Sparkles}
            badge="Free"
            href="/tools"
          />
          <ResourceCard
            title="Free Business Essentials Guide"
            description="Essential guides and resources to help you grow your business with AI and automation."
            icon={FileText}
            badge="Free"
            href="/guides"
          />
        </div>
      </div>

      {/* Paid Services Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Paid Services
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ResourceCard
            title="Arcus AI Training Course"
            description="Comprehensive training course on AI and automation technologies."
            icon={BookOpen}
            isPremium
            href="/courses/arcus-ai-training"
          />
          <ResourceCard
            title="Arcus Solutions"
            description="Comprehensive AI & Technology Solutions - Strategic consulting, implementation, optimization, and ongoing support."
            icon={Sparkles}
            isPremium
            href="/solutions"
          />
          <ResourceCard
            title="Sales Psychology Training Guide"
            description="Learn the psychology behind effective sales and customer relationships."
            icon={TrendingUp}
            isPremium
            href="/courses/sales-psychology"
          />
          <ResourceCard
            title="Arcus SEO/AEO Development"
            description="Search Engine Optimization and Answer Engine Optimization services to improve your online visibility."
            icon={Zap}
            isPremium
            href="/services/seo-aeo"
          />
        </div>
      </div>

      <FreeWebsiteOptimisationModal
        open={websiteModalOpen}
        onOpenChange={setWebsiteModalOpen}
      />
    </>
  );
}

