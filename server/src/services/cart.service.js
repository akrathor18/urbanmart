import { prisma } from "../config/db.js";

export const getCartService = async (userId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return cart || { items: [] };
};

export const updateCartItemService = async (userId, productId, quantity) => {
  return await prisma.$transaction(async (tx) => {
    let cart = await tx.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await tx.cart.create({
        data: { userId },
      });
    }

    // remove item
    if (quantity <= 0) {
      await tx.cartItem.deleteMany({
        where: { cartId: cart.id, productId },
      });
      return;
    }

    //  get product stock
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    //  stock validation
    if (quantity > product.stock) {
      throw new Error(`Only ${product.stock} item(s) available in stock`);
    }

    await tx.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity,
      },
      create: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  });
};

export const addToCartService = async (userId, productId) => {
  return await prisma.$transaction(async (tx) => {
    //  get product
    const product = await tx.product.findUnique({
      where: { id: productId },
      select: { stock: true },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    let cart = await tx.cart.findUnique({
      where: { userId },
    });

    if (!cart) {
      cart = await tx.cart.create({
        data: { userId },
      });
    }

    //  check existing quantity
    const existingItem = await tx.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
    });

    if (existingItem && existingItem.quantity >= product.stock) {
      throw new Error(`Only ${product.stock} item(s) available in stock`);
    }

    await tx.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId,
        },
      },
      update: {
        quantity: {
          increment: 1,
        },
      },
      create: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    });
  });
};


export const removeCartItemService = async (userId, productId) => {
  const cart = await prisma.cart.findUnique({
    where: { userId },
  });
  if (!cart) return;

  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id, productId },
  });
};
