import { useWishlistStore } from "@/store/useWishlistStore";
import React, { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { toggleWishlistAction } from "@/service/wishlist.action";
import { addToCartAction } from "@/service/cart.action";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  Plus,
  Minus,
} from "lucide-react";

function MainCard({ product }) {
  const handleAddToCart = () => {
    addToCartAction(product, quantity);
  };
  
  const inStock = product?.stock > 0 || 0;
  const { isWishlisted } = useWishlistStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="bg-white rounded-lg sm:rounded-xl shadow-sm overflow-hidden">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 p-4 sm:p-6">
        {/* Images Section */}
        <div className="space-y-3 sm:space-y-4">
          {/* Main Image */}
          <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden group">
            <img
              loading="lazy"
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Wishlist Button - Absolute positioned for better mobile UX */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlistAction(product);
              }}
              className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md hover:bg-white transition-all active:scale-95 lg:hidden"
              aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${
                  isWishlisted(product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-600"
                }`}
              />
            </button>
          </div>

          {/* Thumbnail Images */}
          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-md sm:rounded-lg border-2 transition-all overflow-hidden ${
                    selectedImage === i
                      ? "border-blue-600 shadow-md"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  aria-label={`View image ${i + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.name} - view ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Section */}
        <div className="flex flex-col">
          {/* Header with Title and Wishlist */}
          <div className="flex justify-between items-start gap-3 mb-3 sm:mb-4">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
              {product.name}
            </h1>
            {/* Desktop Wishlist Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlistAction(product);
              }}
              className="hidden lg:flex flex-shrink-0 p-2 hover:bg-gray-50 rounded-full transition-colors active:scale-95"
              aria-label={isWishlisted(product.id) ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart
                className={`h-6 w-6 transition-colors ${
                  isWishlisted(product.id)
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400 hover:text-red-500"
                }`}
              />
            </button>
          </div>

          {/* Rating */}
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 sm:h-5 sm:w-5 ${
                    i < Math.floor(product.rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm sm:text-base text-gray-600">
              {product.rating} <span className="text-gray-400">({product.review} reviews)</span>
            </span>
          </div>

          {/* Price and Stock */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-gray-200">
            <span className="text-2xl sm:text-3xl font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            
            {/* Stock Status */}
            {inStock ? (
              <span className="inline-flex items-center gap-1.5 text-sm sm:text-base text-green-600 font-medium bg-green-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-sm sm:text-base text-red-600 font-medium bg-red-50 px-3 py-1.5 rounded-full">
                <span className="w-2 h-2 bg-red-600 rounded-full"></span>
                Out of Stock
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed mb-4 sm:mb-6">
            {product.description}
          </p>

          {/* Key Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
              Key Features:
            </h3>
            <ul className="space-y-2.5">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-start text-gray-600 text-sm sm:text-base"
                >
                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-600 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                  <span className="leading-relaxed">{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Quantity and Add to Cart */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8">
            {/* Quantity Selector */}
            <div className="flex items-center justify-evenly border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
                className="p-3 sm:p-3.5 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </button>
              <span className="px-4 sm:px-6 py-3 sm:py-3.5 font-medium text-gray-900 min-w-[60px] text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                disabled={!inStock || quantity >= product.stock}
                className="p-3 sm:p-3.5 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <button
              disabled={!inStock}
              onClick={handleAddToCart}
              className="flex-1 sm:flex-initial bg-gray-900 hover:bg-gray-800 active:bg-black text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg flex items-center justify-center gap-2.5 font-medium transition-all disabled:bg-gray-300 disabled:cursor-not-allowed disabled:text-gray-500 shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Add to Cart</span>
            </button>
          </div>

          {/* Product Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 border-t border-gray-200">
            <div className="flex items-center gap-2.5 text-sm sm:text-base p-3 sm:p-0 bg-blue-50 sm:bg-transparent rounded-lg sm:rounded-none">
              <Truck className="h-5 w-5 text-blue-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium sm:font-normal">Free Shipping</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm sm:text-base p-3 sm:p-0 bg-green-50 sm:bg-transparent rounded-lg sm:rounded-none">
              <Shield className="h-5 w-5 text-green-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium sm:font-normal">Warranty</span>
            </div>
            <div className="flex items-center gap-2.5 text-sm sm:text-base p-3 sm:p-0 bg-purple-50 sm:bg-transparent rounded-lg sm:rounded-none">
              <RotateCcw className="h-5 w-5 text-purple-600 flex-shrink-0" />
              <span className="text-gray-700 font-medium sm:font-normal">Easy Returns</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCard;