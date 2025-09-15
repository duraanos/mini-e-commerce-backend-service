import express from 'express';
import { authContoller } from '../controller/authController';

const router = express.Router();

router.post('/register', authContoller.registerUser);
router.post('/login', authContoller.loginUser);

export default router;
