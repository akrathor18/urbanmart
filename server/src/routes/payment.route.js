import express from "express";
import { createPaymentController, verifyPaymentController } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create",authMiddleware, createPaymentController);
router.post("/verify", authMiddleware, verifyPaymentController);

export default router;
