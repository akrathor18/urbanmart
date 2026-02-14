
import { razorpay } from "./config/razorpay.js";
export const testRazorpay = async () => {
  try {
    const order = await razorpay.orders.create({
      amount: 10000, // 100 rupees
      currency: "INR",
      receipt: "test_receipt_1",
    });
  } catch (error) {
    console.error(error);
  }
};

testRazorpay();
