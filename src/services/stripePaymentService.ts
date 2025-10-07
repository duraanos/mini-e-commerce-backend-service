import { supabase } from '../config/db';
import Stripe from 'stripe';
import { PaymentIntentResponse } from '../types/payment';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-09-30.clover',
});

export const paymentService = {
  async calculateAmountForOrder(orderId: string): Promise<number> {
    const { data: order, error } = await supabase
      .from('orders')
      .select('total_price')
      .eq('id', orderId)
      .single();

    if (error || !order) throw new Error('Order not found');

    const amount = order.total_price;

    return Math.round(amount * 100);
  },

  async createPaymentIntent(
    orderId: string,
    userId: string
  ): Promise<PaymentIntentResponse> {
    const amount = await this.calculateAmountForOrder(orderId);
    if (amount <= 0) throw new Error('Invalid amount');

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: {
        userId,
        orderId,
      },
      automatic_payment_methods: { enabled: true },
    });

    await supabase.from('payments').insert([
      {
        user_id: userId,
        order_id: orderId,
        stripe_payment_id: paymentIntent.id,
        amount: paymentIntent.amount / 100,
        currency: paymentIntent.currency,
        status: paymentIntent.status,
        metadata: paymentIntent.metadata,
      },
    ]);

    return {
      clientSecret: paymentIntent.client_secret as string,
    };
  },
};
