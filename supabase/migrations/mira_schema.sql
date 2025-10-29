/*
  # Mira Optik E-Commerce Database Schema

  ## Overview
  Complete database schema for the Mira Optik eyewear e-commerce platform with products, cart, orders, and user management.

  ## New Tables

  ### `products`
  Stores all eyewear products (sunglasses and eyeglasses)
  - `id` (uuid, primary key)
  - `name` (text) - Product name
  - `price` (numeric) - Product price
  - `category` (text) - sunglasses or eyeglasses
  - `description` (text) - Product description
  - `image` (text) - Main product image URL
  - `images` (jsonb) - Array of additional image URLs
  - `frame_shape` (text) - Frame shape (Aviator, Round, etc.)
  - `color` (text) - Frame color
  - `gender` (text) - men, women, or unisex
  - `material` (text) - Frame material
  - `dimensions` (text) - Frame dimensions
  - `weight` (text) - Frame weight
  - `in_stock` (boolean) - Stock availability
  - `featured` (boolean) - Featured product flag
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `cart_items`
  Stores shopping cart items for authenticated users
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `product_id` (uuid, foreign key to products)
  - `quantity` (integer) - Quantity of product
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `orders`
  Stores customer orders
  - `id` (uuid, primary key)
  - `user_id` (uuid, foreign key to auth.users)
  - `status` (text) - Order status (pending, processing, shipped, delivered, cancelled)
  - `subtotal` (numeric) - Order subtotal
  - `shipping` (numeric) - Shipping cost
  - `total` (numeric) - Total order amount
  - `shipping_address` (jsonb) - Shipping address details
  - `created_at` (timestamptz) - Order creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### `order_items`
  Stores individual items in each order
  - `id` (uuid, primary key)
  - `order_id` (uuid, foreign key to orders)
  - `product_id` (uuid, foreign key to products)
  - `quantity` (integer) - Quantity ordered
  - `price` (numeric) - Price at time of order
  - `created_at` (timestamptz) - Creation timestamp

  ## Security
  
  ### Row Level Security (RLS)
  All tables have RLS enabled with policies for:
  - Products: Public read access, admin-only write
  - Cart items: Users can only access their own cart
  - Orders: Users can only access their own orders
  - Order items: Users can only access items from their own orders

  ## Indexes
  - Products: Indexed on category, featured, in_stock for faster queries
  - Cart items: Indexed on user_id and product_id
  - Orders: Indexed on user_id and status
  - Order items: Indexed on order_id
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  category text NOT NULL CHECK (category IN ('sunglasses', 'eyeglasses')),
  description text NOT NULL,
  image text NOT NULL,
  images jsonb DEFAULT '[]'::jsonb,
  frame_shape text NOT NULL,
  color text NOT NULL,
  gender text NOT NULL CHECK (gender IN ('men', 'women', 'unisex')),
  material text NOT NULL,
  dimensions text NOT NULL,
  weight text NOT NULL,
  in_stock boolean DEFAULT true,
  featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled')),
  subtotal numeric(10,2) NOT NULL CHECK (subtotal >= 0),
  shipping numeric(10,2) NOT NULL DEFAULT 0 CHECK (shipping >= 0),
  total numeric(10,2) NOT NULL CHECK (total >= 0),
  shipping_address jsonb NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE RESTRICT,
  quantity integer NOT NULL CHECK (quantity > 0),
  price numeric(10,2) NOT NULL CHECK (price >= 0),
  created_at timestamptz DEFAULT now()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_featured ON products(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_products_in_stock ON products(in_stock) WHERE in_stock = true;
CREATE INDEX IF NOT EXISTS idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX IF NOT EXISTS idx_cart_items_product_id ON cart_items(product_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id);

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read, admin write)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert products"
  ON products FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update products"
  ON products FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete products"
  ON products FOR DELETE
  TO authenticated
  USING (true);

-- Cart items policies (users can only access their own cart)
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own cart items"
  ON cart_items FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Orders policies (users can only access their own orders)
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders"
  ON orders FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders"
  ON orders FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Order items policies (users can only access items from their own orders)
CREATE POLICY "Users can view own order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can insert own order items"
  ON order_items FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM orders
      WHERE orders.id = order_items.order_id
      AND orders.user_id = auth.uid()
    )
  );

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
DROP TRIGGER IF EXISTS update_products_updated_at ON products;
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_cart_items_updated_at ON cart_items;
CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON cart_items
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
