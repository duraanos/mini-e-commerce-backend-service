import express from 'express';
import { webhookController } from '../controller/paypalWebhookController';

const router = express.Router();

router.post('/', webhookController.handlePayPalWebhook);

export default router;
