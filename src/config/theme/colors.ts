// Color palette configuration
export const colors = {
    // Your brand colors
    background: "#FFFFFF",
    text: {
      primary: "#2B2B2B",      // Main text color
      secondary: "#888888",    // Secondary text color
      accent: "#28316D",       // Accent/heading text color
    },
    
    // Primary colors (based on your accent color #28316D)
    primary: {
      50: "#e8eaf0",
      100: "#d1d5e1",
      200: "#a3abc3",
      300: "#7581a5",
      400: "#475787",
      500: "#28316D", // Main primary color
      600: "#202759",
      700: "#181d45",
      800: "#101331",
      900: "#08091d",
    },
    
    // Neutral/Gray colors (based on your text colors)
    neutral: {
      50: "#FFFFFF",
      100: "#F5F5F5",
      200: "#E5E5E5",
      300: "#D4D4D4",
      400: "#A3A3A3",
      500: "#888888", // Secondary text
      600: "#6B6B6B",
      700: "#525252",
      800: "#404040",
      900: "#2B2B2B", // Primary text
      950: "#1A1A1A",
    },
    
    // Semantic colors (kept for UI elements like buttons, alerts, etc.)
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      200: "#bbf7d0",
      300: "#86efac",
      400: "#4ade80",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
      800: "#166534",
      900: "#14532d",
    },
    
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      200: "#fde68a",
      300: "#fcd34d",
      400: "#fbbf24",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
      800: "#92400e",
      900: "#78350f",
    },
    
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      200: "#fecaca",
      300: "#fca5a5",
      400: "#f87171",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
      800: "#991b1b",
      900: "#7f1d1d",
    },
    
    info: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
    },
  } as const;
  
  // Theme color mapping for light mode
  export const lightTheme = {
    background: colors.background,           // #FFFFFF
    foreground: colors.text.primary,         // #2B2B2B
    "foreground-secondary": colors.text.secondary, // #888888
    "foreground-accent": colors.text.accent,      // #28316D
    
    card: colors.background,
    "card-foreground": colors.text.primary,
    border: colors.neutral[200],
    input: colors.neutral[200],
    ring: colors.text.accent,
    
    primary: colors.text.accent,             // #28316D
    "primary-foreground": colors.background, // #FFFFFF
    
    secondary: colors.neutral[500],          // #888888
    "secondary-foreground": colors.background,
    
    muted: colors.neutral[100],
    "muted-foreground": colors.text.secondary,
    
    success: colors.success[500],
    warning: colors.warning[500],
    error: colors.error[500],
    info: colors.info[500],
  } as const;
  
  // Theme color mapping for dark mode (optional - adjust as needed)
  export const darkTheme = {
    background: "#0a0a0a",
    foreground: "#fafafa",
    "foreground-secondary": "#a3a3a3",
    "foreground-accent": "#4a5fa8",
    
    card: "#171717",
    "card-foreground": "#fafafa",
    border: "#262626",
    input: "#262626",
    ring: "#4a5fa8",
    
    primary: "#4a5fa8",
    "primary-foreground": "#fafafa",
    
    secondary: "#a3a3a3",
    "secondary-foreground": "#0a0a0a",
    
    muted: "#262626",
    "muted-foreground": "#a3a3a3",
    
    success: colors.success[400],
    warning: colors.warning[400],
    error: colors.error[400],
    info: colors.info[400],
  } as const;