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
    currency_code: string;
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
