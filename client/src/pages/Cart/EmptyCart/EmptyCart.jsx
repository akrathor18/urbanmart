import React from 'react'
import { ShoppingCart, ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

function EmptyCart() {
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
  )
}

export default EmptyCart