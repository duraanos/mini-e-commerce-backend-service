import { supabase } from '../config/db';
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

  async createPayPalOrder(userId: string, orderId: string): Promise<string> {
    const amount = await this.calculateAmountForOrder(orderId);
    if (amount <= 0) throw new Error('Invalid amount');

    const request = new paypalClient.orders.OrdersCreateRequest();
    request.prefer('return=representation');
    request.requestBody({
      intent: 'CAPTURE',
      purchase_units: [
        {
          custom_id: userId,
          invoice_id: orderId,
          purhase_units: {
            currency: 'usd',
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

    return response.result.id;
  },
};
