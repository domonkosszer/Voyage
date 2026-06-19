import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "VOYAGE — L'Olympionique · for the few.",
  description:
    "Small-batch sportswear for those who train alone. The Voyage Sports Club tee and the L'Olympionique line — made in considered numbers, for the few.",
  openGraph: {
    title: "VOYAGE — for the few.",
    description: "Small-batch sportswear, made in considered numbers.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@300;400;500;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
