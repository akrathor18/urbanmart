import React from 'react'
import { Heart, ShoppingCart, X, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/useCartStore";
import { useWishlistStore } from "@/store/useWishlistStore";
import { Link } from 'react-router-dom';
import { formatPrice } from '@/utils/formatPrice';

function WishlistCard({item}) {
    const handleAddToCart = (product) => {
        addToCart(product);
    };
    const { addToCart } = useCartStore();
  const {removeWishlist } = useWishlistStore();

  return (
     <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative group">
                <Link to={`/products/${item.id}`}>
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                <button
                  onClick={() => removeWishlist(item.id)}
                  className="absolute top-3 right-3 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                >
                  <X className="h-4 w-4 text-gray-600" />
                </button>
                {item.originalPrice > item.price && (
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-semibold">
                    Sale
                  </div>
                )}
              </div>

              <div className="p-4 sm:p-6">
                <Link to={`/product/${item.id}`}>
                  <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors line-clamp-2">
                    {item.name}
                  </h3>
                </Link>

                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {item.description}
                </p>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2">
                    <span className="text-lg sm:text-xl font-bold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="flex-1 bg-black text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-900 transition-colors flex items-center justify-center text-sm sm:text-base"
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeWishlist(item.id)}
                    className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="h-4 w-4 text-red-500 fill-current" />
                  </button>
                </div>
              </div>
            </div>
  )
}

export default WishlistCard