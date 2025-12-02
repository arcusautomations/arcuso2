import { Suspense } from "react";
import Link from "next/link";
import {
  BookOpen,
  FolderKanban,
  TrendingUp,
  Clock,
  ArrowRight,
  Play,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { getCurrentUser } from "@/lib/auth";
import { createServerClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

async function getDashboardStats(userId: string) {
  const supabase = await createServerClient();

  // Get user's resource progress
  const { data: progress } = await supabase
    .from("user_resource_progress")
    .select("*, resources(*)")
    .eq("user_id", userId);

  // Get user's projects
  const { data: projects } = await supabase
    .from("projects")
    .select("*")
    .eq("user_id", userId);

  // Get available resources
  const { data: resources } = await supabase
    .from("resources")
    .select("*")
    .eq("is_published", true)
    .order("order_index", { ascending: true })
    .limit(6);

  const completedCourses = progress?.filter(
    (p) => p.progress_percent === 100
  ).length ?? 0;
  const inProgressCourses = progress?.filter(
    (p) => p.progress_percent > 0 && p.progress_percent < 100
  ).length ?? 0;

  return {
    stats: {
      totalCourses: resources?.filter((r) => r.type === "course").length ?? 0,
      completedCourses,
      inProgressCourses,
      totalProjects: projects?.length ?? 0,
      activeProjects: projects?.filter((p) => p.status === "active").length ?? 0,
    },
    recentProgress: progress?.slice(0, 3) ?? [],
    featuredResources: resources ?? [],
  };
}

function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
}: {
  title: string;
  value: string | number;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  trend?: { value: number; positive: boolean };
}) {
  return (
    <Card className="relative overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
          {title}
        </CardTitle>
        <div className="h-10 w-10 rounded-xl bg-violet-100 flex items-center justify-center dark:bg-violet-900/50">
          <Icon className="h-5 w-5 text-violet-600 dark:text-violet-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold text-slate-900 dark:text-white">
          {value}
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {description}
        </p>
        {trend && (
          <div
            className={`mt-2 inline-flex items-center text-xs font-medium ${
              trend.positive ? "text-emerald-600" : "text-red-600"
            }`}
          >
            <TrendingUp
              className={`h-3 w-3 mr-1 ${!trend.positive && "rotate-180"}`}
            />
            {trend.value}% from last month
          </div>
        )}
      </CardContent>
      {/* Decorative gradient */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl" />
    </Card>
  );
}

function ResourceCard({
  resource,
}: {
  resource: {
    id: string;
    title: string;
    description: string | null;
    type: string;
    category: string;
    thumbnail_url: string | null;
    duration_minutes: number | null;
    difficulty: string;
    is_premium: boolean;
  };
}) {
  const typeColors = {
    course: "bg-violet-100 text-violet-700 dark:bg-violet-900/50 dark:text-violet-300",
    guide: "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300",
    template: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    tool: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
  };

  return (
    <Card className="group card-hover overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-40 bg-gradient-to-br from-violet-500 to-indigo-600">
        {resource.thumbnail_url ? (
          <img
            src={resource.thumbnail_url}
            alt={resource.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <Sparkles className="h-12 w-12 text-white/50" />
          </div>
        )}
        {resource.is_premium && (
          <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
            Premium
          </Badge>
        )}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="h-14 w-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-75 group-hover:scale-100 transition-transform">
            <Play className="h-6 w-6 text-violet-600 ml-1" />
          </div>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex items-center gap-2 mb-2">
          <Badge
            variant="secondary"
            className={typeColors[resource.type as keyof typeof typeColors]}
          >
            {resource.type}
          </Badge>
          <Badge variant="outline" className="capitalize">
            {resource.difficulty}
          </Badge>
        </div>
        <CardTitle className="text-lg line-clamp-1">{resource.title}</CardTitle>
        <CardDescription className="line-clamp-2">
          {resource.description ?? "No description available"}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            {resource.duration_minutes ?? 0} min
          </div>
          <span className="capitalize">{resource.category}</span>
        </div>
      </CardContent>
    </Card>
  );
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

async function DashboardContent() {
  const user = await getCurrentUser();
  if (!user) return null;

  const { stats, featuredResources } = await getDashboardStats(user.id);

  return (
    <div className="space-y-8">
      {/* Welcome section */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Welcome back, {user.profile?.fullName?.split(" ")[0] ?? "there"}! 👋
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Continue your learning journey where you left off.
          </p>
        </div>
        <Button asChild>
          <Link href="/courses">
            Browse Courses
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Available Courses"
          value={stats.totalCourses}
          description="Ready to start learning"
          icon={BookOpen}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgressCourses}
          description="Keep going!"
          icon={Clock}
        />
        <StatsCard
          title="Completed"
          value={stats.completedCourses}
          description="Great achievement"
          icon={CheckCircle2}
        />
        <StatsCard
          title="Projects"
          value={stats.totalProjects}
          description={`${stats.activeProjects} active`}
          icon={FolderKanban}
        />
      </div>

      {/* Featured resources */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Featured Resources
          </h2>
          <Link
            href="/courses"
            className="text-sm font-medium text-violet-600 hover:text-violet-700 dark:text-violet-400 dark:hover:text-violet-300 inline-flex items-center"
          >
            View all
            <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredResources.length > 0 ? (
            featuredResources.map((resource) => (
              <Link href={`/resources/${resource.id}`} key={resource.id}>
                <ResourceCard resource={resource} />
              </Link>
            ))
          ) : (
            <Card className="col-span-full p-12 text-center">
              <Sparkles className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                No resources available yet
              </h3>
              <p className="text-slate-500 dark:text-slate-400 mb-4">
                Check back soon for new courses, guides, and tools.
              </p>
            </Card>
          )}
        </div>
      </div>

      {/* Quick actions */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-violet-600 to-indigo-600 text-white border-0">
          <CardHeader>
            <CardTitle className="text-white">Start Your First Course</CardTitle>
            <CardDescription className="text-violet-100">
              Dive into AI and automation with our beginner-friendly courses.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="bg-white text-violet-600 hover:bg-violet-50">
              Browse Courses
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 text-white border-0 dark:from-slate-800 dark:to-slate-950">
          <CardHeader>
            <CardTitle className="text-white">Create a Project</CardTitle>
            <CardDescription className="text-slate-300">
              Apply what you&apos;ve learned by building your own automation project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="bg-white text-slate-900 hover:bg-slate-100">
              New Project
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent />
    </Suspense>
  );
}

