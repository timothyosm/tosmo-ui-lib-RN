// Centralised color tokens for the app
// Naming: semantic, purpose-based (see docs below)

export const lightColors = {
  // Neutrals
  surfaceBackground: "#fff", // main surfaces
  surfaceSubtle: "#f3f4f6", // subtle backgrounds
  surfaceMuted: "#f9fafb", // muted backgrounds
  borderDefault: "#e5e7eb", // default border
  borderStrong: "#d1d5db", // strong border
  borderAccent: "#818cf8", // accent border
  shadow: "#000", // shadow

  // Text
  textPrimary: "#111827", // main text
  textSecondary: "#6b7280", // secondary text
  textMuted: "#9ca3af", // muted/disabled text
  textInverse: "#fff", // on dark bg
  textDanger: "#b91c1c", // error text

  // Brand & Accent
  brandPrimary: "#4f46e5", // indigo-600
  brandPrimaryActive: "#6366f1", // indigo-500
  brandPrimarySubtle: "#c7d2fe", // indigo-200
  brandSecondary: "#3730a3", // indigo-800

  // Status
  danger: "#ef4444", // error
  dangerBg: "#fecaca", // error bg
  warning: "#facc15", // warning
  warningBg: "#fef08a", // warning bg
  success: "#22c55e", // success
  successBg: "#bbf7d0", // success bg
  info: "#3b82f6", // info

  // Misc
  overlay: "rgba(55, 65, 81, 0.75)", // modal overlay
  placeholder: "#9ca3af", // input placeholder
  placeholderError: "#fca5a5", // input error placeholder
  shadowOpacity: 0.15,
};

// For future dark mode support
export default lightColors;

/**
 * Color token usage:
 * - Import { lightColors as colors } from "@/theme/colors";
 * - Use semantic names (e.g. colors.textPrimary, colors.brandPrimary)
 * - To add/rename: keep names purpose-based, not literal/hex
 *
 * Naming: [purpose][variant] (e.g. textPrimary, surfaceMuted, brandPrimaryActive)
 * See: https://nordhealth.design/naming/ , https://atlassian.design/tokens/design-tokens/
 */
