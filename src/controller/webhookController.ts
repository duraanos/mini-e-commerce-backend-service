import { Request, Response } from 'express';
import { webhookService } from '../services/webhookService';

export const webhookController = {
  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      const sig = req.headers['stripe-signature'] as string | undefined;
      const buf = req.body as Buffer;

      if (!sig || !buf) {
        res.status(400).json({ error: 'Missing stripe signature or buffer' });
        return;
      }

      const result = await webhookService.handleStripeWebhookEvent(buf, sig);
      res.json(result);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
