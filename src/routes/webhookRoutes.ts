import express from 'express';
import { webhookController } from '../controller/webhookController';

const router = express.Router();

router.post('/', webhookController.handlePayPalWebhook);

export default router;
