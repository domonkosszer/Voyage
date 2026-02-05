import { readFile } from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";

function postFile(slug: string) {
    return path.join(process.cwd(), "content", "posts", slug, "index.mdx");
}

export default async function BlogPostPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    if (!slug) {
        throw new Error("Missing slug");
    }
    const raw = await readFile(postFile(slug), "utf8");
    const { content, data } = matter(raw);

    const { content: mdx } = await compileMDX({
        source: content,
        options: { parseFrontmatter: false },
    });

    return (
        <article className="mx-auto max-w-[760px] py-10">
            <h1 className="text-3xl font-bold">{String(data.title ?? "")}</h1>

            {data.excerpt ? (
                <p className="mt-3 text-lg opacity-80">{String(data.excerpt)}</p>
            ) : null}

            {data.image ? (
                <img
                    src={String(data.image)}
                    alt={String(data.title ?? "")}
                    className="mt-6 w-full rounded"
                />
            ) : null}

            <div className="prose prose-neutral mt-8 max-w-none">{mdx}</div>
        </article>
    );
}