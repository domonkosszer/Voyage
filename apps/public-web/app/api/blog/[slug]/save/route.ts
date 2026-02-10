import { NextResponse } from "next/server";
import path from "node:path";
import fs from "node:fs";
import { readdir, readFile, writeFile, mkdir } from "node:fs/promises";

function postsDir() {
    const candidates = [
        path.join(process.cwd(), "public", "content", "posts"),
        path.join(process.cwd(), "apps", "public-web", "public", "content", "posts"),
        path.join(process.cwd(), "content", "posts"),
        path.join(process.cwd(), "apps", "public-web", "content", "posts"),
    ];

    for (const p of candidates) {
        if (fs.existsSync(p)) return p;
    }

    return candidates[0];
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

function splitFrontmatter(mdx: string): { frontmatter: string; body: string } {
    // Normalize Windows newlines so frontmatter parsing is reliable
    mdx = mdx.replace(/\r\n/g, "\n");

    if (!mdx.startsWith("---")) {
        return { frontmatter: "", body: mdx };
    }

    const end = mdx.indexOf("\n---", 3);
    if (end === -1) {
        return { frontmatter: "", body: mdx };
    }

    const fmEndIndex = end + "\n---".length;
    const after = mdx.slice(fmEndIndex);
    const body = after.startsWith("\n") ? after.slice(1) : after;

    const frontmatter = mdx.slice(0, fmEndIndex) + "\n";
    return { frontmatter, body };
}

export async function GET(_req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    try {
        const file = await pickPostFile(slug);
        const mdx = await readFile(file, "utf8");
        const { frontmatter, body } = splitFrontmatter(mdx);
        return NextResponse.json({ body, file, frontmatter });
    } catch (e: any) {
        return new NextResponse(e?.message ?? "Not found", { status: 404 });
    }
}

export async function POST(req: Request, ctx: { params: Promise<{ slug: string }> }) {
    const { slug } = await ctx.params;
    if (!slug) return new NextResponse("Missing slug", { status: 400 });

    const payload = await req.json().catch(() => null);
    const newBody =
        typeof payload?.body === "string"
            ? payload.body
            : typeof payload?.mdx === "string"
                ? payload.mdx
                : null;

    if (newBody === null) return new NextResponse("Invalid body", { status: 400 });

    const dir = postDir(slug);
    await mkdir(dir, { recursive: true });

    // Preserve frontmatter from the existing post file, replace only body
    let outPath: string;
    let existing = "";

    try {
        // Prefer the same file we would read (index.mdx if present, otherwise latest .mdx)
        outPath = await pickPostFile(slug);
        existing = await readFile(outPath, "utf8");
    } catch {
        // If no mdx exists yet, create a new stable index.mdx
        outPath = path.join(dir, "index.mdx");
        existing = "";
    }

    const { frontmatter } = splitFrontmatter(existing);
    const nextMdx = `${frontmatter}${newBody.endsWith("\n") ? newBody : newBody + "\n"}`;

    await writeFile(outPath, nextMdx, "utf8");

    return NextResponse.json({ ok: true, path: outPath });
}