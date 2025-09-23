export type CreatePaymentIntent = {
  id?: string;
  orderId: string;
  userId: string;
  stripePaymentId: string;
  amount: number;
  currency: string;
  status: string;
  metadata?: Record<string, any>;
  createdAt?: string;
};

export type PaymentIntentResponse = {
  clientSecret: string;
};
