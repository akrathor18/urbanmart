import { getAllCategories, createCategory } from "../controllers/category.controller.js";

import express from "express";
const router = express.Router();
router.post("/", createCategory);
router.get("/", getAllCategories);
export default router;