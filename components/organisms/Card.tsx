import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export type CardProps = {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
};

/**
 * Card organism for displaying content in header, body, and footer slots.
 *
 * @remarks
 * Use for grouping related content. Supports header, body, and footer slots.
 *
 * @example
 * ```tsx
 * <Card header={<Text>Header</Text>} body={<Text>Body</Text>} />
 * ```
 *
 * @param header - Optional header content.
 * @param body - Optional body content.
 * @param footer - Optional footer content.
 * @param style - Optional container style.
 * @returns A styled card component.
 */
export default function Card({ header, body, footer, style }: CardProps) {
  return (
    <View style={[styles.container, style]}>
      {header && <View style={styles.header}>{header}</View>}
      {body && <View style={styles.body}>{body}</View>}
      {footer && <View style={styles.footer}>{footer}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surfaceBackground,
    borderRadius: radii.lg,
    overflow: "hidden",
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colors.borderDefault,
  },
  body: {
    padding: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderDefault,
  },
});
