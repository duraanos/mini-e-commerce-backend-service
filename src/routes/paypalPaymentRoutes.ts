import express from 'express';
import { paymentController } from '../controller/paypalPaymentController';

const router = express.Router();

router.post('/create-payment', paymentController.handleCreatePayment);

export default router;  
