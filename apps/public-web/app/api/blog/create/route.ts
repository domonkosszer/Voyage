import { NextResponse } from "next/server";
import slugify from "slugify";
import path from "path";
import { mkdir, writeFile } from "fs/promises";

function postsRoot() {
    return path.join(process.cwd(), "public", "content", "posts")
}

function today() {
    return new Date().toISOString().slice(0, 10); // YYYY-MM-DD
}

// POST /api/blog/create
export async function POST(req: Request) {
    const fd = await req.formData();

    const title = String(fd.get("title") || "").trim();
    const excerpt = String(fd.get("excerpt") || "").trim();
    const cover = fd.get("cover"); // File | null

    if (!title || !excerpt) {
        return new NextResponse("Missing fields", { status: 400 });
    }

    const slug = slugify(title, { lower: true, strict: true });
    const postDir = path.join(postsRoot(), slug);
    await mkdir(postDir, { recursive: true });

    const date = today();
    const mdxFilename = `${date}.mdx`;

    let imageLine = "";

    if (cover && typeof cover !== "string") {
        const mime = cover.type || "image/jpeg";
        const ext =
            mime.includes("png") ? "png" :
                mime.includes("webp") ? "webp" :
                    mime.includes("gif") ? "gif" : "jpg";

        const buffer = Buffer.from(await cover.arrayBuffer());
        const filename = `cover.${ext}`;

        await writeFile(path.join(postDir, filename), buffer);
        imageLine = `image: "./${filename}"`;
    }

    const mdx = `---
title: "${title.replaceAll('"', '\\"')}"
excerpt: "${excerpt.replaceAll('"', '\\"')}"
date: "${date}"
${imageLine}
---

`;

    await writeFile(
        path.join(postDir, mdxFilename),
        mdx,
        "utf8"
    );

    return NextResponse.json({ slug });
}