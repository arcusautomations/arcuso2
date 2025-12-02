import { Suspense } from "react";
import Link from "next/link";
import {
  BookOpen,
  FolderKanban,
  TrendingUp,
  Clock,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Globe,
  Zap,
  FileText,
  CreditCard,
  ExternalLink,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DashboardResources } from "@/components/dashboard/DashboardResources";

async function getDashboardStats(userId: string) {
  // This function can be expanded later if needed
  return {
    stats: {
      totalCourses: 0,
      completedCourses: 0,
      inProgressCourses: 0,
      totalProjects: 0,
      activeProjects: 0,
    },
  };
}

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

function DashboardSkeleton() {
  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="pb-2">
              <Skeleton className="h-4 w-24" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-16 mb-2" />
              <Skeleton className="h-3 w-32" />
            </CardContent>
          </Card>
        ))}
      </div>
      <div>
        <Skeleton className="h-6 w-40 mb-4" />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-40 w-full" />
              <CardHeader>
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-5 w-full" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

async function DashboardPageContent() {
  const user = await getCurrentUser();
  if (!user) return null;

  const firstName = user.profile?.firstName || user.profile?.fullName?.split(" ")[0] || "there";
  const { stats } = await getDashboardStats(user.id);

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Welcome back, {firstName}! 👋
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Continue your learning journey where you left off.
          </p>
        </div>
      </div>

      {/* Resources - Client component for interactivity */}
      <DashboardResources />
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardPageContent />
    </Suspense>
  );
}
