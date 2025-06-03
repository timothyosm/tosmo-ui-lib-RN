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

export function useRadioListExample() {
  const [selectedId, setSelectedId] = useState<RadioItem["id"]>(null);
  return { items: initialItems, selectedId, setSelectedId };
}
