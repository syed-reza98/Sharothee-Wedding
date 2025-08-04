import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Incia & Arvin's Wedding",
  description: "Join us in celebrating the love story of Incia & Arvin - from childhood friends to forever partners. Dhaka, Bangladesh with celebrations continuing in Phu Quoc, Vietnam.",
  keywords: ["wedding", "Incia", "Arvin", "Dhaka", "Vietnam", "celebration"],
  authors: [{ name: "CodeStorm Hub" }],
  creator: "CodeStorm Hub",
  openGraph: {
    title: "Incia & Arvin's Wedding",
    description: "Join us in celebrating the love story of Incia & Arvin",
    type: "website",
    locale: "en_US",
    siteName: "Incia & Arvin's Wedding",
  },
  twitter: {
    card: "summary_large_image",
    title: "Incia & Arvin's Wedding",
    description: "Join us in celebrating the love story of Incia & Arvin",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased bg-cream-50 text-gray-800">
        {children}
      </body>
    </html>
  );
}
