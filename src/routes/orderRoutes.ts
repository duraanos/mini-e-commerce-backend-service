import express from 'express';
import { orderController } from '../controller/orderController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', authenticate, orderController.getAllOrders);
router.get('/:orderId', authenticate, orderController.getOrderById);
router.patch('/:orderId', authenticate, orderController.updateOrder);
router.delete('/:orderId', authenticate, orderController.deleteOrder);

export default router;
