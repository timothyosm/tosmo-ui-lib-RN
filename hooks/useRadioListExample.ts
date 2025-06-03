import { RadioItem } from "@/components/molecules/RadioList";
import { useState } from "react";

const initialItems: RadioItem[] = [
  { id: null, label: "None" },
  { id: 1, label: "Baked beans" },
  { id: 2, label: "Coleslaw" },
  { id: 3, label: "French fries" },
  { id: 4, label: "Garden salad" },
  { id: 5, label: "Mashed potatoes" },
];

/**
 * Example hook for managing radio list state.
 * @returns Items, selectedId, and setSelectedId state updater.
 */
export function useRadioListExample() {
  const [selectedId, setSelectedId] = useState<RadioItem["id"]>(null);
  return { items: initialItems, selectedId, setSelectedId };
}

/**
 * Custom hook to manage radio list state for examples.
 *
 * @remarks
 * Returns items, selectedId, and setSelectedId for managing radio state in example screens.
 *
 * @example
 * ```ts
 * const { items, selectedId, setSelectedId } = useRadioListExample();
 * ```
 *
 * @returns Object with items, selectedId, and setSelectedId.
 */
