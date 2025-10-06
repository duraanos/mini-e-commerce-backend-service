import { Request, Response } from 'express';
import { webhookService } from '../services/webhookService';

export const webhookController = {
  async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      const proviver = req.params.provider as 'stripe' | 'paypal';
      const result = await webhookService.handleWebhook(proviver, req);

      res.json(result);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
