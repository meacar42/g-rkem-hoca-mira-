// hooks/useCart.ts
import { useState, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Kullanıcıyı kontrol et ve cart yükle
  useEffect(() => {
    const checkUser = async () => {
      const user = await authService.getCurrentUser();
      setUserId(user?.id || null);

      if (user) {
        await loadCart();
      } else {
        const savedCart = localStorage.getItem('miraOptikCart');
        if (savedCart) setCart(JSON.parse(savedCart));
      }
    };

    checkUser();

    const unsubscribe = authService.onAuthStateChange(async (user) => {
      setUserId(user?.id || null);
      if (user) {
        await loadCart();
      } else {
        setCart([]);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  // LocalStorage güncelleme
  useEffect(() => {
    if (!userId) {
      localStorage.setItem('miraOptikCart', JSON.stringify(cart));
    }
  }, [cart, userId]);

  // Cart yükleme
  const loadCart = async () => {
    if (!userId) return;
    try {
      setLoading(true);
      const items = await cartService.getCartItems();
      setCart(items);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product: Product) => {
    if (userId) {
      try {
        setLoading(true);
        await cartService.addToCart(product.id);
        await loadCart();
      } catch (error) {
        console.error('Error adding to cart:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart(prevCart => {
        const existingItem = prevCart.find(item => item.product.id === product.id);
        if (existingItem) {
          return prevCart.map(item =>
            item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { product, quantity: 1 }];
      });
    }
  };

  const updateQuantity = async (productId: string, delta: number) => {
    if (userId) {
      try {
        setLoading(true);
        await cartService.updateQuantity(productId, delta);
        await loadCart();
      } catch (error) {
        console.error('Error updating quantity:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart(prevCart =>
        prevCart
          .map(item => {
            if (item.product.id === productId) {
              const newQuantity = item.quantity + delta;
              return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
            }
            return item;
          })
          .filter((item): item is CartItem => item !== null)
      );
    }
  };

  const removeItem = async (productId: string) => {
    if (userId) {
      try {
        setLoading(true);
        await cartService.removeItem(productId);
        await loadCart();
      } catch (error) {
        console.error('Error removing item:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    }
  };

  const clearCart = async () => {
    if (userId) {
      try {
        setLoading(true);
        await cartService.clearCart();
        await loadCart();
      } catch (error) {
        console.error('Error clearing cart:', error);
      } finally {
        setLoading(false);
      }
    } else {
      setCart([]);
    }
  };

  const getTotalItems = () => cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    getTotalItems,
    loading,
    userId
  };
}
