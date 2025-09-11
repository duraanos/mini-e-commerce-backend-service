import { supabase } from '../config/db';
import { Cart } from '../types/cart';

export async function createCart(userId: string): Promise<Cart> {
  const { data, error } = await supabase
    .from('carts')
    .insert([{ user_id: userId, items: [] }])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data;
}
