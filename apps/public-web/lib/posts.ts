import fs from "fs";
import path from "path";
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

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function filenameToSlug(filename: string): string {
    // "2026-01-21-first-post.mdx" -> "first-post"
    const withoutExt = filename.replace(/\.mdx?$/, "");
    const parts = withoutExt.split("-");
    // first 3 parts are date (YYYY-MM-DD), rest is slug
    return parts.slice(3).join("-");
}

export function getAllPosts(): Post[] {
    if (!fs.existsSync(POSTS_DIR)) return [];

    const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx") || f.endsWith(".md"));

    const posts = files.map((filename) => {
        const fullPath = path.join(POSTS_DIR, filename);
        const raw = fs.readFileSync(fullPath, "utf8");
        const { data, content } = matter(raw);

        const slug = filenameToSlug(filename);

        const meta: PostMeta = {
            title: String(data.title ?? slug),
            date: String(data.date ?? "1970-01-01"),
            excerpt: data.excerpt ? String(data.excerpt) : undefined,
            image: data.image ? String(data.image) : undefined
        };

        return { slug, meta, content };
    });

    posts.sort((a, b) => (a.meta.date < b.meta.date ? 1 : -1));
    return posts;
}

export function getPostBySlug(slug: string): Post | null {
    const posts = getAllPosts();
    return posts.find((p) => p.slug === slug) ?? null;
}