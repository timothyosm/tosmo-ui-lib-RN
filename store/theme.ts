import { create } from "zustand";

/**
 * Zustand store for theme mode and actions.
 *
 * @remarks
 * Provides global theme mode (light/dark) and actions to toggle or set mode.
 *
 * @example
 * ```ts
 * const { mode, toggleMode } = useThemeStore();
 * ```
 */

export type ThemeMode = "light" | "dark";

interface ThemeState {
  mode: ThemeMode;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  mode: "light",
  setMode: (mode) => set({ mode }),
  toggleMode: () => set({ mode: get().mode === "light" ? "dark" : "light" }),
}));
