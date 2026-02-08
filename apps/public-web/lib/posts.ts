import * as fs from "fs";
import * as path from "path";
import matter from "gray-matter";

export type PostMeta = {
    title: string;
    date: string;
    excerpt?: string;
    image?: string;
};

export type Post = {
    slug: string;
    meta: PostMeta;
    content: string;
};

const POSTS_DIR = path.join(process.cwd(), "public", "content", "posts");

/**
 * Returns the newest .mdx file (YYYY-MM-DD.mdx) inside a post folder.
 */
function getLatestMdxFile(dir: string): string | null {
    if (!fs.existsSync(dir)) return null;

    const files = fs
        .readdirSync(dir)
        .filter((f) => f.endsWith(".mdx"))
        .sort()
        .reverse();

    return files.length ? path.join(dir, files[0]) : null;
}

/**
 * Reads all posts from content/posts/<slug>/YYYY-MM-DD.mdx
 */
export function getAllPosts(): Post[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    const entries = fs.readdirSync(POSTS_DIR, { withFileTypes: true });

    const posts: Post[] = [];

    for (const entry of entries) {
        if (!entry.isDirectory()) continue;

        const slug = entry.name;
        const postDir = path.join(POSTS_DIR, slug);
        const mdxFile = getLatestMdxFile(postDir);

        if (!mdxFile) continue;

        const raw = fs.readFileSync(mdxFile, "utf8");
        const { data, content } = matter(raw);

        const meta: PostMeta = {
            title: String(data.title ?? slug),
            date: String(data.date ?? "1970-01-01"),
            excerpt: data.excerpt ? String(data.excerpt) : undefined,
            image: data.image ? String(data.image) : undefined,
        };

        posts.push({ slug, meta, content });
    }

    posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
    return posts;
}

/**
 * Returns a single post by slug.
 */
export function getPostBySlug(slug: string): Post | null {
    const postDir = path.join(POSTS_DIR, slug);
    const mdxFile = getLatestMdxFile(postDir);

    if (!mdxFile) return null;

    const raw = fs.readFileSync(mdxFile, "utf8");
    const { data, content } = matter(raw);

    const meta: PostMeta = {
        title: String(data.title ?? slug),
        date: String(data.date ?? "1970-01-01"),
        excerpt: data.excerpt ? String(data.excerpt) : undefined,
        image: data.image ? String(data.image) : undefined,
    };

    return { slug, meta, content };
}