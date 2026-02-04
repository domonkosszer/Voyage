import { NextResponse } from "next/server";
import slugify from "slugify";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

function postsRoot() {
    return path.join(process.cwd(), "content", "posts");
}

function uploadsRoot() {
    return path.join(process.cwd(), "public", "uploads", "blog");
}

// POST /api/blog/create
export async function POST(req: Request) {
    const fd = await req.formData();

    const title = String(fd.get("title") || "").trim();
    const subtitle = String(fd.get("subtitle") || "").trim();
    const date = String(fd.get("date") || "").trim();
    const cover = fd.get("cover"); // File | null

    if (!title || !subtitle || !date) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    const slug = slugify(title, { lower: true, strict: true });
    const postDir = path.join(postsRoot(), slug);
    await mkdir(postDir, { recursive: true });

    let coverUrl = "";

    if (cover && typeof cover !== "string") {
        const uploadDir = path.join(uploadsRoot(), slug);
        await mkdir(uploadDir, { recursive: true });

        const mime = cover.type || "image/jpeg";
        const ext =
            mime.includes("png")
                ? "png"
                : mime.includes("webp")
                    ? "webp"
                    : mime.includes("gif")
                        ? "gif"
                        : "jpg";

        const buffer = Buffer.from(await cover.arrayBuffer());
        const filename = `cover.${ext}`;

        await writeFile(path.join(uploadDir, filename), buffer);
        coverUrl = `/uploads/blog/${slug}/${filename}`;
    }

    const mdx = `---
title: "${title.replaceAll('"', '\\"')}"
subtitle: "${subtitle.replaceAll('"', '\\"')}"
date: "${date}"
slug: "${slug}"
${coverUrl ? `cover: "${coverUrl}"` : ""}
---

`;

    await writeFile(path.join(postDir, "index.mdx"), mdx, "utf8");

    return NextResponse.json({ slug });
}