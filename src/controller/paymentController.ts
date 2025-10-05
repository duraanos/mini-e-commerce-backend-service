import { Request, Response } from 'express';
import { paymentService } from '../services/paymentService';

export const paymentController = {
  async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user?.id;
      const { orderId, provider } = req.body;

      const result = paymentService.createPayment(provider, userId, orderId);
      res.status(201).json(result);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
