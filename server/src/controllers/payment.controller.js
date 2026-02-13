import {
  createPaymentOrderService,
  verifyPaymentService,
} from "../services/payment.service.js";
export const createPaymentController = async (req, res) => {
  try {
    const { orderCode } = req.body;

    const payment = await createPaymentOrderService(req.user.id, orderCode);

    res.status(200).json({
      success: true,
      data: payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyPaymentController = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment fields",
      });
    }

    const result = await verifyPaymentService({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    if (result === "ALREADY_PAID") {
      return res.status(200).json({
        success: true,
        message: "Payment already verified",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Payment verified successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
