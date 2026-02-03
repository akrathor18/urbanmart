import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set) => ({
      wishlist: [],
      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.some((item) => item.id === product.id);

          return {
            wishlist: exists
              ? state.wishlist.filter((i) => i.id !== product.id)
              : [...state.wishlist, product],
          };
        });
      },

      removeWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.filter((i) => i.id !== id),
        }));
      },
    }),
    {
      name: "wishlist-storage",
    },
  ),
);
