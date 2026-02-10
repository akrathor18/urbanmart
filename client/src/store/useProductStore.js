import { create } from "zustand";
import api from "@/api/axios";
export const useProductStore = create((set, get) => ({
  featuredProducts: [],
  products: [],
  product: null, // Product details
  relatedProducts: [],
  loadingProducts: false,
  loadingProduct: false,

  error: null,

  fetchProducts: async (params = {}, { skipCache = false } = {}) => {
    set({ loadingProducts: true, error: null });

    try {
      const query = new URLSearchParams(params).toString();
      const data = await api.get(`/api/products?${query}`);

      set({
        products: data.products,
        loadingProducts: false,
      });

      // only set featured ONCE (home page use-case)
      if (
        !skipCache &&
        data.products.length &&
        get().featuredProducts.length === 0
      ) {
        set({
          featuredProducts: data.products.slice(0, 8),
        });
      }
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
        set({
          product: data.productDetails,
          relatedProducts: data.relatedProducts,
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
