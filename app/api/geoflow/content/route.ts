import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

const SECRET = process.env.GEOFLOW_API_SECRET || "change-me-to-a-random-string";

function verifySig(body: string, header: string | null): boolean {
  if (!header) return false;
  const hmac = crypto.createHmac("sha256", SECRET).update(body).digest("hex");
  return header === `sha256=${hmac}`;
}

function escapeFrontmatter(val: string): string {
  return val.replace(/"/g, '\\"');
}

function buildMdx(data: Record<string, unknown>): string {
  const title = escapeFrontmatter(String(data.title || ""));
  const slug = escapeFrontmatter(String(data.slug || ""));
  const description = escapeFrontmatter(String(data.meta_description || ""));
  const publishedAt = String(data.published_at || new Date().toISOString());
  const keywords = Array.isArray(data.keywords)
    ? data.keywords.map((k) => `"${escapeFrontmatter(String(k))}"`).join(", ")
    : "";
  const author = escapeFrontmatter(String(data.author || ""));
  const featuredImage = escapeFrontmatter(String(data.featured_image || ""));
  const category = escapeFrontmatter(String(data.category || ""));

  const frontmatter = `---
title: "${title}"
slug: "${slug}"
description: "${description}"
publishedAt: "${publishedAt}"
keywords: [${keywords}]
author: "${author}"${featuredImage ? `\nfeaturedImage: "${featuredImage}"` : ""}${category ? `\ncategory: "${category}"` : ""}
---

${data.markdown || ""}`;

  return frontmatter;
}

export async function POST(req: NextRequest) {
  try {
    // ---- HMAC Signature Verification ----
    const body = await req.text();
    const sig = req.headers.get("x-hub-signature");

    if (!verifySig(body, sig)) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    const data = JSON.parse(body);

    // ---- Validate required fields ----
    if (!data.slug || !data.title || !data.markdown) {
      return NextResponse.json(
        { error: "missing required fields: slug, title, markdown" },
        { status: 400 }
      );
    }

    // ---- Write MDX file ----
    const dir = path.join(process.cwd(), "content", "articles");
    await mkdir(dir, { recursive: true });

    const mdxContent = buildMdx(data);
    const filePath = path.join(dir, `${data.slug}.mdx`);
    await writeFile(filePath, mdxContent, "utf-8");

    console.log(`[GEOFlow] Article saved: ${data.title} → ${filePath}`);

    return NextResponse.json({
      status: "ok",
      slug: data.slug,
      path: filePath,
    });
  } catch (err) {
    console.error("[GEOFlow] Error:", err);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  }
}

export const runtime = "nodejs";
