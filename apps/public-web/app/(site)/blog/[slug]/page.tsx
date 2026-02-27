import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getPostBySlug } from "@/lib/posts";
import { TopBar, BackLink } from "@/components/shell/TopBar";
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

    // Responsive title sizing (shrinks with viewport) + slightly tighter tracking for long titles
    const titleLen = meta.title.trim().length;
    const titleTracking = titleLen > 30 ? "tracking-[-0.03em]" : "tracking-tight";

    return (
        <>
            <TopBar
                title=""
                left={<BackLink href="/blog" />}
            />

            {/* FIXED TITLE */}
            <div className="fixed top-0 inset-x-0 z-30 pointer-events-none">
                <div className="mx-auto max-w-6xl pt-16 px-4 sm:px-8 sm:pt-13">
                    <h1
                        className={
                            `text-center font-bold leading-none ${titleTracking} ` +
                            "break-words [text-wrap:balance] " +
                            "text-[clamp(44px,9vw,120px)]"
                        }
                    >
                        {meta.title}
                    </h1>
                </div>
            </div>

            {/* FIXED BLUR LAYER */}
            <div
                className="fixed top-0 inset-x-0 h-[110px] sm:h-[180px] z-10 pointer-events-none bg-white/80 backdrop-blur-md"
            />

            {/* CONTENT */}
            <article className="mx-auto max-w-3xl px-4 sm:px-8 pt-[120px] sm:pt-[160px] pb-[60px] sm:pb-[10px]">
                <p className="text-sm text-gray-500 mb-[60px] sm:mb-[80px] text-center">
                    {meta.date}
                </p>

                <div className="pt-[0px] sm:pt-[20px] prose prose-neutral max-w-none break-words sm:prose-base lg:prose-lg">
                    <MDXRemote source={content} />
                </div>
            </article>
        </>
    );
}