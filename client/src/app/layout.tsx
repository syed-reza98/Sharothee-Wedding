import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import ErrorBoundary from "@/components/ErrorBoundary";
import Providers from "@/components/providers";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-playfair',
  display: 'swap',
});

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
  robots: "index, follow",
};

// Separate viewport export as required by Next.js 13+
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Event",
    "name": "Incia & Arvin's Wedding",
    "description": "Join us in celebrating the love story of Incia & Arvin - from childhood friends to forever partners.",
    "startDate": "2025-12-16T18:00:00+06:00",
    "endDate": "2025-12-16T23:00:00+06:00",
    "eventStatus": "EventScheduled",
    "eventAttendanceMode": "OfflineEventAttendanceMode",
    "location": {
      "@type": "Place",
      "name": "Wedding Venue",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Dhaka",
        "addressCountry": "Bangladesh"
      }
    },
    "organizer": {
      "@type": "Person",
      "name": "Incia & Arvin"
    },
    "offers": {
      "@type": "Offer",
      "availability": "InviteOnly",
      "price": "0",
      "priceCurrency": "USD"
    }
  };

  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="font-sans antialiased bg-cream-50 text-gray-800">
        <Providers>
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  );
}
