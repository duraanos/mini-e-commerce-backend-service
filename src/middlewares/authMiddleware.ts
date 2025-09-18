import { error } from 'console';
import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const autheader = req.headers.authorization;

  if (!autheader)
    return res.status(401).json({ error: 'Authorization is missing' });

  const token = autheader?.split(' ')[1];

  if (!token) return res.status(401).json({ error: 'No token provided' });

  const secret = process.env.JWT_SECRET;

  if (!secret) throw new Error('JWT_SECRET not defined in environment');

  try {
    const decoded = jwt.verify(token, secret) as JwtPayload;

    if (!decoded)
      return res.status(403).json({ error: 'Invalid token payload' });

    (req as any).user = { id: decoded.id };
  } catch (err) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
