import { getAllCategories, createCategory } from "../controllers/category.controller.js";
import {adminOnly} from "../middlewares/role.middleware.js";
import express from "express";
const router = express.Router();
router.post("/categories", adminOnly, createCategory);
router.get("/categories", getAllCategories);
export default router;