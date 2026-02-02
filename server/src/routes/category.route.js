import { getAllCategories, createCategory } from "../controllers/category.controller.js";

import express from "express";
const router = express.Router();
router.post("/categories", createCategory);
router.get("/categories", getAllCategories);
export default router;