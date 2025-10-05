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

export type PaymentRequest = {
  orderId: string;
};

export type PayPalEventType =
  | 'PAYMENT.CAPTURE.COMPLETED'
  | 'PAYMENT.CAPTURE.DENIED';

export type PayPalResource = {
  id: string;
  invoiceId: string;
  customId: string;
  status: string;
  amount?: {
    currency: string;
    value: string;
  };
};

export type PayPalWebhookEvent = {
  id: string;
  eventVersion: string;
  createTime: string;
  resourceType: string;
  eventType: PayPalEventType;
  resource: PayPalResource;
  summary?: string;
};

export type PayPalWebhookResult = {
  status: 'success' | 'failed' | 'ignored';
  message: string;
};