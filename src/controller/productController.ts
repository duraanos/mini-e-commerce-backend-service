import { Request, Response } from 'express';
import { productService } from '../services/productService';
import { Product, ProductId, ProductUpdateData } from '../types/product';

export const productController = {
  async createProduct(
    req: Request<{}, {}, Product>,
    res: Response
  ): Promise<void> {
    try {
      const product: Product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products: Product[] = await productService.getAll();
      res.json(products);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async getProductById(
    req: Request<{ id: ProductId }>,
    res: Response
  ): Promise<void> {
    try {
      const product: Product | null = await productService.getById(
        req.params.id
      );
      if (!product) res.status(404).json({ message: 'Product not found' });
      res.json(product);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async updateProduct(
    req: Request<{ id: ProductId }, {}, ProductUpdateData>,
    res: Response
  ): Promise<void> {
    try {
      const updated: Product = await productService.update(
        req.params.id,
        req.body
      );
      res.json(updated);
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async deleteProduct(
    req: Request<{ id: ProductId }>,
    res: Response
  ): Promise<void> {
    try {
      await productService.remove(req.params.id);
      res.status(204).send();
    } catch (err) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
