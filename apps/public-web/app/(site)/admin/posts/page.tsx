import fs from "node:fs";
import path from "node:path";
import Link from "next/link";

type Post = {
  file: string;
  slug: string;
};

type PostsResult = {
  postsDir: string;
  tried: string[];
  allFiles: string[];
  posts: Post[];
};

function resolvePostsDir(): { postsDir: string; tried: string[] } {
  const tried: string[] = [];

  // 1) When running `npm run dev` inside apps/public-web
  const candidate1 = path.join(process.cwd(), "content", "posts");
  tried.push(candidate1);
  if (fs.existsSync(candidate1)) return { postsDir: candidate1, tried };

  // 2) When running Next from monorepo root (process.cwd() == repo root)
  const candidate2 = path.join(process.cwd(), "apps", "public-web", "content", "posts");
  tried.push(candidate2);
  if (fs.existsSync(candidate2)) return { postsDir: candidate2, tried };

  // 3) Fallback: try relative to this file (best-effort)
  const candidate3 = path.join(process.cwd(), "..", "content", "posts");
  tried.push(candidate3);
  if (fs.existsSync(candidate3)) return { postsDir: candidate3, tried };

  return { postsDir: candidate1, tried };
}

function getPosts(): PostsResult {
  const { postsDir, tried } = resolvePostsDir();

  if (!fs.existsSync(postsDir)) {
    return { postsDir, tried, allFiles: [], posts: [] };
  }

  const allFiles = fs.readdirSync(postsDir);

  const supported = allFiles.filter((f) =>
    f.toLowerCase().endsWith(".txt") ||
    f.toLowerCase().endsWith(".md") ||
    f.toLowerCase().endsWith(".mdx")
  );

  const posts = supported.map((file) => {
    const base = file.replace(/\.(txt|md|mdx)$/i, "");

    // Strip date prefix (YY-MM-DD- or YYYY-MM-DD-)
    const slug = base
      .replace(/^\d{2}-\d{2}-\d{2}-/, "")
      .replace(/^\d{4}-\d{2}-\d{2}-/, "");

    return { file, slug };
  });

  return { postsDir, tried, allFiles, posts };
}

export default function AdminPostsPage() {
  const { postsDir, tried, allFiles, posts } = getPosts();

  return (
    <main style={{ maxWidth: 900 }}>
      <h1>Posts</h1>

      <p style={{ opacity: 0.8 }}>
        <Link href="/admin">← Back to Admin</Link>
      </p>

      <section
        style={{
          padding: 12,
          border: "1px solid #ddd",
          borderRadius: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <strong>postsDir:</strong> {postsDir}
        </div>
        <div>
          <strong>files in folder:</strong> {allFiles.length}
        </div>
        <div>
          <strong>posts detected:</strong> {posts.length}
        </div>

        <details style={{ marginTop: 8 }}>
          <summary>Debug: paths tried</summary>
          <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{tried.join("\n")}</pre>
        </details>

        {allFiles.length > 0 && (
          <details style={{ marginTop: 8 }}>
            <summary>Debug: files seen</summary>
            <pre style={{ margin: 0, whiteSpace: "pre-wrap" }}>{allFiles.join("\n")}</pre>
          </details>
        )}
      </section>

      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.file}>
              <Link href={`/blog/${post.slug}`}>{post.slug}</Link>
              <span style={{ opacity: 0.6 }}> ({post.file})</span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}