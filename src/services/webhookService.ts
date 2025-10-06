import { stripeWebhookService } from './stripeWebhookService';
import { paypalWebhookService } from './paypalWebhookService';

export const webhookService = {
  async handleWebhook(
    provider: 'stripe' | 'paypal',
    req: any
  ): Promise<object> {
    switch (provider) {
      case 'stripe': {
        const signature = req.headers['stripe-signature'];
        return await stripeWebhookService.handleStripeWebhookEvent(
          req.body,
          signature
        );
      }

      case 'paypal': {
        return await paypalWebhookService.handlePayPalWebhookEvent(req.body);
      }

      default:
        throw new Error(`Unknown provider: ${provider}`);
    }
  },
};
