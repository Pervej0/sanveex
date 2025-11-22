import { Inter, Poppins, Roboto_Mono, Playfair_Display } from "next/font/google";

// Primary font family (for body text)
export const primaryFont = Inter({
  variable: "--font-primary",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

// Secondary font family (for headings)
export const secondaryFont = Poppins({
  variable: "--font-secondary",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

// Monospace font family (for code)
export const monoFont = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Display font family (for special headings)
export const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
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