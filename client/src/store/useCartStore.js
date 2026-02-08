import { create } from "zustand";
import { persist } from "zustand/middleware";

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

      // ❌ Remove item
      removeFromCart: (id) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== id),
        })),

      // 🔄 Update quantity
      updateQuantity: (id, quantity) =>
        set((state) => ({
          cart: state.cart.map((item) =>
            item.id === id
              ? { ...item, quantity }
              : item
          ),
        })),

      // 🔁 Normalize DB cart → store
      setCartFromDB: (items) =>
        set({
          cart: items.map((item) => ({
            ...item.product,
            id: item.product.id,
            quantity: item.quantity,
          })),
        }),

      // 🧹 Clear cart
      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage",
    }
  )
);
