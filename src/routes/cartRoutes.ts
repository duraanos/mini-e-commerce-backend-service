import express from 'express';
import { cartController } from '../controller/cartController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authenticate, cartController.createCart);
router.post('/:id/items', authenticate, cartController.addItemToCart);
router.patch(
  '/:id/items/:productId',
  authenticate,
  cartController.updateCartItem
);
router.delete(
  '/:id/items/:productId',
  authenticate,
  cartController.removeCartItem
);
router.get('/:cartId', cartController.getCart);

export default router;
