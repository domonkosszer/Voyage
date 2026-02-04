import { NextResponse } from "next/server";
import path from "path";
import { mkdir, readFile, writeFile } from "fs/promises";

function postFile(slug: string) {
    return path.join(process.cwd(), "content", "posts", slug, "index.mdx");
}

type Ctx = {
    params: Promise<{ slug: string }>;
};

export async function GET(_: Request, ctx: Ctx) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    try {
        const mdx = await readFile(postFile(slug), "utf8");
        return NextResponse.json({ mdx });
    } catch {
        return new NextResponse("Not found", { status: 404 });
    }
}

export async function POST(req: Request, ctx: Ctx) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    const body = await req.json().catch(() => null);
    const mdx = String(body?.mdx ?? "");

    if (!mdx.trim()) {
        return new NextResponse("Empty content", { status: 400 });
    }

    // ✅ ensure /content/posts/<slug>/ exists
    await mkdir(path.dirname(postFile(slug)), { recursive: true });

    await writeFile(postFile(slug), mdx, "utf8");
    return NextResponse.json({ ok: true });
}