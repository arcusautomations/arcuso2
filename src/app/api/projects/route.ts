import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";
import { createProjectSchema, projectFilterSchema } from "@/lib/validation/project";

// Force dynamic rendering - this route uses cookies for authentication
export const dynamic = 'force-dynamic';

/**
 * GET /api/projects
 * Get the current user's projects
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { searchParams } = new URL(request.url);

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Parse and validate query parameters
    const filterParams = {
      status: searchParams.get("status") ?? undefined,
      search: searchParams.get("search") ?? undefined,
      sortBy: searchParams.get("sortBy") ?? undefined,
      sortOrder: searchParams.get("sortOrder") ?? undefined,
    };

    const validation = projectFilterSchema.safeParse(filterParams);
    const filters = validation.success ? validation.data : {};

    // Build query
    let query = supabase
      .from("projects")
      .select("*", { count: "exact" })
      .eq("user_id", user.id);

    if (filters.status) {
      query = query.eq("status", filters.status);
    }

    if (filters.search) {
      query = query.or(
        `name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
      );
    }

    // Apply sorting
    const sortBy = filters.sortBy ?? "created_at";
    const sortOrder = filters.sortOrder === "asc" ? true : false;
    query = query.order(sortBy, { ascending: sortOrder });

    const { data: projects, error, count } = await query;

    if (error) {
      console.error("Error fetching projects:", error);
      return NextResponse.json(
        { error: "Failed to fetch projects" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      projects,
      total: count ?? 0,
    });
  } catch (error) {
    console.error("Error fetching projects:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * POST /api/projects
 * Create a new project
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = await createServerClient();

    // Verify authentication
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    // Validate input
    const validation = createProjectSchema.safeParse(body);
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.errors[0]?.message ?? "Invalid input" },
        { status: 400 }
      );
    }

    const { name, description } = validation.data;

    // Create project
    const { data: project, error } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        name,
        description,
        status: "active",
      })
      .select()
      .single();

    if (error) {
      console.error("Error creating project:", error);
      return NextResponse.json(
        { error: "Failed to create project" },
        { status: 500 }
      );
    }

    return NextResponse.json({ project }, { status: 201 });
  } catch (error) {
    console.error("Error creating project:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}



