import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const autheader = req.headers.authorization;

  if (!autheader)
    return res.status(401).json({ error: 'Authorization is missing' });

  const token = autheader?.split(' ')[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET as string);
    (req as any).user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
