import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@/lib/supabase/server";

/**
 * GET /api/resources
 * Get all published resources with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerClient();
    const { searchParams } = new URL(request.url);

    // Parse query parameters
    const type = searchParams.get("type"); // course, guide, template, tool
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");
    const search = searchParams.get("search");
    const limit = parseInt(searchParams.get("limit") ?? "20", 10);
    const offset = parseInt(searchParams.get("offset") ?? "0", 10);

    // Build query
    let query = supabase
      .from("resources")
      .select("*", { count: "exact" })
      .eq("is_published", true)
      .order("order_index", { ascending: true });

    // Apply filters
    if (type && ["course", "guide", "template", "tool"].includes(type)) {
      query = query.eq("type", type as "course" | "guide" | "template" | "tool");
    }

    if (category) {
      query = query.eq("category", category);
    }

    if (difficulty && ["beginner", "intermediate", "advanced"].includes(difficulty)) {
      query = query.eq("difficulty", difficulty as "beginner" | "intermediate" | "advanced");
    }

    if (search) {
      query = query.or(
        `title.ilike.%${search}%,description.ilike.%${search}%`
      );
    }

    // Apply pagination
    query = query.range(offset, offset + limit - 1);

    const { data: resources, error, count } = await query;

    if (error) {
      console.error("Error fetching resources:", error);
      return NextResponse.json(
        { error: "Failed to fetch resources" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      resources,
      total: count ?? 0,
      limit,
      offset,
    });
  } catch (error) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

