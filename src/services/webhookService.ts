import { supabase } from '../config/db';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2025-08-27.basil',
});

export const webhookService = {
  async handleStripeWebhookEvent(
    rawBody: Buffer,
    signature: string
  ): Promise<object> {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        try {
          await supabase
            .from('payments')
            .update({ status: 'succeeded' })
            .eq('stripe_payment_id', paymentIntent.id);

          await supabase
            .from('orders')
            .update({ status: 'paid', updated_at: new Date().toISOString() })
            .eq('id', orderId);
        } catch (dbErr) {
          console.error('DB updated in webhook failed', dbErr);
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymnetIntent = event.data.object as Stripe.PaymentIntent;

        try {
          await supabase
            .from('payments')
            .update({ status: 'failed' })
            .eq('stripe_payment_id', paymnetIntent.id);
        } catch (dbErr) {
          console.error('DB updated in webhook failed', dbErr);
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { received: true };
  },
};
