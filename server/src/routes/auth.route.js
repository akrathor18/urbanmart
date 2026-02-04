import { login, register, checkAuth, logout } from "../controllers/auth.controller.js";

import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
const routes = new Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/me", verifyJWT, checkAuth);
routes.post("/logout", logout);

export default routes;
