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
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
  },
  body: {
    padding: 16,
  },
  footer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: "#E5E7EB",
  },
});
