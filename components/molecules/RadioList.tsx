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
              {selectedId === item.id && <CheckIcon color="#fff" size={16} />}
            </Pressable>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: 8 },
  label: { fontWeight: "600", fontSize: 16, color: "#111" },
  listContainer: {
    marginTop: 12,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderColor: "#e5e7eb",
  },
  name: { fontSize: 15, color: "#111", flex: 1 },
  radio: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#d1d5db",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioSelected: {
    backgroundColor: "#4f46e5",
    borderColor: "#4f46e5",
  },
});

export default RadioList;
