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
import { MotionProvider } from "@/components/providers/MotionProvider";

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
    default: "HSA Days — The Complete HSA Resource for Dog Owners",
    template: "%s | HSA Days",
  },
  description:
    "The most complete resource for dog owners navigating a hemangiosarcoma diagnosis. Supplements, nutrition, emergency guides, treatment options, and tools — all free.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "HSA Days",
  },
  openGraph: {
    type: "website",
    title: "HSA Days — The Complete HSA Resource for Dog Owners",
    description:
      "The most complete resource for dog owners navigating a hemangiosarcoma diagnosis. Supplements, nutrition, emergency guides, and more.",
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
        <MotionProvider>
        <PWALayoutShell header={<Header />} footer={<Footer />}>
          <OfflineIndicator />
          {children}
        </PWALayoutShell>
        <PWAInstallPrompt />
        <PWASplash />
        <ServiceWorkerRegistration />
        </MotionProvider>
      </body>
    </html>
  );
}
