import { create } from "zustand";

export const useProductStore = create((set) => ({
  featuredProducts: [],
  products: [],
  loading: false,
  error: null,

  fetchProducts: async () => {
    set({ loading: true, error: null });

    try {
      const resp = await fetch("http://localhost:5000/api/products");
      const data = await resp.json();
      set({
        products: data.product,
        featuredProducts: data.product.slice(0, 8),
        loading: false,
      });
    } catch (error) {
        console.log(error)
      set({
        error: "Failed to fetch products",
        loading: false,
      });
    }
  },
}));

