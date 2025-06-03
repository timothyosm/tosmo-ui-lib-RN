import { create } from "zustand";

/**
 * Zustand store for sidebar open/close state and actions.
 *
 * @remarks
 * Provides global sidebar state and actions for toggling sidebar visibility.
 *
 * @example
 * ```ts
 * const { open, toggleSidebar } = useSidebarStore();
 * ```
 */

interface SidebarState {
  open: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  open: false,
  openSidebar: () => set({ open: true }),
  closeSidebar: () => set({ open: false }),
  toggleSidebar: () => set({ open: !get().open }),
}));
