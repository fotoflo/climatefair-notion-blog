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
    // Dynamically import functions after env vars are loaded
    const { getRouteLookupMap } = await import("@/lib/notion");

    console.log("[Cache API] Starting route lookup map refresh...");

    // Force refresh by clearing in-memory cache and fetching fresh
    // Note: This will automatically save to persistent storage (KV or file)
    const lookupMap = await getRouteLookupMap();

    console.log(`[Cache API] Refreshed route lookup cache with ${Object.keys(lookupMap).length} entries`);

    return NextResponse.json({
      success: true,
      message: "Route lookup cache refreshed",
      entryCount: Object.keys(lookupMap).length,
      lastUpdated: new Date().toISOString(),
      storage: process.env.EDGE_CONFIG ? "Vercel Edge Config" : "File system"
    });

  } catch (error) {
    console.error("[Cache API] Error refreshing cache:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to refresh route lookup cache",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  // POST method for Vercel cron jobs
  return GET(request);
}
