import { Suspense } from "react";
import Link from "next/link";
import {
  Search,
  Filter,
  Clock,
  Play,
  Sparkles,
  BookOpen,
} from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
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
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

async function getCourses(userId: string) {
  const supabase = await createServerClient();

  // Get all published courses
  const { data: courses } = await supabase
    .from("resources")
    .select("*")
    .eq("type", "course")
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  // Get user's progress for courses
  const { data: progress } = await supabase
    .from("user_resource_progress")
    .select("*")
    .eq("user_id", userId);

  // Map progress to courses
  const coursesWithProgress =
    courses?.map((course) => {
      const courseProgress = progress?.find((p) => p.resource_id === course.id);
      return {
        ...course,
        progress: courseProgress?.progress_percent ?? 0,
        completed: courseProgress?.completed_at !== null,
        lastAccessed: courseProgress?.last_accessed_at ?? null,
      };
    }) ?? [];

  return {
    all: coursesWithProgress,
    inProgress: coursesWithProgress.filter(
      (c) => c.progress > 0 && c.progress < 100
    ),
    completed: coursesWithProgress.filter((c) => c.completed),
    notStarted: coursesWithProgress.filter((c) => c.progress === 0),
  };
}

function CourseCard({
  course,
}: {
  course: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    thumbnail_url: string | null;
    duration_minutes: number | null;
    difficulty: string;
    is_premium: boolean;
    progress: number;
    completed: boolean;
  };
}) {
  const difficultyColors = {
    beginner: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300",
    intermediate: "bg-amber-100 text-amber-700 dark:bg-amber-900/50 dark:text-amber-300",
    advanced: "bg-red-100 text-red-700 dark:bg-red-900/50 dark:text-red-300",
  };

  return (
    <Link href={`/courses/${course.id}`}>
      <Card className="group card-hover overflow-hidden h-full">
        {/* Thumbnail */}
        <div className="relative h-44 bg-gradient-to-br from-violet-500 to-indigo-600">
          {course.thumbnail_url ? (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <BookOpen className="h-16 w-16 text-white/30" />
            </div>
          )}
          {course.is_premium && (
            <Badge className="absolute top-3 right-3 bg-amber-500 text-white">
              Premium
            </Badge>
          )}
          {course.completed && (
            <div className="absolute top-3 left-3 h-8 w-8 rounded-full bg-emerald-500 flex items-center justify-center">
              <svg className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
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
              className={difficultyColors[course.difficulty as keyof typeof difficultyColors]}
            >
              {course.difficulty}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {course.category}
            </Badge>
          </div>
          <CardTitle className="text-lg line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="line-clamp-2">
            {course.description ?? "No description available"}
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0 mt-auto">
          {/* Progress bar */}
          {course.progress > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between text-sm mb-1">
                <span className="text-slate-500 dark:text-slate-400">Progress</span>
                <span className="font-medium text-slate-700 dark:text-slate-300">
                  {course.progress}%
                </span>
              </div>
              <Progress value={course.progress} className="h-2" />
            </div>
          )}
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {course.duration_minutes ?? 0} min
            </div>
            {course.progress > 0 && !course.completed && (
              <span className="text-violet-600 dark:text-violet-400 font-medium">
                Continue →
              </span>
            )}
            {course.progress === 0 && (
              <span className="text-slate-400">Start course</span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function CoursesSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex gap-4">
        <Skeleton className="h-11 flex-1" />
        <Skeleton className="h-11 w-24" />
      </div>
      <Skeleton className="h-12 w-96" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <Skeleton className="h-44 w-full" />
            <CardHeader>
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-5 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-2 w-full mb-3" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function CoursesContent() {
  const user = await getCurrentUser();
  if (!user) return null;

  const courses = await getCourses(user.id);

  const EmptyState = ({ message }: { message: string }) => (
    <div className="col-span-full text-center py-12">
      <Sparkles className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
      <p className="text-slate-500 dark:text-slate-400">{message}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
            Courses
          </h1>
          <p className="mt-1 text-slate-600 dark:text-slate-400">
            Master AI and automation with our comprehensive courses
          </p>
        </div>
      </div>

      {/* Search and filters */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
          <Input
            placeholder="Search courses..."
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">
            All Courses ({courses.all.length})
          </TabsTrigger>
          <TabsTrigger value="in-progress">
            In Progress ({courses.inProgress.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({courses.completed.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.all.length > 0 ? (
              courses.all.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <EmptyState message="No courses available yet. Check back soon!" />
            )}
          </div>
        </TabsContent>

        <TabsContent value="in-progress" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.inProgress.length > 0 ? (
              courses.inProgress.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <EmptyState message="You haven't started any courses yet. Browse the catalog to begin!" />
            )}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.completed.length > 0 ? (
              courses.completed.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))
            ) : (
              <EmptyState message="You haven't completed any courses yet. Keep learning!" />
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default function CoursesPage() {
  return (
    <Suspense fallback={<CoursesSkeleton />}>
      <CoursesContent />
    </Suspense>
  );
}

