import { supabase } from '../config/db';
import { Product, ProductId, ProductUpdateData } from '../types/product';

export const productService = {
  async create(data: Product): Promise<Product> {
    const { data: product, error } = await supabase
      .from('products')
      .insert([data])
      .select()
      .single();

    if (error) throw new Error(error.message);

    return product as Product;
  },

  async getAll(): Promise<Product[]> {
    const { data, error } = await supabase.from('products').select('*');

    if (error) throw new Error(error.message);
    return data as Product[];
  },

  async getById(id: ProductId): Promise<Product | null> {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data as Product;
  },

  async update(id: ProductId, updateData: ProductUpdateData): Promise<Product> {
    const { data, error } = await supabase
      .from('products')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Product;
  },

  async remove(id: ProductId): Promise<boolean> {
    const { error } = await supabase.from('products').delete().eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },
};
