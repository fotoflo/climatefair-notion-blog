import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Layout from "@/components/layout";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://climatefair.co";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "ClimateFair - Climate Business Sourcing, Franchising and Crowd Funding",
    template: `%s | ClimateFair`,
  },
  description:
    "Empowering climate businesses through strategic sourcing, franchise opportunities, and innovative crowd funding solutions. Join us in building a sustainable future.",
  openGraph: {
    title:
      "ClimateFair - Climate Business Sourcing, Franchising and Crowd Funding",
    description:
      "Empowering climate businesses through strategic sourcing, franchise opportunities, and innovative crowd funding solutions. Join us in building a sustainable future.",
    url: siteUrl,
    siteName: "ClimateFair",
    images: [
      {
        url: `${siteUrl}/Logo.png`,
        width: 1200,
        height: 630,
        alt: "ClimateFair - Climate Business Sourcing, Franchising and Crowd Funding",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "ClimateFair - Climate Business Sourcing, Franchising and Crowd Funding",
    description:
      "Empowering climate businesses through strategic sourcing, franchise opportunities, and innovative crowd funding solutions.",
    images: [`${siteUrl}/Logo.png`],
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
  icons: {
    icon: "/Logo.png",
    shortcut: "/Logo.png",
    apple: "/Logo.png",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="light">
      <body className={`${inter.variable} font-sans`}>
        {/* Google tag (gtag.js) */}
        {process.env.NEXT_PUBLIC_GOOGLE_GTAG_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_GTAG_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_GTAG_ID}');
              `}
            </Script>
          </>
        )}
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          forcedTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Layout>{children}</Layout>
        </ThemeProvider>
      </body>
    </html>
  );
}
