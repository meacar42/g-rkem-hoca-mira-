import { productService } from '../services/productService';
import { products as localProducts } from '../data/products';

export async function seedProducts() {
  console.log('Starting product seed...');

  try {
    for (const product of localProducts) {
      await productService.createProduct({
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: product.image,
        images: product.images,
        frameShape: product.frameShape,
        color: product.color,
        gender: product.gender,
        material: product.material,
        dimensions: product.dimensions,
        weight: product.weight,
        inStock: product.inStock,
        featured: product.featured
      });
      console.log(`✓ Created product: ${product.name}`);
    }

    console.log('Product seed completed successfully!');
  } catch (error) {
    console.error('Error seeding products:', error);
  }
}
