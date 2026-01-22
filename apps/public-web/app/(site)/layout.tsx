import "../global.css";
import type { ReactNode } from "react";

export default function SiteLaytout({ children }: {children: ReactNode}) {
    return (
        <html lang="de">
            <body className="bg-white text-black">
                {children}
            </body>
        </html>
    );
}