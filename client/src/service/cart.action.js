import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";
import { toast } from "react-toastify";

export const addToCartAction = async (product, quantity = 1) => {
  const { status } = useAuthStore.getState();
  const cartStore = useCartStore.getState();

  if (status === "loading") {
    return;
  }

  // GUEST USER
  if (status === "guest") {
    cartStore.addToCart(product, quantity);
    toast.success("Added to Cart!");
    return;
  }

  // AUTH USER
  try {
    //  Optimistic update (instant UI)
    cartStore.addToCart(product, quantity);
    toast.dismiss()
    toast.success("Added to Cart!");

    // Sync with server (background)
    await api.post("/cart/add", {
      productId: product.id,
    });
  } catch (error) {
    console.log(error);

    // Optional rollback
    cartStore.removeFromCart(product.id);

    toast.error(error || "Unable to add product");
  }
};

export const updateCartQtyAction = async (productId, quantity) => {
  const { status } = useAuthStore.getState();
  const cartStore = useCartStore.getState();

  if (status === "loading") return;

  // 1️⃣ Optimistic update (instant UI)
  cartStore.updateQuantity(productId, quantity);

  if (status === "guest") return;

  try {
    // 2️⃣ Sync with backend
    await api.patch("/cart/item", {
      productId,
      quantity,
    });
  } catch (error) {
    console.log(error);

    // 3️⃣ Rollback (optional but recommended)
    cartStore.syncFromServer?.(); // or refetch cart once

    toast.error(error || "Unable to update quantity");
  }
};


export const removeFromCartAction = async (productId) => {
  const { status } = useAuthStore.getState();
  const cartStore = useCartStore.getState();

  if (status === "loading") {
    return;
  }

  // GUEST USER
  if (status === "guest") {
    cartStore.removeFromCart(productId);
    return;
  }

  // AUTH USER
  try {
    await api.delete(`/cart/item/${productId}`);

    const res = await api.get("/cart");

    cartStore.setCartFromDB(res.items);
  } catch (error) {
    //ignore
  }
};
