import { create } from "zustand";

/**
 * Zustand store for dialog state and actions.
 *
 * @remarks
 * Provides global dialog state and actions for showing/hiding dialogs.
 *
 * @example
 * ```ts
 * const { showDialog, hideDialog } = useDialogStore();
 * ```
 */

interface DialogState {
  visible: boolean;
  status?: "success" | "error" | "warning";
  title: string;
  description?: string;
  primaryActionLabel?: string;
  onPrimaryAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  showDialog: (args: {
    status?: "success" | "error" | "warning";
    title: string;
    description?: string;
    primaryActionLabel?: string;
    onPrimaryAction?: () => void;
    secondaryActionLabel?: string;
    onSecondaryAction?: () => void;
  }) => void;
  hideDialog: () => void;
}

export const useDialogStore = create<DialogState>((set) => ({
  visible: false,
  status: "success",
  title: "",
  description: undefined,
  primaryActionLabel: undefined,
  onPrimaryAction: undefined,
  secondaryActionLabel: undefined,
  onSecondaryAction: undefined,
  showDialog: (args) => set({ visible: true, ...args }),
  hideDialog: () => set({ visible: false }),
}));
