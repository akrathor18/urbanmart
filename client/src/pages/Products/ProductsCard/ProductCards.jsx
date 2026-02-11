import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWishlistStore } from "@/store/useWishlistStore";
import { addToCartAction } from "@/service/cart.action";
import { toggleWishlistAction } from "@/service/wishlist.action";
import { formatPrice } from "@/utils/formatPrice";

function ProductCard({ products }) {
  const navigate = useNavigate();
  const inStock = products.stock > 0;
  const { isWishlisted } = useWishlistStore();

  return (
    <div
      onClick={() => navigate(`/products/${products.id}`)}
      className="group relative cursor-pointer rounded-lg sm:rounded-xl lg:rounded-2xl 
                 border border-gray-200 bg-white overflow-hidden
                 transition-all duration-300 
                 hover:shadow-xl hover:-translate-y-1 hover:border-gray-300
                 active:scale-[0.98]"
    >
      {/* Wishlist Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlistAction(products);
        }}
        className={`absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-10 
                   p-1.5 sm:p-2 rounded-full shadow-lg backdrop-blur-sm
                   transition-all duration-300 active:scale-90
                   ${
                     isWishlisted(products.id)
                       ? "bg-red-500 text-white hover:bg-red-600 shadow-red-200"
                       : "bg-white/95 text-gray-700 hover:bg-white hover:text-red-500 hover:shadow-xl"
                   }`}
        aria-label={
          isWishlisted(products.id) ? "Remove from wishlist" : "Add to wishlist"
        }
      >
        <Heart
          className={`h-4 w-4 sm:h-5 sm:w-5 transition-transform ${
            isWishlisted(products.id) ? "fill-current scale-110" : ""
          }`}
        />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden bg-gray-50">
        <img
          loading="lazy"
          src={products.image || "/placeholder.svg"}
          alt={products.name}
          className="w-full h-full object-cover 
                     transition-transform duration-500 ease-out
                     group-hover:scale-110"
        />

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20 
                         flex items-center justify-center backdrop-blur-[2px]"
          >
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-semibold shadow-lg">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop Hover Add to Cart Button */}
        {inStock && (
          <div
            className="absolute inset-x-0 bottom-0 p-3 hidden sm:block
                       opacity-0 translate-y-2
                       transition-all duration-300 ease-out
                       group-hover:opacity-100 group-hover:translate-y-0"
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCartAction(products);
              }}
              className="w-full flex items-center justify-center gap-2
                         bg-gray-900 hover:bg-black text-white 
                         py-2.5 px-4 rounded-lg text-sm font-medium
                         shadow-lg backdrop-blur-sm
                         transition-all duration-300
                         hover:shadow-xl active:scale-95"
            >
              <ShoppingCart className="h-4 w-4" />
              <span>Add to Cart</span>
            </button>
          </div>
        )}

        {/* Discount Badge (if applicable) */}
        {products.originalPrice && products.originalPrice > products.price && (
          <div
            className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 
                         bg-red-500 text-white text-xs font-bold 
                         px-2 py-1 rounded-md shadow-md"
          >
            {Math.round(
              ((products.originalPrice - products.price) /
                products.originalPrice) *
                100,
            )}
            % OFF
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-3 sm:p-4">
        {/* Category */}
        {products.category?.name && (
          <p className="text-xs sm:text-sm text-gray-500 font-medium mb-1 uppercase tracking-wide">
            {products.category.name}
          </p>
        )}

        {/* Product Name */}
        <h3
          className="text-sm sm:text-base font-semibold text-gray-900 
                       line-clamp-2 mb-2 leading-snug min-h-[2.5rem] sm:min-h-[3rem]
                       group-hover:text-gray-700 transition-colors"
        >
          {products.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 sm:h-4 sm:w-4 transition-colors ${
                  i < Math.floor(products.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs sm:text-sm text-gray-600 font-medium">
            {products.rating}
          </span>
          <span className="text-xs sm:text-sm text-gray-400">
            ({products.review})
          </span>
        </div>

        {/* Price Section */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg sm:text-xl font-bold text-gray-900">
            {formatPrice(products.price)}
          </span>

          {products.originalPrice &&
            products.originalPrice > products.price && (
              <span className="text-sm sm:text-base text-gray-400 line-through font-medium">
                {formatPrice(products.originalPrice)}
              </span>
            )}
        </div>

        {/* Stock Indicator */}
        {inStock && products.stock <= 10 && (
          <div className="flex items-center gap-1.5 text-xs text-orange-600 font-medium mb-3">
            <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse"></div>
            <span>Only {products.stock} left</span>
          </div>
        )}

        {/* Mobile Add to Cart Button */}
        {inStock && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              addToCartAction(products);
            }}
            className="w-full flex items-center justify-center gap-2
                       bg-gray-900 hover:bg-black active:bg-gray-800 text-white 
                       py-2.5 px-4 rounded-lg text-sm font-medium
                       transition-all duration-300
                       shadow-sm hover:shadow-md active:scale-[0.98]
                       sm:hidden"
          >
            <ShoppingCart className="h-4 w-4" />
            <span>Add to Cart</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
