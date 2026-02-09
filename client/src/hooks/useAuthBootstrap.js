import { useEffect, useRef } from "react";
import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const useAuthBootstrap = () => {
  const { status } = useAuthStore();
  const hasBootstrapped = useRef(false);

  useEffect(() => {
    if (status !== "authenticated") {
      // Reset bootstrap flag when user logs out
      hasBootstrapped.current = false;
      return;
    }
    if (hasBootstrapped.current) return;
    hasBootstrapped.current = true;

    const bootstrap = async () => {
      const cartStore = useCartStore.getState();
      const wishlistStore = useWishlistStore.getState();

      try {
        const [cart, wishlist] = await Promise.all([
          api.get("/cart"),
          api.get("/wishlist"),
        ]);

        console.log("[Auth Bootstrap] cart:", cart);
        console.log("[Auth Bootstrap] wishlist:", wishlist);

        cartStore.clearCart();
        wishlistStore.clearWishlist();
        localStorage.removeItem("cart-storage");
        localStorage.removeItem("wishlist-storage");

        // Load backend data
        if (Array.isArray(cart?.items)) {
          cartStore.setCartFromDB(cart.items);
        }

        if (Array.isArray(wishlist?.items)) {
          wishlistStore.setWishlistFromDB(wishlist.items);
        }
      } catch (err) {
        console.error("[Auth Bootstrap] failed", err);
      }
    };
    const timer = setTimeout(bootstrap, 100);
    return () => clearTimeout(timer);
  }, [status]);
};
