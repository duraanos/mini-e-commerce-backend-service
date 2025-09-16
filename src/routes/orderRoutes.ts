import express from 'express';
import { orderController } from '../controller/orderController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', orderController.createOrder);
router.get('/', authenticate, orderController.getAllOrders);
router.get('/:orderId', authenticate, orderController.getOrderById);

export default router;
