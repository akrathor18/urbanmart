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
};

export const getAllProducts = async (req, res) => {
  try {
    const result = await productService.getFilteredProducts(req.query)

    res.status(200).json(result)
  } catch (error) {
    console.error(error)
    res.status(500).json({
      message: "Failed to fetch products",
    })
  }
}

export const getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;

    const product = await productService.getProductsByCategory(Number(categoryId));
    res.status(200).json({
      product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};

export const getProductsById = async (req, res) => {
  try {
    const { id } =req.params;

    const product = await productService.getProductsById( Number(id));
    res.status(200).json(product)
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message || "Internal Server Error" });
  }
};