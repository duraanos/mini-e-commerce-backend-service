import paypal from '@paypal/checkout-server-sdk';
import axios from 'axios';
import { supabase } from '../config/db';
import { Request } from 'express';
import { env } from '../config/env';
import { PayPalWebhookEvent, PayPalWebhookResult } from '../types/payment';

export const webhookService = {
  async generateTokenAccess() {
    try {
      const auth = Buffer.from(
        `${env.PAYPAL_CLIENT_ID}:${env.PAYPAL_CLIENT_SECRET}`
      ).toString('base64');
      const response = await axios.post(
        `${env.PAYPAL_BASE_URL}/v1/oauth2/token`,
        'grant_type=client_credentials',
        {
          headers: {
            Authorization: `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      return response.data.access_token;
    } catch (err: unknown) {
      console.error(
        'Error getting access token:',
        err instanceof Error ? err.message : String(err)
      );
    }
  },
  async verifyPayPalSignature(req: Request): Promise<boolean> {
    try {
      const accessToken = await this.generateTokenAccess();

      const transmissionId = req.headers['paypal-transmission-id'] as string;
      const transmissionSig = req.headers['paypal-transmission-sig'] as string;
      const transmissionTime = req.headers[
        'paypal-transmission-time'
      ] as string;
      const certUrl = req.headers['paypal-cert-url'] as string;
      const authAlgo = req.headers['paypal-auth-argo'] as string;

      if (
        !transmissionId ||
        !transmissionSig ||
        !transmissionTime ||
        !certUrl ||
        !authAlgo
      ) {
        console.error('Missing PayPal signature headers');
        return false;
      }

      const verifyRequest = {
        transmission_id: transmissionId,
        transmission_sig: transmissionSig,
        transmission_time: transmissionTime,
        cert_url: certUrl,
        auth_algo: authAlgo,
        webhook_id: env.PAYPAL_WEBHOOK_ID,
        webhook_event: req.body,
      };

      const response = await axios.post(
        `${env.PAYPAL_BASE_URL}/v1/notifications/verify-webhook-signature`,
        verifyRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const verified = response.data.verification.status === 'SUCCESS';

      if (!verified) console.error('Paypal webhook signature failed');

      return verified;
    } catch (err: unknown) {
      console.error('Signature verification failed', err);
      return false;
    }
  },

  async handlePayPalWebhookEvent(
    event: PayPalWebhookEvent
  ): Promise<PayPalWebhookResult> {
    const eventType = event.eventType;
    const orderId = event.resource.invoiceId;

    switch (eventType) {
      case 'PAYMENT.CAPTURE.COMPLETED':
        console.log('Payment successful:', event.resource);

        try {
          await supabase
            .from('payments')
            .update({
              status: 'succeeded',
              updated_at: new Date().toISOString(),
            })
            .eq('payment_id', event.resource.id);

          await supabase
            .from('orders')
            .update({ status: 'paid', updated_at: new Date().toISOString() })
            .eq('id', orderId);
        } catch (dbErr: unknown) {
          console.error('DB updated in webhook failed', dbErr);
        }

        return { status: 'success', message: 'Payment completed' };

      case 'PAYMENT.CAPTURE.DENIED':
        console.log('Payment failed:', event.resource);

        try {
          await supabase
            .from('payments')
            .update({ status: 'failed', updated_at: new Date().toISOString() })
            .eq('payment_id', event.resource.id);

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
