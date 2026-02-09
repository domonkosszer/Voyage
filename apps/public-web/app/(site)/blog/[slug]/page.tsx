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
        <>
            {/* FIXED TITLE */}
            <h1 className="fixed top-[-60px] left-1/2 -translate-x-1/2 text-[200px] font-bold text-center z-30 pointer-events-none">
                {meta.title}
            </h1>

            {/* FIXED BLUR LAYER */}
            <div
                className="
                    fixed
                    top-0
                    left-1/2
                    -translate-x-1/2
                    w-[1330px]
                    h-[25vh]
                    z-10
                    backdrop-blur-[0px]
                    bg-white/30
                    pointer-events-none
                "
            />

            {/* CONTENT */}
            <article className="mx-auto max-w-[1020px] px-[40px] pt-[300px] pb-[40px]">
                <p className="text-sm text-gray-500 mb-[100px] text-center">
                    {meta.date}
                </p>

                <div className="prose prose-neutral max-w-none text-justify">
                    <MDXRemote source={content} />
                </div>
            </article>
        </>
    );
}