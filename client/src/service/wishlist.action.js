import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const toggleWishlistAction = async (product) => {
  const { status } = useAuthStore.getState();
  const wishlistStore = useWishlistStore.getState();

  if (status === "loading") return;

  // 👤 GUEST
  if (status === "guest") {
    wishlistStore.toggleWishlist(product);
    return;
  }

  // 🔐 AUTH USER
  const alreadyWishlisted = wishlistStore.isWishlisted(product.id);

  // optimistic UI
  wishlistStore.toggleWishlist(product);

  try {
    if (alreadyWishlisted) {
      await api.delete(`/wishlist/item/${product.id}`);
    } else {
      await api.post("/wishlist/item", {
        productId: product.id,
      });
    }
  } catch (error) {
    // rollback
    wishlistStore.toggleWishlist(product);
    throw error;
  }
};


export const removeWishlistAction = async (productId) => {
  const { status } = useAuthStore.getState();
  const wishlistStore = useWishlistStore.getState();

  if (status === "loading") return;


  if (status === "guest") {
    wishlistStore.removeWishlist(productId);
    return;
  }

  const wasWishlisted = wishlistStore.isWishlisted(productId);
  if (!wasWishlisted) return;

  wishlistStore.removeWishlist(productId);

  try {
    await api.delete(`/wishlist/item/${productId}`);
  } catch (error) {
    // rollback
    wishlistStore.toggleWishlist({ id: productId });
    throw error;
  }
};