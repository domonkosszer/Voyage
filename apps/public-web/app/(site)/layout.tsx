import type { ReactNode } from "react";

export default function SiteLayout({ children }: { children: ReactNode }) {
    return (
        <div className="px-6 py-6 md:px-12 md:py-10">
            {children}
        </div>
    );
}