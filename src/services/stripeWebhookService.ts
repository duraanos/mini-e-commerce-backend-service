import { supabase } from '../config/db';
import Stripe from 'stripe';
import stripe from '../config/stripe';
import { env } from '../config/env';

export const stripeWebhookService = {
  async handleStripeWebhookEvent(
    rawBody: Buffer,
    signature: string
  ): Promise<object> {
    const event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      env.STRIPE_WEBHOOK_SECRET as string
    );

    switch (event.type) {
      case 'payment_intent.succeeded': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        try {
          await supabase
            .from('payments')
            .update({
              status: 'succeeded',
              update_at: new Date().toISOString(),
            })
            .eq('payment_id', paymentIntent.id);

          await supabase
            .from('orders')
            .update({ status: 'paid', update_at: new Date().toISOString() })
            .eq('id', orderId);
        } catch (dbErr: unknown) {
          console.error('DB updated in webhook failed', dbErr);
        }
        break;
      }
      case 'payment_intent.payment_failed': {
        const paymentIntent = event.data.object as Stripe.PaymentIntent;
        const orderId = paymentIntent.metadata?.orderId;

        try {
          await supabase
            .from('payments')
            .update({ status: 'failed', updated_at: new Date().toISOString() })
            .eq('payment_id', paymentIntent.id);

          await supabase
            .from('orders')
            .update({
              status: 'payment_failed',
              updated_at: new Date().toISOString(),
            })
            .eq('id', orderId);
        } catch (dbErr: unknown) {
          console.error('DB updated in webhook failed', dbErr);
        }
        break;
      }

      default:
        console.log(`Unhandled event type ${event.type}`);
    }

    return { provider: 'stripe', received: true };
  },
};
