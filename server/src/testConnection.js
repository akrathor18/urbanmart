
import { razorpay } from "./config/razorpay.js";
export const testRazorpay = async () => {
  try {
    const order = await razorpay.orders.create({
      amount: 10000, // 100 rupees
      currency: "INR",
      receipt: "test_receipt_1",
    });
console.log(order)
    // res.json(order);
  } catch (error) {
    console.error(error);
    // res.status(500).json({ error: error.message });
  }
};

testRazorpay();
