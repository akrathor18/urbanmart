import {prisma} from '../config/db.js'
import {razorpay} from '../config/razorpay.js'

export const createPaymentOrderService  = async (userId, orderId)=>{
    const order = await prisma.order.findUnique({
        where :{id: orderId}
    })
// check if order exist 
    if (!order){
        throw new Error("order not found")
    }
    // check ownership
    if (order.userId!== userId){
        throw new Error ("Unauthorized access to order")
    }
     // Check status
  if (order.status !== "CREATED") {
    throw new Error("Order is not eligible for payment");
  }

  // Check expiration
  if (order.expiresAt && new Date() > order.expiresAt) {
    await prisma.order.update({
      where: { id: orderId },
      data: { status: "EXPIRED" },
    });

    throw new Error("Order expired");
  }

   // 5️⃣ Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: order.totalAmount, // already in paise
    currency: "INR",
    receipt: order.orderCode,
  });

  // 6️⃣ Update DB
  await prisma.order.update({
    where: { id: orderId },
    data: {
      razorpayOrderId: razorpayOrder.id,
      status: "PENDING_PAYMENT",
    },
  });

  // 7️⃣ Return checkout details
  return {
    key: process.env.RAZORPAY_KEY_ID,
    amount: razorpayOrder.amount,
    currency: razorpayOrder.currency,
    razorpayOrderId: razorpayOrder.id,
  };
}