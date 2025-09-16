import { supabase } from '../config/db';
import { Order, CreateOrderInput } from '../types/order';

export const orderService = {
  async creteOrder({ userId, cartId }: CreateOrderInput): Promise<Order> {
    const { data: cart, error: cartError } = await supabase
      .from('carts')
      .select('items')
      .eq('id', cartId)
      .single();

    if (cartError || !cart) throw new Error('Cart not found');

    const totalPrice = (cart.items as any[]).reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert({
        userId,
        cartId,
        items: cart.items,
        totalPrice,
        status: 'pending',
      })
      .select()
      .single();

    if (orderError || !order) throw new Error('Order not found');
    return order as Order;
  },

  async getAllOrders(userId: string): Promise<Order[]> {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('user_id', userId);

    if (error || !data) throw new Error(error.message);

    return data as Order[];
  },
};
