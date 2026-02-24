import type { Metadata, Viewport } from "next";
import { Lora, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { OfflineIndicator } from "@/components/ui/OfflineIndicator";
import { PWAInstallPrompt } from "@/components/ui/PWAInstallPrompt";
import { PWASplash } from "@/components/ui/PWASplash";
import { ServiceWorkerRegistration } from "@/components/ui/ServiceWorkerRegistration";
import { PWALayoutShell } from "@/components/pwa/PWALayoutShell";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "HSA Days — A 30-Day Companion for You and Your Dog",
    template: "%s | HSA Days",
  },
  description:
    "A free interactive 30-day companion for dog owners navigating a hemangiosarcoma diagnosis. Reflections, journaling, practical guides, and a community that understands.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HSA Days",
  },
  openGraph: {
    type: "website",
    title: "HSA Days — A 30-Day Companion for You and Your Dog",
    description:
      "A free interactive 30-day companion for dog owners navigating a hemangiosarcoma diagnosis.",
    url: "https://hsadays.com",
    siteName: "HSA Days",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#5B7B5E",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lora.variable} ${inter.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/icons/apple-touch-icon.png" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body className="font-sans antialiased">
        <PWALayoutShell header={<Header />} footer={<Footer />}>
          <OfflineIndicator />
          {children}
        </PWALayoutShell>
        <PWAInstallPrompt />
        <PWASplash />
        <ServiceWorkerRegistration />
      </body>
    </html>
  );
}
