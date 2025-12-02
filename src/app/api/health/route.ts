import { NextResponse } from "next/server";

/**
 * Health check endpoint for deployment verification
 * Returns status of the application and its dependencies
 */
export async function GET() {
  const healthCheck = {
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV ?? "development",
    version: process.env.npm_package_version ?? "1.0.0",
    checks: {
      database: "unknown", // Would check Supabase connection
      auth: "unknown", // Would verify auth configuration
    },
  };

  // Check if required environment variables are set
  const requiredEnvVars = [
    "NEXT_PUBLIC_SUPABASE_URL",
    "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  ];

  const missingEnvVars = requiredEnvVars.filter(
    (envVar) => !process.env[envVar]
  );

  if (missingEnvVars.length > 0) {
    return NextResponse.json(
      {
        ...healthCheck,
        status: "unhealthy",
        error: `Missing environment variables: ${missingEnvVars.join(", ")}`,
      },
      { status: 503 }
    );
  }

  return NextResponse.json(healthCheck);
}

