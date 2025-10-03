import { PayPalWebhookEvent, PayPalWebhookResult } from '../types/payment';

export const webhookService = {
  async handlePayPalWebhookEvent(
    event: PayPalWebhookEvent
  ): Promise<PayPalWebhookResult> {
    const eventType = event.eventType;

    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('Payment successful:', event.resource);
        // Update orders and payments tables
        return { status: 'success', message: 'Payment completed' };

      case 'PAYMENT.CAPTURE.DENIED':
        console.log('Payment failed:', event.resource);
        // Update orders and payments tables
        return { status: 'failed', message: 'Payment failed' };

      default:
        console.log('Unhandled PayPal event', eventType);
        return {
          status: 'ignored',
          message: `Unhandled event ${event.eventType}`,
        };
    }
  },
};
