import Razorpay from "razorpay";
import dotenv from "dotenv";
dotenv.config();
const key=process.env.RAZORPAY_KEY_ID
const secret = process.env.RAZORPAY_KEY_SECRET
console.log(process.env.RAZORPAY_KEY_SECRET)
if (!key || !secret){
  console.log("undefine ENVs", key, secret)
}
export const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});
