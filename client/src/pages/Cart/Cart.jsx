import { useCartStore } from "@/store/useCartStore.js";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/formatPrice";

import EmptyCart from "./EmptyCart/EmptyCart";
import CardCard from "./Cartcards/CardCard";

import { removeFromCartAction, updateCartQtyAction } from "@/service/cart.action";
export default function Cart() {
  const { cart } = useCartStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

 
  if (cart.length === 0) {
    return <EmptyCart />;
  }

  /* ================= CART PAGE ================= */
  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="mx-auto max-w-6xl px-4 space-y-4">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Shopping Cart</h1>
            <p className="text-gray-600 mt-1 text-sm sm:text-base">
              {cart.length} item{cart.length !== 1 ? "s" : ""} in your cart
            </p>
          </div>
          <Link to="/products" className="flex gap-2 text-black hover:gray-blue-700 font-medium text-sm sm:text-base">
           <ArrowLeft/> Continue Shopping
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* ================= CART ITEMS ================= */}
          <div className="md:col-span-2 space-y-4 bg-white rounded-2xl">
            {cart.map((item) => {
              const isMax = item.quantity >= item.stock;
              const isMin = item.quantity <= 1;

              return (
              <>
                <CardCard
                key={item.id}
                  item={item}
                  isMin={isMin}
                  isMax={isMax}
                  updateQuantity={updateCartQtyAction}
                  removeFromCart={removeFromCartAction}
                  formatPrice={formatPrice}
                />

                <hr />
              </>
              );
            })}
          </div>

          {/* ================= SUMMARY ================= */}
          <div className="h-fit rounded-xl bg-white p-5 shadow-sm md:sticky md:top-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Subtotal</span>
              <span>{formatPrice(total)}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>Delivery</span>
              <span className="text-green-600">Free</span>
            </div>

            <div className="flex justify-between border-t pt-3 font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>

            <Link to={"/checkout"}>
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
