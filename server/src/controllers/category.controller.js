import * as categoryService from '../services/category.service.js';

export const createCategory = async (req, res) => {
try {

    const category = await categoryService.createCategory(req.body);
    res.status(201).json(category);
} catch (error) {
    console.log(error)
    res.status(500).json({ message: error.message || "Server Error" });
}
}

export const getAllCategories = async (req, res) => {
try {
    const categories = await categoryService.getAllCategories();
    res.status(200).json(categories);
} catch (error) {
    res.status(500).json({ message: error.message || "Server Error"  });
}
}