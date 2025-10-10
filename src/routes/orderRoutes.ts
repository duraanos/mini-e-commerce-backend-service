import express from 'express';
import { orderController } from '../controller/orderController';
import { authenticate } from '../middlewares/authMiddleware';
import {
  createOrderSchema,
  getOrderByIdSchema,
  updateOrderSchema,
  validate,
} from '../validators/orderValidator';

const router = express.Router();

router.post(
  '/',
  authenticate,
  validate(createOrderSchema),
  orderController.createOrder
);
router.get('/', authenticate, orderController.getAllOrders);
router.get(
  '/:orderId',
  authenticate,
  validate(getOrderByIdSchema),
  orderController.getOrderById
);
router.patch(
  '/:orderId',
  authenticate,
  validate(updateOrderSchema),
  orderController.updateOrder
);
router.delete(
  '/:orderId',
  authenticate,
  validate(getOrderByIdSchema),
  orderController.deleteOrder
);

export default router;
