import { Suspense } from "react";
import Link from "next/link";
import { Wrench, ExternalLink, Search, Sparkles } from "lucide-react";
import { createServerClient } from "@/lib/supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

async function getTools() {
  const supabase = await createServerClient();

  const { data: tools } = await supabase
    .from("resources")
    .select("*")
    .eq("type", "tool")
    .eq("is_published", true)
    .order("order_index", { ascending: true });

  return tools ?? [];
}

function ToolCard({
  tool,
}: {
  tool: {
    id: string;
    title: string;
    description: string | null;
    category: string;
    difficulty: string;
    is_premium: boolean;
    content_url: string | null;
  };
}) {
  return (
    <Card className="group card-hover h-full flex flex-col">
      <CardHeader className="flex-1">
        <div className="flex items-start justify-between">
          <div className="h-12 w-12 rounded-xl bg-amber-100 flex items-center justify-center dark:bg-amber-900/50">
            <Wrench className="h-6 w-6 text-amber-600 dark:text-amber-400" />
          </div>
          {tool.is_premium && (
            <Badge className="bg-amber-500 text-white">Premium</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 mt-4">
          <Badge variant="secondary" className="capitalize">
            {tool.difficulty}
          </Badge>
          <Badge variant="outline">{tool.category}</Badge>
        </div>
        <CardTitle className="text-lg mt-2">{tool.title}</CardTitle>
        <CardDescription className="line-clamp-3">
          {tool.description ?? "No description available"}
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button className="w-full" variant={tool.is_premium ? "outline" : "default"}>
          {tool.is_premium ? "Unlock Tool" : "Open Tool"}
          <ExternalLink className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

function ToolsSkeleton() {
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
              <Skeleton className="h-4 w-3/4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

async function ToolsContent() {
  const tools = await getTools();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white md:text-3xl">
          Tools
        </h1>
        <p className="mt-1 text-slate-600 dark:text-slate-400">
          Interactive utilities and calculators to boost your productivity
        </p>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
        <Input placeholder="Search tools..." className="pl-10" />
      </div>

      {/* Tools grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tools.length > 0 ? (
          tools.map((tool) => <ToolCard key={tool.id} tool={tool} />)
        ) : (
          <Card className="col-span-full p-12 text-center">
            <Sparkles className="h-12 w-12 mx-auto text-slate-300 dark:text-slate-700 mb-4" />
            <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              No tools available yet
            </h3>
            <p className="text-slate-500 dark:text-slate-400">
              Check back soon for interactive tools and utilities.
            </p>
          </Card>
        )}
      </div>
    </div>
  );
}

export default function ToolsPage() {
  return (
    <Suspense fallback={<ToolsSkeleton />}>
      <ToolsContent />
    </Suspense>
  );
}

