import { prisma } from "../config/db.js";

export const getCartService = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return cart || { items: [] };
};

export const updateCartItemService = async (
  userId,
  productId,
  quantity
) => {
  const cart = await prisma.cart.findUnique({
    where: { userId }
  });
  if (!cart) return;

  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId }
    });
    return;
  }

  await prisma.cartItem.updateMany({
    where: { cartId: cart.id, productId },
    data: { quantity }
  });
};

export const removeCartItemService = async (userId, productId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId }
  });
  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId }
  });
};
