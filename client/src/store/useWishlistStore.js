import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "@/store/useAuthStore";

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

      isWishlisted: (id) => get().wishlistIds.has(id),

      setWishlistFromDB: (items = []) =>
        set(() => {
          const normalized = items.map((item) => ({
            ...item.product, // UI expects product fields
            id: item.product.id, // 🔥 ALWAYS product.id
          }));

          return {
            wishlist: normalized,
            wishlistIds: new Set(normalized.map((p) => p.id)),
          };
        }),

      clearWishlist: () => set({ wishlist: [], wishlistIds: new Set() }),
    }),
    {
      name: "wishlist-storage",

      // 🔥 ONLY persist for guest users
      partialize: (state) => {
        const { status } = useAuthStore.getState();

        if (status === "guest") {
          return {
            wishlist: state.wishlist,
            wishlistIds: Array.from(state.wishlistIds),
          };
        }

        // auth users → no persistence
        return {};
      },

      onRehydrateStorage: () => (state) => {
        state.wishlistIds = new Set(state.wishlistIds || []);
      },
    },
  ),
);
