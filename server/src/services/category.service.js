import { prisma } from "../config/db.js";

const createCategory = async (categoryData) => {
    return await prisma.category.create({
        data: categoryData,
    });
};
const getAllCategories = async () => {
    return await prisma.category.findMany();
}
export { createCategory, getAllCategories };
