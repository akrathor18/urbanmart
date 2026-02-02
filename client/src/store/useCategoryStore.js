import { create } from "zustand";
import api from "@/api/axios";
export const useCategoryStore = create((set, get) => ({
  categories: [],
  loading: false,

  fetchCategories: async () => {
    const { categories } = get();
    if (categories.length > 0) return;
    set({ loading: true });
    const data = await api.get("/api/categories");
    set({ categories: data, loading: false });
  },
}));
