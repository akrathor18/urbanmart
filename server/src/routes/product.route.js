import { getAllProducts, createProduct, getProductsByCategory, getProductsById } from "../controllers/product.controller.js";

import { Router } from 'express';
import {adminOnly} from "../middlewares/role.middleware.js";
const routes = new Router();

routes.post('/products',adminOnly, createProduct);
routes.get('/products', getAllProducts);
routes.get('/products/:id', getProductsById);
routes.get('/products/category/:categoryId', getProductsByCategory);

export default routes;