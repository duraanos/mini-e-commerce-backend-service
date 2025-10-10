import express from 'express';
import { productController } from '../controller/productController';
import { authenticate } from '../middlewares/authMiddleware';
import {
  productSchema,
  updateProductSchema,
  productIdSchema,
  validate,
} from '../validators/productValidator';

const router = express.Router();

router.post(
  '/',
  authenticate,
  validate(productSchema),
  productController.createProduct
);
router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.put(
  '/:id',
  authenticate,
  validate(updateProductSchema),
  productController.updateProduct
);
router.delete(
  '/:id',
  authenticate,
  validate(productIdSchema),
  productController.deleteProduct
);

export default router;
