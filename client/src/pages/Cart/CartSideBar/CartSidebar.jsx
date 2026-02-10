import {
  ShoppingCart,
  X,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  ShoppingBag,
} from "lucide-react";
import { Link } from "react-router-dom";
import { formatPrice } from "@/utils/formatPrice.js";
import { useCartStore } from "@/store/useCartStore";
import {
  updateCartQtyAction,
  removeFromCartAction,
} from "@/service/cart.action";
import { useEffect } from "react";

export default function CartSidebar() {
  const { cart, isCartOpen, setIsCartOpen } = useCartStore();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    document.body.style.overflow = isCartOpen ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [isCartOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 transition-opacity duration-300
        ${isCartOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <aside
        className={`fixed right-0 top-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-2xl z-50
        transform transition-transform duration-300 ease-out
        ${isCartOpen ? "translate-x-0" : "translate-x-full"}
        flex flex-col`}
        aria-label="Shopping cart"
        role="dialog"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-900 rounded-xl">
              <ShoppingBag className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                Your Cart
              </h3>
              {cart.length > 0 && (
                <p className="text-xs sm:text-sm text-slate-500">
                  {itemCount} {itemCount === 1 ? "item" : "items"}
                </p>
              )}
            </div>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors group"
            aria-label="Close cart"
          >
            <X className="h-5 w-5 text-slate-600 group-hover:text-slate-900 transition-colors" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="h-10 w-10 sm:h-12 sm:w-12 text-slate-400" />
              </div>
              <h4 className="text-lg sm:text-xl font-semibold text-slate-900 mb-2">
                Your cart is empty
              </h4>
              <p className="text-slate-500 mb-6 text-sm sm:text-base">
                Add some items to get started
              </p>
              <Link
                to="/products"
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-all hover:shadow-lg active:scale-95 font-medium"
              >
                Start Shopping
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          ) : (
            <div className="space-y-3 sm:space-y-4">
              {cart.map((item) => {
                const isMax = item.quantity >= item.stock;
                const isMin = item.quantity <= 1;
                return (
                  <div
                    key={item.id}
                    className="flex items-start gap-3 sm:gap-4 bg-white p-3 sm:p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
                  >
                    {/* Product Image */}
                    <div className="relative flex-shrink-0">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg border border-slate-200"
                      />
                      {item.quantity > 1 && (
                        <div className="absolute -top-2 -right-2 bg-slate-900 text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg">
                          {item.quantity}
                        </div>
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-2 mb-1">
                        {item.name}
                      </h4>
                      <p className="text-slate-900 font-bold text-sm sm:text-base mb-3">
                        {formatPrice(item.price)}
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center bg-slate-100 rounded-lg p-1">
                          <button
                            disabled={isMin}
                            onClick={() =>
                              updateCartQtyAction(item.id, item.quantity - 1)
                            }
                            className="p-1.5 hover:bg-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-700" />
                          </button>
                          <span className="px-3 py-1 font-semibold text-slate-900 min-w-[2rem] text-center text-sm">
                            {item.quantity}
                          </span>
                          <button
                            disabled={isMax}
                            onClick={() =>
                              updateCartQtyAction(item.id, item.quantity + 1)
                            }
                            className="p-1.5 hover:bg-white rounded-md transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-slate-700" />
                          </button>
                        </div>

                        <div className="text-xs sm:text-sm text-slate-500 font-medium">
                          {formatPrice(item.price * item.quantity)}
                        </div>
                      </div>
                    </div>

                    {/* Remove Button */}
                    <button
                      onClick={() => removeFromCartAction(item.id)}
                      className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all flex-shrink-0 group/delete"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4 sm:h-4.5 sm:w-4.5 group-hover/delete:scale-110 transition-transform" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Footer */}
        {cart.length > 0 && (
          <div className="border-t border-slate-200 p-4 sm:p-6 bg-white">
            {/* Subtotal Breakdown */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center text-slate-600 text-sm">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-600 text-sm">
                <span>Shipping</span>
                <span className="font-medium text-green-600">Free</span>
              </div>
            </div>

            {/* Total */}
            <div className="flex justify-between items-center mb-4 pt-3 border-t border-slate-200">
              <span className="text-base sm:text-lg font-semibold text-slate-900">
                Total
              </span>
              <span className="text-xl sm:text-2xl font-bold text-slate-900">
                {formatPrice(total)}
              </span>
            </div>

            {/* Checkout Button */}
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="flex items-center justify-center gap-2 w-full bg-slate-900 text-white py-3 sm:py-3.5 rounded-xl font-semibold hover:bg-slate-800 transition-all hover:shadow-lg active:scale-[0.98] text-sm sm:text-base group"
            >
              Proceed to Checkout
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            {/* Continue Shopping Link */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="w-full text-center text-slate-600 hover:text-slate-900 text-sm font-medium mt-3 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
