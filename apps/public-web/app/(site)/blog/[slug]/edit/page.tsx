import EditPostClient from "./EditPostClient";

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function EditPostPage({ params }: PageProps) {
    const { slug } = await params;
    return <EditPostClient slug={slug} />;
}