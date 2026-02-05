import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      wishlistIds: new Set(),

      toggleWishlist: (product) => {
        set((state) => {
          const exists = state.wishlistIds.has(product.id);
          const newIds = new Set(state.wishlistIds);

          if (exists) {
            newIds.delete(product.id);
          } else {
            newIds.add(product.id);
          }

          return {
            wishlist: exists
              ? state.wishlist.filter((i) => i.id !== product.id)
              : [...state.wishlist, product],
            wishlistIds: newIds,
          };
        });
      },

      removeWishlist: (id) => {
        set((state) => {
          const newIds = new Set(state.wishlistIds);
          newIds.delete(id);

          return {
            wishlist: state.wishlist.filter((i) => i.id !== id),
            wishlistIds: newIds,
          };
        });
      },

      isWishlisted: (id) => {
        return get().wishlistIds.has(id);
      },
    }),
    {
      name: "wishlist-storage",

      // 👇 THIS IS THE IMPORTANT PART
      partialize: (state) => ({
        wishlist: state.wishlist,
        wishlistIds: Array.from(state.wishlistIds),
      }),

      onRehydrateStorage: () => (state) => {
        state.wishlistIds = new Set(state.wishlistIds || []);
      },
    }
  )
);
