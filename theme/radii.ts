// Centralised border radius tokens for the app
// Naming: semantic, purpose-based

export const radii = {
  none: 0,
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24,
  full: 9999,
};

export default radii;

/**
 * Radii token usage:
 * - Import { radii } from "@/theme/radii";
 * - Use semantic names (e.g. radii.md, radii.full)
 * - To add/rename: keep names purpose-based, not literal values
 *
 * Naming: [purpose/size] (e.g. md, full)
 */
