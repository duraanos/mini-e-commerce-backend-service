import express from 'express';
import { webhookController } from '../controller/webhookController';

const router = express.Router();

router.post('/:provider', webhookController.handleWebhook);

export default router;
