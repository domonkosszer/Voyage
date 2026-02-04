import { NextResponse } from "next/server";
import path from "path";
import { readdir, readFile, rm } from "fs/promises";

function postDir(slug: string) {
    return path.join(process.cwd(), "content", "posts", slug);
}

function postFile(slug: string) {
    return path.join(postDir(slug), "index.mdx");
}

type Ctx = {
    params: {
        slug: string;
    };
};

// GET /api/blog/[slug] → fetch full post (meta + content)
export async function GET(_: Request, ctx: Ctx) {
    const { slug } = ctx.params;

    try {
        const mdx = await readFile(postFile(slug), "utf8");
        return NextResponse.json({ slug, mdx });
    } catch {
        return new NextResponse("Not found", { status: 404 });
    }
}

// DELETE /api/blog/[slug] → delete post
export async function DELETE(_: Request, ctx: Ctx) {
    const { slug } = ctx.params;

    try {
        await rm(postDir(slug), { recursive: true, force: true });
        return NextResponse.json({ ok: true });
    } catch {
        return new NextResponse("Delete failed", { status: 500 });
    }
}