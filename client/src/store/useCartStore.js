import { create } from "zustand";
import { persist } from "zustand/middleware";
import { toast } from "react-toastify";

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
            if (exists.quantity + quantity > product.stock) {
              toast.dismiss();
              toast.error("Out Of Stock");
              return state;
            }

            toast.dismiss();
            toast.info("Quantity increased!");

            return {
              cart: state.cart.map((p) =>
                p.id === product.id
                  ? { ...p, quantity: p.quantity + quantity }
                  : p
              ),
            };
          }

          toast.dismiss();
          toast.success("Added to cart");

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

      clearCart: () => set({ cart: [] }),
    }),
    {
      name: "cart-storage", // 🔑 localStorage key
    }
  )
);
