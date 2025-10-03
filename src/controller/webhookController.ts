import { Request, Response } from 'express';
import { webhookService } from '../services/webhookService';
import { PayPalWebhookEvent } from '../types/payment';

export const webhookController = {
  async handlePayPalWebhook(req: Request, res: Response): Promise<void> {
    try {
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
