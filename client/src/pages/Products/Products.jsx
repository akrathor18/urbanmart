import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "@/hooks/useDebounce";
import { useProductStore } from "../../store/useProductStore.js";
import { useCategoryStore } from "@/store/useCategoryStore";
import ProductCardSkeleton from "../Home/loader/ProductCardSkeleton.jsx";
import ErrorState from "../../components/ErrorState.jsx";
import ProductCard from "./ProductsCard/ProductCards.jsx";
import NoProductsFound from "@/components/NoProductsFound.jsx";
import { X, SlidersHorizontal, IndianRupee } from "lucide-react";
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
        <aside className="lg:col-span-1 border border-slate-200 lg:sticky lg:top-28 rounded-2xl p-5 sm:p-6 h-fit bg-white shadow-sm hover:shadow-md transition-shadow">
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-slate-100 rounded-lg">
                <SlidersHorizontal className="w-4 h-4 text-slate-700" />
              </div>
              <h2 className="text-lg font-semibold text-slate-900">Filters</h2>
            </div>
            <button
              onClick={clearFilters}
              className="text-xs font-medium text-slate-500 hover:text-slate-900 transition-colors flex items-center gap-1 group"
              title="Clear all filters"
            >
              <X className="w-3.5 h-3.5 group-hover:rotate-90 transition-transform" />
              <span className="hidden sm:inline">Clear</span>
            </button>
          </div>

          {/* CATEGORY */}
          <div className="mb-8">
            <h3 className="font-semibold text-slate-900 mb-4 text-sm uppercase tracking-wide">
              Category
            </h3>
            <div className="space-y-2.5">
              {categories.map((item) => {
                const isChecked = category === item.name;
                return (
                  <label
                    key={item.name}   
                    className="flex items-center gap-3 cursor-pointer group hover:bg-slate-50 p-2 rounded-lg transition-colors"
                  >
                    <div className="relative">
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() =>
                          updateParams(
                            "category",
                            category === item.name ? null : item.name,
                          )
                        }
                        className="w-4 h-4 rounded border-slate-300 text-slate-900 focus:ring-2 focus:ring-slate-900 focus:ring-offset-0 cursor-pointer transition-all"
                      />
                    </div>
                    <span
                      className={`text-sm flex-1 transition-colors ${
                        isChecked
                          ? "text-slate-900 font-medium"
                          : "text-slate-600 group-hover:text-slate-900"
                      }`}
                    >
                      {item.name}
                    </span>
                    {item.count && (
                      <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">
                        {item.count}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </div>

          {/* PRICE RANGE */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-slate-900 text-sm uppercase tracking-wide">
                Price Range
              </h3>
              <div className="flex items-center gap-1 text-slate-900 font-semibold text-sm bg-slate-100 px-2.5 py-1 rounded-lg">
                <IndianRupee className="w-3.5 h-3.5" />
                <span>{priceValue.toLocaleString("en-IN")}</span>
              </div>
            </div>

            {/* Custom Range Slider */}
            <div className="relative pt-2 pb-4">
              <input
                type="range"
                min={500}
                max={10000}
                value={priceValue}
                onChange={(e) => setPriceValue(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-5
              [&::-webkit-slider-thumb]:h-5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-slate-900
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:shadow-md
              [&::-webkit-slider-thumb]:hover:scale-110
              [&::-webkit-slider-thumb]:transition-transform
              [&::-webkit-slider-thumb]:border-2
              [&::-webkit-slider-thumb]:border-white
              [&::-moz-range-thumb]:w-5
              [&::-moz-range-thumb]:h-5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-slate-900
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:shadow-md
              [&::-moz-range-thumb]:hover:scale-110
              [&::-moz-range-thumb]:transition-transform
              [&::-moz-range-thumb]:border-2
              [&::-moz-range-thumb]:border-white
              [&::-moz-range-thumb]:border-0"
                style={{
                  background: `linear-gradient(to right, #0f172a 0%, #0f172a ${((priceValue - 500) / (10000 - 500)) * 100}%, #e2e8f0 ${((priceValue - 500) / (maxPrice - 500)) * 100}%, #e2e8f0 100%)`,
                }}
              />
            </div>

            {/* Price Labels */}
            <div className="flex justify-between items-center text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-0.5">
                <IndianRupee className="w-3 h-3" />
                500
              </span>
              <span className="flex items-center gap-0.5">
                <IndianRupee className="w-3 h-3" />
                {maxPrice.toLocaleString("en-IN")}
              </span>
            </div>
          </div>

          {/* CLEAR FILTERS BUTTON */}
          <button
            onClick={clearFilters}
            className="w-full py-2.5 px-4 border-2 border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-[0.98] flex items-center justify-center gap-2 group"
          >
            <X className="w-4 h-4 group-hover:rotate-90 transition-transform" />
            Clear All Filters
          </button>
        </aside>

        {/* PRODUCT GRID */}
        <section className="lg:col-span-3">
          {/* TOP BAR */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
            <p className="text-gray-500 text-sm">
              Showing {products?.length || 0} products
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
