import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useAuthStore } from "@/store/useAuthStore";

export const useCartStore = create(
  persist(
    (set) => ({
      cart: [],

      addToCart: (product, quantity = 1) =>
        set((state) => {
          const exists = state.cart.find(
            (p) => p.id === product.id
          );

          if (exists) {
            return {
              cart: state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + quantity }
                  : p
              ),
            };
          }

          return {
            cart: [...state.cart, { ...product, quantity }],
          };
        }),

      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
        })),

      setCartFromDB: (items) =>
        set({
          cart: items.map((item) => ({
            ...item.product,
            id: item.product.id,
            quantity: item.quantity,
          })),
        }),

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",

      // 🔥 THIS IS THE KEY
      partialize: (state) => {
        const { status } = useAuthStore.getState();

        // Persist ONLY for guest users
        if (status === "guest") {
          return { cart: state.cart };
        }

        // Auth users → do NOT persist cart
        return {};
      },
    }
  )
);
