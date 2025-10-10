import { supabase } from '../config/db';
import paypalClient from '../config/paypal';
import paypal from '@paypal/checkout-server-sdk';

export const paymentService = {
  async calculateAmountForOrder(orderId: string): Promise<number> {
    const { data: order, error } = await supabase
      .from('orders')
      .select('total_price')
      .eq('id', orderId)
      .single();

    if (error || !order) throw new Error('Order not found');

    return order.total_price;
  },

  async createPayPalOrder(userId: string, orderId: string): Promise<object> {
    const amount = await paymentService.calculateAmountForOrder(orderId);
    if (amount <= 0) throw new Error('Invalid amount');

    const request = new paypal.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          invoice_id: orderId,
          custom_id: userId,
          amount: {
            currency_code: 'usd',
            value: amount.toFixed(2),
          },
        },
      ],
    });

    const response = await paypalClient.execute(request);
    return {
      approvalUrl: response.result.links.find(
        (link: { rel: string }) => link.rel === 'approve'
      ).href,
    };
  },
};
