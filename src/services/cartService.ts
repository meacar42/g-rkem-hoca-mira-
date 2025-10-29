// services/cartService.ts
import { Product } from '../types';

export interface CartItem {
  quantity: number;
  product: Product;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const cartService = {
  async getCartItems(): Promise<CartItem[]> {
    const res = await fetch(`${API_BASE}/cart/`);
    if (!res.ok) throw new Error('Failed to fetch cart items');
    const data: CartItem[] = await res.json();
    return data;
  },

  async addToCart(productId: string, quantity: number = 1): Promise<void> {
    const res = await fetch(`${API_BASE}/cart/add/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, quantity }),
      credentials: 'include'
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to add to cart');
    }
  },

  async updateQuantity(productId: string, delta: number): Promise<void> {
    const res = await fetch(`${API_BASE}/cart/update/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId, delta })
    });
    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to update cart item');
    }
  },

  async removeItem(productId: string): Promise<void> {
    const res = await fetch(`${API_BASE}/cart/remove/`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product_id: productId })
    });
    if (!res.ok) throw new Error('Failed to remove cart item');
  },

  async clearCart(): Promise<void> {
    const res = await fetch(`${API_BASE}/cart/clear/`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to clear cart');
  }
};
