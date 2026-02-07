import express from "express";
import {
  getWishlistController,
  addWishlistItemController,
  removeWishlistItemController
} from "../controllers/wishlist.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";
const router = express.Router();

router.get("/", authMiddleware, getWishlistController);
router.post("/item", authMiddleware, addWishlistItemController);
router.delete("/item/:productId", authMiddleware, removeWishlistItemController);

export default router;
