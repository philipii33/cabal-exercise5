// constants/theme.ts
// ═══════════════════════════════════════════════════════════════
// DESIGN SYSTEM — Starbucks Green Gradient Theme
// Change a value here → updates everywhere instantly.
// ═══════════════════════════════════════════════════════════════

export const Colors = {
  // Canvas - Dark Green Gradient Background
  bg: "#08120A",
  bgCard: "rgba(0, 99, 65, 0.06)",

  // Glass surfaces
  glass: "rgba(255, 255, 255, 0.08)",
  glassInput: "rgba(255, 255, 255, 0.12)",

  // Starbucks Green Brand
  green: "#006341",
  greenLight: "#00A859",
  greenPale: "rgba(0, 168, 89, 0.15)",
  greenGlow: "rgba(0, 168, 89, 0.25)",

  // Green Gradient Colors
  gradientStart: "#00704A",
  gradientEnd: "#005B3A",
  gradientMid: "#006341",

  // Borders
  border: "rgba(0, 164, 89, 0.3)",
  borderGreen: "rgba(0, 99, 65, 0.5)",
  borderError: "rgba(255, 80, 80, 0.65)",

  // Text
  textPrimary: "#FFFFFF",
  textSecondary: "rgba(255, 255, 255, 0.6)",
  textError: "#ff5050",
  textGreen: "#00A859",

  white: "#FFFFFF",
  black: "#000000",
} as const;

export const Fonts = {
  // Swap "Georgia" with "Playfair Display" after adding via expo-font
  display: "Georgia",
  // Swap "System" with "DM Sans" for a refined body typeface
  body: "System",
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 36,
  xxl: 52,
} as const;

export const Radii = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
  full: 9999,
} as const;

export const Shadow = {
  card: {
    shadowColor: "#006341",
    shadowOffset: { width: 0, height: 16 },
    shadowOpacity: 0.35,
    shadowRadius: 32,
    elevation: 14,
  },
  green: {
    shadowColor: "#006341",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;

// Gradient configurations - Starbucks Green
export const Gradients = {
  primary: ["#00704A", "#005B3A"],
  background: ["#08120A", "#0F1A11", "#08120A"],
  button: ["#006341", "#005B3A"],
  card: ["rgba(0, 99, 65, 0.1)", "rgba(0, 91, 58, 0.05)"],
} as const;

