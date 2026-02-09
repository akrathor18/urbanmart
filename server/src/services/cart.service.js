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
  let cart = await prisma.cart.findUnique({
    where: { userId }
  });

  // ✅ ensure cart exists
  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId }
    });
  }

  // ❌ remove item
  if (quantity <= 0) {
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id, productId }
    });
    return;
  }

  // ✅ upsert cart item
  await prisma.cartItem.upsert({
    where: {
      cartId_productId: {
        cartId: cart.id,
        productId
      }
    },
    update: {
      quantity
    },
    create: {
      cartId: cart.id,
      productId,
      quantity
    }
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
