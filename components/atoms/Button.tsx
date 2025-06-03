// A reusable Button atom for React Native Expo using Pressable and react-native-heroicons
import type { ReactNode } from "react";
import React from "react";
import { Pressable, Text, TextStyle, View, ViewStyle } from "react-native";

export type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ButtonVariant = "filled" | "outline";
export type ButtonShape = "default" | "circular";

interface ButtonProps {
  children: ReactNode;
  onPress?: () => void;
  size?: ButtonSize;
  variant?: ButtonVariant;
  shape?: ButtonShape;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  testID?: string;
}

const sizeStyles: Record<
  ButtonSize,
  {
    paddingVertical: number;
    paddingHorizontal: number;
    borderRadius: number;
    fontSize: number;
  }
> = {
  xs: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 12,
  },
  sm: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize: 14,
  },
  md: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    fontSize: 16,
  },
  lg: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    fontSize: 16,
  },
  xl: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    fontSize: 16,
  },
};

const variantStyles: Record<
  ButtonVariant,
  {
    backgroundColor: string;
    borderWidth: number;
    borderColor: string;
    textColor: string;
  }
> = {
  filled: {
    backgroundColor: "#4F46E5", // indigo-600
    borderWidth: 0,
    borderColor: "transparent",
    textColor: "#fff",
  },
  outline: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#D1D5DB", // gray-300
    textColor: "#111827", // gray-900
  },
};

export const Button: React.FC<ButtonProps> = ({
  children,
  onPress,
  size = "md",
  variant = "filled",
  shape = "default",
  leftIcon,
  rightIcon,
  disabled = false,
  style,
  textStyle,
  testID,
}) => {
  const s = sizeStyles[size];
  const v = variantStyles[variant];

  const isCircular = shape === "circular";
  const circularSize =
    s.paddingVertical + s.paddingHorizontal + s.borderRadius * 2;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: disabled
            ? "#A5B4FC"
            : pressed
            ? "#6366F1"
            : v.backgroundColor, // indigo-500 on press
          borderRadius: isCircular ? 999 : s.borderRadius,
          paddingVertical: isCircular ? 0 : s.paddingVertical,
          paddingHorizontal: isCircular ? 0 : s.paddingHorizontal,
          width: isCircular ? circularSize : undefined,
          height: isCircular ? circularSize : undefined,
          aspectRatio: isCircular ? 1 : undefined,
          borderWidth: v.borderWidth,
          borderColor: v.borderColor,
          opacity: disabled ? 0.7 : 1,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.08,
          shadowRadius: 1,
        },
        style,
      ]}
      testID={testID}
      accessibilityRole="button"
    >
      {leftIcon && !isCircular && (
        <View style={{ marginRight: 6 }}>{leftIcon}</View>
      )}
      {isCircular ? (
        leftIcon || rightIcon || children
      ) : (
        <Text
          style={[
            { color: v.textColor, fontWeight: "600", fontSize: s.fontSize },
            textStyle,
          ]}
        >
          {children}
        </Text>
      )}
      {rightIcon && !isCircular && (
        <View style={{ marginLeft: 6 }}>{rightIcon}</View>
      )}
    </Pressable>
  );
};

export default Button;
