import React from "react";
import Link from "next/link";
import { TopBar, BackLink, InfoLink } from "../../../components/shell/TopBar";
import { getAllPosts } from "@/lib/posts";
export default async function BlogIndexPage() {
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
                            animation: "marquee-right 45s linear infinite",
                        }}
                    >
                        <h1 className="text-[80px] font-semibold tracking-widest leading-tight mr-20 text-gray-500">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG
                        </h1>
                        <h1 className="text-[80px] font-semibold tracking-widest leading-tight mr-20 text-gray-500">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG
                        </h1>
                        <h1 className="text-[80px] font-semibold tracking-widest leading-tight mr-20 text-gray-500">
                            BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG · BLOG
                        </h1>
                    </div>

                    <div
                        className="flex whitespace-nowrap w-max mt-[-30px]"
                        style={{
                            animation: "marquee 40s linear infinite",
                        }}
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

            {/*blog section*/}

            <main className="mt-[10px] px-[30px] md:px-[10px]">
                <div className="grid grid-cols-3 gap-x-[30px] gap-y-[px] mt-[50]">
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
                                            ? `/content/posts/${p.slug}/${p.meta.image.replace(/^\.\/+/, "")}`
                                            : "/blog/placeholder.jpg"
                                    }
                                    alt={p.meta.title}
                                    className="h-full w-full object-cover"
                                />
                            </Link>

                            <div className="p-10">
                                <div className="text-xs opacity-60">
                                    {p.meta.date}
                                </div>

                                <h2 className="mt-3 text-[40px] font-semibold leading-tight">
                                    <Link href={`/blog/${p.slug}`}>
                                        {p.meta.title}
                                    </Link>
                                </h2>

                                {p.meta.excerpt && (
                                    <p className="mt-4 opacity-50">
                                        {p.meta.excerpt}
                                    </p>
                                )}
                            </div>
                            </article>

                            {index === 2 && (
                                <div className="col-span-3 rounded-2xl bg-neutral-100 px-[30px] pt-[10px] pb-[20px]">                                    <div className="flex justify-center">
                                        <img
                                            src="/images/feature.jpg"
                                            alt="Feature"
                                            className="w-full max-w-4xl rounded-xl object-cover"
                                        />
                                    </div>
                                </div>
                            )}

                            {index === 5 && (
                                <div className="col-span-3 rounded-2xl bg-neutral-100 px-[30px] pt-[10px] pb-[20px]">                                    <div className="flex justify-center">
                                    <img
                                        src="/images/feature.jpg"
                                        alt="Feature"
                                        className="w-full max-w-4xl rounded-xl object-cover"
                                    />
                                </div>
                                </div>
                            )}

                        </React.Fragment>
                    ))}
                </div>
            </main>
        </div>
    );}