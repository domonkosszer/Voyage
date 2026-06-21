import Link from "next/link";
import { SiteNav } from "../../../components/shell/SiteNav";
import { getAllPosts, type Post } from "@/lib/posts";

function imageSrc(p: Post): string | null {
    return p.meta.image
        ? `/content/posts/${p.slug}/${p.meta.image.replace(/^\.\/+/, "")}`
        : null;
}

/* Large lead story — image with the title set over it. */
function FeaturedPost({ post }: { post: Post }) {
    const src = imageSrc(post);

    return (
        <Link
            href={`/blog/${post.slug}`}
            className="group relative block aspect-[16/10] w-full overflow-hidden rounded-3xl bg-neutral-900 md:aspect-[21/9]"
        >
            {src ? (
                <img
                    src={src}
                    alt={post.meta.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105"
                />
            ) : (
                <div className="absolute inset-0 bg-neutral-900" />
            )}

            {/* legibility gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute inset-x-0 bottom-0 p-7 text-white md:p-12">
                <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.3em] opacity-80">
                    <span>Latest</span>
                    <span className="h-px w-8 bg-white/50" />
                    <span>{post.meta.date}</span>
                </div>

                <h2 className="mt-4 max-w-3xl text-[40px] font-bold leading-[0.95] tracking-tight md:text-[72px]">
                    {post.meta.title}
                </h2>

                {post.meta.excerpt && (
                    <p className="mt-4 max-w-xl text-base opacity-80 md:text-lg">
                        {post.meta.excerpt}
                    </p>
                )}

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase">
                    Read story
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                    </span>
                </span>
            </div>
        </Link>
    );
}

/* Standard grid card. */
function PostCard({ post }: { post: Post }) {
    const src = imageSrc(post);

    return (
        <article className="group">
            <Link
                href={`/blog/${post.slug}`}
                className="block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-neutral-200"
            >
                {src ? (
                    <img
                        src={src}
                        alt={post.meta.title}
                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                    />
                ) : (
                    <div className="flex h-full w-full items-center justify-center bg-neutral-200">
                        <span className="text-[13px] font-semibold uppercase tracking-[0.35em] opacity-40">
                            Voyage
                        </span>
                    </div>
                )}
            </Link>

            <div className="pt-5">
                <div className="text-[11px] uppercase tracking-[0.25em] opacity-50">
                    {post.meta.date}
                </div>

                <h3 className="mt-2 text-[28px] font-semibold leading-tight tracking-tight">
                    <Link href={`/blog/${post.slug}`} className="transition group-hover:opacity-60">
                        {post.meta.title}
                    </Link>
                </h3>

                {post.meta.excerpt && (
                    <p className="mt-2 line-clamp-2 opacity-50">{post.meta.excerpt}</p>
                )}

                <span className="mt-3 inline-flex items-center gap-1 text-[12px] font-semibold uppercase tracking-[0.2em] opacity-0 transition-opacity duration-300 group-hover:opacity-70">
                    Read <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
                </span>
            </div>
        </article>
    );
}

export default async function BlogIndexPage() {
    const posts = getAllPosts();
    const [featured, ...rest] = posts;

    return (
        <div>
            <SiteNav />

            {/* SIGNATURE MARQUEE HERO */}
            <section className="fixed top-0 left-0 w-full z-40 pt-[45px] pb-[15px] bg-white overflow-hidden">
                <div className="w-full overflow-hidden">
                    <div
                        className="flex whitespace-nowrap"
                        style={{ animation: "marquee-right 45s linear infinite" }}
                    >
                        {[0, 1, 2].map((i) => (
                            <h1
                                key={i}
                                className="text-[80px] font-semibold tracking-widest leading-tight mr-20 text-black"
                            >
                                BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                                BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                                BLOG · BLOG · BLOG
                            </h1>
                        ))}
                    </div>

                    <div
                        className="flex whitespace-nowrap w-max mt-[-20px]"
                        style={{ animation: "marquee 40s linear infinite" }}
                    >
                        {[0, 1, 2, 3].map((i) => (
                            <p
                                key={i}
                                className="text-[30px] opacity-60 tracking-[0.05em] mr-20"
                            >
                                Thoughts, experiments and notes from the VOYAGE universe.
                            </p>
                        ))}
                    </div>
                </div>
            </section>

            <main className="px-[16px] md:px-[40px] pt-[120px]">
                <div className="mx-auto w-full max-w-6xl mt-[110px]">
                    {posts.length === 0 && (
                        <p className="py-24 text-center opacity-50 tracking-[0.15em] italic">
                            No stories yet — the journey starts soon.
                        </p>
                    )}

                    {featured && <FeaturedPost post={featured} />}

                    {rest.length > 0 && (
                        <>
                            <div className="mt-[72px] mb-[36px] flex items-center gap-4">
                                <h2 className="text-xs font-semibold uppercase tracking-[0.3em] opacity-50">
                                    More stories
                                </h2>
                                <span className="h-px flex-1 bg-black/10" />
                            </div>

                            <div className="grid grid-cols-1 gap-x-[28px] gap-y-[56px] sm:grid-cols-2 lg:grid-cols-3">
                                {rest.map((p) => (
                                    <PostCard key={p.slug} post={p} />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </main>
        </div>
    );
}
