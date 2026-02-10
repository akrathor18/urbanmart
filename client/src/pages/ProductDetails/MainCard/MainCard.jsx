import { useWishlistStore } from "@/store/useWishlistStore";
import React, { useState } from "react";
import { formatPrice } from "@/utils/formatPrice";
import { toggleWishlistAction } from "@/service/wishlist.action";
import { updateCartQtyAction } from "@/service/cart.action";
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
import { toast } from "react-toastify";
function MainCard({ product }) {
  const updateQuantity = (productId, quantity) => {
    const success = updateCartQtyAction(productId, quantity);
    if (success) {
      toast.dismiss();
      toast.success("Added to cart");
    }
  };
  const inStock = product?.stock > 0 || 0;

  const { isWishlisted } = useWishlistStore();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  return (
    <div className="bg-white rounded-xl shadow-sm">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
        {/* Images */}
        <div>
          <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
            <img
              loading="lazy"
              src={product.images?.[selectedImage] || product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>

          {product.images?.length > 1 && (
            <div className="flex gap-2 overflow-x-auto">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 rounded-lg border-2 ${
                    selectedImage === i ? "border-blue-600" : "border-gray-200"
                  }`}
                >
                  <img src={img} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Info */}
        <div>
          <div className="flex justify-between mb-4">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleWishlistAction(product);
              }}
            >
              <Heart
                className={`h-6 w-6 ${isWishlisted(product.id) ? `text-red-400 fill-red-400` : `text-gray-400 `}`}
              />
            </button>
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-yellow-400 fill-current"
                    : "text-gray-300"
                }`}
              />
            ))}
            <span className="ml-2 text-gray-600">
              {product.rating} ({product.review} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-3xl font-bold">
              {formatPrice(product.price)}
            </span>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>
          {/* Features */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
              Key Features:
            </h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li
                  key={index}
                  className="flex items-center text-gray-600 text-sm sm:text-base"
                >
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3 flex-shrink-0"></div>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Stock Status */}
          <div className="mb-6">
            {inStock ? (
              <span className="text-green-600 font-medium text-sm sm:text-base">
                ✓ In Stock ({product.stock} available)
              </span>
            ) : (
              <span className="text-red-600 font-medium text-sm sm:text-base">
                ✗ Out of Stock
              </span>
            )}
          </div>
          {/* Quantity */}
          <div className="flex items-center gap-4 mb-8">
            <div className="flex border rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="px-4 py-2">{quantity}</span>
              <button
                onClick={() =>
                  setQuantity(Math.min(product.stock, quantity + 1))
                }
                className="p-2"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <button
              disabled={!inStock}
              onClick={() => updateQuantity(product.id, quantity)}
              className="bg-black text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:cursor-not-allowed disabled:bg-gray-400"
            >
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </button>
          </div>

          {/* Info */}
          <div className="grid grid-cols-3 gap-4 border-t pt-6 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="text-blue-600" />
              Free shipping
            </div>
            <div className="flex items-center gap-2">
              <Shield className="text-green-600" />
              Warranty
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="text-purple-600" />
              Easy returns
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainCard;
