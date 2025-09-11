import express from 'express';
import {
  createCartController,
  addItemToCartController,
} from '../controller/cartController';

const router = express.Router();

router.post('/', createCartController);
router.post('/:id/items', addItemToCartController);

export default router;
