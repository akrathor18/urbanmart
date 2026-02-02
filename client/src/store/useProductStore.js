import { create } from "zustand";
import api from "@/api/axios";
export const useProductStore = create((set, get) => ({
  featuredProducts: [],
  products: [],
  product: null, // Product details

  loadingProducts: false,
  loadingProduct: false,

  error: null,

  fetchProducts: async () => {
    const { featuredProducts, products } = get();
    if (featuredProducts.length > 0 && products.length > 0) return;

    set({ loadingProducts: true, error: null });

    try {
      const data = await api.get("/api/products");
      set({
        products: data.products,
        featuredProducts: data.products.slice(0, 8),
        loadingProducts: false,
      });
    } catch (error) {
      console.log(error);
      set({
        error: "Failed to fetch products",
        loadingProducts: false,
      });
    }
  },

  fetchProductById: async (id) => {
    set({ loadingProduct: true, error: null });

    try {
      const data = await api.get(`/api/products/${id}`);
      console.log(data)
      set({
        product: data,
        loadingProduct: false,
      });
    } catch (error) {
      console.log(error);
      set({
        error: "Failed to fetch products",
        loadingProduct: false,
      });
    }
  },
}));
