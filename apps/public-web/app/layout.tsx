import "./global.css";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="de">
        <body className="min-h-screen antialiased">
        {children}
        </body>
        </html>
    );
}