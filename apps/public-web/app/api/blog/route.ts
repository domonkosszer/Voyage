import { NextResponse } from "next/server";
import path from "path";
import { readdir, readFile } from "fs/promises";

function postsRoot() {
    return path.join(process.cwd(), "content", "posts");
}

function postFile(slug: string) {
    return path.join(postsRoot(), slug, "index.mdx");
}

// GET /api/blog → list all posts (basic meta)
export async function GET() {
    try {
        const slugs = await readdir(postsRoot(), { withFileTypes: true });

        const posts = await Promise.all(
            slugs
                .filter((e) => e.isDirectory())
                .map(async (e) => {
                    try {
                        const raw = await readFile(postFile(e.name), "utf8");

                        const match = raw.match(/---([\s\S]*?)---/);
                        const fm = match?.[1] ?? "";

                        const get = (key: string) =>
                            fm.match(new RegExp(`${key}:\\s*"(.*?)"`))?.[1] ?? "";

                        return {
                            slug: e.name,
                            title: get("title"),
                            subtitle: get("subtitle"),
                            date: get("date"),
                            cover: get("cover"),
                        };
                    } catch {
                        return null;
                    }
                })
        );

        return NextResponse.json(posts.filter(Boolean));
    } catch {
        return new NextResponse("Failed to read posts", { status: 500 });
    }
}