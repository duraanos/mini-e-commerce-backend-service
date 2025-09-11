import { supabase } from '../config/db';
import { Cart, AddCartItemInput } from '../types/cart';

export const cartService = {
  async createCart(userId: string): Promise<Cart> {
    const { data, error } = await supabase
      .from('carts')
      .insert([{ user_id: userId, items: [] }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  async addItemtoCart(cartId: string, item: AddCartItemInput): Promise<Cart> {
    const { data: cartData, error: fetchError } = await supabase
      .from('carts')
      .select('*')
      .eq('id', cartId)
      .single();

    console.log(cartData);
    if (fetchError || !cartData) throw new Error('Cart not found');

    const updatedItems = [...cartData.items];
    console.log(updatedItems);

    const existingIndex = updatedItems.findIndex(
      i => i.product_id === item.product_id
    );
    console.log(existingIndex);

    existingIndex >= 0
      ? (updatedItems[existingIndex].quantity += item.quantity)
      : updatedItems.push(item);

    const { data: updatedCart, error: updatedError } = await supabase
      .from('carts')
      .update({ items: updatedItems, updated_at: new Date().toISOString() })
      .eq('id', cartId)
      .select()
      .single();

    if (updatedError) throw new Error(updatedError.message);

    return updatedCart;
  },

  async updateCartItem(
    cartId: string,
    productId: string,
    quantity: number
  ): Promise<Cart> {
    const { data: cartData, error: fetchError } = await supabase
      .from('carts')
      .select('*')
      .eq('id', cartId)
      .single();

    if (fetchError || !cartData) throw new Error('Cart not found');

    const updatedItems = [...cartData.items];
    const index = updatedItems.findIndex(i => i.product_id === productId);

    if (index === -1) throw new Error('Product not found in cart');

    updatedItems[index].quantity = quantity;

    const { data: updatedCart, error: updateError } = await supabase
      .from('carts')
      .update({ items: updatedItems, updated_at: new Date().toISOString() })
      .eq('id', cartId)
      .select()
      .single();

    if (updateError) throw new Error(updateError.message);
    return updatedCart;
  },

  async removeCartItem(cartId: string, productId: string): Promise<Cart> {
    const { data: cartData, error: fetchError } = await supabase
      .from('carts')
      .select('*')
      .eq('id', cartId)
      .single();

    if (fetchError || !cartData) throw new Error('Cart not found');

    const updatedItems = cartData.items.filter(
      (i: { product_id: string }) => i.product_id !== productId
    );

    const { data: updatedCart, error: updatedError } = await supabase
      .from('carts')
      .update({
        items: updatedItems,
        updated_at: new Date().toISOString(),
      })
      .eq('id', cartId)
      .select()
      .single();

    if (updatedError) throw new Error(updatedError.message);
    return updatedCart;
  },
};
