import Link from "next/link";
import { TopBar, BackLink, InfoLink } from "../../../components/shell/TopBar";
import { getAllPosts } from "../../../lib/posts";

export default function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <div>
            <TopBar
                title="Blog"
                left={<BackLink href="/" />}
                right={<InfoLink href="/about" />}
            />

            <main className="mx-auto max-w-3xl px-4 py-10">
                <div className="space-y-6">
                    {posts.map((p) => (
                        <article
                            key={p.slug}
                            className="border border-black/10 p-4"
                        >
                            <div className="text-xs opacity-70">
                                {p.meta.date}
                            </div>

                            <h2 className="text-lg font-semibold">
                                <Link href={`/blog/${p.slug}`}>
                                    {p.meta.title}
                                </Link>
                            </h2>

                            {p.meta.excerpt ? (
                                <p className="mt-2 opacity-80">
                                    {p.meta.excerpt}
                                </p>
                            ) : null}
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}