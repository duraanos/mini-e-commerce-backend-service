import { Request, Response } from 'express';
import { createCart } from '../services/cartService';

export async function createCartController(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const { userId } = req.body;

    if (!userId) {
      res.status(400).json({ error: 'userId is required' });
      return;
    }

    const cart = await createCart(userId);
    res.status(201).json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : String(err) });
  }
}
