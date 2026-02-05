import { login, register, checkAuth, logout } from "../controllers/auth.controller.js";

import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
const router = new Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", verifyJWT, checkAuth);
router.post("/logout", logout);

export default router;
