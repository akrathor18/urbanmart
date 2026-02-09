import {
  getCartService,
  updateCartItemService,
  removeCartItemService
} from "../services/cart.service.js";

export const getCartController = async (req, res, next) => {
  try {
    console.log(req.user.id)
    const cart = await getCartService(req.user.id);
    res.json(cart);
  } catch (err) {
    console.log(err)
    next(err);
  }
};

export const updateCartItemController = async (req, res, next) => {
  try {
    const { productId, quantity } = req.body;
  const user =  await updateCartItemService(req.user.id, productId, quantity);
    res.status(200).json({ success: true, res:user });
  } catch (err) {
    console.log(err)
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
