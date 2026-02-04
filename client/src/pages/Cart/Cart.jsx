import { useCartStore } from "@/store/useCartStore.js";
import { ShoppingCart, ArrowLeft, Trash2, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  /* ================= EMPTY CART ================= */
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <ShoppingCart className="mx-auto h-16 w-16 text-gray-400 mb-6" />
          <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Looks like you haven’t added anything yet.
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 rounded-lg bg-black px-6 py-3 text-white text-sm"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  /* ================= CART PAGE ================= */
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-6xl px-4 space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold">Shopping Cart</h1>

          <Link
            to="/products"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-black"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue shopping
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* ================= CART ITEMS ================= */}
          <div className="md:col-span-2 space-y-4">
            {cart.map((item) => {
              const isMax = item.quantity >= item.stock;
              const isMin = item.quantity <= 1;

              return (
                <div
                  key={item.id}
                  className="flex gap-4 rounded-xl bg-white p-4 shadow-sm"
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-24 w-24 rounded-lg object-cover"
                  />

                  {/* Info */}
                  <div className="flex-1 space-y-1">
                    <h3 className="font-medium line-clamp-1">{item.title}</h3>

                    {item.description && (
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item.description}
                      </p>
                    )}

                    <p className="text-sm text-gray-500">₹{item.price}</p>

                    {/* Quantity */}
                    <div className="mt-3 flex items-center gap-3">
                      <button
                        disabled={isMin}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className={`rounded-md border p-1 ${
                          isMin ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                      >
                        <Minus className="h-4 w-4" />
                      </button>

                      <span className="min-w-[24px] text-center text-sm">
                        {item.quantity}
                      </span>

                      <button
                        disabled={isMax}
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className={`rounded-md border p-1 ${
                          isMax ? "opacity-40 cursor-not-allowed" : ""
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    {/* Stock warning */}
                    {item.stock <= 5 && (
                      <p className="mt-1 text-xs text-orange-600">
                        Only {item.stock} left in stock
                      </p>
                    )}
                  </div>

                  {/* Price + Remove */}
                  <div className="flex flex-col items-end justify-between">
                    <p className="font-semibold">
                      ₹{item.price * item.quantity}
                    </p>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="h-fit rounded-xl bg-white p-5 shadow-sm md:sticky md:top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between border-t pt-3 font-semibold">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <Link to={'/checkout'}>
            <button className="mt-5 w-full rounded-xl bg-black py-3 text-white text-sm">
              Proceed to Checkout
            </button>
            </Link>

            {/* Continue Shopping (secondary) */}
            <Link
              to="/products"
              className="mt-3 block text-center text-sm text-gray-600 hover:text-black"
            >
              Continue shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
