import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

export const generateToken = (
  payload: string | object,
  expiresIn: string = '1h'
) => {
  return typeof payload === 'string'
    ? jwt.sign(payload, JWT_SECRET as string)
    : jwt.sign(payload, JWT_SECRET as string, { expiresIn } as any);
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    throw new Error('Invalid or expired token');
  }
};
