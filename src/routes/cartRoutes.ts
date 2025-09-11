import express from 'express';
import { createCartController } from '../controller/cartController';

const router = express.Router();

router.post('/', createCartController);

export default router;
