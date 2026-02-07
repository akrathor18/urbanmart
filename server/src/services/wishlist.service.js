import { prisma } from "../config/db.js";

export const getWishlistService = async (userId) => {
  const wishlist = await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return wishlist || { items: [] };
};

export const addWishlistItemService = async (userId, productId) => {
  const wishlist = await prisma.wishlist.upsert({
    where: { userId },
    update: {},
    create: { userId }
  });

  await prisma.wishlistItem.upsert({
    where: {
      wishlistId_productId: {
        wishlistId: wishlist.id,
        productId
      }
    },
    update: {},
    create: {
      wishlistId: wishlist.id,
      productId
    }
  });
};

export const removeWishlistItemService = async (userId, productId) => {
  const wishlist = await prisma.wishlist.findUnique({
    where: { userId }
  });
  if (!wishlist) return;

  await prisma.wishlistItem.deleteMany({
    where: {
      wishlistId: wishlist.id,
      productId
    }
  });
};
