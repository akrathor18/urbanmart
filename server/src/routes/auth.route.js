import { login, register } from "../controllers/auth.controller.js";

import { Router } from 'express';
const routes = new Router();

// Add routes
routes.post('/register', register);
routes.post('/login', login);


export default routes;