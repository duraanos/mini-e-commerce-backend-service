import { Request, Response } from 'express';
import { createCart, addItemtoCart } from '../services/cartService';
import { AddCartItemInput } from '../types/cart';

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

export async function addItemToCartController(
  req: Request<{ id: string }, {}, AddCartItemInput>,
  res: Response
): Promise<void> {
  try {
    const { id } = req.params;
    const item = req.body;

    if (!item.product_id || !item.product_id) {
      res.status(400).json({ error: 'product_id and quantity are required' });
      return;
    }

    const updatedCart = await addItemtoCart(id, item);
    res.status(200).json(updatedCart);
  } catch (err) {
    res
      .status(500)
      .json({ error: err instanceof Error ? err.message : String(err) });
  }
}
