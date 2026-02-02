import * as productService from "../services/product.service.js";

export const createProduct = async (req, res) => {
    try {
        const product = await productService.createProduct(req.body);
        res.status(201).json({
            message: "Product created successfully",
            product,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const getAllProducts = async (req, res )=>{
    try {
        const product= await productService.getAllProducts();
        res.status(200).json({
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

export const getProductsByCategory = async (req, res )=>{
    try {
        const product= await productService.getProductsByCategory();
        res.status(200).json({
            product,
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message || "Internal Server Error" });
    }
}

getProductsByCategory