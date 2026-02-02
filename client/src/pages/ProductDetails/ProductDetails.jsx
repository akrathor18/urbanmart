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
import ProductCards from "@/pages/Products/ProductsCard/ProductCards.jsx";
import ErrorState from "@/components/ErrorState";
import ProductNotFound from "./ProductNotFound/ProductNotFound";
import { useCartStore } from "@/store/useCartStore";
export default function ProductDetail() {
  const { id } = useParams();
  const fetchProducts = useProductStore((state) => state.fetchProducts);
  const product = useProductStore((state) => state.product);
  const products = useProductStore((state) => state.products);
  const loadingProduct = useProductStore((state) => state.loadingProduct);
  const error = useProductStore((state) => state.error);
  const fetchProductById = useProductStore((state) => state.fetchProductById);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
const {addToCart}= useCartStore()
  useEffect(() => {
    fetchProducts();
    fetchProductById(id);
  }, [id, fetchProductById]);

  // Loading state
  if (loadingProduct) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading product...</p>
      </div>
    );
  }

  if(!loadingProduct &&!product){
    return <ProductNotFound/>
  }

  if (error) return <ErrorState />;

  // Related products (safe category comparison)
  const relatedProducts = products
    ?.filter(
      (p) => p.category?.id === product.category?.id && p.id !== product.id,
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-gray-900">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link to="/products" className="hover:text-gray-900">
            Products
          </Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 truncate">{product.name}</span>
        </div>

        {/* Back */}
        <Link
          to="/products"
          className="inline-flex items-center text-blue-600 mb-6"
        >
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
                  {product.rating} ({product.review} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold">{product.price}</span>
              </div>

              {/* Description */}
              <p className="text-gray-600 mb-6">{product.description}</p>
              {/* Features */}
              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">
                  Key Features:
                </h3>
                {console.log(product)}
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
                {product.inStock ? (
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
                  disabled={!product.inStock}
                  onClick={()=>(addToCart(product))}
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
                <ProductCards key={p.id} products={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
