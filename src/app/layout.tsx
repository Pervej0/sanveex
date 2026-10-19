import type { Metadata, Viewport } from "next";
import { Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import QueryProvider from "@/components/providers/query-provider";

const sourceSans3 = Source_Sans_3({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
  variable: "--font-source-sans",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sanveex.com"),
  title: {
    default:
      "Sanveex Global Health — Pharmaceutical Marketing & Distribution",
    template: "%s | Sanveex Global Health",
  },
  description:
    "Sanveex Global Health is a Bangladesh-based pharmaceutical marketing and distribution company delivering WHO-GMP quality medicines in partnership with Amulet Pharmaceuticals Ltd.",
  keywords: [
    "Sanveex Global Health",
    "pharmaceutical distribution Bangladesh",
    "pharmaceutical marketing company Dhaka",
    "Amulet Pharmaceuticals",
    "WHO-GMP medicines",
    "generic medicine Bangladesh",
    "Montilet 10",
    "Adcal D",
    "Xofedin 120",
  ],
  authors: [{ name: "Sanveex Global Health" }],
  creator: "Sanveex Global Health",
  publisher: "Sanveex Global Health",
  category: "Healthcare",
  openGraph: {
    type: "website",
    url: "https://sanveex.com",
    title: "Sanveex Global Health — Pharmaceutical Marketing & Distribution",
    description:
      "Quality-assured medicines, ethical marketing and reliable nationwide distribution across Bangladesh.",
    siteName: "Sanveex Global Health",
    locale: "en_US",
    images: [
      {
        url: "/sanveex-logo.png",
        width: 352,
        height: 138,
        alt: "Sanveex Global Health",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sanveex Global Health",
    description:
      "Quality-assured medicines, ethical marketing and reliable nationwide distribution across Bangladesh.",
    images: ["/sanveex-logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#25306d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={sourceSans3.variable}>
      <body className="bg-background text-foreground antialiased">
        <QueryProvider>
          {children}
          <Toaster position="top-center" />
        </QueryProvider>
      </body>
    </html>
  );
}
