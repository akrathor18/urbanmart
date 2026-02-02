import { prisma } from "../config/db.js";

 const createProduct = async (productData) => {
  return await prisma.Product.create({
    data: productData,
  });
}
 const getAllProducts = async () => {
   return await prisma.product.findMany({
    include: {
      category: true,
    },
  });

}

const getProductsById = async (id)=>{
  return await prisma.product.findUnique({
    where:{
      id: id
    }
  })
}
const getProductsByCategory = async (categoryId) => {
  return await prisma.product.findMany({
    where: {
      categoryId: Number(categoryId),
    },
    include: {
      category: true,
    },
  });
};
export { createProduct, getAllProducts, getProductsByCategory, getProductsById };