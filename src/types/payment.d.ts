export type CreatePaymentIntent = {
  id?: string;
  orderId: string;
  userId: string;
  payment_id: string;
  amount: number;
  currency: string;
  status: string;
  metadata?: Record<string, any>;
  cratedat?: string;
};

export type PaymentIntentResponse = {
  clientSecret: string;
};

export type Provider = 'stripe' | 'paypal';
