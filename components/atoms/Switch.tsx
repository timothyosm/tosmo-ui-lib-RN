import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { CheckIcon, XMarkIcon } from "react-native-heroicons/solid";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel?: string;
}

/**
 * CustomSwitch atom for toggling boolean state.
 *
 * @remarks
 * Use for toggling settings or preferences. Visually distinct from native switch.
 *
 * @example
 * ```tsx
 * <Switch value={enabled} onValueChange={setEnabled} />
 * ```
 *
 * @param value - Current switch value.
 * @param onValueChange - Callback when toggled.
 * @param accessibilityLabel - Accessibility label.
 * @returns A styled switch component.
 */

const CustomSwitch: React.FC<SwitchProps> = ({
  value,
  onValueChange,
  accessibilityLabel = "Toggle setting",
}) => {
  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked: value }}
      accessibilityLabel={accessibilityLabel}
      onPress={() => onValueChange(!value)}
      style={[styles.switch, value && styles.switchChecked]}
    >
      <View style={[styles.thumb, value && styles.thumbChecked]}>
        {value ? (
          <CheckIcon color={colors.brandPrimary} size={14} />
        ) : (
          <XMarkIcon color={colors.textMuted} size={14} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 44,
    height: 24,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceSubtle,
    justifyContent: "center",
    padding: 2,
    borderWidth: 2,
    borderColor: "transparent",
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  switchChecked: {
    backgroundColor: colors.brandPrimary,
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: radii.full,
    backgroundColor: colors.surfaceBackground,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 2,
    shadowOffset: { width: 0, height: 1 },
    transform: [{ translateX: 0 }],
  },
  thumbChecked: {
    transform: [{ translateX: 20 }],
  },
});

export default CustomSwitch;
