export type CartItem = {
  product_id: string;
  quantity: number;
};

export type Cart = {
  id?: string;
  user_id: string;
  items: CartItem[];
  created_at?: string;
  updated_at?: string;
};
