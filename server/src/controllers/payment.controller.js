import { createPaymentOrderService } from "../services/payment.service.js";
export const createPaymentController = async (req, res) => {
  try {
    const { orderId } = req.body;

    const payment = await createPaymentOrderService(req.user.id, orderId);

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
