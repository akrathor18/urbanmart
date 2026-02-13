import { prisma } from "../config/db.js";
import { razorpay } from "../config/razorpay.js";
import crypto from "node:crypto";

export const createPaymentOrderService = async (userId, orderCode) => {
  const order = await prisma.order.findUnique({
    where: { orderCode: orderCode },
  });
  // check if order exist
  if (!order) {
    throw new Error("order not found");
  }
  // check ownership
  if (order.userId !== userId) {
    throw new Error("Unauthorized access to order");
  }
  // Check status
  if (order.status !== "CREATED") {
    throw new Error("Order is not eligible for payment");
  }

  // Check expiration
  if (order.expiresAt && new Date() > order.expiresAt) {
    await prisma.order.update({
      where: { orderCode: orderCode },
      data: { status: "EXPIRED" },
    });

    throw new Error("Order expired");
  }

  //  Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: order.totalAmount,
    currency: "INR",
    receipt: order.orderCode,
  });

  //  Update DB
  await prisma.order.update({
    where: {
      orderCode,
      userId,
    },
    data: {
      razorpayOrderId: razorpayOrder.id,
      status: "PENDING_PAYMENT",
    },
  });

  //  Return checkout details
  return {
    key: process.env.RAZORPAY_KEY_ID,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    razorpayOrderId: razorpayOrder.id,
  };
};

export const verifyPaymentService = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  // Generate expected signature
  const generatedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");

  if (generatedSignature !== razorpay_signature) {
    throw new Error("Invalid payment signature");
  }

  // Find order WITH items
  const order = await prisma.order.findUnique({
    where: { razorpayOrderId: razorpay_order_id },
    include: { items: true },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  // Idempotency check
  if (order.status === "PAID") {
    return "ALREADY_PAID";
  }

  // Transaction
  await prisma.$transaction(async (tx) => {
    await tx.order.update({
      where: { id: order.id },
      data: {
        status: "PAID",
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        paidAt: new Date(),
      },
    });

    // Reduce stock safely
    for (const item of order.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }
  });

  return "VERIFIED";
};
