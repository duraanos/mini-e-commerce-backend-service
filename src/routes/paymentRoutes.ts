import express from 'express';
import { paymentController } from '../controller/paymentController';

const router = express.Router();

router.post('/create', paymentController.createPayment);

export default router;
