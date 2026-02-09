import api from "@/api/axios";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const syncUserDataAfterAuth = async () => {
  try {
    // ✅ Read guest data BEFORE bootstrap clears it
    const cart = useCartStore.getState().cart;
    const wishlistIds = Array.from(useWishlistStore.getState().wishlistIds);

    // Skip if no guest data to migrate
    if (!cart.length && !wishlistIds.length) {
      console.log("[Sync] No guest data to migrate");
      return;
    }

    const payload = {
      cart: cart.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      wishlist: wishlistIds,
    };

    console.log("[Sync] Migrating guest data:", payload);

    // ✅ Send to backend and wait for confirmation
    await api.post("/user/sync", payload);

    console.log("[Sync] Migration successful");
  } catch (error) {
    console.error("[Sync] Migration failed:", error);
    // ✅ Don't throw - let user proceed even if sync fails
    // Their data will be in backend from bootstrap
  }
};