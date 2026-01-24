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

            <section className="mt-16 mb-24 overflow-hidden">
                <div className="mx-auto max-w-6xl overflow-hidden">
                    <div
                        className="flex whitespace-nowrap"
                        style={{
                            animation: "marquee 25s linear infinite",
                        }}
                    >
                        <h1 className="text-[130px] font-semibold tracking-widest leading-tight mr-20">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG
                        </h1>
                        <h1 className="text-[130px] font-semibold tracking-widest leading-tight mr-20">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG
                        </h1>
                    </div>

                    <div
                        className="flex whitespace-nowrap mt-[-70px]"
                        style={{
                            animation: "marquee 40s linear infinite",
                        }}
                    >
                        <p className="text-[30px] opacity-60 tracking-[0.05em] mr-20">
                            Thoughts, experiments and notes from the Voyage universe. ·
                        </p>
                        <p className="text-[30px] opacity-60 tracking-[0.05em] mr-20">
                            Thoughts, experiments and notes from the Voyage universe. ·
                        </p>
                    </div>
                </div>
            </section>

            <main className="mt-12">
                <div className="grid grid-cols-3 gap-16 mt-[30]">
                    {posts.map((p) => (
                        <article
                            key={p.slug}
                            className="rounded-2xl bg-neutral-50 p-10"
                        >
                            <div className="text-xs opacity-60">
                                {p.meta.date}
                            </div>

                            <h2 className="mt-[20px] text-3xl font-semibold leading-tight">
                                <Link href={`/blog/${p.slug}`}>
                                    {p.meta.title}
                                </Link>
                            </h2>

                            {p.meta.excerpt && (
                                <p className="mt-4 opacity-50">
                                    {p.meta.excerpt}
                                </p>
                            )}
                        </article>
                    ))}
                </div>
            </main>
        </div>
    );
}