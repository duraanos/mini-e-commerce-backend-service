import dotenv from 'dotenv';

dotenv.config();

export const env = {
  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET!,
  PAYPAL_WEBHOOK_ID: process.env.PAYPAL_WEBHOOK_ID!,
  PAYPAL_MODE: process.env.PAYPAL_MODE!,
};
