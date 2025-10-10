import dotenv from 'dotenv';

dotenv.config();

export const env = {
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY!,
  STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET!,

  PAYPAL_CLIENT_ID: process.env.PAYPAL_CLIENT_ID!,
  PAYPAL_CLIENT_SECRET: process.env.PAYPAL_CLIENT_SECRET!,
  PAYPAL_WEBHOOK_ID: process.env.PAYPAL_WEBHOOK_ID!,
  PAYPAL_BASE_URL: process.env.PAYPAL_BASE_URL!,
  PAYPAL_MODE: process.env.PAYPAL_MODE!,
};
