import { prisma } from "../config/db.js";

export const createProduct = async (productData) => {
  return await prisma.Product.create({
    data: productData,
  });
};
export const getProductsById = async (id) => {
  const product = await prisma.product.findUnique({
    where: { id },
    include: { category: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  const relatedProducts = await prisma.product.findMany({
    where: {
      categoryId: product.categoryId,
      NOT: { id: product.id },
    },
    select: {
      id: true,
      name: true,
      price: true,
      image: true,
      stock: true,
      rating: true,
      review: true,

      category: {
        select: {
          name: true,
        },
      },
    },
    take: 4,
  });

  return {
    product,
    relatedProducts,
  };
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
      gte: minPrice ? Number(minPrice*100) : 0,
      lte: maxPrice ? Number(maxPrice*100) : 100000,
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
      select: {
        id: true,
        name: true,
        price: true,
        image: true,
        stock: true,
        rating: true,
        review: true,
        category: {
          select: {
            name: true,
          },
        },
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
