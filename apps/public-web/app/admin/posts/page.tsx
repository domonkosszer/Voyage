import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

type Post = {
  slug: string;
  filePath: string;
  updatedAtMs?: number;
};

type PostsResult = {
  postsDir: string;
  tried: string[];
  allEntries: string[];
  posts: Post[];
};

function resolvePostsDir(): { postsDir: string; tried: string[] } {
  const tried: string[] = [];

  // 1️⃣ preferred: public/content/posts (your current setup)
  const p1 = path.join(process.cwd(), "public", "content", "posts");
  tried.push(p1);
  if (fs.existsSync(p1)) return { postsDir: p1, tried };

  // 2️⃣ monorepo variant
  const p2 = path.join(
      process.cwd(),
      "apps",
      "public-web",
      "public",
      "content",
      "posts"
  );
  tried.push(p2);
  if (fs.existsSync(p2)) return { postsDir: p2, tried };

  // 3️⃣ future recommended location
  const p3 = path.join(process.cwd(), "content", "posts");
  tried.push(p3);
  if (fs.existsSync(p3)) return { postsDir: p3, tried };

  return { postsDir: p1, tried };
}

function getPosts(): PostsResult {
  const { postsDir, tried } = resolvePostsDir();

  if (!fs.existsSync(postsDir)) {
    return { postsDir, tried, allEntries: [], posts: [] };
  }

  const allEntries = fs.readdirSync(postsDir);
  const posts: Post[] = [];

  for (const entry of allEntries) {
    const full = path.join(postsDir, entry);

    let stat: fs.Stats;
    try {
      stat = fs.statSync(full);
    } catch {
      continue;
    }

    // 📁 Folder posts
    if (stat.isDirectory()) {
      const files = fs.readdirSync(full);

      // prefer index.mdx / index.md
      const preferred =
          files.find((f) => /^index\.(mdx|md)$/i.test(f)) ??
          files.find((f) => /\.(mdx|md)$/i.test(f)) ??
          null;

      if (preferred) {
        const filePath = path.join(full, preferred);
        const s = fs.statSync(filePath);
        posts.push({
          slug: entry,
          filePath,
          updatedAtMs: s.mtimeMs,
        });
      }
    }

    // 📄 Flat file posts (optional support)
    else if (/\.(mdx|md|txt)$/i.test(entry)) {
      const base = entry.replace(/\.(txt|md|mdx)$/i, "");
      const s = fs.statSync(full);
      posts.push({
        slug: base,
        filePath: full,
        updatedAtMs: s.mtimeMs,
      });
    }
  }

  posts.sort((a, b) => a.slug.localeCompare(b.slug));

  return { postsDir, tried, allEntries, posts };
}

export default function AdminPostsPage() {
  const { posts, postsDir, tried, allEntries } = getPosts();

  return (
      <main className="mx-auto w-full max-w-5xl px-[24px] py-[32px]">
        {/* HEADER */}
        <div className="mb-[24px] flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Posts</h1>
            <p className="mt-[4px] text-sm text-zinc-500">
              Manage blog posts stored on disk
            </p>
          </div>

          <Link
              href="/admin/posts/new"
              className="rounded-xl bg-zinc-900 px-[16px] py-[8px] text-sm font-semibold text-white hover:bg-zinc-800"
          >
            + New post
          </Link>
        </div>

        {/* LIST */}
        <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm">
          <ul className="divide-y divide-zinc-200">
            {posts.map((post) => (
                <li
                    key={post.slug}
                    className="flex items-center justify-between gap-[16px] px-[24px] py-[16px] pr-[32px] hover:bg-zinc-50"
                >
                  <div className="min-w-0">
                    <div className="font-medium text-zinc-900 truncate">
                      {post.slug}
                    </div>
                    <div className="mt-[4px] text-xs text-zinc-500">
                      Last updated{" "}
                      {post.updatedAtMs
                          ? new Date(post.updatedAtMs)
                              .toISOString()
                              .slice(0, 16)
                              .replace("T", " ")
                          : "—"}
                    </div>
                  </div>

                  <div className="flex items-center gap-[8px] shrink-0 pr-[16px]">
                    <Link
                        href={`/admin/posts/${post.slug}`}
                        className="rounded-lg border border-zinc-200 px-[12px] py-[6px] text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                    >
                      Edit
                    </Link>

                    <Link
                        href={`/blog/${post.slug}`}
                        target="_blank"
                        className="rounded-lg border border-zinc-200 px-[12px] py-[6px] text-sm font-medium text-zinc-700 hover:bg-zinc-100"
                    >
                      View
                    </Link>
                  </div>
                </li>
            ))}
          </ul>
        </div>

      </main>
  );
}