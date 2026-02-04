"use client";

import { TopBar, BackLink, InfoLink } from "../../../../components/shell/TopBar";
export default function BlogPostClient({ post }: { post: any }) {
    return (
        <div>
            <TopBar
                title={post.meta.title}
                left={<BackLink href="/blog" />}
                right={<InfoLink href="/about" />}
            />

            <main className="mx-auto max-w-3xl py-20 space-y-10">
                <h1 className="text-[94px] font-semibold text-center">
                    {post.meta.title}
                </h1>

                <p className="text-[12px] opacity-60 text-center">
                    {post.meta.date}
                </p>

                <article className="prose prose-neutral mx-auto mt-20">
                    {post.content}
                </article>
            </main>
        </div>
    );
}