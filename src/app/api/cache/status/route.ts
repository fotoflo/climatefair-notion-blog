// Load environment variables from .env.local manually
import fs from "fs";
import path from "path";

const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf8");
  envContent.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && valueParts.length > 0) {
      const value = valueParts.join("=").trim();
      process.env[key.trim()] = value;
    }
  });
}

import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    // Dynamically import to check cache state
    const { getRouteLookupMap } = await import("@/lib/notion");

    // This will load from cache if available, without forcing refresh
    const lookupMap = await getRouteLookupMap();

    return NextResponse.json({
      success: true,
      status: "cache_loaded",
      entryCount: Object.keys(lookupMap).length,
      storage: process.env.EDGE_CONFIG ? "Vercel Edge Config" : "File system",
      environment: process.env.VERCEL_ENV || process.env.NODE_ENV || "unknown",
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error("[Cache Status] Error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to check cache status",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

