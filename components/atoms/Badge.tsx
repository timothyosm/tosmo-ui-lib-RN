import React from "react";
import { StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

export type BadgeProps = {
  label: string;
  color?: string; // dot color
  style?: ViewStyle;
  textStyle?: TextStyle;
};

const Badge: React.FC<BadgeProps> = ({
  label,
  color = "#ef4444",
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
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: "#e5e7eb", // ring-gray-200
    backgroundColor: "transparent",
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  text: {
    fontSize: 12,
    fontWeight: "500",
    color: "#111827", // text-gray-900
  },
});

export default Badge;
