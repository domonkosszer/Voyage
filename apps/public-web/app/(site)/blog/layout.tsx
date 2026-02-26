import type { ReactNode } from "react";

export default function BlogLayout({ children }: { children: ReactNode }) {
    return (
        <section className="w-full ">
            {children}
        </section>
    );
}