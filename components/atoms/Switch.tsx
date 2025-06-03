import React from "react";
import { Platform, Pressable, StyleSheet, View } from "react-native";
import { CheckIcon, XMarkIcon } from "react-native-heroicons/solid";

interface SwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  accessibilityLabel?: string;
}

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
          <CheckIcon color="#4f46e5" size={14} />
        ) : (
          <XMarkIcon color="#9ca3af" size={14} />
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: 44,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    padding: 2,
    borderWidth: 2,
    borderColor: "transparent",
    ...Platform.select({
      web: { cursor: "pointer" },
    }),
  },
  switchChecked: {
    backgroundColor: "#4f46e5",
  },
  thumb: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
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
