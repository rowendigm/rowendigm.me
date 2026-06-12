import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import type { ReactNode } from "react";
import { DEFAULT_LANG } from "@/lib/i18n";
import "./globals.css";

// Self-hosted at build time, so the CSP needs no Google font origins.
const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-jetbrains",
});

const title = "rowendigm";
const description = "Personal site of rowendigm";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/",
    siteName: title,
    locale: "ko_KR",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>): ReactNode {
  return (
    <html lang={DEFAULT_LANG} className={jetbrainsMono.variable}>
      <body>
        {/* Pretendard stays on CDN: its dynamic subset only ships the
            glyph ranges a page uses — self-hosting the full variable
            font would cost megabytes. CSP allows jsdelivr only. */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          rel="stylesheet"
          precedence="default"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css"
        />
        {children}
      </body>
    </html>
  );
}
