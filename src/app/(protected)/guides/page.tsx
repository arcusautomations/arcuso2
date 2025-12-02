import { Suspense } from "react";
import Link from "next/link";
import { FileText, Clock, ArrowRight, Search, BookOpen } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

async function getGuides() {
  const supabase = await createServerClient();

  const { data: guides } = await supabase
    .from("resources")
    .select("*")
    .eq("type", "guide")
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  return guides ?? [];
}

function GuideCard({
  guide,
}: {
  guide: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    duration_minutes: number | null;
    difficulty: string;
    is_premium: boolean;
  };
}) {
  return (
    <Link href={`/guides/${guide.id}`}>
      <Card className="group card-hover h-full">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="h-12 w-12 rounded-xl bg-blue-100 flex items-center justify-center dark:bg-blue-900/50">
              <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            {guide.is_premium && (
              <Badge className="bg-amber-500 text-white">Premium</Badge>
            )}
          </div>
          <div className="flex items-center gap-2 mt-4">
            <Badge variant="secondary" className="capitalize">
              {guide.difficulty}
            </Badge>
            <Badge variant="outline">{guide.category}</Badge>
          </div>
          <CardTitle className="text-lg mt-2 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
            {guide.title}
          </CardTitle>
          <CardDescription className="line-clamp-2">
            {guide.description ?? "No description available"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              {guide.duration_minutes ?? 0} min read
            </div>
            <span className="flex items-center text-violet-600 dark:text-violet-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
              Read guide
              <ArrowRight className="ml-1 h-4 w-4" />
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

function GuidesSkeleton() {
  return (
    <div className="space-y-6">
      <Skeleton className="h-11 w-full max-w-md" />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <Skeleton className="h-12 w-12 rounded-xl" />
              <Skeleton className="h-4 w-24 mt-4" />
              <Skeleton className="h-5 w-full mt-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function GuidesContent() {
  const guides = await getGuides();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          Guides
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Step-by-step tutorials and best practices
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input placeholder="Search guides..." className="pl-10" />
      </div>

      {/* Guides grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {guides.length > 0 ? (
          guides.map((guide) => <GuideCard key={guide.id} guide={guide} />)
        ) : (
          <Card className="col-span-full p-12 text-center">
            <BookOpen className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No guides available yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Check back soon for tutorials and how-to guides.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function GuidesPage() {
  return (
    <Suspense fallback={<GuidesSkeleton />}>
      <GuidesContent />
    </Suspense>
  );
}



