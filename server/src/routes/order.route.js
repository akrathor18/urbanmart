import {
  getUserOder,
  orderProductController,
} from "../controllers/order.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";
import express from "express";

const router = express.Router();

router.post("/", authMiddleware, orderProductController);
router.get("/", authMiddleware, getUserOder);

export default router;
