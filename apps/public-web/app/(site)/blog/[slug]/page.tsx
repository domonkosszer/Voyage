import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function BlogPostPage({ params }: PageProps) {
    const { slug } = await params;

    const post = getPostBySlug(slug);

    if (!post) {
        notFound();
    }

    const { meta, content } = post;

    return (
        <article className="max-w-[980px] mx-auto px-6 py-12">
            <h1 className="text-4xl font-bold mb-4">
                {meta.title}
            </h1>

            <p className="text-sm text-gray-500 mb-8">
                {meta.date}
            </p>

            <div className="prose prose-neutral max-w-none">
                <MDXRemote source={content} />
            </div>
        </article>
    );
}