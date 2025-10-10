import axios from 'axios';
import { Request } from 'express';
import { supabase } from '../config/db';
import { env } from '../config/env';
import { PayPalWebhookEvent, PayPalWebhookResult } from '../types/payment';

export const paypalWebhookService = {
  async generateToken() {
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
        'Error getting access token',
        err instanceof Error ? err.message : String(err)
      );
    }
  },

  async verifyPayPalSignature(req: Request): Promise<boolean> {
    try {
      const accessToken = await this.generateToken();

      const requiredHeaders = [
        'paypal-transmission-id',
        'paypal-transmission-sig',
        'paypal-transmission-time',
        'paypal-cert-url',
        'paypal-auth-algo',
      ];

      const headers = requiredHeaders.map(header => req.header(header));

      if (!headers.every(Boolean)) {
        console.error('Missing PayPal signature headers');
        return false;
      }

      const [
        transmissionId,
        transmissionSig,
        transmissionTime,
        certUrl,
        authAlgo,
      ] = headers;

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
        `${env.PAYPAL_BASE_URL}/v1/notifications/verif-webhook-signature`,
        verifyRequest,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const verified = response.data.verification_status === 'SUCCESS';

      if (!verified) console.error('PayPal webhook signature failed');
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
      case 'PAYMENT.CAPTURE.COMPLETED': {
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
      }

      case 'PAYMENT.CAPTURE.DENIED': {
        console.log('Payment Failed', event.resource);

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
      }

      default:
        console.log('Unhandled PayPal event', eventType);
        return {
          status: 'ignored',
          message: `Unhandled event ${event.eventType}`,
        };
    }
  },
};
