import { prisma } from "../config/db.js";

 const createProduct = async (productData) => {
  return await prisma.Product.create({
    data: productData,
  });
}
 const getAllProducts = async () => {
    return await prisma.Product.findMany();
}

export { createProduct, getAllProducts };