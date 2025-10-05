import { supabase } from '../config/db';
import stripe from '../config/stripe';
import { PaymentIntentResponse } from '../types/payment';

export const stripeService = {
  async calculateAmountForOrder(orderId: string): Promise<number> {
    const { data: order, error } = await supabase
      .from('orders')
      .select('total_price')
      .eq('id', orderId)
      .single();

    if (error || !order) throw new Error('Order not found');

    const amount = order.total_price;

    return amount;
  },

  async createPaymentIntent(
    orderId: string,
    userId: string
  ): Promise<PaymentIntentResponse> {
    const amount = await this.calculateAmountForOrder(orderId);
    if (amount <= 0) throw new Error('Invalid amount');

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency: 'usd',
      metadata: {
        userId,
        orderId,
        payment_provider: 'stripe',
      },
      automatic_payment_methods: { enabled: true },
    });

    const { error } = await supabase.from('payments').insert([
      {
        user_id: userId,
        order_id: orderId,
        payment_id: paymentIntent.id,
        payment_provider: 'stripe',
        payment_provider_data: paymentIntent.metadata,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        updatedAt: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return {
      clientSecret: paymentIntent.client_secret as string,
    };
  },
};
