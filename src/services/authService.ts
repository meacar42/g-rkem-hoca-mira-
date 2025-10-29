// services/authService.ts
export interface User {
  id: string;
  username: string;
  email: string;
}

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

type AuthCallback = (user: User | null) => void;

let currentUser: User | null = null;
let listeners: AuthCallback[] = [];

export const authService = {
  async signUp(email: string, password: string, username?: string): Promise<User> {
    const res = await fetch(`${API_BASE}/register/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, username }),
      credentials: 'include'
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Sign up failed');
    }

    const user = await res.json();
    currentUser = user;
    listeners.forEach(cb => cb(currentUser));
    return user;
  },

  async signIn(email: string, password: string): Promise<User> {
    const res = await fetch(`${API_BASE}/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
      credentials: 'include'
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.detail || 'Sign in failed');
    }

    const data = await res.json();
    currentUser = data.user;
    listeners.forEach(cb => cb(currentUser));
    return currentUser;
  },

  async signOut(): Promise<void> {
    await fetch(`${API_BASE}/logout/`, { method: 'POST', credentials: 'include' });
    currentUser = null;
    listeners.forEach(cb => cb(currentUser));
  },

  async getCurrentUser(): Promise<User | null> {
    const res = await fetch(`${API_BASE}/me/`, { credentials: 'include' });
    if (!res.ok) {
      currentUser = null;
    } else {
      currentUser = await res.json();
    }
    return currentUser;
  },

  onAuthStateChange(callback: AuthCallback) {
    listeners.push(callback);

    // İlk çağrı
    callback(currentUser);

    // Cleanup fonksiyonu
    return () => {
      listeners = listeners.filter(cb => cb !== callback);
    };
  }
};
