import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useWishlistStore } from "@/store/useWishlistStore";

export const toggleWishlistAction = async (product) => {
  console.log("[toggleWishlistAction] called with product:", product);

  const { status } = useAuthStore.getState();
  const wishlistStore = useWishlistStore.getState();

  console.log("[toggleWishlistAction] auth status:", status);

  if (status === "loading") {
    console.log("[toggleWishlistAction] auth is loading → exit");
    return;
  }

  // 🧑‍💻 GUEST USER
  if (status === "guest") {
    console.log("[toggleWishlistAction] guest user → local toggle");
    wishlistStore.toggleWishlist(product);
    console.log(
      "[toggleWishlistAction] wishlist after toggle:",
      wishlistStore.wishlist
    );
    return;
  }

  // 🔐 AUTH USER
  const alreadyWishlisted = wishlistStore.isWishlisted(product.id);
  console.log(
    "[toggleWishlistAction] already wishlisted?",
    alreadyWishlisted
  );

  // optimistic UI
  console.log("[toggleWishlistAction] optimistic UI update");
  wishlistStore.toggleWishlist(product);

  try {
    if (alreadyWishlisted) {
      console.log(
        "[toggleWishlistAction] sending DELETE request",
        `/wishlist/item/${product.id}`
      );
      const res = await api.delete(`/wishlist/item/${product.id}`);
      console.log("[toggleWishlistAction] DELETE success:", res);
    } else {
      console.log("[toggleWishlistAction] sending POST request /wishlist/item", {
        productId: product.id,
      });
      const res = await api.post("/wishlist/item", {
        productId: product.id,
      });
      console.log("[toggleWishlistAction] POST success:", res);
    }
  } catch (error) {
    console.error("[toggleWishlistAction] API error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    // rollback
    console.log("[toggleWishlistAction] rollback optimistic update");
    wishlistStore.toggleWishlist(product);
    throw error;
  }
};

export const removeWishlistAction = async (productId) => {
  console.log("[removeWishlistAction] called with productId:", productId);

  const { status } = useAuthStore.getState();
  const wishlistStore = useWishlistStore.getState();

  console.log("[removeWishlistAction] auth status:", status);

  if (status === "loading") {
    console.log("[removeWishlistAction] auth is loading → exit");
    return;
  }

  // 🧑‍💻 GUEST USER
  if (status === "guest") {
    console.log("[removeWishlistAction] guest user → local remove");
    wishlistStore.removeWishlist(productId);
    console.log(
      "[removeWishlistAction] wishlist after remove:",
      wishlistStore.wishlist
    );
    return;
  }

  const wasWishlisted = wishlistStore.isWishlisted(productId);
  console.log(
    "[removeWishlistAction] was wishlisted?",
    wasWishlisted
  );

  if (!wasWishlisted) {
    console.log("[removeWishlistAction] item not in wishlist → exit");
    return;
  }

  // optimistic remove
  console.log("[removeWishlistAction] optimistic remove");
  wishlistStore.removeWishlist(productId);

  try {
    console.log(
      "[removeWishlistAction] sending DELETE request",
      `/wishlist/item/${productId}`
    );
    await api.delete(`/wishlist/item/${productId}`);
    console.log("[removeWishlistAction] DELETE success");
  } catch (error) {
    console.error("[removeWishlistAction] API error:", {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
    });

    // rollback
    console.log("[removeWishlistAction] rollback remove");
    wishlistStore.toggleWishlist({ id: productId });
    throw error;
  }
};
