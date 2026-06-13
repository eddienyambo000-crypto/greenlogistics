import type { Metadata } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/site";
import SmoothScroll from "@/components/SmoothScroll";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title: {
    default: `${SITE.name} — Logistics in Magerwa, Kigali`,
    template: `%s · ${SITE.name}`,
  },
  description:
    "Premier logistics company in Magerwa, Kigali. Customs clearance, door-to-door, warehousing, cargo transport and last-mile distribution across Rwanda. Track your shipment live.",
  keywords: [
    "logistics Rwanda",
    "customs clearance Kigali",
    "cargo transport Rwanda",
    "warehousing Magerwa",
    "freight Rwanda",
    "shipment tracking Rwanda",
  ],
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} — Rwanda's Goods, Moving Faster`,
    description:
      "Fast, safe, reliable logistics from Magerwa, Kigali. Customs, transport, warehousing, door-to-door — track your cargo live.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
