import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GoogleAnalytics } from "@next/third-parties/google";
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

const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const viewport: Viewport = {
  themeColor: "#0B6E4F",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  applicationName: SITE.name,
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
  authors: [{ name: "Eddie Nyambo", url: SITE.developer.url }],
  creator: "Eddie Nyambo",
  publisher: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_RW",
    url: SITE.domain,
    siteName: SITE.name,
    title: `${SITE.name} — Rwanda's Goods, Moving Faster`,
    description:
      "Fast, safe, reliable logistics from Magerwa, Kigali. Customs, transport, warehousing, door-to-door — track your cargo live.",
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE.name} — Rwanda's Goods, Moving Faster`,
    description:
      "Customs, cargo transport, warehousing & live shipment tracking across Rwanda. Based in Magerwa, Kigali.",
  },
  robots: { index: true, follow: true },
  verification: process.env.NEXT_PUBLIC_GSC_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GSC_VERIFICATION }
    : undefined,
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
        <Analytics />
        <SpeedInsights />
        {gaId && <GoogleAnalytics gaId={gaId} />}
      </body>
    </html>
  );
}
