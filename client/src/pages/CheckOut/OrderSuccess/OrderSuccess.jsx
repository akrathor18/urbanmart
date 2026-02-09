import { useNavigate } from "react-router-dom";
import { Shield, Truck, Banknote } from "lucide-react";

export default function OrderSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-sm p-6 sm:p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="h-8 w-8 text-green-600" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">
          Order Placed Successfully!
        </h1>

        {/* Message */}
        <p className="text-gray-600 mb-6 text-sm sm:text-base">
          Thank you for your purchase. Your order has been confirmed and will be
          processed shortly.
        </p>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={() => navigate("/products")}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Continue Shopping
          </button>

          <button
            onClick={() => navigate("/account/orders")}
            className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            View Order History
          </button>
        </div>

        {/* Trust badges */}
        <div className="mt-6 space-y-2 text-xs sm:text-sm text-gray-600">
          <div className="flex items-center justify-center gap-2">
            <Truck className="h-4 w-4 text-blue-600" />
            Free delivery within 5–7 days
          </div>
          <div className="flex items-center justify-center gap-2">
            <Banknote className="h-4 w-4 text-green-600" />
            Pay on delivery available
          </div>
        </div>
      </div>
    </div>
  );
}
