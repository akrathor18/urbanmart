import React from "react";
import { X, Plus, Minus, Heart } from "lucide-react";

import { useWishlistStore } from "@/store/useWishlistStore";
import { Link } from "react-router-dom";

function CardCard({ item, isMax, isMin, updateQuantity, removeFromCart, formatPrice }) {
  const { toggleWishlist, isWishlisted } = useWishlistStore();

  
  const wishlisted = isWishlisted(item.product.id);
  return (
    <div key={item.cartId} className="p-4 sm:p-6">
      {console.log(item)}
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Product Image */}
        <div className="flex-shrink-0">
          <Link to={`/products/${item.product.id}`}>
            <img
              loading="lazy"
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              className="w-full sm:w-24 h-48 sm:h-24 object-cover rounded-lg hover:opacity-75 transition-opacity"
            />
          </Link>
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <Link to={`/products/${item.product.id}`}>
            <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
              {item.product.name}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm sm:text-base mb-2 line-clamp-2">
            {item.product.description}
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-lg sm:text-xl font-bold text-gray-900">
              {formatPrice(item.product.price)}
            </span>
            {item.product.originalPrice > item.price && (
              <span className="text-sm sm:text-base text-gray-500 line-through">
                {formatPrice(item.product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              disabled={isMin}
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 min-w-[3rem] text-center font-medium">
              {item.quantity}
            </span>
            <button
              disabled={isMax}
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-2 hover:bg-gray-100 transition-colors"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleWishlist(item)}
              className={`p-2 transition-colors ${
                wishlisted ? "text-red-500" : "text-gray-400 hover:text-red-500"
              }`}
              title="Move to Wishlist"
            >
              <Heart
                className={`h-5 w-5 ${wishlisted ? "fill-red-500" : ""}`}
              />
            </button>

            <button
              onClick={() => removeFromCart(item.product.id)}
              className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              title="Remove from Cart"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Total */}
      <div className="mt-4 sm:hidden">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-600">Subtotal:</span>
          <span className="text-lg font-bold text-gray-900">
            {formatPrice(item.product.price * item.quantity)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CardCard;
