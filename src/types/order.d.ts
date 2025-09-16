export type OrderStatus = 'pending' | 'paid' | 'cancelled';

export type OrderItem = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type Order = {
  id?: string;
  userId: string;
  cartId: string;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt?: string;
};

export type CreateOrderInput = {
  userId: string;
  cartId: string;
};

export type OrderUpdateData = Partial<
  Omit<Order, 'id' | 'userId' | 'cartId' | 'createAt'>
>;
