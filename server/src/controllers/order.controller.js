import * as orderService from "../services/order.service.js";

export const orderProductController = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
     const userId = Number(req.user.id);
    const order = await orderService.orderProduct({
      userId,
      ...req.body,
    });

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

export const getUserOder = async (req, res) => {
  try {
     const userId = Number(req.user.id);
    console.log(userId);
    const orders = await orderService.getUserOder(userId);
    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Server Error" });
  }
};