import { useEffect } from "react";
import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const useAuthBootstrap = () => {
  const { status } = useAuthStore();

  useEffect(() => {
    if (status !== "authenticated") return;

    const bootstrap = async () => {
      const cartStore = useCartStore.getState();
      const wishlistStore = useWishlistStore.getState();

      // 🔥 clear guest state
      cartStore.clearCart();
      wishlistStore.clearWishlist();
      localStorage.removeItem("cart-storage");
      localStorage.removeItem("wishlist-storage");

      try {
        const [cart, wishlist] = await Promise.all([
          api.get("/cart"),   
          api.get("/wishlist"),
        ]);

        console.log("[Auth Bootstrap] cart:", cart);
        console.log("[Auth Bootstrap] wishlist:", wishlist);

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

    bootstrap();
  }, [status]);
};
