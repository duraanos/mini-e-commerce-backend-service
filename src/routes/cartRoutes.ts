import express from 'express';
import { cartController } from '../controller/cartController';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createCartSchema,
  addItemSchema,
  updateCartItemSchema,
  removeCartItemSchema,
  getCartItemSchema,
  validate,
} from '../validators/cartValidator';

const router = express.Router();

router.post(
  '/',
  authenticate,
  validate(createCartSchema),
  cartController.createCart
);
router.post(
  '/:id/items',
  authenticate,
  validate(addItemSchema),
  cartController.addItemToCart
);
router.patch(
  '/:id/items/:productId',
  authenticate,
  validate(updateCartItemSchema),
  cartController.updateCartItem
);
router.delete(
  '/:id/items/:productId',
  authenticate,
  validate(removeCartItemSchema),
  cartController.removeCartItem
);
router.get(
  '/:cartId',
  authenticate,
  validate(getCartItemSchema),
  cartController.getCart
);

export default router;
