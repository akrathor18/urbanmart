import React from "react";
import { Star, Heart, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/store/useCartStore";
// import { useWishlistStore } from "@/store/useWishlistStore";

function ProductCard({ products }) {
  const navigate = useNavigate();
 const inStock = products.inStock;
  const { addToCart } = useCartStore();
  // const { toggleWishlist, isInWishlist } = useWishlistStore();

  return (
    <div
      onClick={() => navigate(`/products/${products.id}`)}
      className="group relative cursor-pointer rounded-2xl border bg-white p-3
                 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
    >
      {/* Wishlist */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          // toggleWishlist(products);
        }}
        className="absolute right-3 top-3 z-10 rounded-full bg-white p-2 shadow
                   transition hover:scale-110"
      >
        <Heart className="h-4 w-4 text-gray-600" />
        {/* filled version later */}
      </button>

      {/* Image */}
      <div className="relative overflow-hidden rounded-xl">
        <img
          loading="lazy"
          src={products.image || "/placeholder.svg"}
          alt={products.name}
          className="h-44 w-full object-cover transition-transform
                     duration-300 group-hover:scale-105 sm:h-52"
        />

         {!inStock && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <span className="rounded-lg bg-white px-4 py-2 text-sm font-semibold">
              Out of Stock
            </span>
          </div>
        )}

        {/* Desktop hover actions */}
        <div
          className="absolute inset-x-0 bottom-0 hidden gap-2 p-3
                     sm:flex opacity-0 translate-y-4
                     transition-all duration-300
                     group-hover:opacity-100 group-hover:translate-y-0"
        >
        {inStock &&(
            <button
            onClick={(e) => {
              e.stopPropagation();
              addToCart(products);
            }}
            className="flex w-full items-center justify-center gap-2
                       rounded-xl bg-black py-2 text-sm text-white"
          >
            <ShoppingCart className="h-4 w-4" />
            Add to Cart
          </button>
        )

        }
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 space-y-1">
        <h3 className="line-clamp-1 text-sm font-medium sm:text-base">
          {products.name}
        </h3>

        <p className="text-xs text-gray-500 sm:text-sm">
          {products.category?.name}
        </p>

        {/* Price */}
        <div className="mt-1 flex items-center gap-2">
          <span className="text-base font-semibold sm:text-lg">
            ₹{products.price}
          </span>

          {products.originalPrice && (
            <span className="text-xs text-gray-400 line-through sm:text-sm">
              ₹{products.originalPrice}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="mt-2 flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-3.5 w-3.5 ${
                i < Math.floor(products.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-1 text-xs text-gray-600 sm:text-sm">
            {products.rating} ({products.review})
          </span>
        </div>
      </div>

      {/* Mobile actions */}
      {inStock&&(
        <div className="mt-3 flex gap-2 sm:hidden">
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(products);
          }}
          className="flex w-full items-center justify-center gap-2
                     rounded-xl bg-black py-2 text-sm text-white"
        >
          <ShoppingCart className="h-4 w-4" />
          Add to Cart
        </button>
      </div>
      )}
    </div>
  );
}

export default ProductCard;
