// pages/Cart.jsx
import { useCartStore } from "@/store/useCartStore.js";
import { ShoppingCart, ArrowLeft  } from "lucide-react";
import { Link } from "react-router-dom";


export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cart.length === 0) {
    return (
        <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <ShoppingCart className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mx-auto mb-6" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-blue-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex gap-4 border rounded-lg p-4"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-24 h-24 object-cover rounded"
            />

            <div className="flex-1">
              <h3 className="font-semibold">{item.title}</h3>
              <p className="text-sm text-muted-foreground">
                ₹{item.price}
              </p>

              <div className="flex items-center gap-2 mt-2">
                <button
                  onClick={() =>
                    updateQuantity(
                      item.id,
                      Math.max(1, item.quantity - 1)
                    )
                  }
                  className="px-2 border rounded"
                >
                  −
                </button>

                <span>{item.quantity}</span>

                <button
                  onClick={() =>
                    updateQuantity(item.id, item.quantity + 1)
                  }
                  className="px-2 border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col items-end">
              <p className="font-semibold">
                ₹{item.price * item.quantity}
              </p>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-sm text-red-500 mt-2"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="border rounded-lg p-4 h-fit">
        <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

        <div className="flex justify-between mb-2">
          <span>Total</span>
          <span className="font-semibold">₹{total}</span>
        </div>

        <button className="w-full mt-4 bg-black text-white py-2 rounded">
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
}
