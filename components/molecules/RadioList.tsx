import { lightColors as colors } from "@/theme/colors";
import { radii } from "@/theme/radii";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { CheckIcon } from "react-native-heroicons/solid";

export type RadioItem = {
  id: string | number | null;
  label: string;
};

interface RadioListProps {
  items: RadioItem[];
  selectedId: string | number | null;
  onChange: (id: string | number | null) => void;
  label?: string;
}

/**
 * RadioList molecule for displaying a list of radio buttons.
 *
 * @remarks
 * Use for single-select lists. Only one item can be selected at a time.
 *
 * @example
 * ```tsx
 * <RadioList items={items} selectedId={selectedId} onChange={setSelectedId} />
 * ```
 *
 * @param items - List of radio items.
 * @param selectedId - Currently selected id.
 * @param onChange - Callback when selection changes.
 * @param label - Optional label for the list.
 * @returns A styled list of radio buttons.
 */

const RadioList: React.FC<RadioListProps> = ({
  items,
  selectedId,
  onChange,
  label = "Options",
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.listContainer}>
        {items.map((item) => (
          <View key={item.id ?? "none"} style={styles.row}>
            <Text style={styles.name}>{item.label}</Text>
            <Pressable
              accessibilityRole="radio"
              accessibilityState={{ selected: selectedId === item.id }}
              onPress={() => onChange(item.id)}
              style={[
                styles.radio,
                selectedId === item.id && styles.radioSelected,
              ]}
            >
              {selectedId === item.id && (
                <CheckIcon color={colors.textInverse} size={16} />
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
  radio: {
    width: 24,
    height: 24,
    borderRadius: radii.full,
    borderWidth: 1,
    borderColor: colors.borderStrong,
    backgroundColor: colors.surfaceBackground,
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    backgroundColor: colors.brandPrimary,
    borderColor: colors.brandPrimary,
  },
});

export default RadioList;
