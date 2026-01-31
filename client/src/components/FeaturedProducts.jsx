import { Link } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";

export default function FeaturedProducts() {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Featured Products
            </h2>
            <p className="text-gray-600 mt-1">
              Handpicked items just for you
            </p>
          </div>

          <Link to="/products" className="hidden sm:block">
            <Button variant="outline">
              View All
            </Button>
          </Link>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <ProductCard key={i} />
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-8 flex justify-center sm:hidden">
          <Link to="/products">
            <Button>
              View All Products
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
