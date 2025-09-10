export type Product = {
  id?: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  image_url?: string;
  created_at?: string;
};

export type ProductId = string;

export type ProductUpdateData = Partial<Omit<Product, 'id' | 'created_at'>>;
