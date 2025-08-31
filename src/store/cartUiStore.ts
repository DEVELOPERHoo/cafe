import { create } from "zustand";

type CartUiState = {
  open: boolean;
  openCart: () => void;
  closeCart: () => void;
  toggleCart: (state: boolean) => void;
};

export const useCartUiStore = create<CartUiState>((set) => ({
  open: false,
  openCart: () => set({ open: true }),
  closeCart: () => set({ open: false }),
  toggleCart: (state) => set(() => ({ open: !state })),
}));
