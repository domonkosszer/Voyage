import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const displayFont = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
  display: "swap",
});

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FORMA — Built for Performance",
  description:
    "Premium Sportswear für Athleten, die Leistung zum Lifestyle machen. Entdecke die FORMA Kollektion für Men, Women, Performance & Lifestyle.",
  keywords: [
    "Sportwear",
    "Premium Activewear",
    "Performance Bekleidung",
    "Fitness Mode",
  ],
  openGraph: {
    title: "FORMA — Built for Performance",
    description:
      "Premium Sportswear für Athleten, die Leistung zum Lifestyle machen.",
    type: "website",
    locale: "de_DE",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de">
      <body
        className={`${displayFont.variable} ${bodyFont.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
