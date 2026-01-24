import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <section className="mx-auto max-w-6xl">
            {children}
        </section>
    );
}