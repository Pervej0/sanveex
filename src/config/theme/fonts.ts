import { Source_Sans_3, Roboto_Mono } from "next/font/google";

// Primary font family (for body text and headings)
export const primaryFont = Source_Sans_3({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

// Secondary font family
export const secondaryFont = Source_Sans_3({
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "600", "700", "800"],
});

// Monospace font family (for code)
export const monoFont = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display font family
export const displayFont = Source_Sans_3({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
});

// Font family CSS variables mapping
export const fontFamilies = {
  primary: "var(--font-primary)",
  secondary: "var(--font-secondary)",
  mono: "var(--font-mono)",
  display: "var(--font-display)",
} as const;

// Export all font variables for use in layout
export const fontVariables = [
  primaryFont.variable,
  secondaryFont.variable,
  monoFont.variable,
  displayFont.variable,
].join(" ");