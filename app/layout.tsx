import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Barooka VCO — Virgin Coconut Oil Premium Indonesia",
  description:
    "VCO Barooka - Virgin Coconut Oil premium cold-pressed dari kelapa segar pilihan. Kaya asam laurat untuk kesehatan & kecantikan.",
  authors: [{ name: "Barooka VCO" }],
  metadataBase: new URL("https://virgincoconutoil.id"),
  alternates: {
    canonical: "https://virgincoconutoil.id",
  },
  openGraph: {
    type: "website",
    url: "https://virgincoconutoil.id",
    siteName: "Barooka VCO",
    locale: "id_ID",
    title: "Barooka VCO — Virgin Coconut Oil Premium Indonesia",
    description:
      "VCO Barooka - Virgin Coconut Oil premium cold-pressed dari kelapa segar pilihan. Kaya asam laurat untuk kesehatan & kecantikan.",
    images: [
      {
        url: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73593a09-4f4c-426c-83e8-d3f6eaed594c/id-preview-f8c43568--c834f6f9-320d-4e72-8fc0-b8d1244850dd.lovable.app-1771234390614.png",
        width: 1200,
        height: 630,
        alt: "Barooka VCO — Virgin Coconut Oil Premium Indonesia",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Barooka VCO — Virgin Coconut Oil Premium Indonesia",
    description:
      "VCO Barooka - Virgin Coconut Oil premium cold-pressed dari kelapa segar pilihan. Kaya asam laurat untuk kesehatan & kecantikan.",
    images: [
      "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/73593a09-4f4c-426c-83e8-d3f6eaed594c/id-preview-f8c43568--c834f6f9-320d-4e72-8fc0-b8d1244850dd.lovable.app-1771234390614.png",
    ],
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Virgin Coconut Oil Indonesia",
  alternateName: "Barooka VCO",
  url: "https://virgincoconutoil.id",
  description: "Produsen dan supplier Virgin Coconut Oil (VCO) terbaik dari Indonesia. Murni, alami, berkualitas tinggi untuk kesehatan dan kecantikan.",
  foundingLocation: "Indonesia",
  areaServed: ["ID", "Worldwide"],
  knowsAbout: ["virgin coconut oil", "VCO Indonesia", "coconut oil supplier", "VCO export Indonesia"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${playfairDisplay.variable} ${dmSans.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
