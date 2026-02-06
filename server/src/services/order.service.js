import { prisma } from "../config/db.js";

export const orderProducts = async ({ userId, items, address, payment }) => {
  if (!items?.length) throw new Error("No items to order");

  return await prisma.$transaction(async (tx) => {
    let total = 0;

    // 1️⃣ Validate all products + stock
    const products = await tx.product.findMany({
      where: { id: { in: items.map(i => i.productId) } },
    });

    for (const item of items) {
      const product = products.find(p => p.id === item.productId);

      if (!product) throw new Error("Product not found");
      if (product.stock < item.quantity)
        throw new Error(`Insufficient stock for ${product.name}`);

      total += product.price * item.quantity;
    }

    // 2️⃣ Create order
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
            country: address.country|| "India",
          },
        },
        items: {
          create: items.map(item => {
            const product = products.find(p => p.id === item.productId);
            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price,
            };
          }),
        },
      },
      include: {
        items: { include: { product: true } },
        address: true,
      },
    });

    // 3️⃣ Update stock
    for (const item of items) {
      const product = products.find(p => p.id === item.productId);
      await tx.product.update({
        where: { id: product.id },
        data: { stock: product.stock - item.quantity },
      });
    }

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
