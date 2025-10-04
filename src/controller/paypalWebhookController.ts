import { Request, Response } from 'express';
import { webhookService } from '../services/paypalWebhookService';
import { PayPalWebhookEvent } from '../types/payment';

export const webhookController = {
  async handlePayPalWebhook(req: Request, res: Response): Promise<void> {
    try {
      const verified = await webhookService.verifyPayPalSignature(req);

      if (!verified) res.status(400).json({ error: 'Invalid signature' });

      const event = req.body as PayPalWebhookEvent;
      const result = await webhookService.handlePayPalWebhookEvent(event);

      res.json({ reveived: true, ...result });
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
