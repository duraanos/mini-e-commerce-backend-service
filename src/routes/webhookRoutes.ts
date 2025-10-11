import express from 'express';
import { webhookController } from '../controller/webhookController';
import { webhookValidator } from '../validators/webhookValidator';

const router = express.Router();

router.post('/:provider', webhookValidator, webhookController.handleWebhook);

export default router;
