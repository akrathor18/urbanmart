import {
  getCartService,
  updateCartItemService,
  removeCartItemService
} from "../services/cart.service.js";

export const getCartController = async (req, res, next) => {
  try {
    const cart = await getCartService(req.user.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItemController = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
    await updateCartItemService(req.user.id, productId, quantity);
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};

export const removeCartItemController = async (req, res, next) => {
  try {
    await removeCartItemService(req.user.id, Number(req.params.productId));
    res.json({ success: true });
  } catch (err) {
    next(err);
  }
};
