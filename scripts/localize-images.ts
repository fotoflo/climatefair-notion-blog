// Download Notion-hosted images into public/post-images/ with stable filenames
// and rewrite cached post URLs to point at the local copies.
//
// Why: Notion serves images via signed S3 URLs that expire ~1 hour after they
// are generated (X-Amz-Expires=3600). Because posts are baked into a static
// posts-cache.json at build time, those signed URLs are dead by the time the
// site is served. Localizing the images removes the dependency on Notion's
// expiring URLs entirely.

import fs from "fs";
import path from "path";
import crypto from "crypto";

const IMAGE_DIR = path.join(process.cwd(), "public", "post-images");
const PUBLIC_PREFIX = "/post-images";

function isNotionImage(url: string): boolean {
  return (
    url.includes("amazonaws.com") ||
    url.includes("prod-files-secure") ||
    url.includes("notion.so/image") ||
    url.includes("notion.so/signed")
  );
}

function extFromUrl(url: string): string {
  try {
    const ext = path.extname(new URL(url).pathname).toLowerCase();
    if (ext && /^\.[a-z0-9]{2,4}$/.test(ext)) return ext;
  } catch {
    // fall through
  }
  return ".png";
}

// Stable identity = the S3 object path, ignoring the signing query string.
// The path contains the Notion block id + filename, so it is unique per image
// and stable across re-fetches.
function localNameForUrl(url: string): string {
  let identity = url;
  try {
    identity = new URL(url).pathname;
  } catch {
    // use raw url
  }
  const hash = crypto.createHash("sha1").update(identity).digest("hex").slice(0, 16);
  return `${hash}${extFromUrl(url)}`;
}

async function downloadOne(url: string, destPath: string): Promise<boolean> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`  ✗ HTTP ${res.status} — ${url.slice(0, 90)}`);
      return false;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    if (buf.length === 0) {
      console.warn(`  ✗ empty body — ${url.slice(0, 90)}`);
      return false;
    }
    fs.writeFileSync(destPath, buf);
    return true;
  } catch (err: any) {
    console.warn(`  ✗ ${err?.message || err} — ${url.slice(0, 90)}`);
    return false;
  }
}

export async function localizeImages<T extends object>(posts: T[]): Promise<T[]> {
  // Work against a string-indexable view so we can scan/rewrite arbitrary
  // string fields (content, coverImage, description, ...) without requiring the
  // caller's type to carry an index signature.
  const records = posts as Array<Record<string, unknown>>;
  fs.mkdirSync(IMAGE_DIR, { recursive: true });

  // 1. Collect every unique Notion image URL across ALL string fields of each
  // post (content, coverImage, description, ...). A bare URL in JSON ends at a
  // quote; a markdown image URL ends at the closing paren — both are excluded
  // from the URL character class below.
  const NOTION_URL_REGEX = /https?:\/\/[^\s"')\]]+/g;
  const candidates = new Set<string>();
  for (const post of records) {
    for (const value of Object.values(post)) {
      if (typeof value !== "string") continue;
      const matches = value.match(NOTION_URL_REGEX);
      if (!matches) continue;
      for (const url of matches) {
        if (isNotionImage(url)) candidates.add(url);
      }
    }
  }

  console.log(`Localizing ${candidates.size} unique Notion image URL(s)...`);

  // 2. Download each (skipping ones already on disk) and map url -> public path.
  const urlMap = new Map<string, string>();
  let downloaded = 0;
  let reused = 0;
  let failed = 0;

  for (const url of candidates) {
    const name = localNameForUrl(url);
    const destPath = path.join(IMAGE_DIR, name);
    const publicPath = `${PUBLIC_PREFIX}/${name}`;

    if (fs.existsSync(destPath) && fs.statSync(destPath).size > 0) {
      urlMap.set(url, publicPath);
      reused++;
      continue;
    }

    const ok = await downloadOne(url, destPath);
    if (ok) {
      urlMap.set(url, publicPath);
      downloaded++;
      console.log(`  ✓ ${publicPath}`);
    } else {
      failed++;
    }
  }

  // 3. Rewrite every string field on each post to the local paths.
  const rewrite = (s: string): string => {
    let out = s;
    for (const [url, local] of urlMap) {
      out = out.split(url).join(local);
    }
    return out;
  };

  for (const post of records) {
    for (const key of Object.keys(post)) {
      if (typeof post[key] === "string") {
        post[key] = rewrite(post[key] as string);
      }
    }
  }

  console.log(
    `Image localization complete: ${downloaded} downloaded, ${reused} reused, ${failed} failed.`
  );
  if (failed > 0) {
    console.warn(
      "⚠️  Some images failed to download — they will remain as (expired) Notion URLs."
    );
  }

  return posts;
}
