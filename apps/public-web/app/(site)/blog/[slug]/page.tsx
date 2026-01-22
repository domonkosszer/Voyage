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

            <main className="mx-auto max-w-3xl px-4 py-10">
                <div className="text-xs opacity-70">
                    {post.meta.date}
                </div>

                <h1 className="mt-2 text-2xl font-semibold">
                    {post.meta.title}
                </h1>

                <div className="mt-8 whitespace-pre-wrap leading-relaxed">
                    {post.content}
                </div>
            </main>
        </div>
    );
}