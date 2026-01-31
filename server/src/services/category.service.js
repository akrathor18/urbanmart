import { prisma } from "../config/db.js";

const createCategory = async (categoryData) => {
    if (!categoryData.name) {
        throw new Error("Category name is required");
    }
    const existingCategory = await prisma.category.findUnique({
        where: { name: categoryData.name },
    });
    if (existingCategory) {
        throw new Error("Category already exists");
    }
    return await prisma.category.create({
        data: categoryData,
    });
};
const getAllCategories = async () => {
    return await prisma.category.findMany();
}
export { createCategory, getAllCategories };
