import { CheckboxItem } from "@/components/molecules/CheckboxList";
import { useState } from "react";

const initialItems: CheckboxItem[] = [
  { id: 1, label: "Annette Black", selected: true },
  { id: 2, label: "Cody Fisher", selected: true },
  { id: 3, label: "Courtney Henry", selected: false },
  { id: 4, label: "Kathryn Murphy", selected: false },
  { id: 5, label: "Theresa Webb", selected: false },
];

export function useCheckboxListExample() {
  const [items, setItems] = useState<CheckboxItem[]>(initialItems);
  return { items, setItems };
}
