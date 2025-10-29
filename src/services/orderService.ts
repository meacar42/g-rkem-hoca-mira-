// services/orderService.ts
import { CartItem } from '../types';

export interface Order {
  id: string;
  userId: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  subtotal: number;
  shipping: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  quantity: number;
  price: number;
  createdAt: string;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const orderService = {
  async createOrder(
    cartItems: CartItem[],
    shippingAddress: Order['shippingAddress']
  ): Promise<Order> {
    const res = await fetch(`${API_BASE}/orders/create/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cart_items: cartItems.map(item => ({
          product_id: item.product.id,
          quantity: item.quantity
        })),
        shipping_address: shippingAddress
      })
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create order');
    }

    const data: Order = await res.json();
    return data;
  },

  async getUserOrders(): Promise<Order[]> {
    const res = await fetch(`${API_BASE}/orders/`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data: Order[] = await res.json();
    return data;
  },

  async getOrderById(orderId: string): Promise<Order | null> {
    const res = await fetch(`${API_BASE}/orders/${orderId}/`);
    if (!res.ok) return null;
    const data: Order = await res.json();
    return data;
  },

  async getOrderItems(orderId: string): Promise<OrderItem[]> {
    const res = await fetch(`${API_BASE}/orders/${orderId}/items/`);
    if (!res.ok) throw new Error('Failed to fetch order items');
    const data: OrderItem[] = await res.json();
    return data;
  }
};
