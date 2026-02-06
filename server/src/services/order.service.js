import { prisma } from "../config/db.js";

export const orderProduct = async (orderProductData) => {
  const { userId, productId, quantity, address, payment  } = orderProductData;

  if (!userId || !productId || quantity <= 0 || !address || !payment ) {
    throw new Error("All fields are required");
  }

  return await prisma.$transaction(async (tx) => {
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

    const order = await tx.order.create({
      data: {
        userId,
        payment,
        total,
        address: {
          create: {
            fullName: address.fullName,
            phone: address.phone,
            line1: address.line1,
            line2: address.line2 || null,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country,
          },
        },
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
        address: true,
      },
    });

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
