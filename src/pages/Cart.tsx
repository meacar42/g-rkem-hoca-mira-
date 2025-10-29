import { Link } from '../components/Link';
import Button from '../components/Button';
import { CartItem } from '../types';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

interface CartProps {
  cart: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
}

export default function Cart({ cart, onUpdateQuantity, onRemoveItem }: CartProps) {
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <ShoppingBag className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-black mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items yet.</p>
            <Link to="/">
              <Button size="lg">Start Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-black mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-6 flex flex-col sm:flex-row gap-6">
                    <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="text-lg font-semibold text-black">{item.product.name}</h3>
                          <p className="text-sm text-gray-500 capitalize">{item.product.category}</p>
                        </div>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-red-500 hover:text-red-600 p-2"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="text-lg font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-8 h-8 border border-gray-300 rounded-lg hover:bg-gray-100 flex items-center justify-center"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm text-gray-500">
                            ${item.product.price} each
                          </p>
                          <p className="text-xl font-bold text-emerald-500">
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Link to="/" className="inline-block mt-6 text-emerald-500 hover:text-emerald-600 font-medium">
              ← Continue Shopping
            </Link>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                </div>
                {subtotal < 100 && shipping > 0 && (
                  <p className="text-sm text-emerald-600 bg-emerald-50 p-3 rounded-lg">
                    Add ${(100 - subtotal).toFixed(2)} more for free shipping!
                  </p>
                )}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span className="text-emerald-500">${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Coupon Code
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter code"
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                  <Button variant="outline">Apply</Button>
                </div>
              </div>

              <Button size="lg" className="w-full">
                Proceed to Checkout
              </Button>

              <div className="mt-6 space-y-2 text-sm text-gray-600">
                <p className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  Secure checkout
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  30-day returns
                </p>
                <p className="flex items-center gap-2">
                  <span className="text-emerald-500">✓</span>
                  2-year warranty
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
