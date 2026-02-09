import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

export const addToCartAction = async (product, quantity = 1) => {
  console.log("[addToCartAction] called", { product, quantity });

  const { status } = useAuthStore.getState();
  const cartStore = useCartStore.getState();

  console.log("[addToCartAction] auth status:", status);

  if (status === "loading") {
    console.log("[addToCartAction] auth loading → exit");
    return;
  }

  // 🧑‍💻 GUEST USER
  if (status === "guest") {
    console.log("[addToCartAction] guest user → local add");
    cartStore.addToCart(product, quantity);
    console.log(
      "[addToCartAction] cart after add:",
      cartStore.cart
    );
    return;
  }

  // 🔐 AUTH USER
  try {
    console.log("[addToCartAction] PATCH /cart/item", {
      productId: product.id,
      quantity,
    });

   const resput=  await api.patch("/cart/item", {
      productId: product.id,
      quantity,
    });
    console.log('cart res' , resput)

    console.log("[addToCartAction] fetching updated cart");

    const res = await api.get("/cart");
    console.log("[addToCartAction] cart response:", res);

    cartStore.setCartFromDB(res.items);
    console.log("[addToCartAction] cart synced from DB");
  } catch (error) {
    console.error("[addToCartAction] error:", {
      message: error.message,
      status: error.response?.status,
      response: error.response?.data,
    });
    throw error;
  }
};

export const updateCartQtyAction = async (productId, quantity) => {
  console.log("[updateCartQtyAction] called", { productId, quantity });

  const { status } = useAuthStore.getState();
  const cartStore = useCartStore.getState();

  console.log("[updateCartQtyAction] auth status:", status);

  if (status === "loading") {
    console.log("[updateCartQtyAction] auth loading → exit");
    return;
  }

  // 🧑‍💻 GUEST USER
  if (status === "guest") {
    console.log("[updateCartQtyAction] guest user → local update");
    cartStore.updateQuantity(productId, quantity);
    console.log(
      "[updateCartQtyAction] cart after update:",
      cartStore.cart
    );
    return;
  }

  // 🔐 AUTH USER
  try {
    console.log("[updateCartQtyAction] PATCH /cart/item", {
      productId,
      quantity,
    });

    await api.patch("/cart/item", {
      productId,
      quantity,
    });

    console.log("[updateCartQtyAction] fetching updated cart");

    const res = await api.get("/cart");
    console.log("[updateCartQtyAction] cart response:", res.data);

    cartStore.setCartFromDB(res.items);
    console.log("[updateCartQtyAction] cart synced from DB");
  } catch (error) {
    console.error("[updateCartQtyAction] error:", {
      message: error.message,
      status: error.response?.status,
      response: error.response?.data,
    });
    throw error;
  }
};

export const removeFromCartAction = async (productId) => {
  console.log("[removeFromCartAction] called", { productId });

  const { status } = useAuthStore.getState();
  const cartStore = useCartStore.getState();

  console.log("[removeFromCartAction] auth status:", status);

  if (status === "loading") {
    console.log("[removeFromCartAction] auth loading → exit");
    return;
  }

  // 🧑‍💻 GUEST USER
  if (status === "guest") {
    console.log("[removeFromCartAction] guest user → local remove");
    cartStore.removeFromCart(productId);
    console.log(
      "[removeFromCartAction] cart after remove:",
      cartStore.cart
    );
    return;
  }

  // 🔐 AUTH USER
  try {
    console.log(
      "[removeFromCartAction] DELETE /cart/item/",
      productId
    );

    await api.delete(`/cart/item/${productId}`);

    console.log("[removeFromCartAction] fetching updated cart");

    const res = await api.get("/cart");
    console.log("[removeFromCartAction] cart response:", res.data);

    cartStore.setCartFromDB(res.items);
    console.log("[removeFromCartAction] cart synced from DB");
  } catch (error) {
    console.error("[removeFromCartAction] error:", {
      message: error.message,
      status: error.response?.status,
      response: error.response?.data,
    });
    throw error;
  }
};
