import { useEffect } from "react";
import { useProductStore } from "../../store/useProductStore.js";
import ProductCardSkeleton from "../Home/loader/ProductCardSkeleton.jsx";
import ErrorState from "../../components/ErrorState.jsx";
import ProductCard from "./ProductsCard/ProductCards.jsx";

import { useCategoryStore } from "@/store/useCategoryStore";
export default function ProductsPage() {
  const { fetchProducts, products, loading, error } = useProductStore();
  const {fetchCategories, categories} = useCategoryStore()
  useEffect(() => {
    fetchCategories()
    fetchProducts();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-inter">
      <h1 className="text-3xl font-semibold mb-8">Shop Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* FILTER SIDEBAR */}
        <aside className="lg:col-span-1 border  lg:sticky lg:top-28 rounded-xl p-6 h-fit">
          <h2 className="text-lg font-medium mb-6">Filters</h2>

          {/* Category */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {console.log(categories)}
              {categories.map((items)=>( <label className="flex items-center gap-2">
                <input type="checkbox" />
                {items.name}
              </label>))}
            </div>
          </div>

          {/* Price */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <input type="range" className="w-full" />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹500</span>
              <span>₹10,000</span>
            </div>
          </div>

          {/* Rating */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Rating</h3>
            <div className="space-y-2 text-sm text-gray-600">
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                4★ & above
              </label>
              <label className="flex items-center gap-2">
                <input type="checkbox" />
                3★ & above
              </label>
            </div>
          </div>

          {/* Clear */}
          <button className="w-full py-2 border rounded-lg text-sm">
            Clear Filters
          </button>
        </aside>

        {/* PRODUCT GRID */}
        <section className="lg:col-span-3">
          {/* Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <p className="text-gray-500 text-sm">Showing {products.length} products</p>

            <select className="border rounded-lg px-3 py-2 text-sm w-fit">
              <option>Sort by: Popularity</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Newest</option>
            </select>
          </div>

          {/* Products */}
          {error && <ErrorState />}
          {loading && <ProductCardSkeleton />}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((i) => (
             <ProductCard key={i} products={i}/>
            ))}
          </div>

          {/* Pagination */}
          {/* <div className="flex justify-center gap-3 mt-10">
            <button className="w-9 h-9 border rounded-lg">1</button>
            <button className="w-9 h-9 border rounded-lg">2</button>
            <button className="w-9 h-9 border rounded-lg">3</button>
          </div> */}
        </section>
      </div>
    </div>
  );
}
