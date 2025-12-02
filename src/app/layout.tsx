import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
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
  title: {
    default: "Arcus Automations | AI & Tech Solutions",
    template: "%s | Arcus Automations",
  },
  description:
    "Arcus Automations provides cutting-edge AI and automation solutions. Access training courses, guides, and resources to transform your business.",
  keywords: [
    "AI",
    "automation",
    "technology",
    "training",
    "courses",
    "business solutions",
  ],
  authors: [{ name: "Arcus Automations" }],
  creator: "Arcus Automations",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Arcus Automations",
    title: "Arcus Automations | AI & Tech Solutions",
    description:
      "Cutting-edge AI and automation solutions for modern businesses.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arcus Automations | AI & Tech Solutions",
    description:
      "Cutting-edge AI and automation solutions for modern businesses.",
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
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${plusJakarta.variable} ${jetbrainsMono.variable} font-sans min-h-screen bg-slate-50 dark:bg-slate-950`}
      >
        {children}
        <Toaster
          position="top-right"
          expand={false}
          richColors
          closeButton
          toastOptions={{
            duration: 5000,
            classNames: {
              toast: "font-sans",
            },
          }}
        />
      </body>
    </html>
  );
}



