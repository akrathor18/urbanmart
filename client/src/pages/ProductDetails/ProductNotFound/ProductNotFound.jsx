import { Link } from "react-router-dom";
import { SearchX, ArrowLeft, ShoppingBag } from "lucide-react";

export default function ProductNotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="h-20 w-20 rounded-full bg-red-100 flex items-center justify-center">
            <SearchX className="h-10 w-10 text-red-600" />
          </div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-2">
          Product not found
        </h2>
        <p className="text-gray-600 mb-6">
          The product you’re looking for doesn’t exist, is out of stock, or has
          been removed.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/products"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <ShoppingBag className="h-5 w-5" />
            Browse Products
          </Link>

          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}
