import { ArrowLeft, Heart } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom'
function EmptyWishlist() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <Heart className="h-16 w-16 sm:h-20 sm:w-20 text-gray-400 mx-auto mb-6" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Your Wishlist is Empty
            </h1>
            <p className="text-gray-600 mb-8 text-sm sm:text-base">
              Save items you love by clicking the heart icon on any product.
            </p>
            <Link
              to="/products"
              className="inline-flex items-center bg-black text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm sm:text-base"
            >
              <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
  )
}

export default EmptyWishlist