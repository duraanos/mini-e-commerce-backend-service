import express from 'express';
import { paymentController } from '../controller/paymentController';
import { authenticate } from '../middlewares/authMiddleware';
import { orchestratorSchema, validate } from '../validators/paymentValidator';

const router = express.Router();

router.post(
  '/create',
  authenticate,
  validate(orchestratorSchema),
  paymentController.createPayment
);

export default router;
