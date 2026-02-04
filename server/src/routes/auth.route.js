import { login, register, checkAuth } from "../controllers/auth.controller.js";

import { Router } from "express";
import verifyJWT from "../middlewares/verifyJWT.js";
const routes = new Router();

routes.post("/register", register);
routes.post("/login", login);
routes.get("/me", verifyJWT, checkAuth);

export default routes;
