import { notFound } from "next/navigation";
import { TopBar, BackLink, InfoLink } from "../../../../components/shell/TopBar";
import { getPostBySlug } from "../../../../lib/posts";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const post = getPostBySlug(slug);
    if (!post) return notFound();

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

                <article className="text-[65px] prose prose-neutral mt-10 text-center mt-[90px]">
                    {post.content}
                </article>
            </main>
        </div>
    );
}