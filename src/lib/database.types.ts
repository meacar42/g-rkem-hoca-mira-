export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string
          name: string
          price: number
          category: 'sunglasses' | 'eyeglasses'
          description: string
          image: string
          images: Json
          frame_shape: string
          color: string
          gender: 'men' | 'women' | 'unisex'
          material: string
          dimensions: string
          weight: string
          in_stock: boolean
          featured: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          price: number
          category: 'sunglasses' | 'eyeglasses'
          description: string
          image: string
          images?: Json
          frame_shape: string
          color: string
          gender: 'men' | 'women' | 'unisex'
          material: string
          dimensions: string
          weight: string
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          price?: number
          category?: 'sunglasses' | 'eyeglasses'
          description?: string
          image?: string
          images?: Json
          frame_shape?: string
          color?: string
          gender?: 'men' | 'women' | 'unisex'
          material?: string
          dimensions?: string
          weight?: string
          in_stock?: boolean
          featured?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          created_at?: string
          updated_at?: string
        }
      }
      orders: {
        Row: {
          id: string
          user_id: string
          status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          shipping: number
          total: number
          shipping_address: Json
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal: number
          shipping: number
          total: number
          shipping_address: Json
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          status?: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
          subtotal?: number
          shipping?: number
          total?: number
          shipping_address?: Json
          created_at?: string
          updated_at?: string
        }
      }
      order_items: {
        Row: {
          id: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at: string
        }
        Insert: {
          id?: string
          order_id: string
          product_id: string
          quantity: number
          price: number
          created_at?: string
        }
        Update: {
          id?: string
          order_id?: string
          product_id?: string
          quantity?: number
          price?: number
          created_at?: string
        }
      }
    }
  }
}
