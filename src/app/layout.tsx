import type { Metadata } from "next";
import { Arsenal, Roboto } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-sans",
});

const arsenal = Arsenal({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-serif",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sanveex.com"),
  title: {
    default: "SANVEEX GLOBAL HEALTH",
    template: "%s | SANVEEX GLOBAL HEALTH",
  },
  description:
    "SANVEEX GLOBAL HEALTH provides innovative healthcare solutions, patient support programs, medical services, and global health assistance for a healthier tomorrow.",
  keywords: [
    "Sanveex Global Health",
    "Healthcare Services",
    "Patient Support Program",
    "Medical Solutions",
    "Global Health",
    "Health Technology",
    "Clinical Support",
    "Pharmaceutical Services",
  ],
  authors: [{ name: "SANVEEX GLOBAL HEALTH" }],
  creator: "SANVEEX GLOBAL HEALTH",
  publisher: "SANVEEX GLOBAL HEALTH",
  openGraph: {
    type: "website",
    url: "https://sanveex.com",
    title: "SANVEEX GLOBAL HEALTH",
    description:
      "Trusted healthcare & innovative medical solutions enhancing patient support and global medical services.",
    siteName: "SANVEEX GLOBAL HEALTH",
    images: [
      {
        url: "https://sanveex.com/assets/image/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SANVEEX GLOBAL HEALTH",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "SANVEEX GLOBAL HEALTH",
    description:
      "Innovative medical solutions & patient support programs for a healthier future.",
    images: ["https://sanveex.com/assets/image/og-image.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-background text-foreground antialiased ${roboto.className} ${arsenal.variable}`}
      >
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
