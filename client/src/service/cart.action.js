import api from "@/api/axios";
import { useAuthStore } from "@/store/useAuthStore";
import { useCartStore } from "@/store/useCartStore";

export const addToCartAction = async (product, quantity = 1) => {
  const { status } = useAuthStore.getState();

  if (status === "loading") return;

 
  if (status === "guest") {
    useCartStore.getState().addToCart(product, quantity);
    return;
  }

  await api.patch("/cart/item", {
    productId: product.id,
    quantity,
  });
  const res = await api.get("/cart");
  console.log(res)
  useCartStore.getState().setCartFromDB(res.items);
};


export const updateCartQtyAction = async (productId, quantity) => {
  const { status } = useAuthStore.getState();

  if (status === "loading") return;

  if (status === "guest") {
    useCartStore.getState().updateQuantity(productId, quantity);
    return;
  }

  await api.patch("/cart/item", {
    productId,
    quantity,
  });

  const res = await api.get("/cart");
  useCartStore.getState().setCartFromDB(res.items);
};


export const removeFromCartAction = async (productId) => {
  const { status } = useAuthStore.getState();

  if (status === "loading") return;

  if (status === "guest") {
    useCartStore.getState().removeFromCart(productId);
    return;
  }

  await api.delete(`/cart/item/${productId}`);

  const res = await api.get("/cart");
  useCartStore.getState().setCartFromDB(res.items);
};
