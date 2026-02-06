import { prisma } from "../config/db.js";

export const createProduct = async (productData) => {
  return await prisma.Product.create({
    data: productData,
  });
};
const getAllProducts = async () => {
  return await prisma.product.findMany({
    include: {
      category: true,
    },
  });
};

export const getProductsById = async (id) => {
  return await prisma.product.findUnique({
    where: {
      id: id,
    },
    include: {
      category: true,
    },
  });
};
export const getProductsByCategory = async (categoryId) => {
  return await prisma.product.findMany({
    where: {
      categoryId: Number(categoryId),
    },
    include: {
      category: true,
    },
  });
};

export const getFilteredProducts = async (filters) => {
  const {
     search,
    category,
    minPrice,
    maxPrice,
    rating,
    inStock,
    sort,
    page = 1,
    limit = 12,
  } = filters;
// Search (name, description, category)
 const where = {};
if (search) {
  where.OR = [
    {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      description: {
        contains: search,
        mode: "insensitive",
      },
    },
    {
      category: {
        is: {
          name: {
            contains: search,
            mode: "insensitive",
          },
        },
      },
    },
  ];
}

if (category) {
  where.category = {
    is: {
      name: {
        in: category.split(","),
      },
    },
  };
}


  // Price
  if (minPrice || maxPrice) {
    where.price = {
      gte: minPrice ? Number(minPrice) : 0,
      lte: maxPrice ? Number(maxPrice) : 100000,
    };
  }

  // Rating
  if (rating) {
    where.rating = {
      gte: Number(rating),
    };
  }

  // Stock
  if (inStock === "true") {
    where.stock = {
      gt: 0,
    };
  }

  // Sorting
  let orderBy = { createdAt: "desc" };
  if (sort === "price_asc") orderBy = { price: "asc" };
  if (sort === "price_desc") orderBy = { price: "desc" };
  if (sort === "rating") orderBy = { rating: "desc" };

  const skip = (Number(page) - 1) * Number(limit);

 const [products, total] = await Promise.all([
  prisma.product.findMany({
    where,
    orderBy,
    skip,
    take: Number(limit),
    include: {
      category: true,
    },
  }),
  prisma.product.count({ where }),
]);


  return {
    products,
    pagination: {
      page: Number(page),
      limit: Number(limit),
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};
