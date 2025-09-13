import e, { Request, Response } from 'express';
import { cartService } from '../services/cartService';
import { AddCartItemInput } from '../types/cart';

export const cartController = {
  async createCart(req: Request, res: Response): Promise<void> {
    try {
      const { userId } = req.body;

      if (!userId) {
        res.status(400).json({ error: 'userId is required' });
        return;
      }

      const cart = await cartService.createCart(userId);
      res.status(201).json(cart);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async addItemToCart(
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

      const updatedCart = await cartService.addItemtoCart(id, item);
      res.status(200).json(updatedCart);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async updateCartItem(
    req: Request<{ id: string; productId: string }, {}, { quantity: number }>,
    res: Response
  ): Promise<void> {
    try {
      const { id, productId } = req.params;
      const { quantity } = req.body;

      if (!quantity || quantity <= 0) {
        res.status(400).json({ error: 'Quantity must be greater than 0' });
        return;
      }

      const updatedCart = await cartService.updateCartItem(
        id,
        productId,
        quantity
      );
      res.status(200).json(updatedCart);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async removeCartItem(
    req: Request<{ id: string; productId: string }>,
    res: Response
  ): Promise<void> {
    try {
      const { id, productId } = req.params;

      const updatedCart = await cartService.removeCartItem(id, productId);
      res.status(200).json(updatedCart);
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
  async getCart(req: Request, res: Response): Promise<void> {
    try {
      const { cartId } = req.params;
      console.log(cartId);
      const cart = await cartService.getCartById(cartId);

      if (!cart) {
        res.status(400).json({ error: 'Cart not found' });
        return;
      }

      res.status(200).json(cart);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
