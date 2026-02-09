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
    toast.success('Added to Cart!')
    return;
  }

  // AUTH USER
  try {
    await api.post("/cart/add", {
      productId: product.id,
    });

    const res = await api.get("/cart");
    cartStore.setCartFromDB(res.items);
    toast.success('Added to Cart!')

  } catch (error) {
    toast.dismiss()
    console.log(error)
     toast.error(
      error || "Unable to add product"
    );
  }
};

export const updateCartQtyAction = async (productId, quantity) => {
  const { status } = useAuthStore.getState();
  const cartStore = useCartStore.getState();

  if (status === "loading") {
    return;
  }

  // GUEST USER
  if (status === "guest") {
    cartStore.updateQuantity(productId, quantity);
    return;
  }

  // AUTH USER
  try {
    await api.patch("/cart/item", {
      productId,
      quantity,
    });

    const res = await api.get("/cart");

    cartStore.setCartFromDB(res.items);
  }  catch (error) {
    console.log(error)
    toast.dismiss()
     toast.error(
      error || "Unable to add product"
    );
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
