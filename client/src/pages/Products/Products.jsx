import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductStore } from "../../store/useProductStore.js";
import { useCategoryStore } from "@/store/useCategoryStore";
import ProductCardSkeleton from "../Home/loader/ProductCardSkeleton.jsx";
import ErrorState from "../../components/ErrorState.jsx";
import ProductCard from "./ProductsCard/ProductCards.jsx";
import NoProductsFound from "@/components/NoProductsFound.jsx";

export default function ProductsPage() {
  const { fetchProducts, products, loadingProducts, error } = useProductStore();
  const { fetchCategories, categories } = useCategoryStore();

  const [searchParams, setSearchParams] = useSearchParams();

  const category = searchParams.get("category");
  const maxPrice = Number(searchParams.get("maxPrice") || 10000);
  const sort = searchParams.get("sort") || "popularity";

  const [priceValue, setPriceValue] = useState(maxPrice);
  const debouncedPrice = useDebounce(priceValue, 500);
  useEffect(() => {
    if (debouncedPrice !== maxPrice) {
      const params = new URLSearchParams(searchParams);
      params.set("maxPrice", debouncedPrice);
      params.set("page", 1);
      setSearchParams(params);
    }
  }, [debouncedPrice]);

  useEffect(() => {
    fetchCategories();

    const params = Object.fromEntries(searchParams.entries());

    fetchProducts(Object.keys(params).length > 0 ? params : undefined, {
      skipCache: true,
    });
  }, [searchParams]);

  const updateParams = (key, value) => {
    const params = new URLSearchParams(searchParams);

    if (!value) params.delete(key);
    else params.set(key, value);

    params.set("page", 1);
    setSearchParams(params);
  };

  const clearFilters = () => {
    setSearchParams();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-inter">
      <h1 className="text-3xl font-semibold mb-8">Shop Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* FILTER SIDEBAR */}
        <aside className="lg:col-span-1 border lg:sticky lg:top-28 rounded-xl p-6 h-fit">
          <h2 className="text-lg font-medium mb-6">Filters</h2>

          {/* CATEGORY */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Category</h3>
            <div className="space-y-2 text-sm text-gray-600">
              {categories.map((item) => (
                <label key={item.name} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={category === item.name}
                    onChange={() =>
                      updateParams(
                        "category",
                        category === item.name ? null : item.name,
                      )
                    }
                  />
                  {item.name}
                </label>
              ))}
            </div>
          </div>

          {/* PRICE */}
          <div className="mb-6">
            <h3 className="font-medium mb-3">Price Range</h3>
            <input
              type="range"
              min={500}
              max={10000}
              value={priceValue}
              onChange={(e) => setPriceValue(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>₹500</span>
              <span>₹{maxPrice}</span>
            </div>
          </div>

          {/* CLEAR */}
          <button
            onClick={clearFilters}
            className="w-full py-2 border rounded-lg text-sm"
          >
            Clear Filters
          </button>
        </aside>

        {/* PRODUCT GRID */}
        <section className="lg:col-span-3">
          {/* TOP BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <p className="text-gray-500 text-sm">
              Showing {products.length} products
            </p>

            <select
              value={sort}
              onChange={(e) => updateParams("sort", e.target.value)}
              className="border rounded-lg px-3 py-2 text-sm w-fit"
            >
              <option value="popularity">Sort by: Popularity</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
              <option value="newest">Newest</option>
            </select>
          </div>

          {/* PRODUCTS */}
          {error && <ErrorState />}
          {loadingProducts && <ProductCardSkeleton />}

          {!loadingProducts && !products.length && <NoProductsFound />}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {products.map((item) => (
              <ProductCard key={item.id} products={item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
