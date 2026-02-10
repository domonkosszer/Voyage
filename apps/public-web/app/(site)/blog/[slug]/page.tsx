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
    if (!post) notFound();

    const { meta, content } = post;

    // Shrink the fixed title based on how long it is (simple + reliable)
    const titleLen = meta.title.trim().length;

    const titleSizeClass =
        titleLen <= 14
            ? "text-[200px]"
            : titleLen <= 22
                ? "text-[150px]"
                : titleLen <= 32
                    ? "text-[120px]"
                    : titleLen <= 45
                        ? "text-[96px]"
                        : "text-[80px]";

    const titleTracking = titleLen > 30 ? "tracking-[-0.03em]" : "tracking-tight";

    return (
        <>
            {/* FIXED TITLE */}
            <h1
                className={`fixed top-[-100px] left-1/2 -translate-x-1/2
        z-30 pointer-events-none font-bold text-center
        ${titleSizeClass} ${titleTracking}
        w-[1330px] max-w-[calc(100vw-40px)]
        whitespace-nowrap leading-none`}
            >
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