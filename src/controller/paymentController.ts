import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';

export const paymentController = {
  async createPaymentIntent(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { orderId } = req.body;

      if (!orderId) res.status(400).json({ error: 'Order id is required' });

      const paymentIntent = await paymentService.createPaymentIntent(
        orderId,
        userId
      );

      res.status(201).json(paymentIntent);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};