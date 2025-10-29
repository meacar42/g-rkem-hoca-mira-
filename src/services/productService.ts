// services/productService.ts
import { Product } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products/`);
    if (!res.ok) throw new Error('Failed to fetch products');
    const data: Product[] = await res.json();
    return data;
  },

  async getProductById(id: number): Promise<Product | null> {
    const res = await fetch(`${API_BASE}/products/${id}/`);
    if (!res.ok) return null;
    const data: Product = await res.json();
    return data;
  },

  async getProductsByCategory(category: 'sunglasses' | 'eyeglasses'): Promise<Product[]> {
    const res = await fetch(`${API_BASE}/products/?category=${category}`);
    if (!res.ok) throw new Error('Failed to fetch products by category');
    const data: Product[] = await res.json();
    return data;
  },

  async createProduct(product: Omit<Product, 'id'>): Promise<Product> {
    const res = await fetch(`${API_BASE}/products/create/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Failed to create product');
    }

    const data: Product = await res.json();
    return data;
  }
};
