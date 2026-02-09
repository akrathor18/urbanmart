import api from "@/api/axios";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const syncUserDataAfterAuth = async () => {
  try {
    const cart = useCartStore.getState().cart;
    const wishlistIds = Array.from(useWishlistStore.getState().wishlistIds);

    // Skip if no guest data to migrate
    if (!cart.length && !wishlistIds.length) {
      return;
    }

    const payload = {
      cart: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      wishlist: wishlistIds,
    };
    await api.post("/user/sync", payload);
  } catch (error) {
    //ignore
  }
};
