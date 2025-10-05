import { stripeService } from './stripeService';
import { paypalService } from './paypalService';
import { Provider } from '../types/payment';

export const paymentService = {
  async createPayment(
    provider: Provider,
    userId: string,
    orderId: string
  ): Promise<object | string> {
    switch (provider) {
      case 'stripe':
        return await stripeService.createPaymentIntent(orderId, userId);
      case 'paypal':
        return await paypalService.createPayPalOrder(userId, orderId);
      default:
        throw new Error(`Unsupported payment provider: ${provider}`);
    }
  },
};
