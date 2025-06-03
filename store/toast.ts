import { ToastStatus } from "@/components/organisms/Toast";
import { create } from "zustand";

interface ToastState {
  show: boolean;
  status: ToastStatus;
  title: string;
  description?: string;
  showToast: (args: {
    status?: ToastStatus;
    title: string;
    description?: string;
  }) => void;
  hideToast: () => void;
}

export const useToastStore = create<ToastState>((set) => ({
  show: false,
  status: "success",
  title: "",
  description: undefined,
  showToast: ({ status = "success", title, description }) =>
    set({ show: true, status, title, description }),
  hideToast: () => set({ show: false }),
}));
