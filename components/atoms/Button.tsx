// A reusable Button atom for React Native Expo using Pressable and react-native-heroicons
import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
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
    borderRadius: radii.sm,
    fontSize: 12,
  },
  sm: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: radii.sm,
    fontSize: 14,
  },
  md: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    fontSize: 16,
  },
  lg: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: radii.lg,
    fontSize: 16,
  },
  xl: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: radii.lg,
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
    backgroundColor: colors.brandPrimary, // indigo-600
    borderWidth: 0,
    borderColor: "transparent",
    textColor: colors.textInverse,
  },
  outline: {
    backgroundColor: colors.surfaceBackground,
    borderWidth: 1,
    borderColor: colors.borderStrong, // gray-300
    textColor: colors.textPrimary, // gray-900
  },
};

/**
 * Button atom for custom-styled pressable buttons.
 *
 * @remarks
 * Use for all button actions in the app. Supports icons, variants, and custom shapes.
 *
 * @example
 * ```tsx
 * <Button onPress={() => {}}>Click me</Button>
 * ```
 *
 * @param children - Button content.
 * @param onPress - Callback for press event.
 * @param size - Button size (xs, sm, md, lg, xl).
 * @param variant - Button style variant (filled, outline).
 * @param shape - Button shape (default, circular).
 * @param leftIcon - Icon on the left.
 * @param rightIcon - Icon on the right.
 * @param disabled - Disabled state.
 * @param style - Container style.
 * @param textStyle - Text style.
 * @param testID - Test identifier.
 * @returns A styled pressable button component.
 */

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
            ? colors.brandPrimarySubtle
            : pressed
            ? colors.brandPrimaryActive
            : v.backgroundColor,
          borderRadius: isCircular ? radii.full : s.borderRadius,
          paddingVertical: isCircular ? 0 : s.paddingVertical,
          paddingHorizontal: isCircular ? 0 : s.paddingHorizontal,
          width: isCircular ? circularSize : undefined,
          height: isCircular ? circularSize : undefined,
          aspectRatio: isCircular ? 1 : undefined,
          borderWidth: v.borderWidth,
          borderColor: v.borderColor,
          opacity: disabled ? 0.7 : 1,
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
