import { lightColors as colors } from "@/theme/colors";
import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

export type CardProps = {
  header?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  style?: ViewStyle;
};

/**
 * A reusable Card container with header, body, and footer slots.
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
    borderRadius: 12,
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
