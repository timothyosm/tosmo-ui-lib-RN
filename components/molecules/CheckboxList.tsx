import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";

export type CheckboxItem = {
  id: number | string;
  label: string;
  selected: boolean;
};

interface CheckboxListProps {
  items: CheckboxItem[];
  onChange: (updated: CheckboxItem[]) => void;
  label?: string;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  items,
  onChange,
  label = "Options",
}) => {
  const handleToggle = (id: number | string) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, selected: !item.selected } : item
    );
    onChange(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.listContainer}>
        {items.map((item) => (
          <View key={item.id} style={styles.row}>
            <Text style={styles.name}>{item.label}</Text>
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: item.selected }}
              onPress={() => handleToggle(item.id)}
              style={[styles.checkbox, item.selected && styles.checkboxChecked]}
            >
              {item.selected && (
                <CheckIcon color={colors.textInverse} size={18} />
              )}
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: { fontWeight: "600", fontSize: 16, color: colors.textPrimary },
  listContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.borderDefault,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: colors.borderDefault,
  },
  name: { fontSize: 15, color: colors.textPrimary, flex: 1 },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxChecked: {
    backgroundColor: colors.brandPrimary,
    borderColor: colors.brandPrimary,
  },
});

export default CheckboxList;
