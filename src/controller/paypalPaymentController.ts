import { Request, Response } from 'express';
import { paymentService } from '../services/paypalPaymentService';
import { PaymentRequest } from '../types/payment';

export const paymentController = {
  async handleCreatePayment(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = (req as any).user?.id;
      const { orderId } = req.body as PaymentRequest;

      if (!orderId) res.status(404).json({ error: 'Order ID not found' });

      const paymentResponse = await paymentService.createPayPalOrder(
        userId,
        orderId
      );

      res.json(paymentResponse);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
