import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/config/site";
import { OrganizationSchema, WebSiteSchema } from "@/components/structured-data";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — ATEX/IECEx/UL Certified Explosion-Proof Camera Housings & Hazardous Area Equipment`,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.description,
  keywords: [
    "explosion proof camera housing",
    "explosion proof light",
    "explosion proof junction box",
    "explosion proof cable gland",
    "hazardous area equipment supplier",
    "316L stainless steel PTZ enclosure",
    "marine grade camera housing supplier",
    "ATEX certified camera enclosure",
    "IECEx camera housing",
    "UL 1203 explosion proof",
    "Ex d IIC T6 camera housing",
    "IP68 IP69K camera enclosure",
    "corrosion resistant PTZ housing",
    "offshore platform camera housing",
    "oil refinery camera enclosure",
    "LNG plant electrical equipment",
    "chemical plant explosion proof",
    "border security camera housing",
    "custom CNC camera bracket",
    "NDAA compliant camera housing",
    "Middle East explosion proof supplier",
    "Africa hazardous area equipment",
    "Aramco approved Ex equipment",
    "ADNOC certified camera enclosure",
  ],
  alternates: {
    canonical: siteConfig.url,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: undefined, // Add your Google Search Console verification code here
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
        <WebSiteSchema />
      </head>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} min-h-screen bg-background font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
