// Container max-widths for different breakpoints
export const container = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  } as const;
  
  // Container padding (horizontal padding)
  export const padding = {
    mobile: "16px",
    sm: "24px",
    md: "32px",
    lg: "40px",
    xl: "48px",
    "2xl": "64px",
  } as const;
  
  // Breakpoints
  export const breakpoints = {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  } as const;
  
  // Typography sizes in pixels
  export const typography = {
    h1: {
      mobile: "32px",
      tablet: "40px",
      desktop: "48px",
      "2xl": "56px",
      lineHeight: "1.2",
      fontWeight: "700",
    },
    h2: {
      mobile: "28px",
      tablet: "32px",
      desktop: "40px",
      "2xl": "48px",
      lineHeight: "1.25",
      fontWeight: "700",
    },
    h3: {
      mobile: "24px",
      tablet: "28px",
      desktop: "32px",
      "2xl": "40px",
      lineHeight: "1.3",
      fontWeight: "600",
    },
    h4: {
      mobile: "20px",
      tablet: "24px",
      desktop: "28px",
      "2xl": "32px",
      lineHeight: "1.35",
      fontWeight: "600",
    },
    h5: {
      mobile: "18px",
      tablet: "20px",
      desktop: "24px",
      "2xl": "28px",
      lineHeight: "1.4",
      fontWeight: "600",
    },
    h6: {
      mobile: "16px",
      tablet: "18px",
      desktop: "20px",
      "2xl": "24px",
      lineHeight: "1.45",
      fontWeight: "600",
    },
    p: {
      mobile: "16px",
      tablet: "16px",
      desktop: "18px",
      "2xl": "18px",
      lineHeight: "1.6",
      fontWeight: "400",
    },
    small: {
      mobile: "14px",
      tablet: "14px",
      desktop: "16px",
      "2xl": "16px",
      lineHeight: "1.5",
      fontWeight: "400",
    },
    large: {
      mobile: "18px",
      tablet: "20px",
      desktop: "22px",
      "2xl": "24px",
      lineHeight: "1.5",
      fontWeight: "400",
    },
  } as const;