import { create } from "zustand";

export const usePaymentStore = create((set) => ({
  loading: false,

  setLoading: (value) => set({ loading: value }),
}));
