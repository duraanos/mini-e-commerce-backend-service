import express from 'express';
import { paymentController } from '../controller/paymentController';
import { authenticate } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/create', authenticate, paymentController.createPaymentIntent);

export default router;