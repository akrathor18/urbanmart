import { prisma } from "../config/db.js";
import { generateOrderCode } from "../utils/generateOrderCode.js";
export const orderProducts = async ({ userId, items, address, payment }) => {
  if (!items?.length) throw new Error("No items to order");

  return await prisma.$transaction(async (tx) => {
    let total = 0;

    //Validate all products + stock
    const products = await tx.product.findMany({
      where: { id: { in: items.map((i) => i.productId) } },
    });

    for (const item of items) {
      const product = products.find((p) => p.id === item.productId);

      if (!product) throw new Error("Product not found");
      if (product.stock < item.quantity)
        throw new Error(`Insufficient stock for ${product.name}`);

      total += product.price * item.quantity;
    }

    //Create order
    const order = await tx.order.create({
      data: {
        orderCode: generateOrderCode(),
        userId,
        paymentMethod: payment,
        totalAmount: total,

        status: payment === "COD" ? "PAID" : "CREATED",

        expiresAt:
          payment === "RAZORPAY" ? new Date(Date.now() + 15 * 60 * 1000) : null,

        address: {
          create: {
            fullName: address.fullName,
            phone: address.phone,
            line1: address.line1,
            line2: address.line2 || null,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
            country: address.country || "India",
          },
        },

        items: {
          create: items.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
              productId: product.id,
              quantity: item.quantity,
              price: product.price, // snapshot price in paise
            };
          }),
        },
      },
    });

    //  Update stock if payment method is COD
    if (payment === "COD") {
      for (const item of items) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stock: {
              decrement: item.quantity,
            },
          },
        });
      }
    }
    // clear the cart items
    await tx.cartItem.deleteMany({
      where: {
        cart: {
          userId,
        },
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
  where: { userId },
  orderBy: { createdAt: "desc" },
  select: {
    id: true,
    orderCode: true,
    totalAmount: true,
    status: true,
    paymentMethod: true,
    createdAt: true,
    items: {
      select: {
        quantity: true,
        product: {
          select: {
            name: true,
            price: true,
          },
        },
      },
    },
  },
});


  if (!orders || orders.length === 0) {
    throw new Error("No orders found for this user");
  }
  return orders;
};

export const getOrderDetails = async (orderCode) => {
  if (!orderCode) {
    throw new Error("OrderCode Required");
  }
  const order = await prisma.order.findUnique({
    where: { orderCode },
    include: {
      address: true,
      items: {
        include: {
          product: true,
        },
      },
    },
  });

  return order;
};
