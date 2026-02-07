import express from "express";
import {
  getCartController,
  updateCartItemController,
  removeCartItemController
} from "../controllers/cart.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, getCartController);
router.patch("/item", authMiddleware, updateCartItemController);
router.delete("/item/:productId", authMiddleware, removeCartItemController);

export default router;
