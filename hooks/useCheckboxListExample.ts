import { CheckboxItem } from "@/components/molecules/CheckboxList";
import { useState } from "react";

const initialItems: CheckboxItem[] = [
  { id: 1, label: "Annette Black", selected: true },
  { id: 2, label: "Cody Fisher", selected: true },
  { id: 3, label: "Courtney Henry", selected: false },
  { id: 4, label: "Kathryn Murphy", selected: false },
  { id: 5, label: "Theresa Webb", selected: false },
];

/**
 * Example hook for managing checkbox list state.
 * @returns Items and setItems state updater.
 */
export function useCheckboxListExample() {
  const [items, setItems] = useState<CheckboxItem[]>(initialItems);
  return { items, setItems };
}

/**
 * Custom hook to manage checkbox list state for examples.
 *
 * @remarks
 * Returns items and setItems for managing checkbox state in example screens.
 *
 * @example
 * ```ts
 * const { items, setItems } = useCheckboxListExample();
 * ```
 *
 * @returns Object with items and setItems.
 */
