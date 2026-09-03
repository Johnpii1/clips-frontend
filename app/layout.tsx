import type { Metadata } from "next";
import { Inter } from "next/font/google";
import dynamic from "next/dynamic";
import "./globals.css";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { WalletProvider } from "@/components/wallet/WalletProvider";
import { StellarWalletProvider } from "@/components/StellarWalletProvider";
import { NetworkProvider } from "@/app/context/NetworkContext";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ToastProvider";
import { I18nProvider } from "@/app/lib/i18n/I18nProvider";
import RateLimitToast from "@/components/RateLimitToast";
import ErrorBoundary from "@/components/ErrorBoundary";
import AnalyticsProvider from "@/components/AnalyticsProvider";
import ResourceHints from "@/components/ResourceHints";
import CryptoSaltInitializer from "@/components/CryptoSaltInitializer";
import PerformanceMonitor from "@/components/PerformanceMonitor";
import FontPreload from "@/components/FontPreload";
import DataSyncProvider from "@/components/DataSyncProvider";

const KeyboardShortcuts = dynamic(() => import("@/components/KeyboardShortcuts"), {
  ssr: false,
});

const CookieConsent = dynamic(() => import("@/components/CookieConsent"), {
  ssr: false,
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
  adjustFontFallback: "Arial",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://clipcash.ai"),
  title: "ClipCash — AI Video Clipping Platform",
  description:
    "Turn long-form videos into engaging short clips with AI. Review, select, publish, and explore digital ownership with ClipCash.",
  openGraph: {
    type: "website",
    title: "ClipCash — AI Video Clipping Platform",
    description:
      "Turn long-form videos into engaging short clips with AI. Review, select, publish, and explore digital ownership with ClipCash.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ClipCash — AI Video Clipping Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ClipCash — AI Video Clipping Platform",
    description:
      "Turn long-form videos into engaging short clips with AI. Review, select, publish, and explore digital ownership with ClipCash.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <FontPreload />
        <ResourceHints />
      </head>
      <body className={`${inter.className} font-sans antialiased`}>
        <div className="radial-bg" />
        <PerformanceMonitor />
        <CryptoSaltInitializer />
        <ThemeProvider>
          <ErrorBoundary>
            <I18nProvider>
              <DataSyncProvider>
                <AuthProvider>
                  <ToastProvider>
                    <NetworkProvider>
                      <WalletProvider>
                        <StellarWalletProvider>
                          <AnalyticsProvider />
                          <KeyboardShortcuts />
                          {children}
                          <RateLimitToast />
                        </StellarWalletProvider>
                      </WalletProvider>
                    </NetworkProvider>
                  </ToastProvider>
                </AuthProvider>
              </DataSyncProvider>
            </I18nProvider>
          </ErrorBoundary>
        </ThemeProvider>
        <CookieConsent />
      </body>
    </html>
  );
}
