import express from 'express';
import { webhookController } from '../controller/stripeWebhookController';

const router = express.Router();

router.post('/', webhookController.handleWebhook);

export default router;
