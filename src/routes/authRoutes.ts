import express from 'express';
import { authContoller } from '../controller/authController';
import {
  registerSchema,
  loginSchema,
  validate,
} from '../validators/authValidator';

const router = express.Router();

router.post('/register', validate(registerSchema), authContoller.registerUser);
router.post('/login', validate(loginSchema), authContoller.loginUser);

export default router;
