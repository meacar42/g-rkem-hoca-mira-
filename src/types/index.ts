export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'sunglasses' | 'eyeglasses';
  description: string;
  image: string;
  images: string[];
  frameShape: string;
  color: string;
  gender: 'men' | 'women' | 'unisex';
  material: string;
  dimensions: string;
  weight: string;
  inStock: boolean;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FilterOptions {
  category: string;
  frameShape: string;
  color: string;
  priceRange: string;
  gender: string;
}
