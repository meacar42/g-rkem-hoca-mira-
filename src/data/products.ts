import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Classic Aviator Sunglasses',
    price: 89,
    category: 'sunglasses',
    description: 'Timeless aviator design with premium UV protection. Perfect for any face shape and style.',
    image: 'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/701877/pexels-photo-701877.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/46710/pexels-photo-46710.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Aviator',
    color: 'Gold/Brown',
    gender: 'unisex',
    material: 'Metal frame, gradient lenses',
    dimensions: '58-14-140 mm',
    weight: '28g',
    inStock: true,
    featured: true
  },
  {
    id: '2',
    name: 'Round Prescription Glasses',
    price: 129,
    category: 'eyeglasses',
    description: 'Sophisticated round frames with anti-reflective coating. Includes prescription lenses.',
    image: 'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1627639/pexels-photo-1627639.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/947885/pexels-photo-947885.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Round',
    color: 'Tortoise',
    gender: 'unisex',
    material: 'Acetate frame',
    dimensions: '48-20-145 mm',
    weight: '22g',
    inStock: true,
    featured: true
  },
  {
    id: '3',
    name: 'Cat-Eye Sunglasses',
    price: 79,
    category: 'sunglasses',
    description: 'Vintage-inspired cat-eye design with modern UV protection. Bold and stylish.',
    image: 'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1007023/pexels-photo-1007023.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Cat-Eye',
    color: 'Black',
    gender: 'women',
    material: 'Acetate frame',
    dimensions: '54-16-140 mm',
    weight: '25g',
    inStock: true,
    featured: false
  },
  {
    id: '4',
    name: 'Square Frame Eyeglasses',
    price: 119,
    category: 'eyeglasses',
    description: 'Modern square frames perfect for professional settings. Lightweight and comfortable.',
    image: 'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1629236/pexels-photo-1629236.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1674666/pexels-photo-1674666.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Square',
    color: 'Matte Black',
    gender: 'men',
    material: 'TR90 frame',
    dimensions: '52-18-145 mm',
    weight: '18g',
    inStock: true,
    featured: true
  },
  {
    id: '5',
    name: 'Sports Sunglasses',
    price: 99,
    category: 'sunglasses',
    description: 'High-performance sports sunglasses with polarized lenses and secure fit.',
    image: 'https://images.pexels.com/photos/1871012/pexels-photo-1871012.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/1871012/pexels-photo-1871012.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/163629/pexels-photo-163629.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Wrap',
    color: 'Blue/Silver',
    gender: 'unisex',
    material: 'Polycarbonate frame',
    dimensions: '70-12-130 mm',
    weight: '32g',
    inStock: true,
    featured: false
  },
  {
    id: '6',
    name: 'Blue Light Blocking Glasses',
    price: 149,
    category: 'eyeglasses',
    description: 'Advanced blue light filtering technology. Reduce eye strain from digital screens.',
    image: 'https://images.pexels.com/photos/5765827/pexels-photo-5765827.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/5765827/pexels-photo-5765827.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/6976934/pexels-photo-6976934.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Rectangle',
    color: 'Clear/Gold',
    gender: 'unisex',
    material: 'Metal and acetate',
    dimensions: '54-16-142 mm',
    weight: '24g',
    inStock: true,
    featured: true
  },
  {
    id: '7',
    name: 'Wayfarer Style Sunglasses',
    price: 85,
    category: 'sunglasses',
    description: 'Iconic wayfarer style updated for modern tastes. Classic never goes out of style.',
    image: 'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Wayfarer',
    color: 'Glossy Black',
    gender: 'unisex',
    material: 'Acetate frame',
    dimensions: '50-22-150 mm',
    weight: '26g',
    inStock: true,
    featured: false
  },
  {
    id: '8',
    name: 'Oversized Fashion Sunglasses',
    price: 95,
    category: 'sunglasses',
    description: 'Statement oversized frames for maximum style and sun protection.',
    image: 'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3651597/pexels-photo-3651597.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Oversized',
    color: 'Brown Tortoise',
    gender: 'women',
    material: 'Acetate frame',
    dimensions: '60-18-145 mm',
    weight: '30g',
    inStock: true,
    featured: false
  },
  {
    id: '9',
    name: 'Minimalist Metal Frames',
    price: 135,
    category: 'eyeglasses',
    description: 'Ultra-lightweight metal frames with minimalist design. Barely-there comfort.',
    image: 'https://images.pexels.com/photos/975668/pexels-photo-975668.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/975668/pexels-photo-975668.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Oval',
    color: 'Silver',
    gender: 'unisex',
    material: 'Titanium frame',
    dimensions: '50-19-140 mm',
    weight: '15g',
    inStock: true,
    featured: false
  },
  {
    id: '10',
    name: 'Retro Hexagon Frames',
    price: 115,
    category: 'eyeglasses',
    description: 'Unique hexagonal shape with vintage appeal. Stand out from the crowd.',
    image: 'https://images.pexels.com/photos/3966425/pexels-photo-3966425.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/3966425/pexels-photo-3966425.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Hexagon',
    color: 'Rose Gold',
    gender: 'women',
    material: 'Metal frame',
    dimensions: '52-18-140 mm',
    weight: '20g',
    inStock: true,
    featured: false
  },
  {
    id: '11',
    name: 'Polarized Driving Sunglasses',
    price: 105,
    category: 'sunglasses',
    description: 'Premium polarized lenses eliminate glare. Perfect for driving and outdoor activities.',
    image: 'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/343720/pexels-photo-343720.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Rectangular',
    color: 'Gunmetal',
    gender: 'men',
    material: 'Metal frame',
    dimensions: '62-14-135 mm',
    weight: '35g',
    inStock: true,
    featured: false
  },
  {
    id: '12',
    name: 'Browline Classic Frames',
    price: 125,
    category: 'eyeglasses',
    description: 'Timeless browline design combining metal and acetate. Intellectual and sophisticated.',
    image: 'https://images.pexels.com/photos/6976955/pexels-photo-6976955.jpeg?auto=compress&cs=tinysrgb&w=800',
    images: [
      'https://images.pexels.com/photos/6976955/pexels-photo-6976955.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    frameShape: 'Browline',
    color: 'Black/Gold',
    gender: 'unisex',
    material: 'Mixed materials',
    dimensions: '50-20-145 mm',
    weight: '27g',
    inStock: true,
    featured: false
  }
];
