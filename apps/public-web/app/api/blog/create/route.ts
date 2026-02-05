import { NextResponse } from "next/server";
import { mkdir, writeFile, access } from "node:fs/promises";
import path from "node:path";

function slugify(input: string) {
    return input
        .toLowerCase()
        .trim()
        .replace(/['"]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
}

async function exists(p: string) {
    try {
        await access(p);
        return true;
    } catch {
        return false;
    }
}

// Adjust to your repo layout (this is common in your monorepo setup)
function postDir(slug: string) {
    // apps/public-web/content/posts/<slug>/
    return path.join(process.cwd(), "content", "posts", slug);
}

export async function POST(req: Request) {
    const fd = await req.formData();

    const title = String(fd.get("title") ?? "").trim();
    const date = String(fd.get("date") ?? "").trim();
    const excerpt = String(fd.get("excerpt") ?? "").trim();
    const image = String(fd.get("image") ?? "").trim();

    if (!title) return new NextResponse("Missing title", { status: 400 });
    if (!date) return new NextResponse("Missing date", { status: 400 });
    if (!excerpt) return new NextResponse("Missing excerpt", { status: 400 });

    let slug = slugify(title);
    if (!slug) return new NextResponse("Invalid title", { status: 400 });

    // avoid collisions: my-post, my-post-2, my-post-3, ...
    let candidate = slug;
    let i = 2;
    while (await exists(path.join(postDir(candidate), "index.mdx"))) {
        candidate = `${slug}-${i++}`;
    }
    slug = candidate;

    const dir = postDir(slug);
    await mkdir(dir, { recursive: true });

    const safe = (s: string) => s.replace(/"/g, '\\"');

    const mdx = `---
title: "${safe(title)}"
date: "${safe(date)}"
excerpt: "${safe(excerpt)}"
image: "${safe(image || "/blog/placeholder.jpg")}"
---

# ${title}

`;

    await writeFile(path.join(dir, "index.mdx"), mdx, "utf8");

    return NextResponse.json({ slug });
}