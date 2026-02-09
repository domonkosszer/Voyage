import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";

function postsDir() {
    return path.join(process.cwd(), "public", "content", "posts");
}

function postDir(slug: string) {
    return path.join(postsDir(), slug);
}

async function pickPostFile(slug: string) {
    const dir = postDir(slug);

    // Prefer index.mdx (stable, single file per post)
    const indexPath = path.join(dir, "index.mdx");
    if (fs.existsSync(indexPath)) return indexPath;

    // Otherwise fallback: latest .mdx by filename
    const files = (await readdir(dir)).filter((f) => f.endsWith(".mdx")).sort().reverse();
    if (!files.length) throw new Error("No mdx file found");
    return path.join(dir, files[0]);
}

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    try {
        const file = await pickPostFile(slug);
        const mdx = await readFile(file, "utf8");
        return NextResponse.json({ mdx, file });
    } catch (e: any) {
        return new NextResponse(e?.message ?? "Not found", { status: 404 });
    }
}

export async function POST(req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    const body = await req.json().catch(() => null);
    const mdx = body?.mdx;
    if (typeof mdx !== "string") return new NextResponse("Invalid body", { status: 400 });

    const dir = postDir(slug);
    await mkdir(dir, { recursive: true });

    // Write stable file
    const outPath = path.join(dir, "index.mdx");
    await writeFile(outPath, mdx, "utf8");

    return NextResponse.json({ ok: true, path: outPath });
}