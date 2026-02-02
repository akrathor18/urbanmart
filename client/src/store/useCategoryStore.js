import { create } from "zustand";
import api from "@/api/axios";
export const useCategoryStore = create((set) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    set({ loading: true });
    const data = await api.get("/api/categories");
    set({ categories: data, loading: false });
  },
}));
