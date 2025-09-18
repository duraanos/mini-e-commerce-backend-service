export type CartItem = {
  productId: string;
  quantity: number;
};

export type Cart = {
  id?: string;
  user_id: string;
  items: CartItem[];
  created_at?: string;
  updated_at?: string;
};

export type AddCartItemInput = {
  productId: string;
  price: number;
  quantity: number;
};
