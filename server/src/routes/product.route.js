import { getAllProducts, createProduct } from "../controllers/product.controller.js";

import { Router } from 'express';
const routes = new Router();

routes.post('/products', createProduct);
routes.get('/products', getAllProducts);

export default routes;