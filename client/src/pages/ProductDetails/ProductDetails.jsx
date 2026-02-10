import { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ProductCards from "@/pages/Products/ProductsCard/ProductCards.jsx";
import ErrorState from "@/components/ErrorState";
import ProductNotFound from "./ProductNotFound/ProductNotFound";
import { useProductStore } from "@/store/useProductStore";
import MainCard from "./MainCard/MainCard";
import ProductDetailsSkeleton from "./SkeletonLoader/ProductDetailsSkeleton";
export default function ProductDetail() {
  const { id } = useParams();

  const product = useProductStore((state) => state.product); // selected product detail
  const relatedProducts = useProductStore((state) => state.relatedProducts); // selected related product detail
  const loadingProduct = useProductStore((state) => state.loadingProduct);
  const error = useProductStore((state) => state.error);
  const fetchProductById = useProductStore((state) => state.fetchProductById);

  useEffect(() => {
    fetchProductById(id);
  }, [id, fetchProductById]);

  // Loading state
  if (loadingProduct) {
    return <ProductDetailsSkeleton />;
  }

  if (!loadingProduct && !product) {
    return <ProductNotFound />;
  }

  if (error) return <ErrorState />;

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

        <MainCard product={product} />
        
        {/* Related products */}
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
