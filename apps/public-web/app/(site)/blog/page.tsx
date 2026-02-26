import React from "react";
import Link from "next/link";
import { TopBar, BackLink, InfoLink } from "../../../components/shell/TopBar";
import { getAllPosts } from "@/lib/posts";

export default async function BlogIndexPage() {
    const posts = getAllPosts();

    return (
        <div>
            <TopBar
                title=""
                left={<BackLink href="/" />}
                right={<InfoLink href="/about" />}
            />

            <section className="fixed top-0 left-0 w-full z-40 pt-[45px] pb-[15px] bg-white overflow-hidden">
                <div className="w-full overflow-hidden">
                    <div
                        className="flex whitespace-nowrap"
                        style={{ animation: "marquee-right 45s linear infinite" }}
                    >
                        <h1 className="text-[80px] font-semibold tracking-widest leading-tight mr-20 text-black">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                            BLOG · BLOG · BLOG
                        </h1>
                        <h1 className="text-[80px] font-semibold tracking-widest leading-tight mr-20 text-black">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                            BLOG · BLOG · BLOG
                        </h1>
                        <h1 className="text-[80px] font-semibold tracking-widest leading-tight mr-20 text-black">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG ·
                            BLOG · BLOG · BLOG
                        </h1>
                    </div>

                    <div
                        className="flex whitespace-nowrap w-max mt-[-20px]"
                        style={{ animation: "marquee 40s linear infinite" }}
                    >
                        <p className="text-[30px] opacity-60 tracking-[0.05em] mr-20">
                            Thoughts, experiments and notes from the VOYAGE universe.
                        </p>
                        <p className="text-[30px] opacity-60 tracking-[0.05em] mr-20">
                            Thoughts, experiments and notes from the VOYAGE universe.
                        </p>
                        <p className="text-[30px] opacity-60 tracking-[0.05em] mr-20">
                            Thoughts, experiments and notes from the VOYAGE universe.
                        </p>
                        <p className="text-[30px] opacity-60 tracking-[0.05em] mr-20">
                            Thoughts, experiments and notes from the VOYAGE universe.
                        </p>
                    </div>
                </div>
            </section>

            <main className="pt-[120px] px-[16px] md:px-[4px]">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[16px] gap-y-[60px] mt-[100px]">
                    {posts.map((p, index) => (
                        <React.Fragment key={p.slug}>
                            <article className="rounded-2xl bg-neutral-50 overflow-hidden">
                                <Link
                                    href={`/blog/${p.slug}`}
                                    className="block aspect-square w-full bg-neutral-200"
                                >
                                    <img
                                        src={
                                            p.meta.image
                                                ? `/content/posts/${p.slug}/${p.meta.image.replace(
                                                    /^\.\/+/,
                                                    ""
                                                )}`
                                                : "/blog/placeholder.jpg"
                                        }
                                        alt={p.meta.title}
                                        className="h-full w-full object-cover"
                                    />
                                </Link>

                                <div className="p-10">
                                    <div className="text-xs opacity-60">{p.meta.date}</div>

                                    <h2 className="mt-3 text-[40px] font-semibold leading-tight">
                                        <Link href={`/blog/${p.slug}`}>{p.meta.title}</Link>
                                    </h2>

                                    {p.meta.excerpt && (
                                        <p className="mt-4 opacity-50">{p.meta.excerpt}</p>
                                    )}
                                </div>
                            </article>

                            {/*
                            {((index + 1) % 3 === 0) && (
                                <div className="col-span-3 rounded-2xl px-[30px] pt-[0px] pb-[0px] mt-[-200px] mb-[-180px]">
                                    <div className="flex justify-center">
                                        <img
                                            src="/images/feature1.png"
                                            alt="Feature"
                                            className="w-full max-w-4xl rounded-xl object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                                */}
                        </React.Fragment>
                    ))}
                </div>
            </main>
        </div>
    );
}