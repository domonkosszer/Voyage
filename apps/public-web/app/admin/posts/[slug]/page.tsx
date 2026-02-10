// app/admin/posts/[slug]/page.tsx

import fs from "node:fs";
import fsp from "node:fs/promises";
import path from "node:path";
import Link from "next/link";
import ClientEditor from "./edit/ClientEditor";function resolvePostsDir(): { postsDir: string; tried: string[] } {

    const tried: string[] = [];

    const p1 = path.join(process.cwd(), "public", "content", "posts");
    tried.push(p1);
    if (fs.existsSync(p1)) return { postsDir: p1, tried };

    const p2 = path.join(process.cwd(), "apps", "public-web", "public", "content", "posts");
    tried.push(p2);
    if (fs.existsSync(p2)) return { postsDir: p2, tried };

    const p3 = path.join(process.cwd(), "content", "posts");
    tried.push(p3);
    if (fs.existsSync(p3)) return { postsDir: p3, tried };

    const p4 = path.join(process.cwd(), "apps", "public-web", "content", "posts");
    tried.push(p4);
    if (fs.existsSync(p4)) return { postsDir: p4, tried };

    return { postsDir: p1, tried };
}

async function findPostFile(slug: string): Promise<{
    filePath: string | null;
    triedFiles: string[];
    triedDirs: string[];
}> {
    const { postsDir, tried: triedDirs } = resolvePostsDir();
    const triedFiles: string[] = [];

    if (!slug) return { filePath: null, triedFiles, triedDirs };

    const folder = path.join(postsDir, slug);

    const indexMdx = path.join(folder, "index.mdx");
    const indexMd = path.join(folder, "index.md");
    triedFiles.push(indexMdx, indexMd);

    if (fs.existsSync(folder) && fs.statSync(folder).isDirectory()) {
        if (fs.existsSync(indexMdx)) return { filePath: indexMdx, triedFiles, triedDirs };
        if (fs.existsSync(indexMd)) return { filePath: indexMd, triedFiles, triedDirs };

        const files = await fsp.readdir(folder);
        const first = files.find((f) => /\.(mdx|md)$/i.test(f));
        if (first) {
            const fp = path.join(folder, first);
            triedFiles.push(fp);
            return { filePath: fp, triedFiles, triedDirs };
        }
    }

    const flatMdx = path.join(postsDir, `${slug}.mdx`);
    const flatMd = path.join(postsDir, `${slug}.md`);
    triedFiles.push(flatMdx, flatMd);

    if (fs.existsSync(flatMdx)) return { filePath: flatMdx, triedFiles, triedDirs };
    if (fs.existsSync(flatMd)) return { filePath: flatMd, triedFiles, triedDirs };

    return { filePath: null, triedFiles, triedDirs };
}

export default async function AdminPostEditPage({
                                                    params,
                                                }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;

    const { filePath, triedFiles, triedDirs } = await findPostFile(slug);

    if (!filePath) {
        return (
            <main className="mx-auto w-full max-w-3xl px-6 py-8">
                <div className="mb-6">
                    <Link href="/admin/posts" className="text-sm text-zinc-600 hover:text-zinc-900">
                        ← Back to Posts
                    </Link>
                    <h1 className="mt-2 text-2xl font-semibold">Edit: {slug ?? "—"}</h1>
                    <p className="mt-2 text-sm text-red-600">Could not find a .md/.mdx file for this slug.</p>
                </div>

                <details className="rounded-2xl border border-zinc-200 bg-white p-4 text-sm">
                    <summary className="cursor-pointer font-medium text-zinc-700">Debug</summary>
                    <div className="mt-2 text-zinc-600">
                        <div className="font-semibold">Directories tried:</div>
                        <pre className="mt-1 whitespace-pre-wrap text-xs">{triedDirs.join("\n")}</pre>

                        <div className="mt-3 font-semibold">Files tried:</div>
                        <pre className="mt-1 whitespace-pre-wrap text-xs">{triedFiles.join("\n")}</pre>
                    </div>
                </details>
            </main>
        );
    }

    const stat = await fsp.stat(filePath);

    return (
        <main className="h-[calc(100vh-1px)] w-full px-6 py-6">
            <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col gap-4">
                {/* Top bar */}
                <div className="flex items-start justify-between gap-4 rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
                    <div className="min-w-0">
                        <div className="flex items-center gap-3">
                            <Link href="/admin/posts" className="text-sm font-medium text-zinc-600 hover:text-zinc-900">
                                ← Back to Posts
                            </Link>
                            <span className="text-zinc-300">/</span>
                            <span className="text-sm font-medium text-zinc-500">{slug}</span>
                        </div>

                        <h1 className="mt-2 truncate text-2xl font-semibold tracking-tight text-zinc-900">
                            Edit: {slug}
                        </h1>

                        <p className="mt-1 text-xs text-zinc-500">
                            Loaded from <span className="font-mono">{filePath}</span> • Last modified{" "}
                            {new Date(stat.mtimeMs).toISOString().slice(0, 16).replace("T", " ")}
                        </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-2">
                        <Link
                            href={`/blog/${slug}`}
                            target="_blank"
                            className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 hover:bg-zinc-50"
                        >
                            View
                        </Link>
                    </div>
                </div>

                {/* Real editor */}
                <div className="flex-1 overflow-auto rounded-2xl border border-zinc-200 bg-white shadow-sm p-4">
                    <ClientEditor slug={slug} />
                </div>
            </div>
        </main>
    );
}