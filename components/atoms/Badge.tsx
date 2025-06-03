import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

export type BadgeProps = {
  label: string;
  color?: string; // dot color
  style?: ViewStyle;
  textStyle?: TextStyle;
};

/**
 * Badge atom for displaying a label with a colored dot.
 *
 * @remarks
 * Use to indicate status or category with a color and label.
 *
 * @example
 * ```tsx
 * <Badge label="Error" color="#ef4444" />
 * ```
 *
 * @param label - The text label to display.
 * @param color - The color of the dot (defaults to theme danger color).
 * @param style - Optional container style.
 * @param textStyle - Optional text style.
 * @returns A styled badge component.
 */

const Badge: React.FC<BadgeProps> = ({
  label,
  color = colors.danger,
  style,
  textStyle,
}) => (
  <View style={[styles.container, style]}>
    <View style={[styles.dot, { backgroundColor: color }]} />
    <Text style={[styles.text, textStyle]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    borderRadius: radii.md,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: colors.borderDefault, // ring-gray-200
    backgroundColor: "transparent",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: radii.full,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.textPrimary, // text-gray-900
  },
});

export default Badge;
