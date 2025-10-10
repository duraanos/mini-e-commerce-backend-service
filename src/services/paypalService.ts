import { supabase } from '../config/db';
import paypal from '@paypal/checkout-server-sdk';
import paypalClient from '../config/paypal';

export const paypalService = {
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

  async createPayPalOrder(userId: string, orderId: string): Promise<object> {
    const amount = await this.calculateAmountForOrder(orderId);
    if (amount <= 0) throw new Error('Invalid amount');

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          custom_id: userId,
          invoice_id: orderId,
          amount: {
            currency_code: 'usd',
            value: amount.toFixed(2),
          },
        },
      ],
    });

    const response = await paypalClient.execute(request);
    const orderData = response.result;

    const { error } = await supabase.from('payments').insert([
      {
        user_id: userId,
        order_id: orderId,
        payment_id: orderData.id,
        payment_provider: 'paypal',
        payment_provider_data: orderData,
        amount: amount,
        currency: 'usd',
        status: orderData.status,
        updated_at: new Date().toISOString(),
      },
    ]);

    if (error) throw error;

    return {
      approvalUrl: response.result.links.find(
        (link: { rel: string }) => link.rel === 'approve'
      ).href,
    };
  },
};
