import { prisma } from "../config/db.js";

export const orderProduct = async (orderProductData) => {
  const { userId, productId, quantity, address } = orderProductData;

  if (!userId || !productId || !quantity || !address) {
    throw new Error("All fields are required");
  }

  return await prisma.$transaction(async (tx) => {
    //  Get product
    const product = await tx.product.findUnique({
      where: { id: Number(productId) },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < quantity) {
      throw new Error("Insufficient stock");
    }

    const total = product.price * quantity;

    // Create order
    const order = await tx.order.create({
      data: {
        userId: Number(userId),
        address,
        total,
        items: {
          create: {
            productId: product.id,
            quantity,
            price: product.price,
          },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    // Update stock
    await tx.product.update({
      where: { id: product.id },
      data: {
        stock: product.stock - quantity,
      },
    });

    return order;
  });
};

export const getUserOder = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const orders = await prisma.order.findMany({
    where: { userId: Number(userId) },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  if (!orders || orders.length === 0) {
    throw new Error("No orders found for this user");
  }
  return orders;
};
