import { getAllProducts, createProduct, getProductsByCategory, getProductsById } from "../controllers/product.controller.js";

import { Router } from 'express';
const routes = new Router();

routes.post('/products', createProduct);
routes.get('/products', getAllProducts);
routes.get('/products/:id', getProductsById);
routes.get('/products/category/:categoryId', getProductsByCategory);

export default routes;