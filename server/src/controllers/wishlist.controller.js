import {
  getWishlistService,
  addWishlistItemService,
  removeWishlistItemService
} from "../services/wishlist.service.js";

export const getWishlistController = async (req, res, next) => {
  try {
    const wishlist = await getWishlistService(req.user.id);
    res.json(wishlist);
  } catch (err) {
    next(err);
  }
};

export const addWishlistItemController = async (req, res, next) => {
  try {
    const { productId } = req.body;
    await addWishlistItemService(req.user.id, productId);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const removeWishlistItemController = async (req, res, next) => {
  try {
    await removeWishlistItemService(
      req.user.id,
      Number(req.params.productId)
    );
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
