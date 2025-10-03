import express from 'express';
import { paymentController } from '../controller/paymentController';

const router = express.Router();

router.post('/create-payment', paymentController.handleCreatePayment);

export default router;  
