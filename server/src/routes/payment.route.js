import express from "express";
import { createPaymentController } from "../controllers/payment.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/create",authMiddleware, createPaymentController);

export default router;
