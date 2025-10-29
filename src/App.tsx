import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import About from './pages/About';
import Contact from './pages/Contact';
import { useCart } from './hooks/useCart';
import { productService } from './services/productService';
import { Product } from './types';

type Route =
  | { path: 'home' }
  | { path: 'sunglasses' }
  | { path: 'eyeglasses' }
  | { path: 'product'; id: string }
  | { path: 'cart' }
  | { path: 'about' }
  | { path: 'contact' };

function App() {
  const { cart, addToCart, updateQuantity, removeItem, getTotalItems } = useCart();
  const [route, setRoute] = useState<Route>({ path: 'home' });
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  useEffect(() => {
    const handleRoute = () => {
      const path = window.location.pathname;

      if (path === '/' || path === '') {
        setRoute({ path: 'home' });
      } else if (path === '/sunglasses') {
        setRoute({ path: 'sunglasses' });
      } else if (path === '/eyeglasses') {
        setRoute({ path: 'eyeglasses' });
      } else if (path.startsWith('/product/')) {
        const id = path.split('/')[2];
        setRoute({ path: 'product', id });
      } else if (path === '/cart') {
        setRoute({ path: 'cart' });
      } else if (path === '/about') {
        setRoute({ path: 'about' });
      } else if (path === '/contact') {
        setRoute({ path: 'contact' });
      } else {
        setRoute({ path: 'home' });
      }
    };

    handleRoute();
    window.addEventListener('popstate', handleRoute);
    return () => window.removeEventListener('popstate', handleRoute);
  }, []);

  const renderPage = () => {
    if (loading) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading...</p>
          </div>
        </div>
      );
    }

    switch (route.path) {
      case 'home':
        return <Home products={products} onAddToCart={addToCart} />;
      case 'sunglasses':
        return <Catalog products={products} category="sunglasses" onAddToCart={addToCart} />;
      case 'eyeglasses':
        return <Catalog products={products} category="eyeglasses" onAddToCart={addToCart} />;
      case 'product': {
        const product = products.find(p => p.id === route.id);
        return product ? (
          <ProductDetail product={product} onAddToCart={addToCart} />
        ) : (
          <div className="min-h-screen flex items-center justify-center">
            <p className="text-2xl text-gray-500">Product not found</p>
          </div>
        );
      }
      case 'cart':
        return <Cart cart={cart} onUpdateQuantity={updateQuantity} onRemoveItem={removeItem} />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home products={products} onAddToCart={addToCart} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header cartItemCount={getTotalItems()} />
      <main className="flex-1">{renderPage()}</main>
      <Footer />
    </div>
  );
}

export default App;
