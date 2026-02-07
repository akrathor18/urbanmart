import axios from "@/api/axios";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const syncUserDataAfterAuth = async () => {
  const cart = useCartStore.getState().cart;
  const wishlistIds = Array.from(useWishlistStore.getState().wishlistIds);

  if (!cart.length && !wishlistIds.length) return;

  const payload = {
    cart: cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    })),
    wishlist: wishlistIds,
  };

  await axios.post("/user/sync", payload);
};
