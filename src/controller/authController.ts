import { Request, Response } from 'express';
import { authService } from '../services/authService';

export const authContoller = {
  async registerUser(req: Request, res: Response): Promise<void> {
    console.log("Incoming body:", req.body);
    try {
      const user = await authService.register(req.body);
      res.status(201).json({
        message: 'User registered successfully',
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },

  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { user, token } = await authService.login(req.body);
      res.status(200).json({
        message: 'Login successful',
        token,
        user: {
          id: user.id,
          email: user.email,
        },
      });
    } catch (err: unknown) {
      res
        .status(500)
        .json({ error: err instanceof Error ? err.message : String(err) });
    }
  },
};
