import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Star,
  Heart,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ArrowLeft,
  Plus,
  Minus,
} from "lucide-react";

import { useProductStore } from "@/store/useProductStore";
import ProductCard from "@/components/ProductCard";
import { formatPrice } from "@/utils/currency";

export default function ProductDetail() {
  const { id } = useParams();

  const {
    product,
    products,
    loading,
    fetchProductById,
  } = useProductStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  // Loading state
  if (loading || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  // Related products (safe category comparison)
  const relatedProducts = products
    ?.filter(
      (p) =>
        p.category?.id === product.category?.id &&
        p.id !== product.id
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-gray-900">Home</Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-gray-900">Products</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        {/* Back */}
        <Link to="/products" className="inline-flex items-center text-blue-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            
            {/* Images */}
            <div>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-4">
                <img
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
                        selectedImage === i
                          ? "border-blue-600"
                          : "border-gray-200"
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
                <Heart className="h-6 w-6 text-gray-400" />
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
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice > product.price && (
                  <span className="line-through text-gray-500">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>

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
                  disabled={!product.inStock}
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg flex items-center gap-2 disabled:bg-gray-400"
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

        {/* Related */}
        {relatedProducts?.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
