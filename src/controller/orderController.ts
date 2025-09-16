import { Request, Response } from 'express';
import { orderService } from '../services/orderService';
import { CreateOrderInput } from '../types/order';

export const orderController = {
  async createOrder(req: Request, res: Response): Promise<void> {
    try {
      const { userId, cartId } = req.body as CreateOrderInput;

      if (!userId || !cartId)
        res.status(400).json({ error: 'userId and cartId are required ' });

      const order = await orderService.creteOrder({ userId, cartId });
      res.status(201).json(order);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async getAllOrders(req: Request, res: Response): Promise<void> {
    try {
      const userId = (req as any).user.id;
      const orders = await orderService.getAllOrders(userId);

      res.json(orders);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async getOrderById(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const userId = (req as any).user.id;

      if (!userId) res.status(401).json({ error: 'Unauthorized' });

      const order = await orderService.getOrderById(orderId, userId);

      if (!order) res.status(404).json({ error: 'Order not found' });

      res.json(order);
    } catch (err: unknown) {
      res
        .status(500)
        .jsonp({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async updateOrder(req: Request, res: Response): Promise<void> {
    try {
      const { orderId } = req.params;
      const userId = (req as any).user.id;

      const updatedOrder = await orderService.updateOrder(
        userId,
        orderId,
        req.body
      );
      res.json(updatedOrder);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
