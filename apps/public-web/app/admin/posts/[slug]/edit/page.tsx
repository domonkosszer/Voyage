import ClientEditor from "./ClientEditor";

export default async function Page({
                                       params,
                                   }: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    return <ClientEditor slug={slug} />;
}