import express from 'express';
import { cartController } from '../controller/cartController';

const router = express.Router();

router.post('/', cartController.createCart);
router.post('/:id/items', cartController.addItemToCart);
router.patch('/:id/items/:productId', cartController.updateCartItem);
router.delete('/:id/items/:productId', cartController.removeCartItem);
router.get('/:cartId', cartController.getCart);

export default router;
