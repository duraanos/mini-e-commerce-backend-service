import paypal from '@paypal/checkout-server-sdk';
import { env } from './env';

const clientId = env.PAYPAL_CLIENT_ID;
const clientSecret = env.PAYPAL_CLIENT_SECRET;
const mode = env.PAYPAL_MODE || 'sandbox';

const environment =
  mode === 'live'
    ? new paypal.core.LiveEnvironment(clientId, clientSecret)
    : new paypal.core.SandboxEnvironment(clientId, clientSecret);

const paypalClient = new paypal.corePayPalHttpClient(environment);

export default paypalClient;
