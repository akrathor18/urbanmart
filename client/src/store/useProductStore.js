import { create } from "zustand";
import api from "@/api/axios";
export const useProductStore = create((set, get) => ({
  featuredProducts: [],
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    const { featuredProducts, products } = get();
    if (featuredProducts.length > 0 && products.length > 0) return;

    set({ loading: true, error: null });

    try {
      const data = await api.get("/api/products");
      set({
        products: data.product,
        featuredProducts: data.product.slice(0, 8),
        loading: false,
      });
    } catch (error) {
      console.log(error);
      set({
        error: "Failed to fetch products",
        loading: false,
      });
    }
  },
}));
